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

function rib_C(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var vb1 = rib_head(di, C);
	multiline(doc, op, cut, vb1, false);

	var X0 = 10;
	var X1 = C.Hca;
	var X2 = X1 - C.Mth;
	var X3 = X2 - 1.6;
	var X4 = X3 - 2.5;

	var vb2 = new Array(
		[X1			, -C.Wce],
		[X2			, -C.Wce],
		[X2			, -C.Wce+C.Lsi-C.Mth-C.Mto],
		[X0			, -C.Wce+C.Lsi-C.Mth-C.Mto],
		[X0			, -C.Wce+C.Lsi],
		[X3			, -C.Wce+C.Lsi],
		[X3			, -33],
		[8			, -41],
		[8			, -10],
		[X4			, -10], // 3.1 = 1.6+2.5
		[X4			, -C.Lsi],
		[X0			, -C.Lsi],
		[X0			, -C.Lsi+C.Mth+C.Mto],
		[X2			, -C.Lsi+C.Mth+C.Mto],
		[X2			, 0],
		[X1			, 0]
	);
	multiline(doc, op, cut, vb2, false);

	var arc1 = rib_arc_top(di, C);
	arc1.setLayerId(cut);
	op.addObject(arc1, false);

	var arc2 = rib_arc_bottom(di, C);
	arc2.setLayerId(cut);
	op.addObject(arc2, false);

	return op;
}
