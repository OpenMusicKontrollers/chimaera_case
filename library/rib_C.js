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

function rib_C() {
}

rib_C.prototype.toString = function() {
	print("rib_C.js:", "toString(): ");
}

rib_C.init = function(formWidget) {
	if (!isNull(formWidget)) {
		rib_C.widgets = getWidgets(formWidget);
	}
};

rib_C.generate = function(di, file) {
	return call_widgets(di, rib_C.widgets, rib_C.getOperation);
}

rib_C.generatePreview = function(di, iconSize) {
	return call_default(di, rib_C.getOperation);
}

rib_C.getOperation = function(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var X0 = -C.Mth;
	var X1 = 0;
	var X2 = X0 + C.Nle;
	var X3 = X2 - C.Bhe;

	var vb1 = new Array(
		new RVector(X1			, 0),
		new RVector(X1			, -7),
		new RVector(X0			, -7),
		new RVector(X0			, -12),
		new RVector(X1			, -12),
		new RVector(X1			, -20+C.Ndi/2),
		new RVector(X3			, -20+C.Ndi/2),
		new RVector(X3			, -20+C.Bwi/2),
		new RVector(X2			, -20+C.Bwi/2),
		new RVector(X2			, -20-C.Bwi/2),
		new RVector(X3			, -20-C.Bwi/2),
		new RVector(X3			, -20-C.Ndi/2),
		new RVector(X1			, -20-C.Ndi/2),
		new RVector(X1			, -28),
		new RVector(X0			, -28),
		new RVector(X0			, -33),
		new RVector(X1			, -33),
		new RVector(X1			, -54)
	);

	X0 = 10;
	X1 = C.Hca;
	X2 = X1 - C.Mth;
	X3 = X2 - 1.6;
	var X4 = X3 - 2.5;

	var vb2 = new Array(
		new RVector(X1			, -54),
		new RVector(X2			, -54),
		new RVector(X2			, -49-C.Mth-C.Mto/2),
		new RVector(X0			, -49-C.Mth-C.Mto/2),
		new RVector(X0			, -49+C.Mto/2),
		new RVector(X3			, -49+C.Mto/2),
		new RVector(X3			, -33),
		new RVector(8				, -41),
		new RVector(8				, -10),
		new RVector(X4			, -10), // 3.1 = 1.6+2.5
		new RVector(X4			, -5-C.Mto/2),
		new RVector(X0			, -5-C.Mto/2),
		new RVector(X0			, -5+C.Mth+C.Mto/2),
		new RVector(X2			, -5+C.Mth+C.Mto/2),
		new RVector(X2			, 0),
		new RVector(X1			, 0)
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
	var arc1 = new RArcEntity(doc, new RArcData(va1, C.Hca/2, 0.0, Math.PI, false));
	arc1.setLayerId(cut);
	op.addObject(arc1, false);

	var va2 = new RVector(12, -54);
	var arc2 = new RArcEntity(doc, new RArcData(va2, C.Hca/2, Math.PI, 0, false));
	arc2.setLayerId(cut);
	op.addObject(arc2, false);

	return op;
}
