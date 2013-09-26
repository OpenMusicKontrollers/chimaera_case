var L1 = 30;
var M = 5;
var S = 80;
var H = 24;
var Lb = 69;
var D1 = 34;
var D2 = 54;
var D3 = 20;

function call_widgets(di, widgets, cb) {
	var w = widgets["mleThickness"].getValue();
	var t = widgets["mleTolerance"].getValue();
	var b = widgets["mleDiameter"].getValue();
	var l = widgets["mleLength"].getValue();
	var h = widgets["mleHeight"].getValue();
	var s = widgets["mleWidth"].getValue();
	var n = widgets["mleN"].getValue();

	return cb(di, w, t, b, l, h, s, n);
}

function call_default(di, cb) {
	return cb(di, 2.5, 0.1, 3.0, 6.0, 1.8, 5.5, 6);
}

function newRef(doc, di, dict, w, t, b, l, h, s, n) {
	for(var key in dict) {
		var block = new RBlock(doc, key, new RVector(0,0));
		var op = new RAddObjectOperation(block);
		di.applyOperation(op);

		di.setCurrentBlock(key);
		op = dict[key].getOperation(di, w, t, b, l, h, s, n);
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
