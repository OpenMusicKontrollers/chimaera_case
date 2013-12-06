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

function rib_D_Rev3() {
}

rib_D_Rev3.prototype.toString = function() {
	print("rib_D_Rev3.js:", "toString(): ");
}

rib_D_Rev3.init = function(formWidget) {
	if (!isNull(formWidget)) {
		rib_D_Rev3.widgets = getWidgets(formWidget);
	}
};

rib_D_Rev3.generate = function(di, file) {
	return call_widgets(di, rib_D_Rev3.widgets, rib_D_Rev3.getOperation);
}

rib_D_Rev3.generatePreview = function(di, iconSize) {
	return call_default(di, rib_D_Rev3.getOperation);
}

rib_D_Rev3.getOperation = function(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var X0 = -C.Mth;
	var X1 = 0;
	var X2 = X0 + C.Nle;
	var X3 = X2 - C.Bhe;

	var vb1 = new Array(
		new RVector(X1			, 0),
		new RVector(X1			, -7),
		new RVector(X0			, -7),
		new RVector(X0			, -12),
		new RVector(X1			, -12),
		new RVector(X1			, -20+C.Ndi/2),
		new RVector(X3			, -20+C.Ndi/2),
		new RVector(X3			, -20+C.Bwi/2),
		new RVector(X2			, -20+C.Bwi/2),
		new RVector(X2			, -20-C.Bwi/2),
		new RVector(X3			, -20-C.Bwi/2),
		new RVector(X3			, -20-C.Ndi/2),
		new RVector(X1			, -20-C.Ndi/2),
		new RVector(X1			, -28),
		new RVector(X0			, -28),
		new RVector(X0			, -33),
		new RVector(X1			, -33),
		new RVector(X1			, -54)
	);

	X0 = 10;
	X1 = C.Hca;
	X2 = X1 - C.Mth;

	var vb2 = new Array(
		new RVector(X1			, -54),
		new RVector(X2			, -54),
		new RVector(X2			, -49-C.Mth-C.Mto/2),
		new RVector(X0			, -49-C.Mth-C.Mto/2),
		new RVector(X0			, -49+C.Mto/2),
		new RVector(X2			, -49+C.Mto/2),
		new RVector(X2			, -44),
		new RVector(X1			, -44),
		new RVector(X1			, -12),
		new RVector(X2			, -12),
		new RVector(X2			, -5-C.Mto/2),
		new RVector(X0			, -5-C.Mto/2),
		new RVector(X0			, -5+C.Mth+C.Mto/2),
		new RVector(X2			, -5+C.Mth+C.Mto/2),
		new RVector(X2			, 0),
		new RVector(X1			, 0)
	);

	var vb3 = new Array(
		new RVector(X2-1.6, -42),
		new RVector(X2-1.6, -25),
		new RVector(X2-16	, -25), // 16=1.6+14.4
		new RVector(X2-16	, -42)
	);

	var vb4 = new Array(
		new RVector(X2-1.6, -21),
		new RVector(X2-3.6, -22), // 3.6=1.6+2
		new RVector(X2-5.6, -22), // r.5=1.6+2+2
		new RVector(X2-5.6, -14),
		new RVector(X2-3.6, -14),
		new RVector(X2-1.6, -15)
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

	var line3 = new RPolylineEntity(doc, new RPolylineData());
	for(var i=0; i<vb3.length; i++)
		line3.appendVertex(vb3[i]);
	line3.setClosed(true);
	line3.setLayerId(cut);
	op.addObject(line3, false);

	var line4 = new RPolylineEntity(doc, new RPolylineData());
	for(var i=0; i<vb4.length; i++)
		line4.appendVertex(vb4[i]);
	line4.setClosed(true);
	line4.setLayerId(cut);
	op.addObject(line4, false);

	var va1 = new RVector(12, 0);
	var arc1 = new RArcEntity(doc, new RArcData(va1, C.Hca/2, 0.0, Math.PI, false));
	arc1.setLayerId(cut);
	op.addObject(arc1, false);

	var va2 = new RVector(12, -54);
	var arc2 = new RArcEntity(doc, new RArcData(va2, C.Hca/2, Math.PI, 0, false));
	arc2.setLayerId(cut);
	op.addObject(arc2, false);

	var va3 = new RVector(12-C.Mth, -18);
	var arc3 = new RCircleEntity(doc, new RCircleData(va3, 4));
	arc3.setLayerId(cut);
	op.addObject(arc3, false);

	var va4 = new RVector(15-C.Mth, -9.5);
	var arc4 = new RCircleEntity(doc, new RCircleData(va4, 1.5));
	arc4.setLayerId(cut);
	op.addObject(arc4, false);

	var va5 = new RVector(19-C.Mth, -9.5);
	var arc5 = new RCircleEntity(doc, new RCircleData(va5, 1.5));
	arc5.setLayerId(cut);
	op.addObject(arc5, false);

	return op;
}
