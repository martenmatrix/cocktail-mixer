(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},,function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),a=n(10),s=n.n(a),u=(n(15),n(3)),i=(n(16),n(2)),o=n.n(i),l=n(4),j=n(5),d=window.location.href.slice(0,-6),b="".concat(d,":").concat(4e3,"/");function p(){return f.apply(this,arguments)}function f(){return(f=Object(l.a)(o.a.mark((function e(){var t,n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(b+"status");case 3:return t=e.sent,e.next=6,t.json();case 6:return n=e.sent,r=Object(j.a)({online:!0},n),e.abrupt("return",r);case 11:return e.prev=11,e.t0=e.catch(0),e.abrupt("return",{online:!1});case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}function O(){return(O=Object(l.a)(o.a.mark((function e(t){var n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(b+"password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:t})});case 3:return n=e.sent,e.next=6,n.json();case 6:return r=e.sent,e.abrupt("return",r);case 10:return e.prev=10,e.t0=e.catch(0),e.abrupt("return",{success:!1});case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function h(){return v.apply(this,arguments)}function v(){return(v=Object(l.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(b+"pumps");case 3:return t=e.sent,e.next=6,t.json();case 6:if(n=e.sent,200===t.status){e.next=9;break}throw new Error(n.error);case 9:return e.abrupt("return",{json:n,success:!0});case 12:return e.prev=12,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",{error:e.t0,success:!1});case 16:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}function x(){return m.apply(this,arguments)}function m(){return(m=Object(l.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(b+"drink/ingredients");case 3:return t=e.sent,e.next=6,t.json();case 6:if(n=e.sent,200===t.status){e.next=9;break}throw new Error(n.error);case 9:return e.abrupt("return",{drinks:n,success:!0});case 12:return e.prev=12,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",{error:e.t0,success:!1});case 16:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}function g(){return(g=Object(l.a)(o.a.mark((function e(t,n,r){var c,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(b+"setPump",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:t,pump:n,newSelection:r})});case 3:return c=e.sent,e.next=6,c.json();case 6:if(a=e.sent,200===c.status){e.next=9;break}throw new Error(a.error);case 9:return e.abrupt("return",{success:!0});case 12:return e.prev=12,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",{error:e.t0,success:!1});case 16:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}function y(e,t,n){return k.apply(this,arguments)}function k(){return(k=Object(l.a)(o.a.mark((function e(t,n,r){var c,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(b+"drink/addIngredient",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:t,ingredient:n,category:r})});case 3:return c=e.sent,e.next=6,c.json();case 6:return a=e.sent,e.abrupt("return",a);case 10:return e.prev=10,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",{error:e.t0,success:!1});case 14:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function w(e,t,n){return C.apply(this,arguments)}function C(){return(C=Object(l.a)(o.a.mark((function e(t,n,r){var c,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(b+"drink/removeIngredient",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:t,ingredient:n,category:r})});case 3:return c=e.sent,e.next=6,c.json();case 6:return a=e.sent,e.abrupt("return",a);case 10:return e.prev=10,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",{error:e.t0,success:!1});case 14:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function S(e){return N.apply(this,arguments)}function N(){return(N=Object(l.a)(o.a.mark((function e(t){var n,r,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=JSON.stringify(t),e.prev=1,e.next=4,fetch(b+"drink/add",{method:"PATCH",headers:{"Content-Type":"application/json"},body:n});case 4:return r=e.sent,e.next=7,r.json();case 7:return c=e.sent,e.abrupt("return",c);case 11:return e.prev=11,e.t0=e.catch(1),e.abrupt("return",{error:e.t0,success:!1});case 14:case"end":return e.stop()}}),e,null,[[1,11]])})))).apply(this,arguments)}function T(){return E.apply(this,arguments)}function E(){return(E=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",["ml","cl","tsp","tbsp"]);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function D(){return(D=Object(l.a)(o.a.mark((function e(t,n){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch(b+"startPump",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t,time:n})});case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function I(){return A.apply(this,arguments)}function A(){return(A=Object(l.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(b+"drink/all",{method:"GET",headers:{"Content-Type":"application/json"}});case 3:return t=e.sent,e.next=6,t.json();case 6:return n=e.sent,e.abrupt("return",{success:!0,response:n});case 10:return e.prev=10,e.t0=e.catch(0),e.abrupt("return",{success:!1});case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function M(e){return P.apply(this,arguments)}function P(){return(P=Object(l.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return fetch(b+"drink/make",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t})}),e.abrupt("return",!0);case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}n(18);var L=n(0);function J(e){var t=e.children,n=e.onClick;return Object(L.jsx)("div",{className:"button red",onClick:n,children:t})}function U(e){var t=e.children,n=e.onClick;return Object(L.jsx)("div",{className:"button green",onClick:n,children:t})}function W(e){var t=e.children,n=e.onClick,r=e.onMouseDown,c=e.onMouseUp,a=e.onMouseLeave;return Object(L.jsx)("div",{className:"button attention",onClick:n,onMouseDown:r,onMouseUp:c,onMouseLeave:a,children:t})}function R(e){var t=e.children,n=e.onClick;return Object(L.jsx)("button",{onClick:n,className:"remove",children:t})}n(20);function H(e){var t=e.cbWhenPressed;return Object(L.jsx)("button",{className:"close-button",onClick:t})}function q(){return Object(L.jsx)("div",{className:"blur-background"})}function B(e){var t=e.children,n=e.cbToClose,c=Object(r.useState)(0),a=Object(u.a)(c,2),s=a[0],i=a[1];function o(){i(0),setTimeout(n,200)}return Object(r.useEffect)((function(){setTimeout((function(){i(1)}),50)}),[]),Object(r.useEffect)((function(){return document.addEventListener("keydown",(function(e){"Escape"===e.code&&o()})),function(){document.removeEventListener("keydown",(function(e){"Escape"===e.code&&o()}))}}),[]),Object(L.jsxs)("div",{className:"white-content-overlay",style:{opacity:s},children:[Object(L.jsx)(q,{}),Object(L.jsxs)("div",{className:"settings-container",children:[t,Object(L.jsx)(H,{cbWhenPressed:o})]})]})}n(21);function F(){return localStorage.getItem("password")}function G(e){var t=Object(r.useState)(""),n=Object(u.a)(t,2),c=n[0],a=n[1],s=Object(r.useState)(!1),i=Object(u.a)(s,2),o=i[0],l=i[1],j=e.cbWhenCorrect;function d(){""===c&&l(!0),function(e){return O.apply(this,arguments)}(c).then((function(e){e.correct?(j(),function(e){localStorage.setItem("password",e)}(c)):l(!0)}))}return Object(r.useEffect)((function(){var e=setTimeout((function(){return l(!1)}),500);return function(){return clearTimeout(e)}}),[o]),Object(r.useEffect)((function(){var e=function(e){"Enter"===e.code&&d()};return document.addEventListener("keydown",e),function(){return document.removeEventListener("keydown",e)}})),Object(L.jsxs)("div",{className:"password-input ".concat(o?"invalid":""),children:[Object(L.jsx)("input",{value:c,onChange:function(e){var t=e.currentTarget.value;a(t)},type:"password"}),Object(L.jsx)("button",{className:"submit",onClick:d,children:"Submit"})]})}function z(e){var t=e.onChange,n=e.selectedDrink,c=Object(r.useState)(),a=Object(u.a)(c,2),s=a[0],i=a[1],j=function(){var e=Object(r.useState)(),t=Object(u.a)(e,2),n=t[0],c=t[1];return Object(r.useEffect)((function(){function e(){return(e=Object(l.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x();case 2:t=e.sent,c(t.drinks);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),n}();return Object(r.useEffect)((function(){i(n||"empty")}),[n]),j&&s?Object(L.jsxs)("select",{value:s,onChange:function(e){var n=e.target.value;i(n);try{t(e)}catch(r){console.log("Did you define an onChange prop? "+r)}},children:[Object(L.jsx)("option",{value:"empty",children:"Empty"},"empty"),Object.entries(j).map((function(e){var t,n=Object(u.a)(e,2),r=n[0],c=n[1];return Object(L.jsx)("optgroup",{label:r,children:(t=c,t.map((function(e,t){return Object(L.jsx)("option",{value:e,children:e},t)})))},r)}))]}):Object(L.jsx)("select",{disabled:!0,children:Object(L.jsx)("option",{value:"loading",children:"Loading..."})})}function K(e){var t=e.onChange,n=e.selectedCategory,c=Object(r.useState)(),a=Object(u.a)(c,2),s=a[0],i=a[1],j=Object(r.useState)(),d=Object(u.a)(j,2),b=d[0],p=d[1];function f(){return f=Object(l.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x();case 2:t=e.sent,n=Object.entries(t.drinks).map((function(e){var t=Object(u.a)(e,2),n=t[0];t[1];return n})),p(n);case 5:case"end":return e.stop()}}),e)}))),f.apply(this,arguments)}return Object(r.useEffect)((function(){!function(){f.apply(this,arguments)}(),n&&i(n)}),[n]),Object(L.jsxs)("select",{className:"ingredients-category-selector",value:s,onChange:function(e){var n=e.target.value;i(n);try{t(n)}catch(r){console.log("Did you define an onChange prop? "+r)}},children:[Object(L.jsx)("option",{value:"",children:"Select category"}),b?b.map((function(e){return Object(L.jsx)("option",{value:e,children:e},e)})):Object(L.jsx)("option",{children:"Loading..."})]})}function Q(e){var t=e.pumpNumber,n="pump"+t;return Object(L.jsxs)("div",{className:"pump-setting",children:[Object(L.jsx)("div",{children:n}),Object(L.jsx)(z,{onChange:function(e){var n=e.target.value;!function(e,t,n){g.apply(this,arguments)}(F(),t,n)},selectedDrink:e.selectedDrink})]})}function V(){var e=Object(r.useState)(),t=Object(u.a)(e,2),n=t[0],c=t[1];function a(){return s.apply(this,arguments)}function s(){return(s=Object(l.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h();case 2:t=e.sent,n=t.json.pumps,c(n);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(r.useEffect)((function(){a()}),[]),Object(L.jsxs)("div",{className:"pump-settings",children:[Object(L.jsx)("div",{className:"pumps",children:n?n.map((function(e,t){return Object(L.jsx)(Q,{pumpNumber:e.id,selectedDrink:e.select},t)})):Object(L.jsx)("div",{children:"Loading..."})}),Object(L.jsx)(U,{onClick:function(){c(void 0),a()},children:"Refresh"})]})}function X(e){var t=Object(r.useState)(),n=Object(u.a)(t,2),c=n[0],a=n[1],s=Object(r.useState)(),i=Object(u.a)(s,2),j=i[0],d=i[1],b=Object(r.useState)(!1),p=Object(u.a)(b,2),f=p[0],O=p[1],h=e.closecb;function v(){return(v=Object(l.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),j&&c){e.next=3;break}return e.abrupt("return");case 3:return O(!0),n=F(),e.next=7,y(n,j,c);case 7:e.sent&&d(),O(!1),h();case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return f?Object(L.jsx)("div",{children:"Adding..."}):Object(L.jsxs)("div",{className:"add-ingredient",children:[Object(L.jsx)("div",{className:"add-ingredient-title",children:"Add Ingredient"}),Object(L.jsxs)("form",{className:"add-ingredient-input",onSubmit:function(e){return v.apply(this,arguments)},children:[Object(L.jsx)("input",{type:"text",onChange:function(e){var t=e.currentTarget.value;d(t)},required:!0}),Object(L.jsx)(K,{onChange:a,selectedCategory:c}),Object(L.jsx)("input",{type:"submit",value:"Add",required:!0})]}),Object(L.jsx)(J,{onClick:h,children:"Cancel"})]})}function Y(){return Object(L.jsx)(J,{children:"Remove Drink"})}function Z(e){var t=Object(r.useState)(!1),n=Object(u.a)(t,2),c=n[0],a=n[1],s=Object(r.useState)(),i=Object(u.a)(s,2),j=i[0],d=i[1],b=Object(r.useState)(),p=Object(u.a)(b,2),f=p[0],O=p[1],h=e.closecb;function v(){return(v=Object(l.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(f&&"empty"!==f){e.next=2;break}return e.abrupt("return");case 2:return a(!0),t=F(),e.next=6,w(t,f,j);case 6:h(),a(!1);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return c?Object(L.jsx)("div",{children:"Deleting..."}):Object(L.jsxs)("div",{className:"ingredient delete",children:[Object(L.jsx)(z,{onChange:function(e){var t=e.target.value;O(t);var n=e.currentTarget.selectedIndex,r=e.currentTarget[n].parentElement.label;d(r)}}),Object(L.jsx)(J,{onClick:function(){return v.apply(this,arguments)},children:"Remove Ingredient"}),Object(L.jsx)(J,{onClick:h,children:"Cancel"})]})}function $(){var e=Object(r.useState)(),t=Object(u.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(),s=Object(u.a)(a,2),i=s[0],j=s[1],d=Object(r.useState)(),b=Object(u.a)(d,2),f=b[0],O=b[1];function v(e){return JSON.stringify(e,null,2)}function m(){return g.apply(this,arguments)}function g(){return g=Object(l.a)(o.a.mark((function e(){var t,n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p();case 2:return t=e.sent,c(v(t)),e.next=6,h();case 6:return n=e.sent,j(v(n)),e.next=10,x();case 10:r=e.sent,O(v(r));case 12:case"end":return e.stop()}}),e)}))),g.apply(this,arguments)}return Object(r.useState)((function(){m();var e=setInterval(m,1e3);return function(){return clearInterval(e)}})),Object(L.jsxs)("div",{className:"debug-values",children:[Object(L.jsxs)("div",{className:"debug-container",children:[Object(L.jsx)("div",{className:"debug-title",children:"Status"}),Object(L.jsx)("pre",{className:"debug-value",children:n})]}),Object(L.jsxs)("div",{className:"debug-container",children:[Object(L.jsx)("div",{className:"debug-title",children:"Pumps"}),Object(L.jsx)("pre",{className:"debug-value",children:i})]}),Object(L.jsxs)("div",{className:"debug-container",children:[Object(L.jsx)("div",{className:"debug-title",children:"Drinks"}),Object(L.jsx)("pre",{className:"debug-value",children:f})]})]})}function _(){var e=Object(r.useState)(!1),t=Object(u.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(!1),s=Object(u.a)(a,2),i=s[0],o=s[1],l=Object(r.useState)(!1),j=Object(u.a)(l,2),d=j[0],b=j[1],p=Object(r.useState)(!1),f=Object(u.a)(p,2),O=f[0],h=f[1];return Object(L.jsxs)("div",{className:"settings-hidden",children:[Object(L.jsx)(V,{}),n?Object(L.jsx)(Y,{}):Object(L.jsx)(J,{onClick:function(){return c(!0)},children:"Remove Drink"}),i?Object(L.jsx)(Z,{closecb:function(){return o(!1)}}):Object(L.jsx)(J,{onClick:function(){return o(!0)},children:"Remove Ingredient"}),d?Object(L.jsx)(X,{closecb:function(){return b(!1)}}):Object(L.jsx)(U,{onClick:function(){return b(!0)},children:"Add Ingredient"}),O?Object(L.jsx)($,{}):Object(L.jsx)(U,{onClick:function(){return h(!0)},children:"Debug"})]})}var ee=function(e){var t=Object(r.useState)(!1),n=Object(u.a)(t,2),c=n[0],a=n[1],s=e.cbToClose;return Object(L.jsx)(B,{cbToClose:s,children:c?Object(L.jsx)(_,{}):Object(L.jsx)(G,{cbWhenCorrect:function(){a(!0)}})})},te=n.p+"static/media/settings.8588567d.svg";n(22);function ne(e){var t=e.connected;return Object(L.jsxs)("div",{className:"status",children:[Object(L.jsx)("div",{className:"circle ".concat(t?"green":"red")}),Object(L.jsx)("div",{className:"text",children:t?"Connected":"Disconnected"})]})}function re(e){var t=e.currentTask;return Object(L.jsxs)("div",{className:"task",children:[Object(L.jsx)("div",{className:"current",children:"Current Status:"}),Object(L.jsx)("div",{className:"task",children:t})]})}function ce(e){var t=e.cbWhenPressed;return Object(L.jsx)("div",{onClick:t,className:"settings",children:Object(L.jsx)("img",{src:te,alt:"Settings"})})}var ae=function(e){var t=function(){var e=Object(r.useState)({online:!1,task:"Idle"}),t=Object(u.a)(e,2),n=t[0],c=t[1];function a(){return s.apply(this,arguments)}function s(){return(s=Object(l.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p();case 2:t=e.sent,c(t);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(r.useEffect)((function(){a();var e=setInterval(a,2e3);return function(){return clearInterval(e)}}),[]),n}(),n=t.online,c=t.task,a=e.cbShowSettings;return Object(L.jsxs)("div",{className:"top-header",children:[Object(L.jsx)(ne,{connected:n}),Object(L.jsx)(re,{currentTask:c}),Object(L.jsx)(ce,{cbWhenPressed:a})]})};n(23);function se(e){var t=e.closecb,n=e.drink;function r(){return(r=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M(n.id);case 2:t();case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(L.jsxs)(B,{cbToClose:t,children:[Object(L.jsx)("h2",{className:"title",children:n.name}),Object(L.jsx)(W,{onClick:function(){return r.apply(this,arguments)},children:"Make Drink"})]})}function ue(e){var t=e.category,n=e.drinks,c=Object(r.useState)(!1),a=Object(u.a)(c,2),s=a[0],i=a[1],j=Object(r.useState)(),d=Object(u.a)(j,2),b=d[0],p=d[1];function f(){return(f=Object(l.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i(!0),p(t);case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(L.jsxs)("div",{className:"drink-category",children:[s?Object(L.jsx)(se,{closecb:function(){return i(!1)},drink:b}):null,Object(L.jsx)("div",{className:"name",children:t}),Object(L.jsx)("div",{className:"drinks",children:n.map((function(e,t){return Object(L.jsx)(W,{onClick:function(){return function(e){return f.apply(this,arguments)}(e)},children:e.name},t)}))})]})}function ie(e){var t=Object(r.useState)(),n=Object(u.a)(t,2),c=n[0],a=n[1],s=Object(r.useState)(),i=Object(u.a)(s,2),j=i[0],d=i[1];return Object(r.useEffect)((function(){function e(){return(e=Object(l.a)(o.a.mark((function e(){var t,n,r,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I();case 2:t=e.sent,n=t.response,r=[],c=[],n.forEach((function(e){1===e.hasAlcohol?r.push(e):c.push(e)})),d(r),a(c);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),j&&c?Object(L.jsxs)("div",{className:"drink-categories",children:[Object(L.jsx)(ue,{category:"Alcoholic",drinks:j}),Object(L.jsx)(ue,{category:"Non-alcoholic",drinks:c})]}):Object(L.jsx)("div",{children:"Loading..."})}var oe=function(){return Object(L.jsx)("div",{className:"main",children:Object(L.jsx)(ie,{})})},le=n(9);n(24);function je(e){var t=e.onChange,n=Object(r.useState)(),c=Object(u.a)(n,2),a=c[0],s=c[1],i=Object(r.useState)(),j=Object(u.a)(i,2),d=j[0],b=j[1];return Object(r.useEffect)((function(){function e(){return e=Object(l.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T();case 2:t=e.sent,s(t);case 4:case"end":return e.stop()}}),e)}))),e.apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(L.jsxs)("select",{className:"unit-selector",onChange:function(e){b(e.target.value),t(e)},value:d,children:[d?null:Object(L.jsx)("option",{value:"",children:"Select Unit"}),a?a.map((function(e){return Object(L.jsx)("option",{value:e,children:e},e)})):null]})}function de(e){var t=e.onChange,n=Object(r.useState)(""),c=Object(u.a)(n,2),a=c[0],s=c[1];return Object(L.jsx)("input",{className:"amount-input",type:"number",onChange:function(e){var n=e.target.value;n>1e3||n<0||(s(n),t(e))},max:"1000",min:"1",value:a})}function be(e){var t=e.onDelete,n=e.onIngredientChange,r=e.onAmountChange,c=e.onUnitOfMeasurementChange;return Object(L.jsxs)("div",{className:"ingredient-section",children:[Object(L.jsx)(z,{onChange:function(e){var t=e.target.value;n(t)}}),Object(L.jsx)(de,{onChange:function(e){var t=e.target.value;r(t)}}),Object(L.jsx)(je,{onChange:function(e){var t=e.target.value;c(t)}}),Object(L.jsx)(R,{onClick:t})]})}function pe(e){var t=Object(r.useState)(),n=Object(u.a)(t,2),c=n[0],a=n[1],s=Object(r.useState)([]),i=Object(u.a)(s,2),d=i[0],b=i[1],p=Object(r.useState)(!1),f=Object(u.a)(p,2),O=f[0],h=f[1];function v(){return 0!==d.length&&(d.every((function(e){return 0!=(e.id&&e.ingredient&&e.amount&&e.unit)}))&&0!=c)}function x(){return(x=Object(l.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!v()){e.next=11;break}return h(!0),t={name:c,ingredients:d},e.next=6,S(t);case 6:!0===e.sent.success&&(a(""),b([])),h(!1),e.next=12;break;case 11:alert("Please fill out all fields");case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return O?Object(L.jsx)("div",{className:"add-drink-component",children:"Adding..."}):Object(L.jsxs)(L.Fragment,{children:[Object(L.jsxs)("div",{className:"add-drink-component",children:[Object(L.jsx)("input",{className:"name",type:"text",value:c,onChange:function(e){var t=e.target.value;a(t)}}),d.length?d.map((function(e){return Object(L.jsx)(be,{onDelete:function(){!function(e){b(d.filter((function(t){return t.id!==e})))}(e.id)},onIngredientChange:function(t){return function(e,t){b(d.map((function(n){return n.id===e?Object(j.a)(Object(j.a)({},n),{},{ingredient:t}):n})))}(e.id,t)},onAmountChange:function(t){return function(e,t){b(d.map((function(n){return n.id===e?Object(j.a)(Object(j.a)({},n),{},{amount:t}):n})))}(e.id,t)},onUnitOfMeasurementChange:function(t){return function(e,t){b(d.map((function(n){return n.id===e?Object(j.a)(Object(j.a)({},n),{},{unit:t}):n})))}(e.id,t)}},e.id)})):null,Object(L.jsx)(W,{onClick:function(){b([].concat(Object(le.a)(d),[{id:Math.floor(+Date.now()+Math.random()),ingredient:"",amount:"",unit:""}]))},children:"Add Ingredient"})]}),Object(L.jsx)("div",{className:"submit-container",children:Object(L.jsx)(W,{onClick:function(){return x.apply(this,arguments)},children:"Submit"})})]})}function fe(e){var t=Object(r.useState)([null,null,null,null,null,null,null,null]),n=Object(u.a)(t,2),c=n[0],a=n[1],s=Object(r.useState)(),i=Object(u.a)(s,2),j=i[0],d=i[1];function b(e){var t=setInterval((function(){!function(e,t){D.apply(this,arguments)}(e,500)}),500);a((function(n){var r=Object(le.a)(n);return r[e-1]=t,r}))}function p(e){clearInterval(c[e-1])}return Object(r.useEffect)((function(){function e(){return(e=Object(l.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h();case 2:t=e.sent,d(t.json.pumps);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(L.jsx)("div",{className:"custom-buttons",children:j?j.map((function(e){var t=e.id,n=e.select;return Object(L.jsx)(W,{onMouseDown:function(){b(t)},onMouseUp:function(){p(t)},onMouseLeave:function(){p(t)},children:n},t)})):Object(L.jsx)("div",{children:"Loading..."})})}var Oe=function(){var e=Object(r.useState)(!1),t=Object(u.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(!1),s=Object(u.a)(a,2),i=s[0],o=s[1];return Object(L.jsxs)("div",{className:"footer",children:[n?Object(L.jsx)(B,{cbToClose:function(){return c(!1)},children:Object(L.jsx)(pe,{})}):null,i?Object(L.jsx)(B,{cbToClose:function(){return o(!1)},children:Object(L.jsx)(fe,{})}):null,Object(L.jsx)(W,{onClick:function(){return c(!0)},children:"Add Drink"}),Object(L.jsx)(W,{onClick:function(){return o(!0)},children:"Custom"})]})};var he=function(){var e=Object(r.useState)(!1),t=Object(u.a)(e,2),n=t[0],c=t[1];return Object(L.jsxs)("div",{className:"App",children:[n?Object(L.jsx)(ee,{cbToClose:function(){return c(!1)}}):null,Object(L.jsx)(ae,{cbShowSettings:function(){return c(!0)}}),Object(L.jsx)(oe,{}),Object(L.jsx)(Oe,{})]})};s.a.render(Object(L.jsx)(c.a.StrictMode,{children:Object(L.jsx)(he,{})}),document.getElementById("root"))}],[[25,1,2]]]);
//# sourceMappingURL=main.61cc9d63.chunk.js.map