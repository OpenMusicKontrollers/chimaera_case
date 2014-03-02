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

include("./helper.js")

function rib_head(di, C) {
	var doc = di.getDocument();

	var X0 = -C.Mth;
	var X1 = 0;
	var X2 = X0 + C.Nle;
	var X3 = X2 - C.Bhe;

	var Y0 = C.Wbo - C.Who - C.Lho;
	var Y1 = Y0 + C.Lho;
	var Y2 = Y1 + C.Who;
	var Y3 = Y2 + C.Who;
	var Y4 = Y3 + C.Lho;

	var vb1 = new Array(
		[X1			, 0],
		[X1			, -Y0],
		[X0			, -Y0],
		[X0			, -Y1],
		[X1			, -Y1],
		[X1			, -Y2+C.Ndi/2],
		[X3			, -Y2+C.Ndi/2],
		[X3			, -Y2+C.Bwi/2],
		[X2			, -Y2+C.Bwi/2],
		[X2			, -Y2-C.Bwi/2],
		[X3			, -Y2-C.Bwi/2],
		[X3			, -Y2-C.Ndi/2],
		[X1			, -Y2-C.Ndi/2],
		[X1			, -Y3],
		[X0			, -Y3],
		[X0			, -Y4],
		[X1			, -Y4],
		[X1			, -C.Wce]
	);

	return vb1;
}

function rib_arc_top(di, C) {
	var doc = di.getDocument();
	var va1 = new RVector(C.Hca/2, 0);
	var arc1 = new RArcEntity(doc, new RArcData(va1, C.Hca/2, 0.0, Math.PI, false));
	return arc1;
}

function rib_arc_bottom(di, C) {
	var doc = di.getDocument();
	var va2 = new RVector(C.Hca/2, -C.Wce);
	var arc2 = new RArcEntity(doc, new RArcData(va2, C.Hca/2, Math.PI, 0, false));
	return arc2;
}
