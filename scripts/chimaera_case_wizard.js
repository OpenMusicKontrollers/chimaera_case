/*
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
output = args[args.length-1];

doc.setUnit(RS.Millimeter);
doc.setVariable("PageSettings/PaperWidth", 900);
doc.setVariable("PageSettings/PaperHeight", 600);
doc.setVariable("PageSettings/OffsetX", -20);
doc.setVariable("PageSettings/OffsetY", -580);

include("../library/chimaera.js");

var C = defaultC();
C.Rev = 4;	// board revision
//C.Lle = 5;	// length left
C.Nsu = 9;	// number of sensor units

var op = chimaeraGetOperation(di, C);
op.apply(doc);

di.exportFile(output, "DXF 2013");
