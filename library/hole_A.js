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

include("../scripts/helper.js")

function hole_A() {
}

hole_A.prototype.toString = function() {
	print("hole_A.js:", "toString(): ");
}

hole_A.init = function(formWidget) {
	if (!isNull(formWidget)) {
		hole_A.widgets = getWidgets(formWidget);
	}
};

hole_A.generate = function(di, file) {
	return call_widgets(di, hole_A.widgets, hole_A.getOperation);
}

hole_A.generatePreview = function(di, iconSize) {
	return call_default(di, hole_A.getOperation);
}

hole_A.getOperation = function(di, w, t, b, l, h, s, n) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var vb1 = new Array(
		new RVector(-t/2	, 2.5),
		new RVector(-t/2	, -2.5),
		new RVector(w+t/2	, -2.5),
		new RVector(w+t/2	, 2.5)
	);

	var line1 = new RPolylineEntity(doc, new RPolylineData());
	for(var i=0; i<vb1.length; i++)
		line1.appendVertex(vb1[i]);
	line1.setClosed(true);
	line1.setLayerId(cut);
	op.addObject(line1, false);

	return op;
}
