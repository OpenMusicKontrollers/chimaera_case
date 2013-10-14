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

function wrapping() {
}

wrapping.prototype.toString = function() {
	print("wrapping.js:", "toString(): ");
}

wrapping.init = function(formWidget) {
	if (!isNull(formWidget)) {
		wrapping.widgets = getWidgets(formWidget);
	}
};

wrapping.generate = function(di, file) {
	return call_widgets(di, wrapping.widgets, wrapping.getOperation);
}

wrapping.generatePreview = function(di, iconSize) {
	return call_default(di, wrapping.getOperation);
}

wrapping.getOperation = function(di, C) {
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
	var line1 = new RPolylineEntity(doc, new RPolylineData());
	for(var i=0; i<vb1.length; i++)
		line1.appendVertex(new RVector(vb1[i][0], vb1[i][1]));
	line1.setClosed(true);
	line1.setLayerId(cut);
	op.addObject(line1, false);

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
