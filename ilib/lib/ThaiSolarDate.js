var ilib=require("./ilib.js");var JSUtils=require("./JSUtils.js");var Calendar=require("./Calendar.js");var IDate=require("./IDate.js");var ThaiSolarCal=require("./ThaiSolarCal.js");var GregorianDate=require("./GregorianDate.js");var GregRataDie=require("./GregRataDie.js");var ThaiSolarDate=function(e){var t=e;if(e){t={};JSUtils.shallowCopy(e,t);if(typeof t.year!=="undefined"){t.year-=543}if(typeof t.rd!=="undefined"){t.rd-=198327}}this.rd=undefined;this.offset=undefined;GregorianDate.call(this,t);this.cal=new ThaiSolarCal;if(e&&typeof e.year!=="undefined"){this.year=parseInt(e.year,10)}};ThaiSolarDate.prototype=new GregorianDate({noinstance:true});ThaiSolarDate.prototype.parent=GregorianDate.prototype;ThaiSolarDate.prototype.constructor=ThaiSolarDate;ThaiSolarDate.epoch=1523097.5;ThaiSolarDate.prototype._calcDateComponents=function(){this.parent._calcDateComponents.call(this);this.year+=543};ThaiSolarDate.prototype.getRataDie=function(){return this.rd.getRataDie()+198327};ThaiSolarDate.prototype.before=function(e){return this.cal.newDateInstance({rd:this.rd.before(e,this.offset)+198327,timezone:this.timezone})};ThaiSolarDate.prototype.after=function(e){return this.cal.newDateInstance({rd:this.rd.after(e,this.offset)+198327,timezone:this.timezone})};ThaiSolarDate.prototype.onOrBefore=function(e){return this.cal.newDateInstance({rd:this.rd.onOrBefore(e,this.offset)+198327,timezone:this.timezone})};ThaiSolarDate.prototype.onOrAfter=function(e){return this.cal.newDateInstance({rd:this.rd.onOrAfter(e,this.offset)+198327,timezone:this.timezone})};ThaiSolarDate.prototype.getCalendar=function(){return"thaisolar"};IDate._constructors["thaisolar"]=ThaiSolarDate;module.exports=ThaiSolarDate;