(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-28349976"],{"001e":function(t,e,s){t.exports=s.p+"img/phone.b027e13f.svg"},"140f":function(t,e,s){"use strict";s("1828")},1828:function(t,e,s){},"5d27":function(t,e,s){t.exports=s.p+"img/restaurant.64e7e302.svg"},"644d":function(t,e,s){"use strict";var r=s("2fa3"),a=function(){return localStorage.getItem("token")};e["a"]={getCart:function(){return r["b"].get("/user/cart",{headers:{Authorization:"Bearer ".concat(a())}})},postCart:function(t){return r["b"].post("/user/cart",t,{headers:{Authorization:"Bearer ".concat(a())}})},deleteCart:function(t){return r["b"].delete("/user/cart/".concat(t),{headers:{Authorization:"Bearer ".concat(a())}})},addCartItem:function(t){return r["b"].post("/user/cartItem/add",{id:t},{headers:{Authorization:"Bearer ".concat(a())}})},reduceCartItem:function(t){return r["b"].post("/user/cartItem/reduce",{id:t},{headers:{Authorization:"Bearer ".concat(a())}})},postTradeInfo:function(t){return r["b"].post("/user/order",t,{headers:{Authorization:"Bearer ".concat(a())}})},getPaymentInfo:function(t){return r["b"].get("/user/payment/".concat(t),{headers:{Authorization:"Bearer ".concat(a())}})},getOrders:function(){return r["b"].get("/user/order",{headers:{Authorization:"Bearer ".concat(a())}})},getOrder:function(t){return r["b"].get("/user/order/".concat(t),{headers:{Authorization:"Bearer ".concat(a())}})}}},a086:function(t,e,s){t.exports=s.p+"img/map.b6a9f4f5.svg"},ab31:function(t,e,s){"use strict";s("a15b");var r=s("2fa3"),a=function(){return localStorage.getItem("token")};e["a"]={getCoupons:function(t,e){var s=t?"?page=".concat(t):"";return e&&e.length>1&&(s+=e.join("&")),r["b"].get("/coupons".concat(s),{headers:{Authorization:"Bearer ".concat(a())}})},getCoupon:function(t){return r["b"].get("/coupons/".concat(t),{headers:{Authorization:"Bearer ".concat(a())}})}}},e0f8:function(t,e,s){t.exports=s.p+"img/clock.8f8a9c12.svg"},e5bd:function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{ref:"coupon",staticClass:"coupon"},[s("Navbar",{staticClass:"restaurant-navbar"}),s("div",{directives:[{name:"show",rawName:"v-show",value:t.scrollY<60||t.scrollUp,expression:"scrollY < 60 || scrollUp"}],staticClass:"coupon-searchbar-wrapper"},[s("div",{staticClass:"back-wrapper",on:{click:function(e){return t.$router.push("/coupons")}}},[s("div",{staticClass:"icon back"})]),s("div",{staticClass:"searchbar"},[t._e(),t._m(0)]),s("div",{staticClass:"icon-container"},[s("div",{staticClass:"share-wrapper"},[s("div",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:t.copyPath,expression:"copyPath",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:t.onError,expression:"onError",arg:"error"}],staticClass:"icon share"})])])]),s("div",{ref:"info-container",staticClass:"info-container"},[t.coupon.Restaurant?s("div",{staticClass:"mobile-picture-wrapper"},[s("div",{staticClass:"picture",style:"background: url("+t.coupon.Restaurant.picture+") no-repeat center / cover"})]):t._e(),s("div",{ref:"coupon-info",staticClass:"coupon-info"},[t.coupon.Restaurant?s("div",{staticClass:"picture-wrapper"},[s("div",{staticClass:"picture",style:"background: url("+t.coupon.Restaurant.picture+") no-repeat center / cover"})]):t._e(),s("div",{staticClass:"title-wrapper"},[s("h1",{staticClass:"title"},[t._v(" "+t._s(t.coupon.description)+" ")]),s("div",{staticClass:"info-wrapper"},[s("div",{staticClass:"price-wrapper"},[s("div",{staticClass:"icon-container"},[s("div",{staticClass:"share-wrapper"},[s("div",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:t.copyPath,expression:"copyPath",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:t.onError,expression:"onError",arg:"error"}],staticClass:"icon share"})])]),s("div",{staticClass:"price"},[t._v(t._s(t._f("priceFormat")(t.coupon.price)))]),s("div",{staticClass:"unit"},[t._v("/ 個")]),t.coupon.Restaurant?s("div",{staticClass:"origin-price"},[t._v("原價 "+t._s(t._f("priceFormat")(Number(t.coupon.price)+Math.round(100*(5-Number(t.coupon.Restaurant.rating))))))]):t._e()]),s("div",{staticClass:"number-wrapper"},[s("div",{staticClass:"text"},[t._v("數量")]),s("div",{staticClass:"select-wrapper"},[t.productNum<5?s("select",{directives:[{name:"model",rawName:"v-model",value:t.productNum,expression:"productNum"}],staticClass:"select",on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.productNum=e.target.multiple?s:s[0]}}},[s("option",{attrs:{value:"0"}},[t._v("請選擇購買數量")]),s("option",{attrs:{value:"1"}},[t._v("1")]),s("option",{attrs:{value:"2"}},[t._v("2")]),s("option",{attrs:{value:"3"}},[t._v("3")]),s("option",{attrs:{value:"4"}},[t._v("4")]),s("option",{attrs:{value:"5"}},[t._v("5+")])]):t._e(),t.productNum>4?s("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.productNum,expression:"productNum",modifiers:{lazy:!0}}],staticClass:"select input",attrs:{type:"number"},domProps:{value:t.productNum},on:{change:function(e){t.productNum=e.target.value}}}):t._e()])])])]),t._m(1),s("div",{ref:"information-wrapper",staticClass:"information-wrapper"},[s("div",{staticClass:"divider"}),s("div",{staticClass:"title"},[t._v("餐廳資訊")]),t.coupon.Restaurant?s("div",{staticClass:"info-and-map"},[s("div",{staticClass:"map-wrapper"},[s("iframe",{staticClass:"google-map",attrs:{src:"https://www.google.com/maps/embed/v1/place?key="+t.GOOGLE_MAP_API_KEY+"&q="+t.coupon.Restaurant.google_map_url.split("&q=")[1]}})]),s("div",{staticClass:"information-body"},[s("div",{staticClass:"item-wrapper"},[t._m(2),t.coupon.Restaurant?s("div",{staticClass:"content"},[t._v("台北市"+t._s(""+t.coupon.Restaurant.DistrictName+t.coupon.Restaurant.address))]):t._e()]),s("div",{staticClass:"item-wrapper"},[t._m(3),s("div",{staticClass:"content"},[t._v(t._s(t.coupon.Restaurant.tel))])]),s("div",{staticClass:"item-wrapper"},[t._m(4),s("div",{staticClass:"content business-hour",on:{click:function(e){t.showBusinessHour=!t.showBusinessHour}}},[t._v(" "+t._s(t.todayBusinessHours)+" "),s("div",{staticClass:"show-more",class:{showing:t.showBusinessHour}})]),s("div",{directives:[{name:"show",rawName:"v-show",value:t.showBusinessHour,expression:"showBusinessHour"}],staticClass:"business-hour-wrapper"},[s("div",{staticClass:"content-wrapper"},t._l(t.coupon.Restaurant.business_hours,(function(e,r){return s("div",{key:"business_hours-"+r,staticClass:"content"},[t._v(t._s(e))])})),0)])]),s("div",{staticClass:"item-wrapper last"},[t._m(5),s("div",{staticClass:"content"},[t._v(t._s(t.coupon.Restaurant.CategoryName))])])])]):t._e()]),s("div",{staticClass:"eat-now-wrapper"},[s("div",{staticClass:"divider"}),s("div",{staticClass:"title"},[t._v("擔心沒位子用餐？")]),s("div",{staticClass:"illustration-wrapper"},[s("div",{staticClass:"cover"},[s("div",{staticClass:"button",on:{click:function(e){return t.$router.push("/restaurants/"+t.$route.params.id)}}},[t._v("現在訂位")])])])])]),s("div",{ref:"footer"},[s("Footer")],1)]),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.scrollUp,expression:"!scrollUp"}],staticClass:"filter-button-wrapper"},[t.isAuthenticated?s("div",{staticClass:"filter-button",class:{disabled:t.productNum<1},attrs:{disabled:t.productNum<1},on:{click:function(e){t.productNum>0&&t.postCart()}}},[s("div",{staticClass:"button"},[t._v(t._s(t.productNum>0?"加入購物車":"請選擇數量"))])]):t._e(),t.isAuthenticated?t._e():s("div",{staticClass:"filter-button disabled",attrs:{disabled:""},on:{click:function(e){return t.$router.push("/signin")}}},[s("div",{staticClass:"button"},[t._v("請先登入再加入購物車")])])])],1)},a=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[s("div",{staticClass:"text"},[t._v("餐券列表")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"rule-wrapper"},[s("div",{staticClass:"divider"}),s("div",{staticClass:"title"},[t._v("使用說明")]),s("ul",{staticClass:"description"},[s("li",[t._v("本餐券使用期限為1年，請在使用期限內用餐完成，超過使用期限後無法退款")]),s("li",[t._v("本餐券僅能兌換單一餐點，如需加購品項請依餐廳規定補差額")]),s("li",[t._v("本餐券僅供兌換餐點，用餐座位請依餐廳現場安排")]),s("li",[t._v("若餐廳已不提供兌換本餐券所贈送之餐點，請來信 support@mealfinder.com")])])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"top-wrapper"},[r("img",{staticClass:"icon map",attrs:{src:s("a086")}}),r("div",{staticClass:"title"},[t._v("地址")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"top-wrapper"},[r("img",{staticClass:"icon phone",attrs:{src:s("001e")}}),r("div",{staticClass:"title"},[t._v("電話")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"top-wrapper"},[r("img",{staticClass:"icon time",attrs:{src:s("e0f8")}}),r("div",{staticClass:"title"},[t._v("營業時間")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"top-wrapper"},[r("img",{staticClass:"icon map",attrs:{src:s("5d27")}}),r("div",{staticClass:"title"},[t._v("餐廳類型")])])}],o=(s("4160"),s("fb6a"),s("159b"),s("96cf"),s("1da1")),i=s("5530"),n=s("c1df"),c=s.n(n),u=s("2fa3"),l=s("2f62"),p=s("ab31"),d=s("644d"),v=s("d178"),f=s("fd2d"),m={data:function(){return{showModal:!1,scrollY:0,scrollUp:!0,productNum:0,coupon:{},todayBusinessHours:"",showBusinessHour:!1}},components:{Footer:f["default"],Navbar:v["a"]},created:function(){this.fetchCoupon(this.$route.params.id)},mounted:function(){window.addEventListener("scroll",this.onScroll,{passive:!0})},watch:{productNum:function(){this.productNum=this.productNum<0?0:this.productNum}},computed:Object(i["a"])(Object(i["a"])({},Object(l["b"])(["currentUser","isAuthenticated"])),{},{copyPath:function(){return"".concat(window.location)},GOOGLE_MAP_API_KEY:function(){return"AIzaSyCUFAw8OHDSgUFUvBetDdPGUJI8xMGLAGk"}}),methods:{onScroll:function(t){this.scrollUp=this.scrollY>window.scrollY,this.scrollY=window.scrollY},fetchCoupon:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function s(){var r,a,o;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return r=e.$loading.show({isFullPage:!0,opacity:1}),s.prev=1,s.next=4,p["a"].getCoupon(t);case 4:a=s.sent,o=a.data,e.coupon=o,e.coupon.Restaurant.business_hours=JSON.parse(e.coupon.Restaurant.business_hours),e.findTodayBusinessHours(),r.hide(),s.next=17;break;case 12:s.prev=12,s.t0=s["catch"](1),r.hide(),console.log(s.t0),u["a"].fire({icon:"error",title:"目前無法取得餐券資訊，請稍候"});case 17:case"end":return s.stop()}}),s,null,[[1,12]])})))()},findTodayBusinessHours:function(){var t=this;this.coupon.Restaurant.business_hours.forEach((function(e,s){e.slice(0,3)===c()(new Date).format("dddd")&&(t.todayBusinessHours=t.coupon.Restaurant.business_hours[s])}))},postCart:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var s,r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,s={CouponId:t.coupon.id,quantity:t.productNum},e.next=4,d["a"].postCart(s);case 4:if(r=e.sent,a=r.data,"success"===a.status){e.next=8;break}throw new Error(a.message);case 8:u["a"].fire({icon:"success",title:"已新增至購物車"}),t.$router.go(-1),e.next=16;break;case 12:e.prev=12,e.t0=e["catch"](0),console.log(e.t0),u["a"].fire({icon:"error",title:"目前無法新增至購物車"});case 16:case"end":return e.stop()}}),e,null,[[0,12]])})))()},onCopy:function(t){u["a"].fire({icon:"success",title:"複製到剪貼簿"})},onError:function(t){u["a"].fire({icon:"error",title:"目前無法複製，請稍候"})}}},h=m,C=(s("140f"),s("2877")),_=Object(C["a"])(h,r,a,!1,null,null,null);e["default"]=_.exports},fb6a:function(t,e,s){"use strict";var r=s("23e7"),a=s("861d"),o=s("e8b5"),i=s("23cb"),n=s("50c4"),c=s("fc6a"),u=s("8418"),l=s("b622"),p=s("1dde"),d=s("ae40"),v=p("slice"),f=d("slice",{ACCESSORS:!0,0:0,1:2}),m=l("species"),h=[].slice,C=Math.max;r({target:"Array",proto:!0,forced:!v||!f},{slice:function(t,e){var s,r,l,p=c(this),d=n(p.length),v=i(t,d),f=i(void 0===e?d:e,d);if(o(p)&&(s=p.constructor,"function"!=typeof s||s!==Array&&!o(s.prototype)?a(s)&&(s=s[m],null===s&&(s=void 0)):s=void 0,s===Array||void 0===s))return h.call(p,v,f);for(r=new(void 0===s?Array:s)(C(f-v,0)),l=0;v<f;v++,l++)v in p&&u(r,l,p[v]);return r.length=l,r}})}}]);
//# sourceMappingURL=chunk-28349976.ea49568a.js.map