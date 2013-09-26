include("../scripts/helper.js");

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

keys.getOperation = function(di, w, t, b, l, h, s, n) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var eng = newLayer(doc, di, "engrave", 0, 255, 0);

	var Ln = (n+1)*S;
	var L = Ln+M;

	// engraving
	var lines = new Array(
		[ [0, 0]			, [n*S, 0] ],
		[ [0, -20]		, [n*S, -20] ],
		[ [0, -D2+20]	, [n*S, -D2+20] ],
		[ [0, -D2]		, [n*S, -D2] ]
	);

	for(var i=0; i<n*16/3; i++) {
		var x = i*15;
		lines.push([ [x, 0]				, [x, -D2] ]);
		lines.push([ [x+5, -20]		, [x+5, -D2+20] ]);
		lines.push([ [x+10, -20]	, [x+10, -D2+20] ]);
	}
	lines.push([ [n*S, 0]		, [n*S, -D2] ]);

	for(var i=0; i<lines.length; i++) {
		var l1 = new RLineEntity(doc, new RLineData(
			new RVector(lines[i][0][0], lines[i][0][1]),
			new RVector(lines[i][1][0], lines[i][1][1])));
		l1.setLayerId(eng);
		op.addObject(l1, false);
	}

	return op;
}
