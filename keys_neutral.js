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

include("./helper.js");

function keys(di, C) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var eng = newLayer(doc, di, "engrave", 0, 255, 0);

	var lines = new Array(
		[ [0, -C.Wce/2], [C.Nsu*C.Lsu, -C.Wce/2] ]
	);

	var u = 18; // sensors per half-octave
	var m = 16; // sensors per sensor unit
	var N = C.Nsu * m;
	var a = N%u / 2;
	var b = N - a*2;

	var i1 = 2.5;
	var i18 = i1 / Math.sin(Math.PI/32);
	var i9 = i1*2 + i1 / Math.sin(Math.PI/16);
	var i6 = i9 * Math.sin(Math.PI/6*2);
	var i3 = i9 * Math.sin(Math.PI/6*1);
	
	var x = 2.5; // center of sensor

	function plot(rem) {
		if(rem == 0)
			lines.push([ [x, -C.Wce/2 + i18]			, [x, -C.Wce/2 - i18] ]);
		else if(rem/3 == 1)
			lines.push([ [x, -C.Wce/2 + i3]				, [x, -C.Wce/2 - i3] ]);
		else if(rem/6 == 1)
			lines.push([ [x, -C.Wce/2 + i6]				, [x, -C.Wce/2 - i6] ]);
		else if(rem/9 == 1)
			lines.push([ [x, -C.Wce/2 + i9]				, [x, -C.Wce/2 - i9] ]);
		else if(rem/12 == 1)
			lines.push([ [x, -C.Wce/2 + i6]				, [x, -C.Wce/2 - i6] ]);
		else if(rem/15 == 1)
			lines.push([ [x, -C.Wce/2 + i3]				, [x, -C.Wce/2 - i3] ]);
		else
			lines.push([ [x, -C.Wce/2 + i1]				, [x, -C.Wce/2 - i1] ]);

		if( (rem == -1) || (rem == 17) ) {
			var va1 = new RVector(x, -C.Wce/2 - 23);
			var arc1 = new RCircleEntity(doc, new RCircleData(va1, 2));
			arc1.setLayerId(eng);
			op.addObject(arc1, false);
		}
		if(rem == 1) {
			var va2 = new RVector(x, -C.Wce/2 + 23);
			var arc2 = new RCircleEntity(doc, new RCircleData(va2, 2));
			arc2.setLayerId(eng);
			op.addObject(arc2, false);
		}
	}

	for(var i=0; i<a; i++, x+=5) {
		var rem = (u-a+i-1)%u;
		plot(rem);
	}
	
	for(var i=0; i<b; i++, x+=5) {
		var rem = (i-1)%u;
		plot(rem);
	}

	for(var i=0; i<a; i++, x+=5) {
		var rem = (i-1)%u;
		plot(rem);
	}

	for(var i=0; i<lines.length; i++) {
		var l1 = new RLineEntity(doc, new RLineData(
			new RVector(lines[i][0][0], lines[i][0][1]),
			new RVector(lines[i][1][0], lines[i][1][1])));
		l1.setLayerId(eng);
		op.addObject(l1, false);
	}

	return op;
}
