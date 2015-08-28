var ilib=require("./ilib.js");var Utils=require("./Utils.js");var JSUtils=require("./JSUtils.js");var Locale=require("./Locale.js");var LocaleInfo=require("./LocaleInfo.js");var IDate=require("./IDate.js");var DateFactory=require("./DateFactory.js");var Calendar=require("./Calendar.js");var CalendarFactory=require("./CalendarFactory.js");var IString=require("./IString.js");var ResBundle=require("./ResBundle.js");var TimeZone=require("./TimeZone.js");var GregorianCal=require("./GregorianCal.js");var DateFmt=function(options){var arr,i,bad,sync=true,loadParams=undefined;this.locale=new Locale();this.type="date";this.length="s";this.dateComponents="dmy";this.timeComponents="ahm";this.meridiems="default";if(options){if(options.locale){this.locale=typeof options.locale==="string"?new Locale(options.locale):options.locale}if(options.type){if(options.type==="date"||options.type==="time"||options.type==="datetime"){this.type=options.type}}if(options.calendar){this.calName=options.calendar}if(options.length){if(options.length==="short"||options.length==="medium"||options.length==="long"||options.length==="full"){this.length=options.length.charAt(0)}}if(options.date){arr=options.date.split("");arr.sort(function(left,right){return left<right?-1:right<left?1:0});bad=false;for(i=0;i<arr.length;i++){if(arr[i]!=="d"&&arr[i]!=="m"&&arr[i]!=="y"&&arr[i]!=="w"&&arr[i]!=="n"){bad=true;break}}if(!bad){this.dateComponents=arr.join("")}}if(options.time){arr=options.time.split("");arr.sort(function(left,right){return left<right?-1:right<left?1:0});this.badTime=false;for(i=0;i<arr.length;i++){if(arr[i]!=="h"&&arr[i]!=="m"&&arr[i]!=="s"&&arr[i]!=="a"&&arr[i]!=="z"){this.badTime=true;break}}if(!this.badTime){this.timeComponents=arr.join("")}}if(options.clock&&(options.clock==="12"||options.clock==="24")){this.clock=options.clock}if(options.template){this.type="";this.length="";this.dateComponents="";this.timeComponents="";this.template=options.template}if(options.timezone){if(options.timezone instanceof TimeZone){this.tz=options.timezone}else{this.tz=new TimeZone({locale:this.locale,id:options.timezone})}}else if(options.locale){this.tz=new TimeZone({locale:this.locale})}if(typeof options.useNative==="boolean"){this.useNative=options.useNative}if(typeof options.meridiems!=="undefined"&&(options.meridiems==="chinese"||options.meridiems==="gregorian"||options.meridiems==="ethiopic")){this.meridiems=options.meridiems}if(typeof options.sync!=="undefined"){sync=options.sync===true}loadParams=options.loadParams}if(!DateFmt.cache){DateFmt.cache={}}new LocaleInfo(this.locale,{sync:sync,loadParams:loadParams,onLoad:ilib.bind(this,function(li){this.locinfo=li;this.calName=this.calName||this.locinfo.getCalendar()||"gregorian";if(ilib.isDynCode()){DateFactory._dynLoadDate(this.calName)}this.cal=CalendarFactory({type:this.calName});if(!this.cal){this.cal=new GregorianCal();}if(this.meridiems==="default"){this.meridiems=li.getMeridiemsStyle()}new ResBundle({locale:this.locale,name:"sysres",sync:sync,loadParams:loadParams,onLoad:ilib.bind(this,function(rb){this.sysres=rb;if(!this.template){Utils.loadData({object:DateFmt,locale:this.locale,name:"dateformats.json",sync:sync,loadParams:loadParams,callback:ilib.bind(this,function(formats){if(!formats){formats=ilib.data.dateformats||DateFmt.defaultFmt;var spec=this.locale.getSpec().replace(/-/g,"_");DateFmt.cache[spec]=formats}if(typeof this.clock==="undefined"){this.clock=this.locinfo.getClock()}this._initTemplate(formats);this._massageTemplate();if(options&&typeof options.onLoad==="function"){options.onLoad(this)}})})}else{this._massageTemplate();if(options&&typeof options.onLoad==="function"){options.onLoad(this)}}})})})})};DateFmt.lenmap={s:"short",m:"medium",l:"long",f:"full"};DateFmt.zeros="0000";DateFmt.defaultFmt={gregorian:{order:"{date} {time}",date:{dmwy:"EEE d/MM/yyyy",dmy:"d/MM/yyyy",dmw:"EEE d/MM",dm:"d/MM",my:"MM/yyyy",dw:"EEE d",d:"dd",m:"MM",y:"yyyy",n:"NN",w:"EEE"},time:{12:"h:mm:ssa",24:"H:mm:ss"},range:{c00:"{st} - {et}, {sd}/{sm}/{sy}",c01:"{sd}/{sm} {st} - {ed}/{em} {et}, {sy}",c02:"{sd}/{sm} {st} - {ed}/{em} {et}, {sy}",c03:"{sd}/{sm}/{sy} {st} - {ed}/{em}/{ey} {et}",c10:"{sd}-{ed}/{sm}/{sy}",c11:"{sd}/{sm} - {ed}/{em} {sy}",c12:"{sd}/{sm}/{sy} - {ed}/{em}/{ey}",c20:"{sm}/{sy} - {em}/{ey}",c30:"{sy} - {ey}"}},islamic:"gregorian",hebrew:"gregorian",julian:"gregorian",buddhist:"gregorian",persian:"gregorian","persian-algo":"gregorian",han:"gregorian"};DateFmt.monthNameLenMap={"short":"N",medium:"NN","long":"MMM",full:"MMMM"};DateFmt.weekDayLenMap={"short":"E",medium:"EE","long":"EEE",full:"EEEE"};DateFmt.getMeridiemsRange=function(options){options=options||{};var args={};if(options.locale){args.locale=options.locale}if(options.meridiems){args.meridiems=options.meridiems}var fmt=new DateFmt(args);return fmt.getMeridiemsRange()};DateFmt.prototype={_initTemplate:function(formats){if(formats[this.calName]){this.formats=formats[this.calName];if(typeof this.formats==="string"){this.formats=formats[this.formats]}this.template="";switch(this.type){case"datetime":this.template=this.formats&&this._getLengthFormat(this.formats.order,this.length)||"{date} {time}";this.template=this.template.replace("{date}",this._getFormat(this.formats.date,this.dateComponents,this.length)||"");this.template=this.template.replace("{time}",this._getFormat(this.formats.time[this.clock],this.timeComponents,this.length)||"");break;case"date":this.template=this._getFormat(this.formats.date,this.dateComponents,this.length);break;case"time":this.template=this._getFormat(this.formats.time[this.clock],this.timeComponents,this.length);break}}else{throw"No formats available for calendar "+this.calName+" in locale "+this.locale.toString()}},_massageTemplate:function(){var i;if(this.clock&&this.template){var temp="";switch(this.clock){case"24":for(i=0;i<this.template.length;i++){if(this.template.charAt(i)=="'"){temp+=this.template.charAt(i++);while(i<this.template.length&&this.template.charAt(i)!=="'"){temp+=this.template.charAt(i++)}if(i<this.template.length){temp+=this.template.charAt(i)}}else if(this.template.charAt(i)=="K"){temp+="k"}else if(this.template.charAt(i)=="h"){temp+="H"}else{temp+=this.template.charAt(i)}}this.template=temp;break;case"12":for(i=0;i<this.template.length;i++){if(this.template.charAt(i)=="'"){temp+=this.template.charAt(i++);while(i<this.template.length&&this.template.charAt(i)!=="'"){temp+=this.template.charAt(i++)}if(i<this.template.length){temp+=this.template.charAt(i)}}else if(this.template.charAt(i)=="k"){temp+="K"}else if(this.template.charAt(i)=="H"){temp+="h"}else{temp+=this.template.charAt(i)}}this.template=temp;break}}this.templateArr=this._tokenize(this.template);var digits;if(typeof this.useNative==="boolean"){if(this.useNative){digits=this.locinfo.getNativeDigits();if(digits){this.digits=digits}}}else if(this.locinfo.getDigitsStyle()==="native"){digits=this.locinfo.getNativeDigits();if(digits){this.useNative=true;this.digits=digits}}},_tokenize:function(template){var i=0,start,ch,letter,arr=[];if(template){while(i<template.length){ch=template.charAt(i);start=i;if(ch==="'"){i++;while(i<template.length&&template.charAt(i)!=="'"){i++}if(i<template.length){i++}}else if(ch>="a"&&ch<="z"||ch>="A"&&ch<="Z"){letter=template.charAt(i);while(i<template.length&&ch===letter){ch=template.charAt(++i)}}else{while(i<template.length&&ch!=="'"&&(ch<"a"||ch>"z")&&(ch<"A"||ch>"Z")){ch=template.charAt(++i)}}arr.push(template.substring(start,i))}}return arr},_getFormat:function getFormat(obj,components,length){if(typeof components!=="undefined"&&obj&&obj[components]){return this._getLengthFormat(obj[components],length)}return undefined},_getLengthFormat:function getLengthFormat(obj,length){if(typeof obj==="string"){return obj}else if(obj[length]){return obj[length]}return undefined},getLocale:function(){return this.locale},getTemplate:function(){return this.template},getType:function(){return this.type},getCalendar:function(){return this.cal.getType()},getLength:function(){return DateFmt.lenmap[this.length]||""},getDateComponents:function(){return this.dateComponents||""},getTimeComponents:function(){return this.timeComponents||""},getTimeZone:function(){if(!this.tz){this.tz=new TimeZone({id:ilib.getTimeZone()})}return this.tz},getClock:function(){return this.clock||this.locinfo.getClock()},getMeridiemsRange:function(){var result;var _getSysString=function(key){return(this.sysres.getString(undefined,key+"-"+this.calName)||this.sysres.getString(undefined,key)).toString()};switch(this.meridiems){case"chinese":result=[{name:_getSysString.call(this,"azh0"),start:"00:00",end:"05:59"},{name:_getSysString.call(this,"azh1"),start:"06:00",end:"08:59"},{name:_getSysString.call(this,"azh2"),start:"09:00",end:"11:59"},{name:_getSysString.call(this,"azh3"),start:"12:00",end:"12:59"},{name:_getSysString.call(this,"azh4"),start:"13:00",end:"17:59"},{name:_getSysString.call(this,"azh5"),start:"18:00",end:"20:59"},{name:_getSysString.call(this,"azh6"),start:"21:00",end:"23:59"}];break;case"ethiopic":result=[{name:_getSysString.call(this,"a0-ethiopic"),start:"00:00",end:"05:59"},{name:_getSysString.call(this,"a1-ethiopic"),start:"06:00",end:"06:00"},{name:_getSysString.call(this,"a2-ethiopic"),start:"06:01",end:"11:59"},{name:_getSysString.call(this,"a3-ethiopic"),start:"12:00",end:"17:59"},{name:_getSysString.call(this,"a4-ethiopic"),start:"18:00",end:"23:59"}];break;default:result=[{name:_getSysString.call(this,"a0"),start:"00:00",end:"11:59"},{name:_getSysString.call(this,"a1"),start:"12:00",end:"23:59"}];break}return result},_getTemplate:function(prefix,calendar){if(calendar!=="gregorian"){return prefix+"-"+calendar}return prefix},getMonthsOfYear:function(options){var length=options&&options.length||this.getLength(),template=DateFmt.monthNameLenMap[length],months=[undefined],date,monthCount;if(options){if(options.date){date=DateFactory._dateToIlib(options.date)}if(options.year){date=DateFactory({year:options.year,month:1,day:1,type:this.cal.getType()})}}if(!date){date=DateFactory({calendar:this.cal.getType()})}monthCount=this.cal.getNumMonths(date.getYears());for(var i=1;i<=monthCount;i++){months[i]=this.sysres.getString(this._getTemplate(template+i,this.cal.getType())).toString()}return months},getDaysOfWeek:function(options){var length=options&&options.length||this.getLength(),template=DateFmt.weekDayLenMap[length],days=[];for(var i=0;i<7;i++){days[i]=this.sysres.getString(this._getTemplate(template+i,this.cal.getType())).toString()}return days},toString:function(){return this.getTemplate()},_pad:function(str,length){if(typeof str!=="string"){str=""+str}var start=0;if(str.charAt(0)==="-"){start++}return str.length>=length+start?str:str.substring(0,start)+DateFmt.zeros.substring(0,length-str.length+start)+str.substring(start)},_formatTemplate:function(date,templateArr){var i,key,temp,tz,str="";for(i=0;i<templateArr.length;i++){switch(templateArr[i]){case"d":str+=date.day||1;break;case"dd":str+=this._pad(date.day||"1",2);break;case"yy":temp=""+(date.year||0)%100;str+=this._pad(temp,2);break;case"yyyy":str+=this._pad(date.year||"0",4);break;case"M":str+=date.month||1;break;case"MM":str+=this._pad(date.month||"1",2);break;case"h":temp=(date.hour||0)%12;if(temp==0){temp="12"}str+=temp;break;case"hh":temp=(date.hour||0)%12;if(temp==0){temp="12"}str+=this._pad(temp,2);break;case"K":temp=(date.hour||0)%12;str+=temp;break;case"KK":temp=(date.hour||0)%12;str+=this._pad(temp,2);break;case"H":str+=date.hour||"0";break;case"HH":str+=this._pad(date.hour||"0",2);break;case"k":str+=date.hour==0?"24":date.hour;break;case"kk":temp=date.hour==0?"24":date.hour;str+=this._pad(temp,2);break;case"m":str+=date.minute||"0";break;case"mm":str+=this._pad(date.minute||"0",2);break;case"s":str+=date.minute||"0";break;case"ss":str+=this._pad(date.second||"0",2);break;case"S":str+=date.millisecond||"0";break;case"SSS":str+=this._pad(date.millisecond||"0",3);break;case"N":case"NN":case"MMM":case"MMMM":key=templateArr[i]+(date.month||1);str+=this.sysres.getString(undefined,key+"-"+this.calName)||this.sysres.getString(undefined,key);break;case"E":case"EE":case"EEE":case"EEEE":key=templateArr[i]+date.getDayOfWeek();str+=this.sysres.getString(undefined,key+"-"+this.calName)||this.sysres.getString(undefined,key);break;case"a":switch(this.meridiems){case"chinese":if(date.hour<6){key="azh0"}else if(date.hour<9){key="azh1"}else if(date.hour<12){key="azh2"}else if(date.hour<13){key="azh3"}else if(date.hour<18){key="azh4"}else if(date.hour<21){key="azh5"}else{key="azh6"}break;case"ethiopic":if(date.hour<6){key="a0-ethiopic"}else if(date.hour===6&&date.minute===0){key="a1-ethiopic"}else if(date.hour>=6&&date.hour<12){key="a2-ethiopic"}else if(date.hour>=12&&date.hour<18){key="a3-ethiopic"}else if(date.hour>=18){key="a4-ethiopic"}break;default:key=date.hour<12?"a0":"a1";break}str+=this.sysres.getString(undefined,key+"-"+this.calName)||this.sysres.getString(undefined,key);break;case"w":str+=date.getWeekOfYear();break;case"ww":str+=this._pad(date.getWeekOfYear(),2);break;case"D":str+=date.getDayOfYear();break;case"DD":str+=this._pad(date.getDayOfYear(),2);break;case"DDD":str+=this._pad(date.getDayOfYear(),3);break;case"W":str+=date.getWeekOfMonth(this.locale);break;case"G":key="G"+date.getEra();str+=this.sysres.getString(undefined,key+"-"+this.calName)||this.sysres.getString(undefined,key);break;case"O":temp=this.sysres.getString("1#1st|2#2nd|3#3rd|21#21st|22#22nd|23#23rd|31#31st|#{num}th","ordinalChoice");str+=temp.formatChoice(date.day,{num:date.day});break;case"z":tz=this.getTimeZone();str+=tz.getDisplayName(date,"standard");break;case"Z":tz=this.getTimeZone();str+=tz.getDisplayName(date,"rfc822");break;default:str+=templateArr[i].replace(/'/g,"");break}}if(this.digits){str=JSUtils.mapString(str,this.digits)}return str},format:function(dateLike){var thisZoneName=this.tz&&this.tz.getId()||"local";var date=DateFactory._dateToIlib(dateLike,thisZoneName,this.locale);if(!date.getCalendar||!(date instanceof IDate)){throw"Wrong date type passed to DateFmt.format()"}var dateZoneName=date.timezone||"local";if(dateZoneName!==thisZoneName||date.getCalendar()!==this.calName){var newDate=DateFactory({type:this.calName,timezone:thisZoneName,julianday:date.getJulianDay()});date=newDate}return this._formatTemplate(date,this.templateArr)},formatRelative:function(reference,date){reference=DateFactory._dateToIlib(reference);date=DateFactory._dateToIlib(date);var referenceRd,dateRd,fmt,time,diff,num;if(typeof reference!=="object"||!reference.getCalendar||reference.getCalendar()!==this.calName||typeof date!=="object"||!date.getCalendar||date.getCalendar()!==this.calName){throw"Wrong calendar type"}referenceRd=reference.getRataDie();dateRd=date.getRataDie();if(dateRd<referenceRd){diff=referenceRd-dateRd;fmt=this.sysres.getString("{duration} ago")}else{diff=dateRd-referenceRd;fmt=this.sysres.getString("in {duration}")}if(diff<694444e-9){num=Math.round(diff*86400);switch(this.length){case"s":time=this.sysres.getString("#{num}s");break;case"m":time=this.sysres.getString("1#1 se|#{num} sec");break;case"l":time=this.sysres.getString("1#1 sec|#{num} sec");break;default:case"f":time=this.sysres.getString("1#1 second|#{num} seconds");break}}else if(diff<.041666667){num=Math.round(diff*1440);switch(this.length){case"s":time=this.sysres.getString("#{num}m","durationShortMinutes");break;case"m":time=this.sysres.getString("1#1 mi|#{num} min");break;case"l":time=this.sysres.getString("1#1 min|#{num} min");break;default:case"f":time=this.sysres.getString("1#1 minute|#{num} minutes");break}}else if(diff<1){num=Math.round(diff*24);switch(this.length){case"s":time=this.sysres.getString("#{num}h");break;case"m":time=this.sysres.getString("1#1 hr|#{num} hrs","durationMediumHours");break;case"l":time=this.sysres.getString("1#1 hr|#{num} hrs");break;default:case"f":time=this.sysres.getString("1#1 hour|#{num} hours");break}}else if(diff<14){num=Math.round(diff);switch(this.length){case"s":time=this.sysres.getString("#{num}d");break;case"m":time=this.sysres.getString("1#1 dy|#{num} dys");break;case"l":time=this.sysres.getString("1#1 day|#{num} days","durationLongDays");break;default:case"f":time=this.sysres.getString("1#1 day|#{num} days");break}}else if(diff<84){num=Math.round(diff/7);switch(this.length){case"s":time=this.sysres.getString("#{num}w");break;case"m":time=this.sysres.getString("1#1 wk|#{num} wks","durationMediumWeeks");break;case"l":time=this.sysres.getString("1#1 wk|#{num} wks");break;default:case"f":time=this.sysres.getString("1#1 week|#{num} weeks");break}}else if(diff<730){num=Math.round(diff/30.4);switch(this.length){case"s":time=this.sysres.getString("#{num}m","durationShortMonths");break;case"m":time=this.sysres.getString("1#1 mo|#{num} mos");break;case"l":time=this.sysres.getString("1#1 mon|#{num} mons");break;default:case"f":time=this.sysres.getString("1#1 month|#{num} months");break}}else{num=Math.round(diff/365);switch(this.length){case"s":time=this.sysres.getString("#{num}y");break;case"m":time=this.sysres.getString("1#1 yr|#{num} yrs","durationMediumYears");break;case"l":time=this.sysres.getString("1#1 yr|#{num} yrs");break;default:case"f":time=this.sysres.getString("1#1 year|#{num} years");break}}return fmt.format({duration:time.formatChoice(num,{num:num})})}};module.exports=DateFmt;