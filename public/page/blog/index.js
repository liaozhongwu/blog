!function(e){function t(a){if(n[a])return n[a].exports;var o=n[a]={exports:{},id:a,loaded:!1};return e[a].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}var o=n(1),r=a(o),l=n(2),c=a(l),u=n(8),s=a(u),i=window.APP_PROPS;c["default"].render(r["default"].createElement(s["default"],i),document.getElementById("app"))},function(e,t){e.exports=React},function(e,t){e.exports=ReactDOM},,,,,,function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),u=n(1),s=a(u),i=n(9),m=a(i);n(10);var f=function(e){function t(e){o(this,t);var n=r(this,Object.getPrototypeOf(t).call(this));return n.state={blog:e.blog,comments:e.comments,comment:{name:"",phone:"",email:"",content:""},commentMsg:""},n}return l(t,e),c(t,null,[{key:"getMeta",value:function(){return{title:"廖仲武的博客 - Liaozhongwu's Blog",description:"廖仲武的博客 - Liaozhongwu's Blog",cssFile:["/css/theme.css","/css/highlight.css","/page/blog/index.css"],jsFile:["/page/blog/index.js"]}}}]),c(t,[{key:"handleSubmit",value:function(){var e=this,t=this.state,n=t.blog,a=t.comments,o=t.comment;return o.content?o.name?void(0,m["default"])({url:"/comment/save",method:"post",data:{bid:n._id,name:o.name,phone:o.phone,email:o.email,content:o.content},before:function(){e.setState({commentMsg:"submiting..."})},success:function(t){a.push(t),e.setState({comments:a,comment:{name:"",phone:"",email:"",content:""},commentMsg:"submit success"})},error:function(){e.setState({commentMsg:"submit failure"})},complete:function(){setTimeout(function(){e.setState({commentMsg:""})},2e3)}}):void this.setState({commentMsg:"please input your name"}):void this.setState({commentMsg:"please input your content"})}},{key:"handleCommentValueChange",value:function(e,t){var n=this.state.comment;n[e]=t,this.setState({comment:n})}},{key:"render",value:function(){var e=this,t=this.state,n=t.blog,a=t.comments,o=t.comment,r=t.commentMsg;return s["default"].createElement("div",{className:"content"},s["default"].createElement("p",{className:"title"},n.title,s["default"].createElement("span",{className:"time"},n.createTime.toString())),s["default"].createElement("article",{className:"article",dangerouslySetInnerHTML:{__html:n.marked}}),s["default"].createElement("ul",{className:"list"},a.map(function(e,t){return s["default"].createElement("li",{className:"item comment",key:t},s["default"].createElement("p",{className:"comment-title"},s["default"].createElement("span",{className:"comment-label"},e.name,":"),s["default"].createElement("span",{className:"time"},e.createTime.toString())),s["default"].createElement("article",{className:"comment-content",dangerouslySetInnerHTML:{__html:e.marked}}))})),s["default"].createElement("form",{className:"form"},s["default"].createElement("div",{className:"form-group"},s["default"].createElement("label",{className:"label"},"content*:"),s["default"].createElement("div",{className:"form-control"},s["default"].createElement("textarea",{className:"textarea",name:"content",placeholder:"content",required:!0,value:o.content,onChange:function(t){return e.handleCommentValueChange("content",t.target.value)}}))),s["default"].createElement("div",{className:"form-group"},s["default"].createElement("label",{className:"label"},"name*:"),s["default"].createElement("div",{className:"form-control"},s["default"].createElement("input",{className:"input",type:"text",name:"name",placeholder:"name",required:!0,value:o.name,onChange:function(t){return e.handleCommentValueChange("name",t.target.value)}}))),s["default"].createElement("div",{className:"form-group"},s["default"].createElement("label",{className:"label"},"phone:"),s["default"].createElement("div",{className:"form-control"},s["default"].createElement("input",{className:"input",type:"text",name:"phone",placeholder:"phone",value:o.phone,onChange:function(t){return e.handleCommentValueChange("phone",t.target.value)}}))),s["default"].createElement("div",{className:"form-group"},s["default"].createElement("label",{className:"label"},"email:"),s["default"].createElement("div",{className:"form-control"},s["default"].createElement("input",{className:"input",type:"text",name:"email",placeholder:"email",value:o.email,onChange:function(t){return e.handleCommentValueChange("email",t.target.value)}}))),s["default"].createElement("div",{className:"form-group"},s["default"].createElement("label",{className:"label"}),s["default"].createElement("div",{className:"form-control"},s["default"].createElement("input",{className:"btn",type:"button",value:"提交评论",onClick:function(t){return e.handleSubmit()}}),s["default"].createElement("span",{className:"msg-btn"},r)))))}}]),t}(s["default"].Component);t["default"]=f},function(e,t,n){var a,o;!function(){function n(e,t){if(u(t))if(s(e)){if(e.forEach)return e.forEach(t);for(var n=0;n<e.length;++n)t(e[n],n)}else if(c(e))for(var a in e)e.hasOwnProperty(a)&&t(e[a],a)}function r(){for(var e={},t=0;t<arguments.length;++t)n(arguments[t],function(t,n){e[n]=t});return e}function l(e){return"string"==typeof e||"[object String]"===Object.prototype.toString.call(e)}function c(e){return"[object Object]"===Object.prototype.toString.call(e)}function u(e){return"function"==typeof e}function s(e){return Array.isArray?Array.isArray(e):e instanceof Array}function i(e){return l(e)&&/^GET|POST|PUT|HEAD|DELETE|PATCH$/.test(e.toUpperCase())}function m(e){function t(e,o){null===e||void 0===e||u(e)?a.push(encodeURIComponent(o)+"="):c(e)?n(e,function(e,n){t(e,o+"["+n+"]")}):s(e)?n(e,function(e){t(e,o+"[]")}):a.push(encodeURIComponent(o)+"="+encodeURIComponent(e))}var a=[];return n(e,t),a.join("&")}function f(){return"undefined"!=typeof XMLHttpRequest?new XMLHttpRequest:"undefined"!=typeof ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):null}function d(){function e(e,o){T.onreadystatechange=function(){if(4===T.readyState&&!v){b=!0;var r=T.response;T.body=T.response,y.origin&&(r=T),T.status<400&&T.status>=100?(u(y.success)&&y.success(r),u(t)&&t(null,r),u(e)&&e(r)):(a=new Error("Request Error, Response Code: "+T.status),a.code=T.status,T.error=a,n(g,function(e){u(e)&&e(a,T)}),u(y.error)&&y.error(a),u(t)&&t(a,r),u(o)&&o(a)),u(y.complete)&&y.complete(r)}},u(y.before)&&y.before(),y.timeout&&setTimeout(function(){b||(v=!0,a=new Error("Request Timeout, Response Code: 408"),a.code=408,T.error=a,n(g,function(e){u(e)&&e(a,T)}),u(y.error)&&y.error(a),u(t)&&t(a,T),u(o)&&o(a),u(y.complete)&&y.complete(T))},y.timeout),T.send(p)}for(var t,a,o="",s="",d="GET",p=null,y={},v=!1,b=!1,E=0;E<arguments.length;++E){var N=arguments[E];l(N)?o=N:c(N)?y=N:u(N)&&(t=N)}if(y=r(h,y),l(y.url)&&(o=y.url),i(y.method)&&(d=y.method.toUpperCase()),o=o.replace(/:([^\/]+)|\{([^\/]+)\}/g,function(e,t){return y[t]?y[t]:t}),"POST"===d||"PUT"===d||"DELETE"===d)switch(y.format){case"json":y.headers["Content-Type"]="application/json;charset=UTF-8",p=JSON.stringify(y.data);break;case"formdata":if("undefined"!=typeof FormData){y.headers["Content-Type"]="multipart/form-data",y.data instanceof FormData?p=y.data:(p=new FormData,n(y.data,function(e,t){p.append(t,e)}));break}case"form":default:y.headers["Content-Type"]="application/x-www-form-urlencoded;charset=UTF-8",s=m(y.data),s&&(p=s)}else s=m(y.data),s&&(o+=(o.indexOf("?")>=0?"&":"?")+s);var T=f();return null!==T?(T.open(d,o,y.async),n(y.headers,function(e,t){T.setRequestHeader(t,e)}),y.type&&(T.responseType=y.type),"undefined"!=typeof Promise?new Promise(e):void e()):(a=new Error("Your broswer don't support ajax!"),u(y.error)&&y.error(a),u(t)&&t(a),"undefined"!=typeof Promise?Promise.reject(a):void 0)}function p(){return d.apply(this,arguments)}var h={url:"",method:"GET",async:!0,data:{},origin:!1,type:"json",headers:{}},g=[];p.get=function(e,t,n){return d.call(this,{url:e,method:"GET",data:t},n)},p.post=function(e,t,n){return d.call(this,{url:e,method:"POST",data:t},n)},p.setDefault=function(e){return h=r(h,e),p},p.setErrorInterceptor=function(e){return g.push(e),p},"undefined"!=typeof e&&e.exports?e.exports=p:(a=[],o=function(){return p}.apply(t,a),!(void 0!==o&&(e.exports=o)))}()},function(e,t){"use strict";function n(e){return 10>e?"0"+e:""+e}function a(){return this.getFullYear()+"-"+n(this.getMonth()+1)+"-"+n(this.getDate())}function o(){return this.getFullYear()+"-"+n(this.getMonth()+1)+"-"+n(this.getDate())+" "+n(this.getHours())+":"+n(this.getMinutes())+":"+n(this.getSeconds())}Date.prototype.toDate=a,Date.prototype.toDateTime=o,Date.prototype.toString=o,Date.prototype.toJSON=o}]);