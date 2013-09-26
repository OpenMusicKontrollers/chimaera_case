include("../scripts/helper.js");

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

wrapping.getOperation = function(di, w, t, b, l, h, s, n) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var Ln = (n+1)*S;
	var L = L1+Ln+M;

	var DD = (12+w/2) * Math.PI;
	DD = Math.ceil(DD/2)*2; //TODO or round or ceil?
	var D = D1+DD+D2+DD+D3;

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
					p1 = [0+dx	, -D1-y];
					p3 = [0+dx	, -D1-DD-D2-DD+y];
				} else {
					p1 = [x+dx	, -D1-y];
					p3 = [x+dx	, -D1-DD-D2-DD+y];
				}
				p2 = [x+dx+15, -D1-y];
				p4 = [x+dx+15, -D1-DD-D2-DD+y];
			} else {
				dx = 10;
				p1 = [x+dx	, -D1-y];
				p3 = [x+dx	, -D1-DD-D2-DD+y];
				if(x+dx+15 > L) {
					p2 = [L				, -D1-y];
					p4 = [L				, -D1-DD-D2-DD+y];
				} else {
					p2 = [x+dx+15	, -D1-y];
					p4 = [x+dx+15	, -D1-DD-D2-DD+y];
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
