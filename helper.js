/* 
 * Copyright (c) Hanspeter Portner (dev@open-music-kontrollers.ch)
 *
 * This documentation describes Open Hardware and is licensed under the
 * CERN OHL v.1.2. You may redistribute and modify this documentation
 * under the terms of the CERN OHL v.1.2. (http://ohwr.org/cernohl). This
 * documentation is distributed WITHOUT ANY EXPRESS OR IMPLIED WARRANTY,
 * INCLUDING OF MERCHANTABILITY, SATISFACTORY QUALITY AND FITNESS FOR A
 * PARTICULAR PURPOSE. Please see the CERN OHL v.1.2 for applicable
 * conditions.
 */

include("scripts/Modify/Explode/Explode.js");

function newRef(doc, di, dict, C) {
	for(var key in dict) {
		var block = new RBlock(doc, key, new RVector(0,0));
		var op = new RAddObjectOperation(block);
		di.applyOperation(op);

		di.setCurrentBlock(key);
		op = dict[key](di, C);
		di.applyOperation(op);
		di.setCurrentBlock(RBlock.modelSpaceName);
	}
}

function importRef(doc, di, key, file, x, y, s, a) {
	if (doc.hasBlock(key)) {
		addRef(doc, di, key, x, y, s, a);
	} else { // !hasBlock {
		var bDoc = new RDocument(new RMemoryStorage(), new RSpatialIndexNavel());
		var bInt = new RDocumentInterface(bDoc);
		bInt.importFile(file);

		var operationP = new RPasteOperation(bDoc);
		operationP.setOffset(new RVector(x, y));
		operationP.setBlockName(key);
		operationP.setScale(s);
		operationP.setRotation(a);
		di.applyOperation(operationP);
		bInt.destroy();
	}
}

function addRef(doc, di, key, x, y, s, a) {
	var pos = new RVector(x, y);
	var scale = new RVector(s, s);
	var angle = a;

	var id = doc.getBlockId(key);
	var ref = new RBlockReferenceEntity(doc, new RBlockReferenceData(id, pos, scale, angle));
	var op = new RAddObjectOperation(ref);
	di.applyOperation(op);
}

function newLayer(doc, di, name, r, g, b) {
	if (doc.hasLayer(name))
		return doc.getLayerId(name);
	else {
		var linetypeId = doc.getLinetypeId("continuous");
		var layer = new RLayer(doc, name, false, false, new RColor(r,g,b), linetypeId, RLineweight.Weight000);
		var op = new RAddObjectOperation(layer);
		di.applyOperation(op);
		return doc.getLayerId(name);
	}
}

function explode_text(doc, op, entity) {
	var newShapes = [];
	var painterPaths = entity.getPainterPaths();
	var k;
	var layer = entity.getLayerId();

	for(k=0; k<painterPaths.length; k++) {
		if(painterPaths[k].getFeatureSize()<0)
			continue;

		var shapes = painterPaths[k].getShapes();
		for(n=0; n<shapes.length; n++) {
			var shape = shapes[n];
			if(isSplineShape(shape))
				shape = ShapeAlgorithms.splineToLineOrArc(shape, 1e-6*painterPaths[k].getFeatureSize());
			if(!isNull(shape))
				newShapes.push(shape.clone());
		}
	}

	if(newShapes.length!==0) {
		for(k=0; k<newShapes.length; k++) {
			var shape = newShapes[k];
			var e = shapeToEntity(doc, shape);
			e.setLayerId(layer);
			op.addObject(e, false);
		}
	}
}

function hasProTools() {
	for(var i=0; i<RPluginLoader.countPlugins(); i++) {
		var pluginInfo = RPluginLoader.getPluginInfo(i);
		if ( (pluginInfo.get("Name") == "Pro Tools") && (!pluginInfo.get("TrialExpired")) ) {
			print("QCAD professional edition detected: using polylines instead of lines");
			return true;
		}
	}
	print("QCAD open source edition detected: using lines instead of polylines");
	return false;
}

var isPro = hasProTools();

function multiline(doc, op, layer, points, closed) {
	if(isPro) {
		var line = new RPolylineEntity(doc, new RPolylineData());
		for(var i=0; i<points.length; i++)
			line.appendVertex(new RVector(points[i][0], points[i][1]));
		line.setClosed(closed);
		line.setLayerId(layer);
		op.addObject(line, false);
	} else { // !isPro
		for(var i=0; i<points.length-1; i++) {
			var line = new RLineEntity(doc, new RLineData(
				new RVector(points[i][0], points[i][1]),
				new RVector(points[i+1][0], points[i+1][1])));
			line.setLayerId(layer);
			op.addObject(line, false);
		}
		if(closed) {
			var line = new RLineEntity(doc, new RLineData(
				new RVector(points[points.length-1][0], points[points.length-1][1]),
				new RVector(points[0][0], points[0][1])));
			line.setLayerId(layer);
			op.addObject(line, false);
		}
	}
}
