/*
 * This documentation describes Open Hardware and is licensed under the
 * CERN OHL v.1.2. You may redistribute and modify this documentation
 * under the terms of the CERN OHL v.1.2. (http://ohwr.org/cernohl). This
 * documentation is distributed WITHOUT ANY EXPRESS OR IMPLIED WARRANTY,
 * INCLUDING OF MERCHANTABILITY, SATISFACTORY QUALITY AND FITNESS FOR A
 * PARTICULAR PURPOSE. Please see the CERN OHL v.1.2 for applicable
 * conditions.
 */

include("../scripts/chimaera_helper.js");

function keys() {
}

keys.prototype.toString = function() {
	print("keys.js:", "toString(): ");
}

keys.init = function(formWidget) {
	if (!isNull(formWidget)) {
		keys.widgets = getWidgets(formWidget);
	}
};

keys.generate = function(di, file) {
	return call_widgets(di, keys.widgets, keys.getOperation);
}

keys.generatePreview = function(di, iconSize) {
	return call_default(di, keys.getOperation);
}

keys.getOperation = function(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var eng = newLayer(doc, di, "engrave", 0, 255, 0);

	var La = C.Nsu*C.Lsu;
	var Ln = (C.Nsu+1)*C.Lsu;
	var L = Ln+C.Lsi;

	// engraving
	var lines = new Array(
		[ [0, 0]						, [La, 0] ],
		[ [0, -20]					, [La, -20] ],
		[ [0, -C.Wce+20]		, [La, -C.Wce+20] ],
		[ [0, -C.Wce]				, [La, -C.Wce] ]
	);

	var K = C.Nsu * 16/3;
	//TODO K % 3 ?

	for(var i=0; i<K; i++) {
		var x = i*15;
		lines.push([ [x, 0]				, [x, -C.Wce] ]);
		lines.push([ [x+5, -20]		, [x+5, -C.Wce+20] ]);
		lines.push([ [x+10, -20]	, [x+10, -C.Wce+20] ]);
	}
	lines.push([ [La, 0]		, [La, -C.Wce] ]);

	for(var i=0; i<lines.length; i++) {
		var l1 = new RLineEntity(doc, new RLineData(
			new RVector(lines[i][0][0], lines[i][0][1]),
			new RVector(lines[i][1][0], lines[i][1][1])));
		l1.setLayerId(eng);
		op.addObject(l1, false);
	}

	return op;
}
