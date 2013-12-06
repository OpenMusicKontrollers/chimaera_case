/*
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
include("../scripts/chimaera_helper.js");

function chimaera() {
}

chimaera.prototype.toString = function() {
	print("chimaera.js:", "toString(): ");
}

chimaera.init = function(formWidget) {
	if (!isNull(formWidget)) {
		chimaera.widgets = getWidgets(formWidget);
	}
};

chimaera.generate = function(di, file) {
	return call_widgets(di, chimaera.widgets, chimaera.getOperation);
}

chimaera.generatePreview = function(di, iconSize) {
	return call_default(di, chimaera.getOperation);
}

chimaeraGetOperation = function(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

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
		"rib_D_Rev4": rib_D_Rev4
	};
	newRef(doc, di, dict, C);

	var x = 0;
	var y = 0;
	
	// wrapping
	addRef(doc, di, "wrapping", 0, 0, 1, 0);
	addRef(doc, di, "hole_B", C.Lsi-C.Mth/2, -D, 1, 0);
	addRef(doc, di, "hole_B", C.Lsi-C.Mth/2, 0, 1, Math.PI);
	for(var i=0; i<C.Nsu; i++) {
		addRef(doc, di, "hole_B", C.Lle+16+i*C.Lsu, -D, 1, 0);
		addRef(doc, di, "hole_B", C.Lle+16+i*C.Lsu, 0, 1, Math.PI);
	}
	addRef(doc, di, "hole_B", C.Lle+16+(C.Nsu-1)*C.Lsu+C.Lri, -D, 1, 0);
	addRef(doc, di, "hole_B", C.Lle+16+(C.Nsu-1)*C.Lsu+C.Lri, 0, 1, Math.PI);
	addRef(doc, di, "hole_B", L-C.Lsi+C.Mth/2, -D, 1, 0);
	addRef(doc, di, "hole_B", L-C.Lsi+C.Mth/2, 0, 1, Math.PI);
	addRef(doc, di, "keys", C.Lle, -C.Wto-DD, 1, 0);
	y -= 200;

	// base
	addRef(doc, di, "base", x, y, 1, 0);
	addRef(doc, di, "hole_A", C.Lsi, y-14.5, 1, Math.PI);
	addRef(doc, di, "hole_A", C.Lsi, y-39.5, 1, Math.PI);
	for(var i=0; i<=C.Nsu; i++) {
		var X = C.Lle+C.Lsu/2+i*C.Lsu;
		addRef(doc, di, "hole_A", X, y-C.Lsi, 1, Math.PI/2);
		addRef(doc, di, "hole_A", X, y-C.Wce+C.Lsi, 1, -Math.PI/2);
	}

	var pwd = "/home/hp/omk/hardware/dxf/case/library/";
	var su16 = pwd+"SU-16_Unit-Rev7.dxf";
	var dspf3;
	var ribl;
	switch(C.Rev) {
		case 3:
			dspf3 = pwd+"DSP-F3_Unit-Rev3.dxf";
			ribl = pwd+"rib_D_Rev3_label.dxf";
			break;
		case 4:
			dspf3 = pwd+"DSP-F3_Unit-Rev4.dxf";
			ribl = pwd+"rib_D_Rev4_label.dxf";
			break;
	}
	var omkl = pwd+"OMK_label.dxf";
	var oshw = pwd+"OSHW.dxf";
	var chim = pwd+"chimaera_label.dxf";

	for(var i=0; i<C.Nsu; i++) {
		var X = C.Lle+i*C.Lsu;
		importRef(doc, di, "SU-16", su16, X, y-C.Lsi, 1, 0);
	}
	importRef(doc, di, "DSP-F3", dspf3, C.Lle+C.Nsu*C.Lsu, y-C.Lsi, 1, 0);
	y -= 60;

	// side
	addRef(doc, di, "side", x, y, 1, 0);
	y -= 30;
	addRef(doc, di, "side", x, y, 1, 0);
	y -= 50;

	// ribs
	addRef(doc, di, "rib_A", x, y, 1, 0);
	x += 30;
	for(var i=0; i<C.Nsu; i++) {
		addRef(doc, di, "rib_B", x, y, 1, 0);
		x += 30;
	}
	addRef(doc, di, "rib_C", x, y, 1, 0);
	x += 30;
	switch(C.Rev) {
		case 3:
			addRef(doc, di, "rib_D_Rev3", x, y, 1, 0);
			break;
		case 4:
			addRef(doc, di, "rib_D_Rev4", x, y, 1, 0);
			break;
	}

	// labels
	importRef(doc, di, "OMK_label", omkl, C.Lle, -20, 1, 0);
	importRef(doc, di, "OSHW", oshw, L-20, -20, 1, -Math.PI/2);
	importRef(doc, di, "chimaera_label", chim, C.Lle+C.Nsu*C.Lsu+6, -C.Wto-DD-18, 1, 0);
	switch(C.Rev) {
		case 3:
			importRef(doc, di, "rib_D_Rev3_label", ribl, x+C.Hca/2, y, 1, 0);
			break;
		case 4:
			importRef(doc, di, "rib_D_Rev4_label", ribl, x+C.Hca/2, y-C.Wce, 1, 0);
			break;
	}

	return op;
}

chimaera.getOperation = function(di, C) {
	return chimaeraGetOperation(di, C);
}
