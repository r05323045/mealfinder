(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a4729e34"],{1142:function(t,e,r){},"43ef":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"record-page"},[r("Navbar"),r("div",{staticClass:"record-container"},[r("div",{staticClass:"main-title"},[t._v("在 "+t._s(t._f("normalDate")(t.order.createdAt))+" 的訂單紀錄")]),r("div",{staticClass:"info-and-comment"},[r("div",{staticClass:"information-container"},[r("div",{staticClass:"information-body"},[t.order.OrderItem?r("div",{staticClass:"item-wrapper product"},[t._m(0),t._l(t.order.OrderItem,(function(e){return r("div",{key:e.id,staticClass:"content-wrapper"},[r("div",{staticClass:"content"},[t._v(t._s(e.Coupon.description))]),r("div",{staticClass:"count"},[t._v("x "+t._s(e.quantity))])])}))],2):t._e(),r("div",{staticClass:"item-wrapper"},[t._m(1),r("div",{staticClass:"content"},[t._v(" "+t._s(t._f("normalDate")(t.expireData))+" ")])]),r("div",{staticClass:"item-wrapper"},[t._m(2),t.order.OrderItem?r("div",{staticClass:"content"},[t._v(t._s(t.order.OrderItem.map((function(t){return t.quantity})).reduce((function(t,e){return t+e}),0)))]):t._e()]),r("div",{staticClass:"item-wrapper"},[t._m(3),r("div",{staticClass:"content"},[r("span",{staticClass:"name"},[t._v(t._s(t.order.name))])])]),r("div",{staticClass:"item-wrapper"},[t._m(4),r("div",{staticClass:"content"},[t._v(t._s(t.order.email))])]),t._m(5),r("div",{staticClass:"item-wrapper"},[t._m(6),r("div",{staticClass:"content"},[t._v(t._s(t._f("priceFormat")(t.order.total_amount)))])])])])])]),r("div",{ref:"footer"},[r("Footer")],1)],1)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"top-wrapper"},[a("img",{staticClass:"icon restaurant",attrs:{src:r("5d27")}}),a("div",{staticClass:"title"},[t._v("商品名稱")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"top-wrapper"},[a("img",{staticClass:"icon clock",attrs:{src:r("e0f8")}}),a("div",{staticClass:"title"},[t._v("使用期限")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"top-wrapper"},[a("img",{staticClass:"icon profile",attrs:{src:r("b855")}}),a("div",{staticClass:"title"},[t._v("商品數量")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"top-wrapper"},[a("img",{staticClass:"icon profile",attrs:{src:r("b855")}}),a("div",{staticClass:"title"},[t._v("購買人姓名")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"top-wrapper"},[a("img",{staticClass:"icon email",attrs:{src:r("9055")}}),a("div",{staticClass:"title"},[t._v("購買人Email")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"item-wrapper"},[a("div",{staticClass:"top-wrapper"},[a("img",{staticClass:"icon map",attrs:{src:r("a086")}}),a("div",{staticClass:"title"},[t._v("付款方式")])]),a("div",{staticClass:"content"},[t._v("信用卡")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"top-wrapper"},[a("img",{staticClass:"icon map",attrs:{src:r("a086")}}),a("div",{staticClass:"title"},[t._v("付款金額")])])}],i=(r("96cf"),r("1da1")),n=r("5530"),c=r("2fa3"),o=r("2f62"),d=r("644d"),l=r("d178"),u=r("fd2d"),p={data:function(){return{tabFuture:!0,order:{},expireData:new Date}},components:{Navbar:l["a"],Footer:u["default"]},created:function(){this.fetchOrder()},computed:Object(n["a"])({},Object(o["b"])(["currentUser","isAuthenticated"])),methods:{fetchOrder:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var r,a,s,i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d["a"].getOrder(t.$route.params.id);case 3:r=e.sent,a=r.data,t.order=a.order,s=new Date(t.order.createdAt).getFullYear(),i=new Date(t.order.createdAt).getMonth(),n=new Date(t.order.createdAt).getDate(),t.expireData=new Date(s+1,i,n),e.next=16;break;case 12:e.prev=12,e.t0=e["catch"](0),console.log(e.t0),c["a"].fire({icon:"error",title:"目前無法取得所有歷史訂單"});case 16:case"end":return e.stop()}}),e,null,[[0,12]])})))()}}},v=p,f=(r("4552"),r("2877")),m=Object(f["a"])(v,a,s,!1,null,null,null);e["default"]=m.exports},4552:function(t,e,r){"use strict";r("1142")},"5d27":function(t,e,r){t.exports=r.p+"img/restaurant.64e7e302.svg"},"644d":function(t,e,r){"use strict";var a=r("2fa3"),s=function(){return localStorage.getItem("token")};e["a"]={getCart:function(){return a["b"].get("/cart",{headers:{Authorization:"Bearer ".concat(s())}})},postCart:function(t){return a["b"].post("/cart",t,{headers:{Authorization:"Bearer ".concat(s())}})},deleteCart:function(t){return a["b"].delete("/cart/".concat(t),{headers:{Authorization:"Bearer ".concat(s())}})},addCartItem:function(t){return a["b"].post("/cartItem/".concat(t,"/add"),{headers:{Authorization:"Bearer ".concat(s())}})},reduceCartItem:function(t){return a["b"].post("/cartItem/".concat(t,"/reduce"),{headers:{Authorization:"Bearer ".concat(s())}})},postOrder:function(t){return a["b"].post("/order",t,{headers:{Authorization:"Bearer ".concat(s())}})},getOrders:function(){return a["b"].get("/order",{headers:{Authorization:"Bearer ".concat(s())}})},getOrder:function(t){return a["b"].get("/order/".concat(t),{headers:{Authorization:"Bearer ".concat(s())}})}}},9055:function(t,e,r){t.exports=r.p+"img/email.7a01161c.svg"},a086:function(t,e,r){t.exports=r.p+"img/map.b6a9f4f5.svg"},b855:function(t,e,r){t.exports=r.p+"img/profile.0f180f0a.svg"},e0f8:function(t,e,r){t.exports=r.p+"img/clock.8f8a9c12.svg"}}]);
//# sourceMappingURL=chunk-a4729e34.384d5efc.js.map