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

qApp.applicationName = "Chimaera Case Wizard";
var storage = new RMemoryStorage();
var spatialIndex = new RSpatialIndexNavel();
var doc = new RDocument(storage, spatialIndex);
var di = new RDocumentInterface(doc);

var output = "chimaera.dxf";
var args = QCoreApplication.arguments();
print(args);
output = args[args.length-1];

doc.setUnit(RS.Millimeter);
doc.setVariable("PageSettings/PaperWidth", 900);
doc.setVariable("PageSettings/PaperHeight", 600);
doc.setVariable("PageSettings/OffsetX", -5);
doc.setVariable("PageSettings/OffsetY", -595);

// default Configuration
var C = {
	Rev : 4,
	Pre : 0,		// preview?
	Key : 1,		// neutral

	Lle : 30,		// length left
	Lsi : 5,		// length side
	Lsu : 80,		// length sensor unit
	Lho : 5,		// length of hole_B
	Hca : 24,		// height case
	Lri : 69,		// length right
	Wto : 34,		// width top
	Wce : 54,		// width center
	Wbo : 20,		// width bottom
	Who : 8,		// width to hole
	Wsu : 30,		// width sensor unit

	Mth : 2.5,	// material thickness
	Mto : 0.1,	// material tolerance
	Ndi : 3.0,	// nut diameter
	Nle : 6.0,	// nut length
	Bhe : 1.7,	// bolt height
	Bwi : 5.4,	// bolt width
	Nsu : 6,		// number of sensor units

	CE  : 1,		// show CE logo
	FCC : 1			// show FCC logo
};

// manually overwrite Configuration
//C.Rev = 4;	// board revision

// automatically overwrite Configuration with command line arguments
for(var i=4; i<args.length-1; i+=2) {
	var k = args[i];
	var v = args[i+1];
	if(C[k] !== undefined) {
		C[k] = v*1.0; // number conversion
	} else {
		print("parameter "+k+" undefined");
	}
}

if(C.Pre)
	include("./preview.js");
else
	include("./chimaera.js");

var op = chimaera(di, C);
op.apply(doc);

if(C.Pre) {
	include("scripts/Pro/ImportExport/SvgExporter/SvgExporterPG.js");
	var exporter = new SvgExporterPG(doc, {"scale": "1:1"});
	exporter.exportFile(output);
}
else
	di.exportFile(output);
