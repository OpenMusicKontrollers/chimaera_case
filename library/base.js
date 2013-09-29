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

function base() {
}

base.prototype.toString = function() {
	print("base.js:", "toString(): ");
}

base.init = function(formWidget) {
	if (!isNull(formWidget)) {
		base.widgets = getWidgets(formWidget);
	}
};

base.generate = function(di, file) {
	return call_widgets(di, base.widgets, base.getOperation);
}

base.generatePreview = function(di, iconSize) {
	return call_default(di, base.getOperation);
}

base.getOperation = function(di, w, t, b, l, h, s, n) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var Ln = (n+1)*S;
	var L = L1+Ln+M;

	var vb1 = new Array(
		[0, 0],
		[0, -D2],
		[L, -D2],
		[L, 0]
	);
	var line1 = new RPolylineEntity(doc, new RPolylineData());
	for(var i=0; i<vb1.length; i++)
		line1.appendVertex(new RVector(vb1[i][0], vb1[i][1]));
	line1.setClosed(true);
	line1.setLayerId(cut);
	op.addObject(line1, false);

	var vb2 = new Array(
		[L-M-t/2		, -12],
		[L-M-t/2		, -44],
		[L-M+w+t/2	, -44],
		[L-M+w+t/2	, -12]
	);
	var line2 = new RPolylineEntity(doc, new RPolylineData());
	for(var i=0; i<vb2.length; i++)
		line2.appendVertex(new RVector(vb2[i][0], vb2[i][1]));
	line2.setClosed(true);
	line2.setLayerId(cut);
	op.addObject(line2, false);

	return op;
}
