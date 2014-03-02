/*
 * Copyright (c) 2014 Hanspeter Portner (dev@open-music-kontrollers.ch)
 *
 * This documentation describes Open Hardware and is licensed under the
 * CERN OHL v.1.2. You may redistribute and modify this documentation
 * under the terms of the CERN OHL v.1.2. (http://ohwr.org/cernohl). This
 * documentation is distributed WITHOUT ANY EXPRESS OR IMPLIED WARRANTY,
 * INCLUDING OF MERCHANTABILITY, SATISFACTORY QUALITY AND FITNESS FOR A
 * PARTICULAR PURPOSE. Please see the CERN OHL v.1.2 for applicable
 * conditions.
 */

include("./helper.js")

function rib_A(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);
	var eng = newLayer(doc, di, "engrave", 0, 255, 0);

	var X0 = 0;
	var X1 = C.Mth;
	var X2 = C.Hca - 10;

	var Y0 = C.Wbo - C.Who;
	var Y1 = Y0 + C.Lho;
	var Y2 = C.Wce - Y0;
	var Y3 = Y2 - C.Lho;

	var vb1 = new Array(
		[X0			, -0],
		[X1			, -0],
		[X1			, -C.Lsi+C.Mth+C.Mto],
		[X2			, -C.Lsi+C.Mth+C.Mto],
		[X2			, -C.Lsi],
		[X1			, -C.Lsi],
		[X1			, -Y0],
		[X0			, -Y0],
		[X0			, -Y1],
		[X1			, -Y1],
		[X1			, -Y3],
		[X0			, -Y3],
		[X0			, -Y2],
		[X1			, -Y2],
		[X1			, -C.Wce+C.Lsi],
		[X2			, -C.Wce+C.Lsi],
		[X2			, -C.Wce+C.Lsi-C.Mth-C.Mto],
		[X1			, -C.Wce+C.Lsi-C.Mth-C.Mto],
		[X1			, -C.Wce],
		[X0			, -C.Wce]
	);
	multiline(doc, op, cut, vb1, false);

	X0 = C.Hca;
	X1 = X0 + C.Mth;
	X2 = X1 - C.Nle;
	var X3 = X2 + C.Bhe;

	var Y0 = C.Wbo - C.Who - C.Lho;
	var Y1 = Y0 + C.Lho;
	var Y2 = Y1 + C.Who;
	var Y3 = Y2 + C.Who;
	var Y4 = Y3 + C.Lho;

	var vb2 = new Array(
		[X0			, -C.Wce],
		[X0			, -Y4],
		[X1			, -Y4],
		[X1			, -Y3],
		[X0			, -Y3],
		[X0			, -Y2-C.Ndi/2],
		[X3			, -Y2-C.Ndi/2],
		[X3			, -Y2-C.Bwi/2],
		[X2			, -Y2-C.Bwi/2],
		[X2			, -Y2+C.Bwi/2],
		[X3			, -Y2+C.Bwi/2],
		[X3			, -Y2+C.Ndi/2],
		[X0			, -Y2+C.Ndi/2],
		[X0			, -Y1],
		[X1			, -Y1],
		[X1			, -Y0],
		[X0			, -Y0],
		[X0			, -0]
	);
	multiline(doc, op, cut, vb2, false);

	var arc1 = rib_arc_top(di, C);
	arc1.setLayerId(cut);
	op.addObject(arc1, false);

	var arc2 = rib_arc_bottom(di, C);
	arc2.setLayerId(cut);
	op.addObject(arc2, false);

	if(C.CE) {
		var X = C.Hca/2;
		var Y = -C.Wce/3;
		var radius = 5/2;

		var va3 = new RVector(X, Y);
		var arc3 = new RArcEntity(doc, new RArcData(va3, radius, -0.1, -Math.PI+0.1, false));
		arc3.setLayerId(eng);
		op.addObject(arc3, false);

		var va4 = new RVector(X, Y-radius*2);
		var arc4 = new RArcEntity(doc, new RArcData(va4, radius, -0.1, -Math.PI-0.1, false));
		arc4.setLayerId(eng);
		op.addObject(arc4, false);

		var l1 = new RLineEntity(doc, new RLineData(
			new RVector(X, Y-radius),
			new RVector(X, Y-radius*1.9)));
		l1.setLayerId(eng);
		op.addObject(l1, false);
	}

	if(C.FCC) {
		var X = C.Hca/2;
		var Y = -C.Wce/3*2;
		var radius = 5/2;

		var va3 = new RVector(X, Y);
		var arc3 = new RArcEntity(doc, new RArcData(va3, radius, -0.9, -Math.PI+0.9, false));
		arc3.setLayerId(eng);
		op.addObject(arc3, false);

		var va4 = new RVector(X, Y);
		var arc4 = new RArcEntity(doc, new RArcData(va4, radius/2, -0.9, -Math.PI+0.9, false));
		arc4.setLayerId(eng);
		op.addObject(arc4, false);

		var l1 = new RLineEntity(doc, new RLineData(
			new RVector(X-radius, Y+radius*1.5),
			new RVector(X+radius, Y+radius*1.5)));
		l1.setLayerId(eng);
		op.addObject(l1, false);

		var l2 = new RLineEntity(doc, new RLineData(
			new RVector(X, Y+radius*1.5),
			new RVector(X, Y+radius)));
		l2.setLayerId(eng);
		op.addObject(l2, false);

		var l3 = new RLineEntity(doc, new RLineData(
			new RVector(X+radius, Y+radius*1.5),
			new RVector(X+radius, Y+radius*0.8)));
		l3.setLayerId(eng);
		op.addObject(l3, false);
	}

	return op;
}
