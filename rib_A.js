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

function rib_A(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var X0 = 0;
	var X1 = C.Mth;
	var X2 = C.Hca - 10;

	var vb1 = new Array(
		[X0			, -0],
		[X1			, -0],
		[X1			, -5+C.Mth+C.Mto/2],
		[X2			, -5+C.Mth+C.Mto/2],
		[X2			, -5-C.Mto/2],
		[X1			, -5-C.Mto/2],
		[X1			, -12],
		[X0			, -12],
		[X0			, -17],
		[X1			, -17],
		[X1			, -37],
		[X0			, -37],
		[X0			, -42],
		[X1			, -42],
		[X1			, -49+C.Mto/2],
		[X2			, -49+C.Mto/2],
		[X2			, -49-C.Mth-C.Mto/2],
		[X1			, -49-C.Mth-C.Mto/2],
		[X1			, -54],
		[X0			, -54]
	);
	multiline(doc, op, cut, vb1, false);

	X0 = C.Hca;
	X1 = X0 + C.Mth;
	X2 = X1 - C.Nle;
	var X3 = X2 + C.Bhe;

	var vb2 = new Array(
		[X0			, -54],
		[X0			, -33],
		[X1			, -33],
		[X1			, -28],
		[X0			, -28],
		[X0			, -20-C.Ndi/2],
		[X3			, -20-C.Ndi/2],
		[X3			, -20-C.Bwi/2],
		[X2			, -20-C.Bwi/2],
		[X2			, -20+C.Bwi/2],
		[X3			, -20+C.Bwi/2],
		[X3			, -20+C.Ndi/2],
		[X0			, -20+C.Ndi/2],
		[X0			, -12],
		[X1			, -12],
		[X1			, -7],
		[X0			, -7],
		[X0			, -0]
	);
	multiline(doc, op, cut, vb2, false);

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
