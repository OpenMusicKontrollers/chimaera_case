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

function rib_A() {
}

rib_A.prototype.toString = function() {
	print("rib_A.js:", "toString(): ");
}

rib_A.init = function(formWidget) {
	if (!isNull(formWidget)) {
		rib_A.widgets = getWidgets(formWidget);
	}
};

rib_A.generate = function(di, file) {
	return call_widgets(di, rib_A.widgets, rib_A.getOperation);
}

rib_A.generatePreview = function(di, iconSize) {
	return call_default(di, rib_A.getOperation);
}

rib_A.getOperation = function(di, w, t, b, l, h, s, n) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var vb1 = new Array(
		new RVector(0				, -0),
		new RVector(w				, -0),
		new RVector(w				, -5+w+t/2),
		new RVector(14			, -5+w+t/2),
		new RVector(14			, -5-t/2),
		new RVector(w				, -5-t/2),
		new RVector(w				, -12),
		new RVector(0				, -12),
		new RVector(0				, -17),
		new RVector(w				, -17),
		new RVector(w				, -37),
		new RVector(0				, -37),
		new RVector(0				, -42),
		new RVector(w				, -42),
		new RVector(w				, -49+t/2),
		new RVector(14			, -49+t/2),
		new RVector(14			, -49-w-t/2),
		new RVector(w				, -49-w-t/2),
		new RVector(w				, -54),
		new RVector(0				, -54)
	);

	var vb2 = new Array(
		new RVector(24			, -54),
		new RVector(24			, -33),
		new RVector(24+w		, -33),
		new RVector(24+w		, -28),
		new RVector(24			, -28),
		new RVector(24			, -20-b/2),
		new RVector(24+w-l+h, -20-b/2),
		new RVector(24+w-l+h, -20-s/2),
		new RVector(24+w-l	, -20-s/2),
		new RVector(24+w-l	, -20+s/2),
		new RVector(24+w-l+h, -20+s/2),
		new RVector(24+w-l+h, -20+b/2),
		new RVector(24			, -20+b/2),
		new RVector(24			, -12),
		new RVector(24+w		, -12),
		new RVector(24+w		, -7),
		new RVector(24			, -7),
		new RVector(24			, -0)
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
