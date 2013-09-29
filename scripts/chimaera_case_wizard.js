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
