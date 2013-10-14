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

function side() {
}

side.prototype.toString = function() {
	print("side.js:", "toString(): ");
}

side.init = function(formWidget) {
	if (!isNull(formWidget)) {
		side.widgets = getWidgets(formWidget);
	}
};

side.generate = function(di, file) {
	return call_widgets(di, side.widgets, side.getOperation);
}

side.generatePreview = function(di, iconSize) {
	return call_default(di, side.getOperation);
}

side.getOperation = function(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var Ln = (C.Nsu+1)*C.Lsu;
	var L = C.Lle+Ln+C.Lsi;

	var H = C.Hca;
	var h = H-10;

	// fill array
	var vb1 = new Array();

	vb1.push([0, -C.Mth])

	for(var i=0; i<=C.Nsu; i++) {
		var x = C.Lle+C.Lsu/2+i*C.Lsu
		vb1.push([x-2.5	, -C.Mth])
		vb1.push([x-2.5	, 0])
		vb1.push([x+2.5	, 0])
		vb1.push([x+2.5	, -C.Mth])
	}

	vb1.push([L	, -C.Mth])
	vb1.push([L	, -h])

	vb1.push([L-C.Lsi-C.Mto/2, -h]);
	vb1.push([L-C.Lsi-C.Mto/2, -H]);

	var x = L;
	for(var i=1; i<=C.Nsu+1; i++) {
		var x;
		if(i === 2)
			x -= C.Lri;
		else
			x -= C.Lsu;

		vb1.push([x+C.Mth/2+C.Mto/2, -H]);
		vb1.push([x+C.Mth/2+C.Mto/2, -h]);
		vb1.push([x-C.Mth/2-C.Mto/2, -h]);
		vb1.push([x-C.Mth/2-C.Mto/2, -H]);
	}

	vb1.push([C.Lsi+C.Mto/2	, -H]);
	vb1.push([C.Lsi+C.Mto/2	, -h]);
	vb1.push([0							, -h]);

	// draw polyline
	var line1 = new RPolylineEntity(doc, new RPolylineData());
	for(var i=0; i<vb1.length; i++)
		line1.appendVertex(new RVector(vb1[i][0], vb1[i][1]));
	line1.setClosed(true);
	line1.setLayerId(cut);
	op.addObject(line1, false);

	return op;
}
