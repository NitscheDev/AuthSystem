"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[601],{601:function(a,e,t){t.r(e),t.d(e,{default:function(){return p}});var n=t(252),u=t(577),s=t(262),l=t(131);const c=a=>((0,n.dD)("data-v-39514118"),a=a(),(0,n.Cn)(),a),o={class:"Home"},i=c((()=>(0,n._)("h1",{class:"title"},"Authentication System",-1))),r={class:"desc"};var d={__name:"HomeView",setup(a){const e=(0,s.iH)("");let t=(0,s.iH)("");(0,n.bv)((async()=>{const a=localStorage.getItem("user"),t=await fetch("/api/user?id="+a),n=await t.json();e.value=n.user.fullname,c()}));const c=()=>{const a=(new Date).getDay();return 0===a?t.value="Sunday":1===a?t.value="Monday":2===a?t.value="Tuesday":3===a?t.value="Wednesday":4===a?t.value="Thursday":5===a?t.value="Friday":6===a?t.value="Saturday":void 0},d=async()=>{await fetch("/api/logout"),localStorage.removeItem("user"),l.Z.push("login")};return(a,l)=>((0,n.wg)(),(0,n.iD)("div",o,[i,(0,n._)("p",r,[(0,n.Uk)("Happy "+(0,u.zw)((0,s.SU)(t))+", ",1),(0,n._)("b",null,(0,u.zw)(e.value)+"!",1)]),(0,n._)("div",{class:"container"},[(0,n._)("button",{onClick:d},"logout")])]))}},v=t(744);const y=(0,v.Z)(d,[["__scopeId","data-v-39514118"]]);var p=y}}]);
//# sourceMappingURL=601.fb8e0a80.js.map