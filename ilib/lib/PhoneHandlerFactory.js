var PhoneHandler=function(){return this};PhoneHandler.prototype={processSubscriberNumber:function(e,r,n){var i;i=e.search(/[xwtp,;]/i);if(i>-1){if(i>0){r.subscriberNumber=e.substring(0,i)}r.extension=e.substring(i).replace("x","")}else{if(e.length){r.subscriberNumber=e}}if(n.plan.getFieldLength("maxLocalLength")&&r.subscriberNumber&&r.subscriberNumber.length>n.plan.getFieldLength("maxLocalLength")){r.invalid=true}},processFieldWithSubscriberNumber:function(e,r,n,i,t,s,u){var c,b;if(r!==undefined&&r>0){b=r;if(s.plan.getTrunkCode()==="0"&&n.charAt(0)==="0"){b+=s.plan.getTrunkCode().length}}else{b=i+1-r}if(t[e]!==undefined){this.processSubscriberNumber(n,t,s)}else{t[e]=n.substring(0,b);if(n.length>b){this.processSubscriberNumber(n.substring(b),t,s)}}c={number:""};return c},processField:function(e,r,n,i,t,s){var u={},c;if(r!==undefined&&r>0){c=r;if(s.plan.getTrunkCode()==="0"&&n.charAt(0)==="0"){c+=s.plan.getTrunkCode().length}}else{c=i+1-r}if(t[e]!==undefined){this.processSubscriberNumber(n,t,s);u.number=""}else{t[e]=n.substring(0,c);u.number=n.length>c?n.substring(c):""}return u},trunk:function(e,r,n,i){var t,s;if(n.trunkAccess!==undefined){this.processSubscriberNumber(e,n,i);e=""}else{s=i.plan.getTrunkCode().length;n.trunkAccess=e.substring(0,s);e=e.length>s?e.substring(s):""}t={number:e};return t},plus:function(e,r,n,i){var t={};if(n.iddPrefix!==undefined){this.processSubscriberNumber(e,n,i);t.number=""}else{n.iddPrefix=e.substring(0,1);t={number:e.substring(1),table:"idd"}}return t},idd:function(e,r,n,i){var t={};if(n.iddPrefix!==undefined){this.processSubscriberNumber(e,n,i);t.number=""}else{n.iddPrefix=e.substring(0,r+1);t={number:e.substring(r+1),table:"idd"}}return t},country:function(e,r,n,i){var t,s;n.countryCode=e.substring(0,r+1);s=n.countryCode.replace(/[wWpPtT\+#\*]/g,"");t={number:e.substring(r+1),countryCode:s};return t},cic:function(e,r,n,i){return this.processField("cic",i.plan.getFieldLength("cic"),e,r,n,i)},service:function(e,r,n,i){return this.processFieldWithSubscriberNumber("serviceCode",i.plan.getFieldLength("serviceCode"),e,r,n,i,false)},area:function(e,r,n,i){var t,s,u,c;s=e.search(/[xwtp]/i);c=s>-1?s:e.length;if(i.plan.getFieldLength("areaCode")>0){u=i.plan.getFieldLength("areaCode");if(i.plan.getTrunkCode()===e.charAt(0)){u+=i.plan.getTrunkCode().length;c-=i.plan.getTrunkCode().length}}else{u=r+1-i.plan.getFieldLength("areaCode")}if(i.plan.getFieldLength("maxLocalLength")!==undefined){if(n.trunkAccess!==undefined||n.mobilePrefix!==undefined||n.countryCode!==undefined||c>i.plan.getFieldLength("maxLocalLength")){n.areaCode=e.substring(0,u);if(e.length>u){this.processSubscriberNumber(e.substring(u),n,i)}}else{this.processSubscriberNumber(e,n,i)}}else{n.areaCode=e.substring(0,u);if(e.length>u){this.processSubscriberNumber(e.substring(u),n,i)}}if(i.plan.getFindExtensions()!==undefined&&n.subscriberNumber!==undefined){var b=n.subscriberNumber.indexOf("-");if(b>-1){n.subscriberNumber=n.subscriberNumber.substring(0,b);n.extension=n.subscriberNumber.substring(b+1)}}t={number:""};return t},none:function(e,r,n,i){var t;if(e.length>0){this.processSubscriberNumber(e,n,i);if(r>0&&r<e.length){n.invalid=true}}t={number:""};return t},vsc:function(e,r,n,i){var t,s,u;if(n.vsc===undefined){s=i.plan.getFieldLength("vsc")||0;if(s!==undefined&&s>0){u=s}else{u=r+1-s}n.vsc=e.substring(0,u);e=e.length>u?"^"+e.substring(u):""}else{this.processSubscriberNumber(e,n,i);e=""}t={number:e};return t},cell:function(e,r,n,i){return this.processFieldWithSubscriberNumber("mobilePrefix",i.plan.getFieldLength("mobilePrefix"),e,r,n,i,false)},personal:function(e,r,n,i){return this.processFieldWithSubscriberNumber("serviceCode",i.plan.getFieldLength("personal"),e,r,n,i,false)},emergency:function(e,r,n,i){return this.processFieldWithSubscriberNumber("emergency",i.plan.getFieldLength("emergency"),e,r,n,i,true)},premium:function(e,r,n,i){return this.processFieldWithSubscriberNumber("serviceCode",i.plan.getFieldLength("premium"),e,r,n,i,false)},special:function(e,r,n,i){return this.processFieldWithSubscriberNumber("serviceCode",i.plan.getFieldLength("special"),e,r,n,i,false)},service2:function(e,r,n,i){return this.processFieldWithSubscriberNumber("serviceCode",i.plan.getFieldLength("service2"),e,r,n,i,false)},service3:function(e,r,n,i){return this.processFieldWithSubscriberNumber("serviceCode",i.plan.getFieldLength("service3"),e,r,n,i,false)},service4:function(e,r,n,i){return this.processFieldWithSubscriberNumber("serviceCode",i.plan.getFieldLength("service4"),e,r,n,i,false)},cic2:function(e,r,n,i){return this.processField("cic",i.plan.getFieldLength("cic2"),e,r,n,i)},cic3:function(e,r,n,i){return this.processField("cic",i.plan.getFieldLength("cic3"),e,r,n,i)},start:function(e,r,n,i){return{number:e}},local:function(e,r,n,i){this.processSubscriberNumber(e,n,i);return{number:""}}};var CSStateHandler=function(){return this};CSStateHandler.prototype=new PhoneHandler;CSStateHandler.prototype.special=function(e,r,n,i){var t;if(e.charAt(0)==="0"){n.trunkAccess=e.charAt(0);n.areaCode=e.substring(1,r)}else{n.areaCode=e.substring(0,r)}this.processSubscriberNumber(e.substring(r),n,i);t={number:""};return t};var USStateHandler=function(){return this};USStateHandler.prototype=new PhoneHandler;USStateHandler.prototype.vsc=function(e,r,n,i){var t;n.vsc=e;t={number:""};return t};var PhoneHandlerFactory=function(e,r){if(r.getContextFree()!==undefined&&typeof r.getContextFree()==="boolean"&&r.getContextFree()===false){return new CSStateHandler}var n=e&&e.getRegion()||"ZZ";switch(n){case"US":return new USStateHandler;break;default:return new PhoneHandler}};module.exports=PhoneHandlerFactory;