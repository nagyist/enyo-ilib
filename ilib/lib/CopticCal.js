var ilib=require("./ilib.js");var Utils=require("./Utils.js");var Locale=require("./Locale.js");var Calendar=require("./Calendar.js");var EthiopicCal=require("./EthiopicCal.js");var CopticCal=function(){this.type="coptic"};CopticCal.prototype=new EthiopicCal();CopticCal.prototype.parent=EthiopicCal;CopticCal.prototype.constructor=CopticCal;Calendar._constructors["coptic"]=CopticCal;module.exports=CopticCal;