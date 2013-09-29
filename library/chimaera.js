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

include("./wrapping.js");
include("./keys.js");
include("./hole_B.js");
include("./base.js");
include("./hole_A.js");
include("./side.js");
include("./rib_A.js");
include("./rib_B.js");
include("./rib_C.js");
include("./rib_D.js");
include("../scripts/helper.js");

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

chimaeraGetOperation = function(di, w, t, b, l, h, s, n) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var Ln = (n+1)*S;
	var L = L1+Ln+M;

	var DD = (12+w/2) * Math.PI;
	DD = Math.ceil(DD/2)*2; //TODO or round or ceil?
	var D = D1+DD+D2+DD+D3;

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
		"rib_D": rib_D
	};
	newRef(doc, di, dict, w, t, b, l, h, s, n);

	var x = 0;
	var y = 0;
	
	// wrapping
	addRef(doc, di, "wrapping", 0, 0, 1, 0);
	addRef(doc, di, "hole_B", M-w/2, -D, 1, 0);
	addRef(doc, di, "hole_B", M-w/2, 0, 1, Math.PI);
	for(var i=0; i<n; i++) {
		addRef(doc, di, "hole_B", L1+16+i*S, -D, 1, 0);
		addRef(doc, di, "hole_B", L1+16+i*S, 0, 1, Math.PI);
	}
	addRef(doc, di, "hole_B", L1+16+(n-1)*S+Lb, -D, 1, 0);
	addRef(doc, di, "hole_B", L1+16+(n-1)*S+Lb, 0, 1, Math.PI);
	addRef(doc, di, "hole_B", L-M+w/2, -D, 1, 0);
	addRef(doc, di, "hole_B", L-M+w/2, 0, 1, Math.PI);
	addRef(doc, di, "keys", L1, -D1-DD, 1, 0);
	y -= 200;

	// base
	addRef(doc, di, "base", x, y, 1, 0);
	addRef(doc, di, "hole_A", M, y-14.5, 1, Math.PI);
	addRef(doc, di, "hole_A", M, y-39.5, 1, Math.PI);
	for(var i=0; i<=n; i++) {
		var X = L1+S/2+i*S;
		addRef(doc, di, "hole_A", X, y-M, 1, Math.PI/2);
		addRef(doc, di, "hole_A", X, y-D2+M, 1, -Math.PI/2);
	}

	var pwd = "/home/hp/omk/hardware/dxf/case/library/";
	var su16 = pwd+"SU-16_Unit-Rev7.dxf";
	var dspf3 = pwd+"DSP-F3_Unit-Rev3.dxf";
	var omkl = pwd+"OMK_label.dxf";
	var oshw = pwd+"OSHW.dxf";
	var chim = pwd+"chimaera_label.dxf";

	for(var i=0; i<n; i++) {
		var X = L1+i*S;
		importRef(doc, di, "SU-16", su16, X, y-M, 1, 0);
	}
	importRef(doc, di, "DSP-F3", dspf3, L1+n*S, y-M, 1, 0);
	y -= 60;

	// side
	addRef(doc, di, "side", x, y, 1, 0);
	y -= 30;
	addRef(doc, di, "side", x, y, 1, 0);
	y -= 50;

	// ribs
	addRef(doc, di, "rib_A", x, y, 1, 0);
	x += 30;
	for(var i=0; i<n; i++) {
		addRef(doc, di, "rib_B", x, y, 1, 0);
		x += 30;
	}
	addRef(doc, di, "rib_C", x, y, 1, 0);
	x += 30;
	addRef(doc, di, "rib_D", x, y, 1, 0);

	// labels
	importRef(doc, di, "OMK_label", omkl, L1, -20, 1, 0);
	importRef(doc, di, "OSHW", oshw, L-20, -20, 1, -Math.PI/2);
	importRef(doc, di, "chimaera_label", chim, L1+n*S+6, -D1-DD-18, 1, 0);

	return op;
}

chimaera.getOperation = function(di, w, t, b, l, h, s, n) {
	return chimaeraGetOperation(di, w, t, b, l, h, s, n);
}
