!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";var t,o=["package","message","import","syntax","required","optional","repeated","reserved","default","extensions","packed","bool","bytes","double","enum","float","string","int32","int64","uint32","uint64","sint32","sint64","fixed32","fixed64","sfixed32","sfixed64","option","service","rpc","returns"],n=(t=o,RegExp("^(("+t.join(")|(")+"))\\b","i"));e.registerHelper("hintWords","protobuf",o);var r=RegExp("^[_A-Za-z\xa1-￿][_A-Za-z0-9\xa1-￿]*");function i(e){return e.eatSpace()?null:e.match("//")?(e.skipToEnd(),"comment"):e.match(/^[0-9\.+-]/,!1)&&(e.match(/^[+-]?0x[0-9a-fA-F]+/)||e.match(/^[+-]?\d*\.\d+([EeDd][+-]?\d+)?/)||e.match(/^[+-]?\d+([EeDd][+-]?\d+)?/))?"number":e.match(/^"([^"]|(""))*"/)||e.match(/^'([^']|(''))*'/)?"string":e.match(n)?"keyword":e.match(r)?"variable":(e.next(),null)}e.defineMode("protobuf",function(){return{token:i,fold:"brace"}}),e.defineMIME("text/x-protobuf","protobuf")});