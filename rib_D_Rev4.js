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

function rib_D_Rev4(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);
	var eng = newLayer(doc, di, "engrave", 0, 255, 0);

	var vb1 = rib_head(di, C);
	multiline(doc, op, cut, vb1, false);

	var X0 = 10;
	var X1 = C.Hca;
	var X2 = X1 - C.Mth;

	var Y0 = C.Wbo-C.Who;
	var Y1 = C.Wce - Y0;

	var vb2 = new Array(
		[X1			, -C.Wce],
		[X2			, -C.Wce],
		[X2			, -C.Wce+C.Lsi-C.Mth-C.Mto],
		[X0			, -C.Wce+C.Lsi-C.Mth-C.Mto],
		[X0			, -C.Wce+C.Lsi],
		[X2			, -C.Wce+C.Lsi],
		[X2			, -Y1],
		[X1			, -Y1],
		[X1			, -Y0],
		[X2			, -Y0],
		[X2			, -C.Lsi],
		[X0			, -C.Lsi],
		[X0			, -C.Lsi+C.Mth+C.Mto],
		[X2			, -C.Lsi+C.Mth+C.Mto],
		[X2			, 0],
		[X1			, 0]
	);
	multiline(doc, op, cut, vb2, false);

	var Y1 = -26.8;
	var Y2 = -36.95;

	var vb3 = new Array(
		[X2-1.6, Y1],
		[X2-1.6, Y1+17],
		[X2-16	, Y1+17], // 16=1.6+14.4
		[X2-16	, Y1]
	);
	multiline(doc, op, cut, vb3, true);

	var vb4 = new Array(
		[X2-1.6, Y2],
		[X2-3.6, Y2-1], // 3.6=1.6+2
		[X2-5.6, Y2-1], // r.5=1.6+2+2
		[X2-5.6, Y2+7],
		[X2-3.6, Y2+7],
		[X2-1.6, Y2+6]
	);
	multiline(doc, op, cut, vb4, true);

	var arc1 = rib_arc_top(di, C);
	arc1.setLayerId(cut);
	op.addObject(arc1, false);

	var arc2 = rib_arc_bottom(di, C);
	arc2.setLayerId(cut);
	op.addObject(arc2, false);

	var va3 = new RVector(12-C.Mth, -33.95);
	var arc3 = new RCircleEntity(doc, new RCircleData(va3, 4));
	arc3.setLayerId(cut);
	op.addObject(arc3, false);

	var va4 = new RVector(15-C.Mth, -44.3);
	var arc4 = new RCircleEntity(doc, new RCircleData(va4, 1.5));
	arc4.setLayerId(cut);
	op.addObject(arc4, false);

	var va5 = new RVector(19-C.Mth, -44.3);
	var arc5 = new RCircleEntity(doc, new RCircleData(va5, 1.5));
	arc5.setLayerId(cut);
	op.addObject(arc5, false);

	// engravings
	var pos1 = new RVector(19-C.Mth, -C.Wce + C.Lsi - C.Mth - 1);
	var txt1 = new RTextEntity(doc, new RTextData(
		pos1, pos1,
		2, 2,
		RS.VAlignMiddle, RS.HAlignLeft, RS.LeftToRight, RS.Exact, 1.0,
		"RESET", "CourierCad",
		true, false, -Math.PI/2, true));
	txt1.setLayerId(eng);
	explode_text(doc, op, txt1);

	var pos2 = new RVector(15-C.Mth, -C.Wce + C.Lsi - C.Mth - 1);
	var txt2 = new RTextEntity(doc, new RTextData(
		pos2, pos2,
		2, 2,
		RS.VAlignMiddle, RS.HAlignLeft, RS.LeftToRight, RS.Exact, 1.0,
		"FLASH", "CourierCad",
		true, false, -Math.PI/2, true));
	txt2.setLayerId(eng);
	explode_text(doc, op, txt2);

	var Y = -5 - 44;
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
