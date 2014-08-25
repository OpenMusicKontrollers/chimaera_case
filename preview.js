/*
 * Copyright (c) 2014 Hanspeter Portner (dev@open-music-kontrollers.ch)
 *
 * This documentation describes Open Hardware and is licensed under the
 * CERN OHL v.1.2. You may redistribute and modify this documentation
 * under the terms of the CERN OHL v.1.2. (http://ohwr.org/cernohl). This
 * documentation is distributed WITHOUT ANY EXPRESS OR IMPLIED WARRANTY,
 * INCLUDING OF MERCHANTABILITY, SATISFACTORY QUALITY AND FITNESS FOR A
 * PARTICULAR PURPOSE. Please see the CERN OHL v.1.2 for applicable
 * conditions.
 */

switch(C.Key) {
	case 0:
		include("./keys_simple.js");
		break;
	case 1:
		include("./keys_neutral.js");
		break;
	case 2:
		include("./keys_piano.js");
		break;
}
include("./wrapping_top.js");

include("./helper.js");

function chimaera(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);
	var eng = newLayer(doc, di, "engrave", 0, 255, 0);

	var Ln = (C.Nsu+1)*C.Lsu;
	var L = C.Lle+Ln+C.Lsi;

	var DD = (C.Hca/2+C.Mth/2) * Math.PI;
	DD = Math.ceil(DD/2)*2; //TODO or round or ceil?
	var D = C.Wto+DD+C.Wce+DD+C.Wbo;

	// create blocks
	var dict = {
		"wrapping": wrapping,
		"keys": keys
	};
	newRef(doc, di, dict, C);

	var x = 0;
	var y = 0;
	
	// wrapping
	addRef(doc, di, "wrapping", 0, 0, 1, 0);
	addRef(doc, di, "keys", C.Lle, -C.Wto-DD, 1, 0);
	y -= getBox(doc, "wrapping").getHeight();

	var pwd = getAbsolutePathForArg("./");
	var omk = pwd+"OMK.dxf";

	y = -C.Wto - DD - C.Wce/2;
	importRef(doc, di, "OMK", omk, L-C.Lsi-15, y, 1, Math.PI/2);

	return op;
}
