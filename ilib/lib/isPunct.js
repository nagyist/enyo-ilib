var ilib=require("./ilib.js");var CType=require("./CType.js");var IString=require("./IString.js");var isPunct=function(e){var i;switch(typeof e){case"number":i=e;break;case"string":i=IString.toCodePoint(e,0);break;case"undefined":return false;default:i=e._toCodePoint(0);break}return CType._inRange(i,"Pd",ilib.data.ctype_p)||CType._inRange(i,"Ps",ilib.data.ctype_p)||CType._inRange(i,"Pe",ilib.data.ctype_p)||CType._inRange(i,"Pc",ilib.data.ctype_p)||CType._inRange(i,"Po",ilib.data.ctype_p)||CType._inRange(i,"Pi",ilib.data.ctype_p)||CType._inRange(i,"Pf",ilib.data.ctype_p)};isPunct._init=function(e,i,a){CType._load("ctype_p",e,i,a)};module.exports=isPunct;