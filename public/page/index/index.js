!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var o=n(1),a=r(o),i=n(2),u=r(i),c=n(13),s=r(c),f=window.APP_PROPS;u["default"].render(a["default"].createElement(s["default"],f),document.getElementById("app"))},function(e,t){e.exports=React},function(e,t){e.exports=ReactDOM},,function(e,t,n){(function(t){"use strict";function r(e){if(e=e||"",e.startsWith("/")||(e="/"+e),void 0!==("undefined"==typeof t?"undefined":o(t))){var r=function(){var t=n(6);return/^\/(page|css|img|js)\//.test(e)&&(e=e.replace(/\.[^\/]+$/,function(e){return"."+t+e})),{v:a+e}}();if("object"===("undefined"==typeof r?"undefined":o(r)))return r.v}return e}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},a="http://cdn.liaozhongwu.com";r.URL=a,e.exports=r}).call(t,n(5))},function(e,t){function n(){s&&i&&(s=!1,i.length?c=i.concat(c):f=-1,c.length&&r())}function r(){if(!s){var e=setTimeout(n);s=!0;for(var t=c.length;t;){for(i=c,c=[];++f<t;)i&&i[f].run();f=-1,t=c.length}i=null,s=!1,clearTimeout(e)}}function o(e,t){this.fun=e,this.array=t}function a(){}var i,u=e.exports={},c=[],s=!1,f=-1;u.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new o(e,t)),1!==c.length||s||setTimeout(r,0)},o.prototype.run=function(){this.fun.apply(null,this.array)},u.title="browser",u.browser=!0,u.env={},u.argv=[],u.version="",u.versions={},u.on=a,u.addListener=a,u.once=a,u.off=a,u.removeListener=a,u.removeAllListeners=a,u.emit=a,u.binding=function(e){throw new Error("process.binding is not supported")},u.cwd=function(){return"/"},u.chdir=function(e){throw new Error("process.chdir is not supported")},u.umask=function(){return 0}},function(e,t){e.exports="e9c1e6"},,,,,,,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(1),s=r(c),f=n(14),l=r(f),d=n(4),p=r(d),m=function(e){function t(e){o(this,t);var n=a(this,Object.getPrototypeOf(t).call(this));return n.state={current:(0,l["default"])(e.imgs),animationType:null,animationState:null},n}return i(t,e),u(t,null,[{key:"getMeta",value:function(){return{title:"廖仲武的个人网站 - Liaozhongwu's Personal Website",description:"廖仲武的个人网站 - Liaozhongwu's Personal Website",cssFile:["/css/theme.css","/page/index/index.css"],jsFile:["/page/index/index.js"]}}}]),u(t,[{key:"onChange",value:function(){for(var e=this,t=["fade","scalex","scaley"],n=this.props.imgs,r=this.state,o=r.current,a=r.animationType,i=void 0,u=void 0;;)if(i=(0,l["default"])(n),i!==o)break;for(;;)if(u=(0,l["default"])(t),u!==a)break;this.setState({animationType:u,animationState:"leave"},function(){setTimeout(function(){e.setState({current:i,animationState:"enter"})},500)})}},{key:"render",value:function(){var e=this,t=this.props.imgs,n=this.state,r=n.current,o=n.animationType,a=n.animationState;return s["default"].createElement("div",{className:"main",onClick:function(t){return e.onChange()}},t.map(function(e,t){var n="background";return e===r?o&&a&&(n+=" background-"+o+"-"+a):n+=" background-hidden",s["default"].createElement("img",{key:t,className:n,src:(0,p["default"])(e)})}),s["default"].createElement("div",{className:"box",onClick:function(e){return e.stopPropagation()}},s["default"].createElement("div",{className:"avatar"}),s["default"].createElement("p",null,"stay hungry. stay foolish."),s["default"].createElement("nav",{className:"nav"},s["default"].createElement("a",{href:"/"},"Home"),s["default"].createElement("a",{href:"/blogs"},"Blog"),s["default"].createElement("a",{href:"/about"},"About"))))}}]),t}(s["default"].Component);t["default"]=m},function(e,t){"use strict";e.exports=function(e){return e[Math.floor(e.length*Math.random())]}}]);