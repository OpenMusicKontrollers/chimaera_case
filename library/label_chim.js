/*
 * This documentation describes Open Hardware and is licensed under the
 * CERN OHL v.1.2. You may redistribute and modify this documentation
 * under the terms of the CERN OHL v.1.2. (http://ohwr.org/cernohl). This
 * documentation is distributed WITHOUT ANY EXPRESS OR IMPLIED WARRANTY,
 * INCLUDING OF MERCHANTABILITY, SATISFACTORY QUALITY AND FITNESS FOR A
 * PARTICULAR PURPOSE. Please see the CERN OHL v.1.2 for applicable
 * conditions.
 */

include("../scripts/chimaera_helper.js")

function label_chim() {
}

label_chim.prototype.toString = function() {
	print("label_chim.js:", "toString(): ");
}

label_chim.init = function(formWidget) {
	if (!isNull(formWidget)) {
		label_chim.widgets = getWidgets(formWidget);
	}
};

label_chim.generate = function(di, file) {
	return call_widgets(di, label_chim.widgets, label_chim.getOperation);
}

label_chim.generatePreview = function(di, iconSize) {
	return call_default(di, label_chim.getOperation);
}

label_chim.getOperation = function(di, C) {
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
