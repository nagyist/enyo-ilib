var ilib=require("./ilib.js");var Utils=require("./Utils.js");var JSUtils=require("./JSUtils.js");var Locale=require("./Locale.js");var LocaleInfo=require("./LocaleInfo.js");var IDate=require("./IDate.js");var CalendarFactory=require("./CalendarFactory.js");var DateFmt=require("./DateFmt.js");var IString=require("./IString.js");var TimeZone=require("./TimeZone.js");var GregorianCal=require("./GregorianCal.js");var DateRngFmt=function(t){var e=true;var a=undefined;this.locale=new Locale;this.length="s";if(t){if(t.locale){this.locale=typeof t.locale==="string"?new Locale(t.locale):t.locale}if(t.calendar){this.calName=t.calendar}if(t.length){if(t.length==="short"||t.length==="medium"||t.length==="long"||t.length==="full"){this.length=t.length.charAt(0)}}if(typeof t.sync!=="undefined"){e=t.sync==true}a=t.loadParams}var i={};JSUtils.shallowCopy(t,i);i.sync=e;i.loadParams=a;i.onLoad=ilib.bind(this,function(e){this.dateFmt=e;if(e){this.locinfo=this.dateFmt.locinfo;this.calName=this.calName||this.locinfo.getCalendar()||"gregorian";this.cal=CalendarFactory({type:this.calName});if(!this.cal){this.cal=new GregorianCal}this.timeTemplate=this.dateFmt._getFormat(this.dateFmt.formats.time[this.dateFmt.clock],this.dateFmt.timeComponents,this.length)||"hh:mm";this.timeTemplateArr=this.dateFmt._tokenize(this.timeTemplate);if(t&&typeof t.onLoad==="function"){t.onLoad(this)}}});new DateFmt(i)};DateRngFmt.prototype={getLocale:function(){return this.locale},getCalendar:function(){return this.dateFmt.getCalendar()},getLength:function(){return DateFmt.lenmap[this.length]||""},getTimeZone:function(){return this.dateFmt.getTimeZone()},getClock:function(){return this.dateFmt.getClock()},format:function(t,e){var a,i,r="",m,n,s;if(typeof t!=="object"||!t.getCalendar||t.getCalendar()!==this.calName||typeof e!=="object"||!e.getCalendar||e.getCalendar()!==this.calName){throw"Wrong calendar type"}a=t.getRataDie();i=e.getRataDie();if(i-a<3){if(t.year===e.year){if(t.month===e.month){if(t.day===e.day){r=new IString(this.dateFmt._getFormat(this.dateFmt.formats.range,"c00",this.length))}else{r=new IString(this.dateFmt._getFormat(this.dateFmt.formats.range,"c01",this.length))}}else{r=new IString(this.dateFmt._getFormat(this.dateFmt.formats.range,"c02",this.length))}}else{r=new IString(this.dateFmt._getFormat(this.dateFmt.formats.range,"c03",this.length))}}else if(i-a<730){if(t.year===e.year){if(t.month===e.month){r=new IString(this.dateFmt._getFormat(this.dateFmt.formats.range,"c10",this.length))}else{r=new IString(this.dateFmt._getFormat(this.dateFmt.formats.range,"c11",this.length))}}else{r=new IString(this.dateFmt._getFormat(this.dateFmt.formats.range,"c12",this.length))}}else if(i-a<3650){r=new IString(this.dateFmt._getFormat(this.dateFmt.formats.range,"c20",this.length))}else{r=new IString(this.dateFmt._getFormat(this.dateFmt.formats.range,"c30",this.length))}m=this.dateFmt._tokenize(this.dateFmt._getFormat(this.dateFmt.formats.date,"y",this.length)||"yyyy");n=this.dateFmt._tokenize(this.dateFmt._getFormat(this.dateFmt.formats.date,"m",this.length)||"MM");s=this.dateFmt._tokenize(this.dateFmt._getFormat(this.dateFmt.formats.date,"d",this.length)||"dd");return r.format({sy:this.dateFmt._formatTemplate(t,m),sm:this.dateFmt._formatTemplate(t,n),sd:this.dateFmt._formatTemplate(t,s),st:this.dateFmt._formatTemplate(t,this.timeTemplateArr),ey:this.dateFmt._formatTemplate(e,m),em:this.dateFmt._formatTemplate(e,n),ed:this.dateFmt._formatTemplate(e,s),et:this.dateFmt._formatTemplate(e,this.timeTemplateArr)})}};module.exports=DateRngFmt;