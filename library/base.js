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

include("../scripts/chimaera_helper.js");

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

base.getOperation = function(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var Ln = (C.Nsu+1)*C.Lsu;
	var Ld = C.Lle + C.Nsu*C.Lsu;
	var L = C.Lle+Ln+C.Lsi;

	var vb1 = new Array(
		[0, 0],
		[0, -C.Wce],
		[L, -C.Wce],
		[L, 0]
	);
	var line1 = new RPolylineEntity(doc, new RPolylineData());
	for(var i=0; i<vb1.length; i++)
		line1.appendVertex(new RVector(vb1[i][0], vb1[i][1]));
	line1.setClosed(true);
	line1.setLayerId(cut);
	op.addObject(line1, false);

	var vb2 = new Array(
		[L-C.Lsi-C.Mto/2				, -12],
		[L-C.Lsi-C.Mto/2				, -44],
		[L-C.Lsi+C.Mth+C.Mto/2	, -44],
		[L-C.Lsi+C.Mth+C.Mto/2	, -12]
	);
	var line2 = new RPolylineEntity(doc, new RPolylineData());
	for(var i=0; i<vb2.length; i++)
		line2.appendVertex(new RVector(vb2[i][0], vb2[i][1]));
	line2.setClosed(true);
	line2.setLayerId(cut);
	op.addObject(line2, false);

	var vb3 = new Array(
		[Ld				, 0],
		[Ld				, -C.Wce/2+5],
		[Ld+4			, -C.Wce/2+7],
		[Ld+4			, -C.Wce/2-7],
		[Ld				, -C.Wce/2-5],
		[Ld				, -C.Wce]
	);
	var line3 = new RPolylineEntity(doc, new RPolylineData());
	for(var i=0; i<vb3.length; i++)
		line3.appendVertex(new RVector(vb3[i][0], vb3[i][1]));
	line3.setLayerId(cut);
	op.addObject(line3, false);

	return op;
}
