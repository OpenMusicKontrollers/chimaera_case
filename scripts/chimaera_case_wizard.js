qApp.applicationName = "Chimaera Case Wizard";
var storage = new RMemoryStorage();
var spatialIndex = new RSpatialIndexNavel();
var document = new RDocument(storage, spatialIndex);
var di = new RDocumentInterface(document);

include("../library/chimaera.js");

var w = 2.5;
var t = 0.1;
var b = 3.0;
var l = 6.0;
var h = 1.8;
var s = 5.5;
var n = 6;

var op = chimaeraGetOperation(di, w, t, b, l, h, s, n);
op.apply(document);

di.exportFile("/home/hp/example.dxf", "DXF 2013");
