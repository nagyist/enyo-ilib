var ilib=require("./ilib.js");var CType=require("./CType.js");var IString=require("./IString.js");var isAscii=function(i){var e;switch(typeof i){case"number":e=i;break;case"string":e=IString.toCodePoint(i,0);break;case"undefined":return false;default:e=i._toCodePoint(0);break}return CType._inRange(e,"ascii",ilib.data.ctype)};isAscii._init=function(i,e,r){CType._init(i,e,r)};module.exports=isAscii;