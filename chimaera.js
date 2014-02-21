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

include("./wrapping.js");
include("./keys.js");
include("./hole_B.js");
include("./base.js");
include("./hole_A.js");
include("./side.js");
include("./rib_A.js");
include("./rib_B.js");
include("./rib_C.js");
include("./rib_D_Rev3.js");
include("./rib_D_Rev4.js");
include("./label_omk.js");
include("./label_chim.js");

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
		"hole_B": hole_B,
		"keys": keys,

		"base": base,
		"hole_A": hole_A,

		"side": side,

		"rib_A": rib_A,
		"rib_B": rib_B,
		"rib_C": rib_C,
		"rib_D_Rev3": rib_D_Rev3,
		"rib_D_Rev4": rib_D_Rev4,
		"label_omk": label_omk,
		"label_chim": label_chim
	};
	newRef(doc, di, dict, C);

	var x = 0;
	var y = 0;
	
	// wrapping
	addRef(doc, di, "wrapping", 0, 0, 1, 0);
	addRef(doc, di, "hole_B", C.Lsi-C.Mth/2-C.Mto/2, -D, 1, 0);
	addRef(doc, di, "hole_B", C.Lsi-C.Mth/2-C.Mto/2, 0, 1, Math.PI);
	for(var i=0; i<C.Nsu; i++) {
		addRef(doc, di, "hole_B", C.Lle+16+i*C.Lsu, -D, 1, 0); //TODO 16
		addRef(doc, di, "hole_B", C.Lle+16+i*C.Lsu, 0, 1, Math.PI); //TODO 16
	}
	addRef(doc, di, "hole_B", C.Lle+16+(C.Nsu-1)*C.Lsu+C.Lri, -D, 1, 0);
	addRef(doc, di, "hole_B", C.Lle+16+(C.Nsu-1)*C.Lsu+C.Lri, 0, 1, Math.PI);
	addRef(doc, di, "hole_B", L-C.Lsi+C.Mth/2+C.Mto/2, -D, 1, 0);
	addRef(doc, di, "hole_B", L-C.Lsi+C.Mth/2+C.Mto/2, 0, 1, Math.PI);
	addRef(doc, di, "keys", C.Lle, -C.Wto-DD, 1, 0);
	y -= getBox(doc, "wrapping").getHeight();

	// base
	addRef(doc, di, "base", x, y, 1, 0);
	addRef(doc, di, "hole_A", C.Lsi, y-(C.Wbo-C.Who+C.Lho/2), 1, Math.PI);
	addRef(doc, di, "hole_A", C.Lsi, y-(C.Wce-(C.Wbo-C.Who)-C.Lho/2), 1, Math.PI);
	for(var i=0; i<=C.Nsu; i++) {
		var X = C.Lle+C.Lsu/2+i*C.Lsu;
		addRef(doc, di, "hole_A", X, y-C.Lsi, 1, Math.PI/2);
		addRef(doc, di, "hole_A", X, y-C.Wce+C.Lsi, 1, -Math.PI/2);
	}

	var pwd = getAbsolutePathForArg("./");
	var su16 = pwd+"SU-16_Unit-Rev7.dxf";
	var dspf3 = pwd+"DSP-F3_Unit-Rev"+C.Rev+".dxf";
	var oshw = pwd+"OSHW.dxf";
	var omk = pwd+"OMK.dxf";

	for(var i=0; i<C.Nsu; i++) {
		var X = C.Lle+i*C.Lsu;
		importRef(doc, di, "SU-16", su16, X, y-C.Lsi, 1, 0);
	}
	importRef(doc, di, "DSP-F3", dspf3, C.Lle+C.Nsu*C.Lsu, y-C.Lsi, 1, 0);
	y -= getBox(doc, "base").getHeight();

	// side
	addRef(doc, di, "side", x, y, 1, 0);
	y -= getBox(doc, "side").getHeight() - C.Mth;
	addRef(doc, di, "side", x, y, 1, 0);
	y -= getBox(doc, "side").getHeight();
	y -= getBox(doc, "rib_A").getWidth();

	// ribs
	x = C.Hca/2;
	addRef(doc, di, "rib_A", x, y, 1, Math.PI/2);
	x += C.Hca + C.Wce + 5;
	var ovr = false;
	for(var i=0; i<C.Nsu; i++) {
		addRef(doc, di, "rib_B", x, y, 1, Math.PI/2);
		x += C.Hca + C.Wce + 5;
		if( !ovr && (i >= C.Nsu/2) ) {
			ovr = true;
			x = C.Hca/2;
			y -= getBox(doc, "rib_A").getWidth();
		}
	}
	addRef(doc, di, "rib_C", x, y, 1, Math.PI/2);
	x += C.Hca + C.Wce + 5;
	addRef(doc, di, "rib_D_Rev"+C.Rev, x, y, 1, Math.PI/2);

	// labels
	y = -C.Who - C.Lho - (C.Wto - C.Who - C.Lho)/2;
	importRef(doc, di, "OSHW", oshw, L-C.Lsi-15, y, 1, 0);
	addRef(doc, di, "label_omk", C.Lle, y, 1, 0);
	addRef(doc, di, "label_chim", C.Lle+C.Lsu, y, 1, 0);

	y = -C.Wto - DD - C.Wce/2;
	importRef(doc, di, "OMK", omk, L-C.Lsi-15, y, 1, Math.PI/2);

	return op;
}
