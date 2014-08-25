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

	var u = 18; // sensors per half-octave
	var m = 16; // sensors per sensor unit
	var N = C.Nsu * m;
	var a = N.mod(u) / 2;
	var b = N - a*2;

	var i1 = 25;
	var i2 = 7.5;
	var x = 0; // left border of sensor area

	var lines = new Array(
		[ [0, -C.Wce/2 -i2], [C.Nsu*C.Lsu, -C.Wce/2 -i2] ],
		[ [0, -C.Wce/2 +i2], [C.Nsu*C.Lsu, -C.Wce/2 +i2] ],
		[ [a%3*5, -C.Wce/2 -i1], [(N-a%3)*5, -C.Wce/2 -i1] ],
		[ [a%3*5, -C.Wce/2 +i1], [(N-a%3)*5, -C.Wce/2 +i1] ]
	);

	function plot(rem) {
		if(rem%3 == 0)
			lines.push([ [x, -C.Wce/2 + i1]				, [x, -C.Wce/2 - i1] ]);
		else
			lines.push([ [x, -C.Wce/2 + i2]				, [x, -C.Wce/2 - i2] ]);
	}

	for(var i=0; i<a; i++, x+=5) {
		var rem = (u-a+i)%u;
		plot(rem);
	}
	
	for(var i=0; i<b; i++, x+=5) {
		var rem = i%u;
		plot(rem);
	}

	for(var i=0; i<=a; i++, x+=5) {
		var rem = i%u;
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
