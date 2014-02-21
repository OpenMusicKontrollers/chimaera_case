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

include("./helper.js");

function side(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var Ln = (C.Nsu+1)*C.Lsu;
	var L = C.Lle+Ln+C.Lsi;

	var I = 10; // interlock overlap
	var H = C.Hca;
	var h = H-I;

	// fill array
	var vb1 = new Array();
	vb1.push([C.Lsi, 0]);
	vb1.push([C.Lsi, -I]);
	vb1.push([0, -I]);
	vb1.push([0, -H+C.Mth]);
	for(var i=0; i<=C.Nsu; i++) {
		var x = C.Lle+C.Lsu/2+i*C.Lsu
		vb1.push([x-C.Lho/2	, -H+C.Mth])
		vb1.push([x-C.Lho/2	, -H])
		vb1.push([x+C.Lho/2	, -H])
		vb1.push([x+C.Lho/2	, -H+C.Mth])
	}
	vb1.push([L, -H+C.Mth]);
	vb1.push([L, -I]);
	vb1.push([L-C.Lsi, -I]);
	vb1.push([L-C.Lsi, 0]);
	multiline(doc, op, cut, vb1, false);

	var x = L - C.Lri - C.Nsu*C.Lsu;
	for(var i=1; i<=C.Nsu+1; i++) {
		var vb2 = new Array();
		vb2.push([x-C.Mth/2-C.Mto/2, 0]);
		vb2.push([x-C.Mth/2-C.Mto/2, -I]);
		vb2.push([x+C.Mth/2+C.Mto/2, -I]);
		vb2.push([x+C.Mth/2+C.Mto/2, 0]);
		multiline(doc, op, cut, vb2, false);
		if(i === C.Nsu)
			x += C.Lri;
		else
			x += C.Lsu;
	}

	return op;
}
