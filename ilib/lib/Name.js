var ilib=require("./ilib.js");var Utils=require("./Utils.js");var JSUtils=require("./JSUtils.js");var Locale=require("./Locale.js");var IString=require("./IString.js");var CType=require("./CType.js");var isAlpha=require("./isAlpha.js");var isIdeo=require("./isIdeo.js");var isPunct=require("./isPunct.js");var isSpace=require("./isSpace.js");var Name=function(i,e){var s=true;if(!i||i.length===0){return}this.loadParams={};if(e){if(e.locale){this.locale=typeof e.locale==="string"?new Locale(e.locale):e.locale}if(e.style&&(e.style==="asian"||e.style==="western")){this.style=e.style}if(e.order&&(e.order==="gmf"||e.order==="fmg"||e.order==="fgm")){this.order=e.order}if(typeof e.sync!=="undefined"){s=e.sync==true}if(typeof e.loadParams!=="undefined"){this.loadParams=e.loadParams}}if(!Name.cache){Name.cache={}}this.locale=this.locale||new Locale;isAlpha._init(s,this.loadParams,ilib.bind(this,function(){isIdeo._init(s,this.loadParams,ilib.bind(this,function(){isPunct._init(s,this.loadParams,ilib.bind(this,function(){isSpace._init(s,this.loadParams,ilib.bind(this,function(){Utils.loadData({object:Name,locale:this.locale,name:"name.json",sync:s,loadParams:this.loadParams,callback:ilib.bind(this,function(s){if(!s){s=Name.defaultInfo;var t=this.locale.getSpec().replace(/-/g,"_");Name.cache[t]=s}if(typeof i==="object"){this.prefix=i.prefix;this.givenName=i.givenName;this.middleName=i.middleName;this.familyName=i.familyName;this.suffix=i.suffix;this.locale=i.locale;this.style=i.style;this.order=i.order;this.useSpaces=i.useSpaces;this.isAsianName=i.isAsianName;return}this.info=s;this._init(i);if(e&&typeof e.onLoad==="function"){e.onLoad(this)}})})}))}))}))}))};Name.defaultInfo=ilib.data.name||{components:{"short":{g:1,f:1},medium:{g:1,m:1,f:1},"long":{p:1,g:1,m:1,f:1},full:{p:1,g:1,m:1,f:1,s:1}},format:"{prefix} {givenName} {middleName} {familyName}{suffix}",sortByHeadWord:false,nameStyle:"western",conjunctions:{and1:"and",and2:"and",or1:"or",or2:"or"},auxillaries:{von:1,"von der":1,"von den":1,van:1,"van der":1,"van de":1,"van den":1,de:1,di:1,la:1,lo:1,des:1,le:1,les:1,du:1,"de la":1,del:1,"de los":1,"de las":1},prefixes:["doctor","dr","mr","mrs","ms","mister","madame","madamoiselle","miss","monsieur","señor","señora","señorita"],suffixes:[",","junior","jr","senior","sr","i","ii","iii","esq","phd","md"],patronymicName:[],familyNames:[]};Name._isAsianChar=function(i){return isIdeo(i)||CType.withinRange(i,"hangul")||CType.withinRange(i,"hiragana")||CType.withinRange(i,"katakana")};Name._isAsianName=function(i,e){var s=0,t=0,n;if(i&&i.length>0){for(n=0;n<i.length;n++){var a=i.charAt(n);if(Name._isAsianChar(a)){if(e=="ko"||e=="ja"||e=="zh"){return true}s++}else if(isAlpha(a)){if(!e=="ko"||!e=="ja"||!e=="zh"){return false}t++}}return t<s}return false};Name._isEuroName=function(i,e){var s,t=new IString(i),n=t.charIterator();while(n.hasNext()){s=n.next();if(!Name._isAsianChar(s)&&!isPunct(s)&&!isSpace(s)){return true}else if(Name._isAsianChar(s)&&(e=="ko"||e=="ja"||e=="zh")){return false}}return false};Name.prototype={_init:function(i){var e,s,t,n,a,f,l,h,r,o;var m=this.locale.getLanguage();if(i){h=i.search(/\s*[,\/\(\[\{<]/);if(h!==-1){o=i.substring(h);o=o.replace(/\s+/g," ");a=o.split(" ");var g=this._findLastConjunction(a);if(g>-1){o=undefined}else{i=i.substring(0,h)}}this.isAsianName=Name._isAsianName(i,m);if(this.info.nameStyle==="asian"||this.info.order==="fmg"||this.info.order==="fgm"){r=this.isAsianName?this.info:ilib.data.name}else{r=this.isAsianName?ilib.data.name:this.info}if(this.isAsianName){if(this.useSpaces==false){i=i.replace(/\s+/g,"")}e=i.trim().split("")}else{i=i.replace(/, /g," , ");i=i.replace(/\s+/g," ");e=i.trim().split(" ")}if(e.length>1){for(h=e.length;h>0;h--){s=e.slice(0,h);t=s.join(this.isAsianName?"":" ");n=t.toLowerCase();n=n.replace(/[,\.]/g,"");if(ilib.isArray(this.info.prefixes)&&(JSUtils.indexOf(this.info.prefixes,n)>-1||this._isConjunction(n))){if(this.prefix){if(!this.isAsianName){this.prefix+=" "}this.prefix+=t}else{this.prefix=t}e=e.slice(h);h=e.length}}}if(e.length>1){for(h=e.length;h>0;h--){a=e.slice(-h);f=a.join(this.isAsianName?"":" ");l=f.toLowerCase();l=l.replace(/[\.]/g,"");if(ilib.isArray(this.info.suffixes)&&JSUtils.indexOf(this.info.suffixes,l)>-1){if(this.suffix){if(!this.isAsianName&&!isPunct(this.suffix.charAt(0))){this.suffix=" "+this.suffix}this.suffix=f+this.suffix}else{this.suffix=f}e=e.slice(0,e.length-h);h=e.length}}}if(o){this.suffix=this.suffix&&this.suffix+o||o}if(e.length>1&&!this.isAsianName){e=this._joinAuxillaries(e,this.isAsianName)}if(this.isAsianName){this._parseAsianName(e,m)}else{this._parseWesternName(e)}this._joinNameArrays()}},_findPrefix:function(i,e,s,t){var n,a,f,l,h=[];if(i.length>0&&e){for(n=i.length;n>0;n--){l=i.slice(0,n);a=l.join(s?"":" ");f=a.toLowerCase();f=f.replace(/[,\.]/g,"");if(f in e){h=h.concat(s?a:l);if(t){return h}i=i.slice(n);n=i.length+1}}}return h},_findSuffix:function(i,e,s){var t,n,a="";for(t=0;t<e.length;t++){if(i.length>=e[t].length){n=0;while(n<e[t].length&&i[i.length-n]===e[t][e[t].length-n]){n++}if(n>=e[t].length){a=i.slice(i.length-n).join(s?"":" ")+(s?"":" ")+a;i=i.slice(0,i.length-n);t=-1}}}this.suffix=a;return i},_isConjunction:function i(e){return this.info.conjunctions.and1===e||this.info.conjunctions.and2===e||this.info.conjunctions.or1===e||this.info.conjunctions.or2===e||"&"===e||"+"===e},_findLastConjunction:function e(i){var e=-1,s,t;for(s=0;s<i.length;s++){t=i[s];if(typeof t==="string"){t=t.toLowerCase();if("and"===t||"or"===t||"&"===t||"+"===t){e=s}if(this._isConjunction(t)){e=s}}}return e},_extractPrefixes:function(i,e){var s=this._findPrefix(i,this.info.prefixes,e);if(s>0){this.prefix=i.slice(0,s).join(e?"":" ");return i.slice(s)}return i},_extractSuffixes:function(i,e){var s=this._findSuffix(i,this.info.suffixes,e);if(s>0){this.suffix=i.slice(s).join(e?"":" ");return i.slice(0,s)}return i},_joinAuxillaries:function(i,e){var s,t,n,a,f;if(this.info.auxillaries&&(i.length>2||this.prefix)){for(s=0;s<i.length-1;s++){for(t=i.length;t>s;t--){n=i.slice(s,t);a=n.join(" ");f=a.toLowerCase();f=f.replace(/[,\.]/g,"");if(f in this.info.auxillaries){i.splice(s,t+1-s,n.concat(i[t]));t=s}}}}return i},_joinArrayOrString:function s(i){var e;if(typeof i==="object"){for(e=0;e<i.length;e++){i[e]=this._joinArrayOrString(i[e])}var s="";i.forEach(function(i){if(s.length>0&&!isPunct(i.charAt(0))){s+=" "}s+=i});return s}return i},_joinNameArrays:function t(){var i;for(i in this){if(this[i]!==undefined&&typeof this[i]==="object"&&this[i]instanceof Array){this[i]=this._joinArrayOrString(this[i])}}},_parseAsianName:function(i,e){var s=this._findPrefix(i,this.info.knownFamilyNames,true,this.info.noCompoundFamilyNames);var t=i.join("");if(s&&s.length>0){this.familyName=s.join("");this.givenName=i.slice(this.familyName.length).join("");if(e==="ko"&&t.search(/\s*[/\s]/)>-1&&!this.suffix){this._parseKoreanName(t)}}else if(this.locale.getLanguage()==="ja"){this._parseJapaneseName(i)}else if(this.suffix||this.prefix){this.familyName=i.join("")}else{this.givenName=i.join("")}},_parseKoreanName:function(i){var e=i;var s=e.split(" ");var t=s.length;var n=e.indexOf(" ");var a=e.lastIndexOf(" ");if(t===2){this.familyName=s[0];this.givenName=e.slice(n,e.length)}else{this.familyName=s[0];this.middleName=e.slice(n,a);this.givenName=e.slice(a,e.length)}},_parseJapaneseName:function(i){if(this.suffix&&this.suffix.length>1&&this.info.honorifics.indexOf(this.suffix)>-1){if(i.length===1){if(CType.withinRange(i[0],"cjk")){this.familyName=i[0]}else{this.givenName=i[0]}return}else if(i.length===2){this.familyName=i.slice(0,i.length).join("");return}}if(i.length>1){var e="";for(var s=0;s<i.length;s++){if(CType.withinRange(i[s],"cjk")){e+=i[s]}else if(e.length>1&&CType.withinRange(i[s],"hiragana")){this.familyName=e;this.givenName=i.slice(s,i.length).join("");return}else{break;}}}if(i.length===1){this.familyName=i[0]}else if(i.length===2){this.familyName=i[0];this.givenName=i[1]}else if(i.length===3){this.familyName=i[0];this.givenName=i.slice(1,i.length).join("")}else if(i.length>3){this.familyName=i.slice(0,2).join("");this.givenName=i.slice(2,i.length).join("")}},_parseSpanishName:function(i){var e;if(i.length===1){if(this.prefix||typeof i[0]==="object"){this.familyName=i[0]}else{this.givenName=i[0]}}else if(i.length===2){this.givenName=i[0];this.familyName=i[1]}else if(i.length===3){e=this._findLastConjunction(i);if(e===1){this.givenName=i}else{this.givenName=i[0];this.familyName=i.slice(1)}}else if(i.length>3){e=this._findLastConjunction(i);if(e>0){this.givenName=i.splice(0,e+2);if(i.length>1){this.familyName=i.splice(i.length-2,2);if(i.length>0){this.middleName=i}}else if(i.length===1){this.familyName=i[0]}}else{this.givenName=i.splice(0,1);this.familyName=i.splice(i.length-2,2);this.middleName=i}}},_parseIndonesianName:function(i){var e;if(i.length===1){this.givenName=i[0]}else if(i.length>=2){e=this._findLastConjunction(i);if(e>0){this.givenName=i.splice(0,e+2);if(i.length>1){this.middleName=i}}else{this.givenName=i.splice(0,1);this.middleName=i}}},_parseGenericWesternName:function(i){var e;if(i.length===1){if(this.prefix||typeof i[0]==="object"){this.familyName=i[0]}else{this.givenName=i[0]}}else if(i.length===2){if(this.info.order=="fgm"){this.givenName=i[1];this.familyName=i[0]}else if(this.info.order=="gmf"||typeof this.info.order=="undefined"){this.givenName=i[0];this.familyName=i[1]}}else if(i.length>=3){e=this._findLastConjunction(i);if(e>0){this.givenName=i.slice(0,e+2);if(e+1<i.length-1){this.familyName=i.splice(i.length-1,1);if(e+2<i.length-1){this.middleName=i.slice(e+2,i.length-e-3)}}else if(this.order=="fgm"){this.familyName=i.slice(0,e+2);if(e+1<i.length-1){this.middleName=i.splice(i.length-1,1);if(e+2<i.length-1){this.givenName=i.slice(e+2,i.length-e-3)}}}}else{this.givenName=i[0];this.middleName=i.slice(1,i.length-1);this.familyName=i[i.length-1]}}},_findPatronymicName:function(i){var e,s;for(e=0;e<i.length;e++){s=i[e];if(typeof s==="string"){s=s.toLowerCase();var t=this.info.patronymicName.length;while(t--){if(s.indexOf(this.info.patronymicName[t])!==-1)return e}}}return-1},_isPatronymicName:function(i){var e;if(typeof i==="string"){e=i.toLowerCase();var s=this.info.patronymicName.length;while(s--){if(e.indexOf(this.info.patronymicName[s])!==-1)return true}}return false},_findFamilyName:function(i){var e,s,t;for(e=0;e<i.length;e++){s=i[e];if(typeof s==="string"){s=s.toLowerCase();var n=s.length-1;if(this.info.familyName.indexOf(s)!==-1){return e}else if(s[n]==="в"||s[n]==="н"||s[n]==="й"){t=s.slice(0,-1);if(this.info.familyName.indexOf(t)!==-1){return e}}else if(s[n-1]==="в"&&s[n]==="а"||s[n-1]==="н"&&s[n]==="а"||s[n-1]==="а"&&s[n]==="я"){t=s.slice(0,-2);if(this.info.familyName.indexOf(t)!==-1){return e}}}}return-1},_parseRussianName:function(i){var e,s=-1;if(i.length===1){if(this.prefix||typeof i[0]==="object"){this.familyName=i[0]}else{this.givenName=i[0]}}else if(i.length===2){if(this.info.order==="fgm"){this.givenName=i[1];this.familyName=i[0]}else if(this.info.order==="gmf"){this.givenName=i[0];this.familyName=i[1]}else if(typeof this.info.order==="undefined"){if(this._isPatronymicName(i[1])===true){this.middleName=i[1];this.givenName=i[0]}else if((s=this._findFamilyName(i))!==-1){if(s===1){this.givenName=i[0];this.familyName=i[1]}else{this.familyName=i[0];this.givenName=i[1]}}else{this.givenName=i[0];this.familyName=i[1]}}}else if(i.length>=3){e=this._findLastConjunction(i);var t=this._findPatronymicName(i);if(e>0){this.givenName=i.slice(0,e+2);if(e+1<i.length-1){this.familyName=i.splice(i.length-1,1);if(e+2<i.length-1){this.middleName=i.slice(e+2,i.length-e-3)}}else if(this.order=="fgm"){this.familyName=i.slice(0,e+2);if(e+1<i.length-1){this.middleName=i.splice(i.length-1,1);if(e+2<i.length-1){this.givenName=i.slice(e+2,i.length-e-3)}}}}else if(t!==-1){this.middleName=i[t];if(t===i.length-1){this.familyName=i[0];this.givenName=i.slice(1,t)}else{this.givenName=i.slice(0,t);this.familyName=i[i.length-1]}}else{this.givenName=i[0];this.middleName=i.slice(1,i.length-1);this.familyName=i[i.length-1]}}},_parseWesternName:function(i){if(this.locale.getLanguage()==="es"||this.locale.getLanguage()==="pt"){this._parseSpanishName(i)}else if(this.locale.getLanguage()==="ru"){this._parseRussianName(i)}else if(this.locale.getLanguage()==="id"){this._parseIndonesianName(i)}else{this._parseGenericWesternName(i)}},getSortFamilyName:function(){var i,e,s,t,n;if(!this.familyName){return undefined}if(this.info){if(this.info.sortByHeadWord){if(typeof this.familyName==="string"){i=this.familyName.replace(/\s+/g," ");t=i.trim().split(" ")}else{t=this.familyName}e=this._findPrefix(t,this.info.auxillaries,false);if(e&&e.length>0){if(typeof this.familyName==="string"){s=e.join(" ");i=this.familyName.substring(s.length+1)+", "+s}else{i=t.slice(e.length).join(" ")+", "+t.slice(0,e.length).join(" ")}}}else if(this.info.knownFamilyNames&&this.familyName){t=this.familyName.split("");var a=this._findPrefix(t,this.info.knownFamilyNames,true,this.info.noCompoundFamilyNames);i="";for(n=0;n<a.length;n++){i+=this.info.knownFamilyNames[a[n]]||""}}}return i||this.familyName},getHeadFamilyName:function(){},clone:function(){return new Name(this)}};module.exports=Name;