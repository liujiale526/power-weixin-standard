webpackJsonp([25],{"4OJT":function(t,e){},xUyL:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("3cXf"),i=s.n(a),o=s("aA9S"),n=s.n(o),r=s("4YfN"),c=s.n(r),l=s("9rMa"),d=s("N8Hv"),u=s("GUsc"),h=s("RAwi"),v=s("CKVb"),f=s("F4+m"),m=s("gyMJ"),_={name:"workflow",mixins:[f.a],data:function(){return{query:{},formState:"",methods:[{text:"串行",Code:"Serial",checked:!1},{text:"并行",Code:"Parallel",checked:!1}],currentMethod:"",MindInfo:"",Current:{},delegateItem:{},HistoryMind:[],UserList:[],defaultUserList:[],RootUserInfo:{},backToRoot:!1,afterSaveMsg:"",mx_isLoading:!1,mx_message:"",mx_alertShow:!1,mx_alertTitle:"提示",mx_toastShow:!1,mx_deleyTime:1e3}},mounted:function(){this.getDelegateingData()},methods:c()({submitData:function(){var t=this,e=this.validSubmitData();if(!e.isPass)return this.MixinAlertShowEvent(e.msg),!1;var s=n()({},{Current:this.Current,FlowOperate:"Delegate",MindInfo:this.MindInfo,Mode:{DelegateMode:this.currentMethod,IsReturnRoot:this.backToRoot},VoteText:"",VoteValue:""});this.MinXinHttpFetch(Object(m.f)(i()(s)),function(e){e.success&&(t.afterSaveMsg="完成提交",t.mx_toastShow=!0,t.GetInformCount().then(function(){t.timer&&clearTimeout(t.timer),t.timer=setTimeout(function(){"view"===t.formState?t.$router.push("/workinfos"):t.$router.back()},1e3)}).catch(function(e){t.AlertShowEvent(e.message)}))})},validSubmitData:function(){var t={msg:"",isPass:!0};return""===this.MindInfo?(t.msg="意见不能为空",t.isPass=!1,t):""===this.currentMethod?(t.msg="请选择委派模式",t.isPass=!1,t):0===this.defaultUserList.length?(t.msg="请选择委派人员",t.isPass=!1,t):t},getDelegateingData:function(){var t=this;this.getQuery();var e=n()({},{SubOperate:"ReadDelegateUsers",FlowOperate:"SupplyInstance",Current:this.query});this.MinXinHttpFetch(Object(m.f)(i()(e)),function(e){if(e.success){var s=e.data.value;t.Current=n()({},s.Current),t.HistoryMind=s.HistoryMind.concat(),s.DelegateItem&&(t.delegateItem=n()({},s.DelegateItem),t.delegateItem=n()({},s.DelegateItem),t.RootUserInfo=t.delegateItem.RootUserInfo,t.defaultUserList=t.delegateItem.UserList.concat(),t.UserList=[t.RootUserInfo].concat(t.delegateItem.UserList),t.organizeData())}})},backToRootEvent:function(){return this.MixinAlertShowEvent("你没有修改的权限"),!1},formatUserList:function(t){var e=this,s=n()({},this.RootUserInfo),a=n()({},this.RootUserInfo),i=this.delegateItem.UserList||[];t&&(i=i.concat(t)),this.backToRoot?(this.UserList=[s].concat(i,[a]),this.UserList.forEach(function(t,s){s===e.UserList.length-1?t.isBootLast=!0:t.isBootLast=!1})):(this.UserList=[s].concat(i),this.UserList.forEach(function(t,e){t.isBootLast=!1}))},switchMethod:function(t){return this.MixinAlertShowEvent("你没有修改的权限"),!1},methodAndbackRoot:function(){"Parallel"===this.currentMethod&&(this.backToRoot=!0)},organizeData:function(){var t=this.delegateItem;this.currentMethod=t.DelegateMode,this.methodAndbackRoot(),this.formatUserList()},goBack:function(){this.$router.back()},getQuery:function(){var t=this.$router.history.current.query;t&&(this.query=n()({},t),this.formState=this.query.FormState)}},Object(l.b)(["GetInformCount","AlertShowEvent"])),components:{CheckIcon:d.default,XTextarea:h.a,Group:v.a,PositionUserList:u.a}},g={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"slide"}},[s("div",{staticClass:"work-flow-delegate"},[s("div",{staticClass:"flow-delegate-content"},[s("div",{staticClass:"delegate-method"},[s("h1",{staticClass:"title font-color-active"},[t._v("委派模式:")]),t._v(" "),s("ul",{staticClass:"method-lists"},t._l(t.methods,function(e,a){return s("li",{key:a,staticClass:"method-list",on:{click:function(s){t.switchMethod(e)}}},[s("div",{staticClass:"methid-list-inner"},[s("div",{staticClass:"text"},[t._v("\n                "+t._s(e.text)+"\n              ")]),t._v(" "),s("div",{staticClass:"icon"},[s("check-icon",{attrs:{checked:e.Code===t.currentMethod}})],1)])])})),t._v(" "),s("div",{staticClass:"back-to-active"},[s("h1",{staticClass:"title font-color-active"},[t._v("是否返还给发起人:")]),t._v(" "),s("div",{staticClass:"back-to-content",on:{click:t.backToRootEvent}},[s("div",{staticClass:"text"},[t._v("\n              是否返还给发起人\n            ")]),t._v(" "),s("div",{staticClass:"icon"},[s("check-icon",{attrs:{checked:t.backToRoot}})],1)])])]),t._v(" "),s("div",{staticClass:"user-content"},[s("h1",{staticClass:"title font-color-active"},[s("div",{staticClass:"text"},[t._v("人员列表:")])]),t._v(" "),s("ul",{staticClass:"user-lists"},t._l(t.UserList,function(e,a){return t.UserList.length>0?s("li",{key:a,staticClass:"user-list"},[0!==a||e.isBootLast?t._e():s("div",{staticClass:"list-inner"},[s("span",{staticClass:"name font-color-active"},[t._v(t._s(e.UserName))]),t._v(" "),s("span",{staticClass:"text"},[s("i",{staticClass:"fa fa-angle-double-right"})])]),t._v(" "),0===a||e.isBootLast?t._e():s("div",{staticClass:"list-inner"},[s("span",{staticClass:"text"},[s("i",{staticClass:"fa fa-angle-double-right"})]),t._v(" "),s("span",{staticClass:"name font-color-active"},[t._v(t._s(e.UserName))]),t._v(" "),"Serial"===t.currentMethod&&a!==t.UserList.length-1?s("span",{staticClass:"text"},[s("i",{staticClass:"fa fa-angle-double-right"})]):t._e()]),t._v(" "),a==t.UserList.length-1&&e.isBootLast?s("div",{staticClass:"list-inner"},[s("span",{staticClass:"text"},[s("i",{staticClass:"fa fa-angle-double-right"})]),t._v(" "),s("span",{staticClass:"name font-color-active"},[t._v(t._s(e.UserName))])]):t._e()]):t._e()}))]),t._v(" "),s("div",{staticClass:"mond-info-content"},[s("h1",{staticClass:"title font-color-active"},[t._v("提交意见:")]),t._v(" "),s("group",{staticClass:"textarea-content"},[s("x-textarea",{attrs:{name:"description",max:300,placeholder:"输入办理意见"},model:{value:t.MindInfo,callback:function(e){t.MindInfo="string"==typeof e?e.trim():e},expression:"MindInfo"}})],1)],1)]),t._v(" "),s("div",{staticClass:"flow-delegate-footer"},[s("div",{staticClass:"item",on:{click:t.submitData}},[t._v("\n        提交\n      ")]),t._v(" "),s("div",{staticClass:"item",on:{click:t.goBack}},[t._v("\n        返回\n      ")])]),t._v(" "),s("loading",{model:{value:t.mx_isLoading,callback:function(e){t.mx_isLoading=e},expression:"mx_isLoading"}}),t._v(" "),s("toast",{attrs:{type:"text",time:t.mx_deleyTime},model:{value:t.mx_toastShow,callback:function(e){t.mx_toastShow=e},expression:"mx_toastShow"}},[t._v(t._s(t.afterSaveMsg))]),t._v(" "),s("alert",{attrs:{title:t.mx_alertTitle,content:t.mx_message},on:{"on-hide":t.MixinAlertHideEvent},model:{value:t.mx_alertShow,callback:function(e){t.mx_alertShow=e},expression:"mx_alertShow"}})],1)])},staticRenderFns:[]};var C=s("C7Lr")(_,g,!1,function(t){s("4OJT")},null,null);e.default=C.exports}});
//# sourceMappingURL=25.3f00360e81cf1896ed8b.js.map