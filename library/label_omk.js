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

include("../scripts/chimaera_helper.js")

function label_omk() {
}

label_omk.prototype.toString = function() {
	print("label_omk.js:", "toString(): ");
}

label_omk.init = function(formWidget) {
	if (!isNull(formWidget)) {
		label_omk.widgets = getWidgets(formWidget);
	}
};

label_omk.generate = function(di, file) {
	return call_widgets(di, label_omk.widgets, label_omk.getOperation);
}

label_omk.generatePreview = function(di, iconSize) {
	return call_default(di, label_omk.getOperation);
}

label_omk.getOperation = function(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var eng = newLayer(doc, di, "engrave", 0, 255, 0);

	var zero = new RVector(0, 0);
	var size = 8.0;

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
