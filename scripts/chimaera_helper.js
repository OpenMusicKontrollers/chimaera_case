/*
 * Copyright (c) 2013 Hanspeter Portner (dev@open-music-kontrollers.ch)
 * 
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * 
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 
 *     1. The origin of this software must not be misrepresented; you must not
 *     claim that you wrote the original software. If you use this software
 *     in a product, an acknowledgment in the product documentation would be
 *     appreciated but is not required.
 * 
 *     2. Altered source versions must be plainly marked as such, and must not be
 *     misrepresented as being the original software.
 * 
 *     3. This notice may not be removed or altered from any source
 *     distribution.
 */

function defaultC() {
	var C = {
		Lle : 30,		// length left
		Lsi : 5,		// length side
		Lsu : 80,		// length sensor unit
		Hca : 24,		// height case
		Lri : 69,		// length right
		Wto : 34,		// width top
		Wce : 54,		// width center
		Wbo : 20,		// width bottom

		Mth : 2.5,	// material thickness
		Mto : 0.1,	// material tolerance
		Ndi : 3.0,	// nut diameter
		Nle : 6.0,	// nut length
		Bhe : 1.8,	// bolt height
		Bwi : 5.5,	// bolt width
		Nsu : 6			// number of sensor units
	};

	return C;
}

function call_widgets(di, widgets, cb) {
	var C = defaultC();

	C.Mth = widgets["mleThickness"].getValue();
	C.Mto = widgets["mleTolerance"].getValue();
	C.Ndi = widgets["mleDiameter"].getValue();
	C.Nle = widgets["mleLength"].getValue();
	C.Bhe = widgets["mleHeight"].getValue();
	C.Bwi = widgets["mleWidth"].getValue();
	C.Nsu = widgets["mleN"].getValue();

	return cb(di, C);
}

function call_default(di, cb) {
	var C = defaultC();

	return cb(di, C);
}

function newRef(doc, di, dict, C) {
	for(var key in dict) {
		var block = new RBlock(doc, key, new RVector(0,0));
		var op = new RAddObjectOperation(block);
		di.applyOperation(op);

		di.setCurrentBlock(key);
		op = dict[key].getOperation(di, C);
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
