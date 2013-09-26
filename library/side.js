include("../scripts/helper.js");

function side() {
}

side.prototype.toString = function() {
	print("side.js:", "toString(): ");
}

side.init = function(formWidget) {
	if (!isNull(formWidget)) {
		side.widgets = getWidgets(formWidget);
	}
};

side.generate = function(di, file) {
	return call_widgets(di, side.widgets, side.getOperation);
}

side.generatePreview = function(di, iconSize) {
	return call_default(di, side.getOperation);
}

side.getOperation = function(di, w, t, b, l, h, s, n) {
	var doc = di.getDocument();
	var op = new RAddObjectsOperation();
	var cut = newLayer(doc, di, "cut", 255, 0, 0);

	var Ln = (n+1)*S;
	var L = L1+Ln+M;

	var h = H-10;

	// fill array
	var vb1 = new Array();

	vb1.push([0, -w])

	for(var i=0; i<=n; i++) {
		var x = L1+S/2+i*S
		vb1.push([x-2.5	, -w])
		vb1.push([x-2.5	, 0])
		vb1.push([x+2.5	, 0])
		vb1.push([x+2.5	, -w])
	}

	vb1.push([L	, -w])
	vb1.push([L	, -h])

	vb1.push([L-M-t/2, -h]);
	vb1.push([L-M-t/2, -H]);

	var x = L;
	for(var i=1; i<=n+1; i++) {
		var x;
		if(i === 2)
			x -= Lb;
		else
			x -= S;

		vb1.push([x+w/2+t/2, -H]);
		vb1.push([x+w/2+t/2, -h]);
		vb1.push([x-w/2-t/2, -h]);
		vb1.push([x-w/2-t/2, -H]);
	}

	vb1.push([M+t/2, -H]);
	vb1.push([M+t/2, -h]);
	vb1.push([0, -h]);

	// draw polyline
	var line1 = new RPolylineEntity(doc, new RPolylineData());
	for(var i=0; i<vb1.length; i++)
		line1.appendVertex(new RVector(vb1[i][0], vb1[i][1]));
	line1.setClosed(true);
	line1.setLayerId(cut);
	op.addObject(line1, false);

	return op;
}
