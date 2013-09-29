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

function rib_B() {
}

rib_B.prototype.toString = function() {
	print("rib_B.js:", "toString(): ");
}

rib_B.init = function(formWidget) {
	if (!isNull(formWidget)) {
		rib_B.widgets = getWidgets(formWidget);
	}
};

rib_B.generate = function(di, file) {
	return call_widgets(di, rib_B.widgets, rib_B.getOperation);
}

rib_B.generatePreview = function(di, iconSize) {
	return call_default(di, rib_B.getOperation);
}

rib_B.getOperation = function(di, w, t, b, l, h, s, n) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var vb1 = new Array(
		new RVector(0				, 0),
		new RVector(0				, -7),
		new RVector(-w			, -7),
		new RVector(-w			, -12),
		new RVector(0				, -12),
		new RVector(0				, -20+b/2),
		new RVector(-w+l-h	, -20+b/2),
		new RVector(-w+l-h	, -20+s/2),
		new RVector(-w+l		, -20+s/2),
		new RVector(-w+l		, -20-s/2),
		new RVector(-w+l-h	, -20-s/2),
		new RVector(-w+l-h	, -20-b/2),
		new RVector(0				, -20-b/2),
		new RVector(0				, -28),
		new RVector(-w			, -28),
		new RVector(-w			, -33),
		new RVector(0				, -33),
		new RVector(0				, -54)
	);

	var vb2 = new Array(
		new RVector(24			, -54),
		new RVector(24-w		, -54),
		new RVector(24-w		, -49-w-t/2),
		new RVector(10			, -49-w-t/2),
		new RVector(10			, -49+t/2),
		new RVector(24-w		, -49+t/2),
		new RVector(24-w		, -35),
		new RVector(24-w-1.6, -35),
		new RVector(24-w-1.6, -33),
		new RVector(10			, -41),
		new RVector(10			, -13),
		new RVector(24-w-1.6, -16),
		new RVector(24-w-1.6, -5-t/2),
		new RVector(10			, -5-t/2),
		new RVector(10			, -5+w+t/2),
		new RVector(24-w		, -5+w+t/2),
		new RVector(24-w		, 0),
		new RVector(24			, 0)
	);

	var line1 = new RPolylineEntity(doc, new RPolylineData());
	for(var i=0; i<vb1.length; i++)
		line1.appendVertex(vb1[i]);
	line1.setLayerId(cut);
	op.addObject(line1, false);

	var line2 = new RPolylineEntity(doc, new RPolylineData());
	for(var i=0; i<vb2.length; i++)
		line2.appendVertex(vb2[i]);
	line2.setLayerId(cut);
	op.addObject(line2, false);

	var va1 = new RVector(12, 0);
	var arc1 = new RArcEntity(doc, new RArcData(va1, 12, 0.0, Math.PI, false));
	arc1.setLayerId(cut);
	op.addObject(arc1, false);

	var va2 = new RVector(12, -54);
	var arc2 = new RArcEntity(doc, new RArcData(va2, 12, Math.PI, 0, false));
	arc2.setLayerId(cut);
	op.addObject(arc2, false);

	return op;
}
