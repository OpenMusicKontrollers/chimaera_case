/*
 * Copyright (c) 2013 Hanspeter Portner (dev@open-music-kontrollers.ch)
 * 
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * 
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 
 *     1. The origin of this software must not be misrepresented; you must not
 *     claim that you wrote the original software. If you use this software
 *     in a product, an acknowledgment in the product documentation would be
 *     appreciated but is not required.
 * 
 *     2. Altered source versions must be plainly marked as such, and must not be
 *     misrepresented as being the original software.
 * 
 *     3. This notice may not be removed or altered from any source
 *     distribution.
 */

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
