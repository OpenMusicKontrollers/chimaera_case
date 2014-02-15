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

include("./helper.js")

function rib_D_Rev3(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);
	var eng = newLayer(doc, di, "engrave", 0, 255, 0);

	var X0 = -C.Mth;
	var X1 = 0;
	var X2 = X0 + C.Nle;
	var X3 = X2 - C.Bhe;

	var vb1 = new Array(
		[X1			, 0],
		[X1			, -7],
		[X0			, -7],
		[X0			, -12],
		[X1			, -12],
		[X1			, -20+C.Ndi/2],
		[X3			, -20+C.Ndi/2],
		[X3			, -20+C.Bwi/2],
		[X2			, -20+C.Bwi/2],
		[X2			, -20-C.Bwi/2],
		[X3			, -20-C.Bwi/2],
		[X3			, -20-C.Ndi/2],
		[X1			, -20-C.Ndi/2],
		[X1			, -28],
		[X0			, -28],
		[X0			, -33],
		[X1			, -33],
		[X1			, -54]
	);
	multiline(doc, op, cut, vb1, false);

	X0 = 10;
	X1 = C.Hca;
	X2 = X1 - C.Mth;

	var vb2 = new Array(
		[X1			, -54],
		[X2			, -54],
		[X2			, -49-C.Mth-C.Mto/2],
		[X0			, -49-C.Mth-C.Mto/2],
		[X0			, -49+C.Mto/2],
		[X2			, -49+C.Mto/2],
		[X2			, -44],
		[X1			, -44],
		[X1			, -12],
		[X2			, -12],
		[X2			, -5-C.Mto/2],
		[X0			, -5-C.Mto/2],
		[X0			, -5+C.Mth+C.Mto/2],
		[X2			, -5+C.Mth+C.Mto/2],
		[X2			, 0],
		[X1			, 0]
	);
	multiline(doc, op, cut, vb2, false);

	var vb3 = new Array(
		[X2-1.6, -42],
		[X2-1.6, -25],
		[X2-16	, -25], // 16=1.6+14.4
		[X2-16	, -42]
	);
	multiline(doc, op, cut, vb3, true);

	var vb4 = new Array(
		[X2-1.6, -21],
		[X2-3.6, -22], // 3.6=1.6+2
		[X2-5.6, -22], // r.5=1.6+2+2
		[X2-5.6, -14],
		[X2-3.6, -14],
		[X2-1.6, -15]
	);
	multiline(doc, op, cut, vb4, true);

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

	// engravings
	var pos1 = new RVector(19-C.Mth, -5 + C.Mth + 1);
	var txt1 = new RTextEntity(doc, new RTextData(
		pos1, pos1,
		2, 2,
		RS.VAlignMiddle, RS.HAlignRight, RS.LeftToRight, RS.Exact, 1.0,
		"RESET", "CourierCad",
		true, false, -Math.PI/2, true));
	txt1.setLayerId(eng);
	explode_text(doc, op, txt1);

	var pos2 = new RVector(15-C.Mth, -5 + C.Mth + 1);
	var txt2 = new RTextEntity(doc, new RTextData(
		pos2, pos2,
		2, 2,
		RS.VAlignMiddle, RS.HAlignRight, RS.LeftToRight, RS.Exact, 1.0,
		"FLASH", "CourierCad",
		true, false, -Math.PI/2, true));
	txt2.setLayerId(eng);
	explode_text(doc, op, txt2);

	var Y = -5;
	var pos3 = new RVector(7, Y);
	var txt3 = new RTextEntity(doc, new RTextData(
		pos3, pos3,
		2, 2,
		RS.VAlignMiddle, RS.HAlignCenter, RS.LeftToRight, RS.Exact, 1.0,
		"6 V DC", "CourierCad",
		true, false, -Math.PI/2, true));
	txt3.setLayerId(eng);
	explode_text(doc, op, txt3);

	var va6 = new RVector(4, Y);
	var arc6 = new RCircleEntity(doc, new RCircleData(va6, 0.5));
	arc6.setLayerId(eng);
	op.addObject(arc6, false);

	var va7 = new RVector(4, Y+3);
	var arc7 = new RCircleEntity(doc, new RCircleData(va7, 1));
	arc7.setLayerId(eng);
	op.addObject(arc7, false);

	var va8 = new RVector(4, Y-3);
	var arc8 = new RCircleEntity(doc, new RCircleData(va8, 1));
	arc8.setLayerId(eng);
	op.addObject(arc8, false);

	var va9 = new RVector(4, Y);
	var arc9 = new RArcEntity(doc, new RArcData(va9, 1, 0, Math.PI));
	arc9.setLayerId(eng);
	op.addObject(arc9, false);

	var l1 = new RLineEntity(doc, new RLineData(
		new RVector(4, Y+1),
		new RVector(4, Y+2)));
	l1.setLayerId(eng);
	op.addObject(l1, false);

	var l2 = new RLineEntity(doc, new RLineData(
		new RVector(4, Y-0.5),
		new RVector(4, Y-2)));
	l2.setLayerId(eng);
	op.addObject(l2, false);

	var l3 = new RLineEntity(doc, new RLineData(
		new RVector(4, Y+3+0.5),
		new RVector(4, Y+3-0.5)));
	l3.setLayerId(eng);
	op.addObject(l3, false);

	var l4 = new RLineEntity(doc, new RLineData(
		new RVector(4, Y-3+0.5),
		new RVector(4, Y-3-0.5)));
	l4.setLayerId(eng);
	op.addObject(l4, false);

	var l5 = new RLineEntity(doc, new RLineData(
		new RVector(4-0.5, Y-3),
		new RVector(4+0.5, Y-3)));
	l5.setLayerId(eng);
	op.addObject(l5, false);

	return op;
}
