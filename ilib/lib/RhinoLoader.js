importPackage(java.io);var ilib=require("./ilib.js");var path=require("./Path.js");var Loader=require("./Loader.js");var RhinoLoader=function(){this.parent.call(this,ilib);this.root=module.filename?path.dirname(path.join(module.filename,"..")):environment["user.dir"];this.root=this.root.replace("file://","");if(this.root[this.root.length-1]==="/"){this.root=this.root.substring(0,this.root.length-1)}this.includePath.push(path.join(this.root,"resources"));this._exists(path.join(this.root,"locale"),"localeinfo.json");this._exists("/usr/share/javascript/ilib/locale","localeinfo.json")};RhinoLoader.prototype=new Loader;RhinoLoader.prototype.parent=Loader;RhinoLoader.prototype.constructor=RhinoLoader;RhinoLoader.prototype._loadFile=function(o,e,t){console.log("RhinoLoader._loadFile: attempting to load "+o);var i="";var r;try{r=new BufferedReader(new InputStreamReader(new FileInputStream(o),"utf-8"));var a;while((a=r.readLine())!==null){i+=a+"\n"}}catch(n){i=undefined}finally{if(r){try{r.close()}catch(s){}}t&&typeof t==="function"&&t(i)}return i};RhinoLoader.prototype._exists=function(o,e){var t=path.normalize(path.join(o,e));console.log("RhinoLoader._exists: checking for the existence of "+t);var i=new File(t);if(i.exists()&&i.canRead()){console.log("RhinoLoader._exists: found");this.includePath.push(o)}};module.exports=RhinoLoader;