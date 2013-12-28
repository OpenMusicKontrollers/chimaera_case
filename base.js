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

include("./helper.js");

function base(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var Ln = (C.Nsu+1)*C.Lsu;
	var Ld = C.Lle + C.Nsu*C.Lsu;
	var L = C.Lle+Ln+C.Lsi;

	var vb1 = new Array(
		[0, 0],
		[0, -C.Wce],
		[L, -C.Wce],
		[L, 0]
	);
	multiline(doc, op, cut, vb1, true);

	var vb2 = new Array(
		[L-C.Lsi-C.Mto/2				, -12],
		[L-C.Lsi-C.Mto/2				, -44],
		[L-C.Lsi+C.Mth+C.Mto/2	, -44],
		[L-C.Lsi+C.Mth+C.Mto/2	, -12]
	);
	multiline(doc, op, cut, vb2, true);

	var vb3 = new Array(
		[Ld				, 0],
		[Ld				, -C.Wce/2+5],
		[Ld+4			, -C.Wce/2+7],
		[Ld+4			, -C.Wce/2-7],
		[Ld				, -C.Wce/2-5],
		[Ld				, -C.Wce]
	);
	multiline(doc, op, cut, vb3, false);

	return op;
}
