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

function label_omk(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var eng = newLayer(doc, di, "engrave", 0, 255, 0);

	var zero = new RVector(0, 0);
	var size = 4.0;

	var txt = new RTextEntity(doc, new RTextData(
		zero, zero,
		size, size,
		RS.VAlignMiddle, RS.HAlignLeft, RS.LeftToRight, RS.Exact, 1.0,
		"Open Music Kontrollers", "Berenika",
		true, false, 0, true));
	txt.setLayerId(eng);
	explode_text(doc, op, txt);

	return op;
}
