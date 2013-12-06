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

function rib_A() {
}

rib_A.prototype.toString = function() {
	print("rib_A.js:", "toString(): ");
}

rib_A.init = function(formWidget) {
	if (!isNull(formWidget)) {
		rib_A.widgets = getWidgets(formWidget);
	}
};

rib_A.generate = function(di, file) {
	return call_widgets(di, rib_A.widgets, rib_A.getOperation);
}

rib_A.generatePreview = function(di, iconSize) {
	return call_default(di, rib_A.getOperation);
}

rib_A.getOperation = function(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var X0 = 0;
	var X1 = C.Mth;
	var X2 = C.Hca - 10;

	var vb1 = new Array(
		new RVector(X0			, -0),
		new RVector(X1			, -0),
		new RVector(X1			, -5+C.Mth+C.Mto/2),
		new RVector(X2			, -5+C.Mth+C.Mto/2),
		new RVector(X2			, -5-C.Mto/2),
		new RVector(X1			, -5-C.Mto/2),
		new RVector(X1			, -12),
		new RVector(X0			, -12),
		new RVector(X0			, -17),
		new RVector(X1			, -17),
		new RVector(X1			, -37),
		new RVector(X0			, -37),
		new RVector(X0			, -42),
		new RVector(X1			, -42),
		new RVector(X1			, -49+C.Mto/2),
		new RVector(X2			, -49+C.Mto/2),
		new RVector(X2			, -49-C.Mth-C.Mto/2),
		new RVector(X1			, -49-C.Mth-C.Mto/2),
		new RVector(X1			, -54),
		new RVector(X0			, -54)
	);

	X0 = C.Hca;
	X1 = X0 + C.Mth;
	X2 = X1 - C.Nle;
	var X3 = X2 + C.Bhe;

	var vb2 = new Array(
		new RVector(X0			, -54),
		new RVector(X0			, -33),
		new RVector(X1			, -33),
		new RVector(X1			, -28),
		new RVector(X0			, -28),
		new RVector(X0			, -20-C.Ndi/2),
		new RVector(X3			, -20-C.Ndi/2),
		new RVector(X3			, -20-C.Bwi/2),
		new RVector(X2			, -20-C.Bwi/2),
		new RVector(X2			, -20+C.Bwi/2),
		new RVector(X3			, -20+C.Bwi/2),
		new RVector(X3			, -20+C.Ndi/2),
		new RVector(X0			, -20+C.Ndi/2),
		new RVector(X0			, -12),
		new RVector(X1			, -12),
		new RVector(X1			, -7),
		new RVector(X0			, -7),
		new RVector(X0			, -0)
	);

	var line1 = new RPolylineEntity(doc, new RPolylineData());
	for(var i=0; i<vb1.length; i++)
		line1.appendVertex(vb1[i]);
	line1.setLayerId(cut);
	op.addObject(line1, false);

	var line2 = new RPolylineEntity(doc, new RPolylineData());
	for(var i=0; i<vb2.length; i++)
		line2.appendVertex(vb2[i]);
	line2.setLayerId(cut);
	op.addObject(line2, false);

	var va1 = new RVector(12, 0);
	var arc1 = new RArcEntity(doc, new RArcData(va1, C.Hca/2, 0.0, Math.PI, false));
	arc1.setLayerId(cut);
	op.addObject(arc1, false);

	var va2 = new RVector(12, -54);
	var arc2 = new RArcEntity(doc, new RArcData(va2, C.Hca/2, Math.PI, 0, false));
	arc2.setLayerId(cut);
	op.addObject(arc2, false);

	return op;
}
