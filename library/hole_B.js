include("../scripts/helper.js")

function hole_B() {
}

hole_B.prototype.toString = function() {
	print("hole_B.js:", "toString(): ");
}

hole_B.init = function(formWidget) {
	if (!isNull(formWidget)) {
		hole_B.widgets = getWidgets(formWidget);
	}
};

hole_B.generate = function(di, file) {
	return call_widgets(di, hole_B.widgets, hole_B.getOperation);
}

hole_B.generatePreview = function(di, iconSize) {
	return call_default(di, hole_B.getOperation);
}

hole_B.getOperation = function(di, w, t, b, l, h, s, n) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var vb1 = new Array(
		new RVector(-w/2-t/2	, 13),
		new RVector(-w/2-t/2	, 8),
		new RVector(w/2+t/2		, 8),
		new RVector(w/2+t/2		, 13)
	);

	var line1 = new RPolylineEntity(doc, new RPolylineData());
	for(var i=0; i<vb1.length; i++)
		line1.appendVertex(vb1[i]);
	line1.setClosed(true);
	line1.setLayerId(cut);
	op.addObject(line1, false);

	var va1 = new RVector(0, 0);
	var arc1 = new RArcEntity(doc, new RArcData(va1, b/2, 0.0, Math.PI, false));
	arc1.setLayerId(cut);
	op.addObject(arc1, false);

	return op;
}
