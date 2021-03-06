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

include("scripts/Pro/ImportExport/SvgExporter/SvgExporterPG.js");

qApp.applicationName = "Chimaera Ponoko Exporter";
var storage = new RMemoryStorage();
var spatialIndex = new RSpatialIndexNavel();
var doc = new RDocument(storage, spatialIndex);
var di = new RDocumentInterface(doc);

var input;
var output;
var args = QCoreApplication.arguments();
print(args);
input = args[args.length-2];
output = args[args.length-1];

di.importFile(input);

var op = new RModifyObjectsOperation();
var layerids = doc.queryAllLayers();
for(var i=0; i<layerids.length; i++) {
	var layer = doc.queryLayer(layerids[i]);

	if(layer.getName() === "cut") {
		layer.setColor(new RColor("#0000ff"));
		op.addObject(layer);
	} else if(layer.getName() === "engrave") {
		layer.setColor(new RColor("#ff0000")); // heavy engraving
		//layer.setColor(new RColor("#00ff00")); // medium engraving
		//layer.setColor(new RColor("#ff00ff")); // light engraving
		op.addObject(layer);
	} else if(layer.getName() === "PCB") {
		layer.setColor(new RColor("#ffff00"));
		layer.setFrozen(true); // hide
		op.addObject(layer);
	}
}
di.applyOperation(op);

var exporter = new SvgExporterPG(doc, {"scale": "1:1"});
exporter.exportFile(output);
