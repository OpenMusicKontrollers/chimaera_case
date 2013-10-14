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

include("../scripts/chimaera_helper.js")

function hole_B() {
}

hole_B.prototype.toString = function() {
	print("hole_B.js:", "toString(): ");
}

hole_B.init = function(formWidget) {
	if (!isNull(formWidget)) {
		hole_B.widgets = getWidgets(formWidget);
	}
};

hole_B.generate = function(di, file) {
	return call_widgets(di, hole_B.widgets, hole_B.getOperation);
}

hole_B.generatePreview = function(di, iconSize) {
	return call_default(di, hole_B.getOperation);
}

hole_B.getOperation = function(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var vb1 = new Array(
		new RVector(-C.Mth/2-C.Mto/2	, 13),
		new RVector(-C.Mth/2-C.Mto/2	, 8),
		new RVector(C.Mth/2+C.Mto/2		, 8),
		new RVector(C.Mth/2+C.Mto/2		, 13)
	);

	var line1 = new RPolylineEntity(doc, new RPolylineData());
	for(var i=0; i<vb1.length; i++)
		line1.appendVertex(vb1[i]);
	line1.setClosed(true);
	line1.setLayerId(cut);
	op.addObject(line1, false);

	var va1 = new RVector(0, 0);
	var arc1 = new RArcEntity(doc, new RArcData(va1, C.Ndi/2, 0.0, Math.PI, false));
	arc1.setLayerId(cut);
	op.addObject(arc1, false);

	return op;
}
