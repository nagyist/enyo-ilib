var HebrewCal=require("./HebrewCal.js");var MathUtils=require("./MathUtils.js");var RataDie=require("./RataDie.js");var HebrewRataDie=function(e){this.cal=e&&e.cal||new HebrewCal;this.rd=undefined;RataDie.call(this,e)};HebrewRataDie.prototype=new RataDie;HebrewRataDie.prototype.parent=RataDie;HebrewRataDie.prototype.constructor=HebrewRataDie;HebrewRataDie.prototype.epoch=347997.25;HebrewRataDie.cumMonthLengths=[176,206,235,265,294,324,0,30,59,88,117,147];HebrewRataDie.cumMonthLengthsLeap=[206,236,265,295,324,354,0,30,59,88,117,147,177];HebrewRataDie.prototype._setDateComponents=function(e){var a=HebrewCal.elapsedDays(e.year);var t=a+HebrewCal.newYearsCorrection(e.year,a)+e.day-1;var r=0,o;o=this.cal.isLeapYear(e.year)?HebrewRataDie.cumMonthLengthsLeap:HebrewRataDie.cumMonthLengths;r=o[e.month-1];if((e.month<7||e.month>8)&&HebrewCal.longHeshvan(e.year)){r++}if((e.month<7||e.month>9)&&HebrewCal.longKislev(e.year)){r++}t+=r;var i,n,s;if(typeof e.parts!=="undefined"){var h=parseInt(e.parts,10);var p=parseInt(h,10)*3.333333333333;i=Math.floor(p/60);p-=i*60;n=Math.floor(p);s=p-n}else{i=parseInt(e.minute,10)||0;n=parseInt(e.second,10)||0;s=parseInt(e.millisecond,10)||0}var l;if(e.hour>=18){l=((e.hour-18||0)*36e5+(i||0)*6e4+(n||0)*1e3+(s||0))/864e5}else{l=.25+((e.hour||0)*36e5+(i||0)*6e4+(n||0)*1e3+(s||0))/864e5}this.rd=t+l};HebrewRataDie.prototype._onOrBefore=function(e,a){return e-MathUtils.mod(Math.floor(e)-a+1,7)};module.exports=HebrewRataDie;