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

function wrapping(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var Ln = (C.Nsu+1)*C.Lsu;
	var L = C.Lle+Ln+C.Lsi;

	var DD = (C.Hca/2+C.Mth/2) * Math.PI;
	DD = Math.ceil(DD/2)*2; //TODO or round or ceil?
	var D = C.Wto+DD+C.Wce+DD+C.Wbo;

	var Da = C.Wto;
	var Db = C.Wto+DD+C.Wce+DD;

	// cutting
	var vb1 = new Array(
		[0, 0],
		[0, -D],
		[L, -D],
		[L, 0]
	);
	multiline(doc, op, cut, vb1, true);

	var lines = new Array();

	for(var x=-5; x<L; x+=20) {
		for(var y=0; y<=DD; y+=2) {
			var p1, p2, p3, p4, dx;

			if(y%4 === 0)	{
				dx = 0;
				if(x < 0)	{
					p1 = [0+dx	, -Da-y];
					p3 = [0+dx	, -Db+y];
				} else {
					p1 = [x+dx	, -Da-y];
					p3 = [x+dx	, -Db+y];
				}
				p2 = [x+dx+15, -Da-y];
				p4 = [x+dx+15, -Db+y];
			} else {
				dx = 10;
				p1 = [x+dx	, -Da-y];
				p3 = [x+dx	, -Db+y];
				if(x+dx+15 > L) {
					p2 = [L				, -Da-y];
					p4 = [L				, -Db+y];
				} else {
					p2 = [x+dx+15	, -Da-y];
					p4 = [x+dx+15	, -Db+y];
				}
			}

			lines.push([p1, p2]);
			lines.push([p3, p4]);
		}
	}

	for(var i=0; i<lines.length; i++) {
		var l1 = new RLineEntity(doc, new RLineData(
			new RVector(lines[i][0][0], lines[i][0][1]),
			new RVector(lines[i][1][0], lines[i][1][1])));
		l1.setLayerId(cut);
		op.addObject(l1, false);
	}

	return op;
}
