(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{244:function(t,e,r){"use strict";r.r(e);r(26);var n=r(4),o={auth:!1,data:function(){return{user:{first_name:"test",last_name:"testing",email:"test@test.com",password:"123"}}},methods:{register:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$axios.post("register",this.user);case 3:return t.next=5,this.$auth.loginWith("local",{data:this.user});case 5:this.$router.push("/"),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),this.error=t.t0.response.data.message;case 11:case"end":return t.stop()}},t,this,[[0,8]])}));return function(){return t.apply(this,arguments)}}()}},c=r(31),component=Object(c.a)(o,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"vertical-center"},[r("div",{staticClass:"container"},[r("div",{staticClass:"card"},[r("div",{staticClass:"card-header"},[t._v("Login / Register")]),t._v(" "),r("div",{staticClass:"card-body"},[r("form",[t._m(0),t._v(" "),t._m(1),t._v(" "),r("div",{staticClass:"form-group row justify-content-md-center"},[r("div",{staticClass:"col col-md-6"},[r("button",{staticClass:"btn btn-primary btn-lg col-md-12",attrs:{type:"submit"},on:{click:function(e){return e.preventDefault(),t.register(e)}}},[t._v("Login / Register")])])])]),t._v(" "),r("hr",{staticClass:"hr-text",attrs:{"data-content":"OR"}}),t._v(" "),r("div",{staticClass:"row justify-content-md-center"},[r("div",{staticClass:"col col-md-6"},[r("a",{staticClass:"btn btn-block btn-google btn-social btn-lg",attrs:{href:"/auth/google"},on:{click:function(e){return e.preventDefault(),t.AuthProvider("google")}}},[r("i",{staticClass:"fa fa-google-plus"}),t._v("Login with Google  \n                        ")]),t._v(" "),r("a",{staticClass:"btn btn-block btn-facebook btn-social btn-lg",attrs:{href:"/auth/facebook"},on:{click:function(e){return e.preventDefault(),t.AuthProvider("facebook")}}},[r("i",{staticClass:"fa fa-facebook"}),t._v("Login with Facebook\n                        ")])])])])]),t._v(" "),r("div",{staticClass:"row justify-content-md-end"})])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"form-group row justify-content-md-center"},[e("div",{staticClass:"col-sm-6"},[e("input",{staticClass:"form-control",attrs:{type:"text",name:"email",id:"email",placeholder:"Enter Email"}})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"form-group row justify-content-md-center"},[e("div",{staticClass:"col-sm-6"},[e("input",{staticClass:"form-control",attrs:{type:"password",name:"password",id:"password",placeholder:"Password"}})])])}],!1,null,null,null);e.default=component.exports}}]);