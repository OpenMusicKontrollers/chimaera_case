/*
 * Copyright (c) Hanspeter Portner (dev@open-music-kontrollers.ch)
 *
 * This documentation describes Open Hardware and is licensed under the
 * CERN OHL v.1.2. You may redistribute and modify this documentation
 * under the terms of the CERN OHL v.1.2. (http://ohwr.org/cernohl). This
 * documentation is distributed WITHOUT ANY EXPRESS OR IMPLIED WARRANTY,
 * INCLUDING OF MERCHANTABILITY, SATISFACTORY QUALITY AND FITNESS FOR A
 * PARTICULAR PURPOSE. Please see the CERN OHL v.1.2 for applicable
 * conditions.
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

	multiline(doc, op, cut, vb1, true);

	return op;
}
