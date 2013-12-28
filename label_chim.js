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

function label_chim(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var eng = newLayer(doc, di, "engrave", 0, 255, 0);

	var zero = new RVector(0, 0);
	var size = 8.0;

	var txt1 = new RTextEntity(doc, new RTextData(
		zero, new RVector(0, -1),
		size, size,
		RS.VAlignTop, RS.HAlignCenter, RS.LeftToRight, RS.Exact, 1.0,
		"CHIMAERA", "Berenika",
		true, false, 0, true));
	txt1.setLayerId(eng);
	explode_text(doc, op, txt1);

	var txt2 = new RTextEntity(doc, new RTextData(
		zero, new RVector(0, 1),
		size, size,
		RS.VAlignTop, RS.HAlignCenter, RS.LeftToRight, RS.Exact, 1.0,
		"S-" + C.Nsu*16, "Berenika",
		true, false, Math.PI, true));
	txt2.setLayerId(eng);
	explode_text(doc, op, txt2);

	return op;
}
