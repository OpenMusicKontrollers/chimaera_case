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

function hole_B(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var vb1 = new Array(
		[-C.Mth/2-C.Mto/2		, C.Who+C.Lho],
		[-C.Mth/2-C.Mto/2		, C.Who],
		[C.Mth/2+C.Mto/2		, C.Who],
		[C.Mth/2+C.Mto/2		, C.Who+C.Lho]
	);
	multiline(doc, op, cut, vb1, true);

	var va1 = new RVector(0, 0);
	var arc1 = new RArcEntity(doc, new RArcData(va1, C.Ndi/2, 0.0, Math.PI, false));
	arc1.setLayerId(cut);
	op.addObject(arc1, false);

	return op;
}
