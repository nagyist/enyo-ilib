var ilib=require("./ilib.js");var Utils=require("./Utils.js");var Locale=require("./Locale.js");var LocaleInfo=require("./LocaleInfo.js");var CType=require("./CType.js");var isDigit=require("./isDigit.js");var isSpace=require("./isSpace.js");var Currency=require("./Currency.js");var INumber=function(t,e){var i,s="",r=true,a,c;this.locale=new Locale;this.type="number";if(e){if(e.locale){this.locale=typeof e.locale==="string"?new Locale(e.locale):e.locale}if(e.type){switch(e.type){case"number":case"currency":case"percentage":this.type=e.type;break;default:break}}if(typeof e.sync!=="undefined"){r=e.sync==true}a=e.loadParams;c=e.onLoad}isDigit._init(r,a,ilib.bind(this,function(){isSpace._init(r,a,ilib.bind(this,function(){new LocaleInfo(this.locale,{sync:r,onLoad:ilib.bind(this,function(a){this.decimal=a.getDecimalSeparator();switch(typeof t){case"string":var c=true;var n=0;this.str=t||"0";i=0;for(i=0;i<this.str.length;i++){if(c&&this.str.charAt(i)==="-"){c=false;s+=this.str.charAt(i);n=i}else if(isDigit(this.str.charAt(i))){s+=this.str.charAt(i);c=false;n=i}else if(this.str.charAt(i)===this.decimal){s+=".";c=false;n=i}}this.parsed=this.str.substring(0,n+1);this.value=parseFloat(s);break;case"number":this.str=""+t;this.value=t;break;case"object":this.value=t.valueOf();this.str=""+this.value;break;case"undefined":this.value=0;this.str="0";break}switch(this.type){default:break;case"percentage":if(this.str.indexOf(a.getPercentageSymbol())!==-1){this.value/=100}break;case"currency":s="";i=0;while(i<this.str.length&&!isDigit(this.str.charAt(i))&&!isSpace(this.str.charAt(i))){s+=this.str.charAt(i++)}if(s.length===0){while(i<this.str.length&&isDigit(this.str.charAt(i))||isSpace(this.str.charAt(i))||this.str.charAt(i)==="."||this.str.charAt(i)===","){i++}while(i<this.str.length&&!isDigit(this.str.charAt(i))&&!isSpace(this.str.charAt(i))){s+=this.str.charAt(i++)}}new Currency({locale:this.locale,sign:s,sync:r,onLoad:ilib.bind(this,function(t){this.currency=t;if(e&&typeof e.onLoad==="function"){e.onLoad(this)}})});return}if(e&&typeof e.onLoad==="function"){e.onLoad(this)}})})}))}))};INumber.prototype={getLocale:function(){return this.locale},toString:function(){return this.str},getCurrency:function(){return this.currency},valueOf:function(){return this.value}};module.exports=INumber;