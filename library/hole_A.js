/*
 * This documentation describes Open Hardware and is licensed under the
 * CERN OHL v.1.2. You may redistribute and modify this documentation
 * under the terms of the CERN OHL v.1.2. (http://ohwr.org/cernohl). This
 * documentation is distributed WITHOUT ANY EXPRESS OR IMPLIED WARRANTY,
 * INCLUDING OF MERCHANTABILITY, SATISFACTORY QUALITY AND FITNESS FOR A
 * PARTICULAR PURPOSE. Please see the CERN OHL v.1.2 for applicable
 * conditions.
 */

include("../scripts/chimaera_helper.js")

function hole_A() {
}

hole_A.prototype.toString = function() {
	print("hole_A.js:", "toString(): ");
}

hole_A.init = function(formWidget) {
	if (!isNull(formWidget)) {
		hole_A.widgets = getWidgets(formWidget);
	}
};

hole_A.generate = function(di, file) {
	return call_widgets(di, hole_A.widgets, hole_A.getOperation);
}

hole_A.generatePreview = function(di, iconSize) {
	return call_default(di, hole_A.getOperation);
}

hole_A.getOperation = function(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var vb1 = new Array(
		new RVector(-C.Mto/2			, 2.5),
		new RVector(-C.Mto/2			, -2.5),
		new RVector(C.Mth+C.Mto/2	, -2.5),
		new RVector(C.Mth+C.Mto/2	, 2.5)
	);

	var line1 = new RPolylineEntity(doc, new RPolylineData());
	for(var i=0; i<vb1.length; i++)
		line1.appendVertex(vb1[i]);
	line1.setClosed(true);
	line1.setLayerId(cut);
	op.addObject(line1, false);

	return op;
}
