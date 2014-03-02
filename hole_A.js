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

function hole_A(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var vb1 = new Array(
		[0						, C.Lho/2],
		[0						, -C.Lho/2],
		[C.Mth+C.Mto	, -C.Lho/2],
		[C.Mth+C.Mto	, C.Lho/2]
	);
	multiline(doc, op, cut, vb1, true);

	return op;
}
