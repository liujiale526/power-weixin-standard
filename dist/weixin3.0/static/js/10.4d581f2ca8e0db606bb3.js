webpackJsonp([10],{"225R":function(t,e){},"7Qwa":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("3cXf"),a=n.n(i),o=n("aA9S"),s=n.n(o),r=n("4YfN"),c=n.n(r),u=n("9rMa"),l=n("RAwi"),m=n("CKVb"),f=n("F4+m"),d=n("gyMJ"),v={mixins:[f.a],data:function(){return{MindInfo:"",formState:"",Current:{},HistoryMind:[],afterSaveMsg:"",mx_isLoading:!1,mx_message:"",mx_alertShow:!1,mx_alertTitle:"提示",mx_toastShow:!1,mx_deleyTime:1e3}},mounted:function(){this.getStopFlowData()},methods:c()({submitData:function(){var t=this,e=this.validSubmitData();if(!e.isPass)return this.MixinAlertShowEvent(e.msg),!1;var n=s()({},{Current:this.Current,FlowOperate:"Stop",MindInfo:this.MindInfo,VoteText:"",VoteValue:""});this.MinXinHttpFetch(Object(d.f)(a()(n)),function(e){e.success&&(t.afterSaveMsg="完成提交",t.mx_toastShow=!0,t.GetInformCount().then(function(){t.timer&&clearTimeout(t.timer),t.timer=setTimeout(function(){"view"===t.formState?t.$router.push("/workinfos"):t.goBack()},1e3)}).catch(function(e){t.AlertShowEvent(e.message)}))})},validSubmitData:function(){var t={msg:"",isPass:!0};return""===this.MindInfo?(t.msg="意见不能为空",t.isPass=!1,t):t},getStopFlowData:function(){var t=this;this.getQuery();var e=s()({},{SubOperate:"GetCurrentSeque",FlowOperate:"SupplyInstance",SequeID:this.query.SequeID,Current:this.query});this.MinXinHttpFetch(Object(d.f)(a()(e)),function(e){if(e.success){var n=e.data.value;t.Current=s()({},n.Current),t.HistoryMind=n.HistoryMind.concat()}})},getQuery:function(){var t=this.$router.history.current.query;t&&(this.query=s()({},t),this.formState=this.query.FormState)},goBack:function(){this.$router.back()}},Object(u.b)(["GetInformCount","AlertShowEvent"])),components:{XTextarea:l.a,Group:m.a}},h={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"slide"}},[n("div",{staticClass:"flow-stop-content"},[n("div",{staticClass:"flow-stop-main"},[n("h1",{staticClass:"title font-color-active"},[t._v("提交意见:")]),t._v(" "),n("group",{staticClass:"textarea-content"},[n("x-textarea",{attrs:{name:"description",max:300,placeholder:"输入提交意见"},model:{value:t.MindInfo,callback:function(e){t.MindInfo="string"==typeof e?e.trim():e},expression:"MindInfo"}})],1)],1),t._v(" "),n("div",{staticClass:"flow-stop-footer"},[n("div",{staticClass:"item",on:{click:t.submitData}},[t._v("\n        提交\n      ")]),t._v(" "),n("div",{staticClass:"item",on:{click:t.goBack}},[t._v("\n        返回\n      ")])]),t._v(" "),n("loading",{model:{value:t.mx_isLoading,callback:function(e){t.mx_isLoading=e},expression:"mx_isLoading"}}),t._v(" "),n("toast",{attrs:{type:"text",time:t.mx_deleyTime},model:{value:t.mx_toastShow,callback:function(e){t.mx_toastShow=e},expression:"mx_toastShow"}},[t._v(t._s(t.afterSaveMsg))]),t._v(" "),n("alert",{attrs:{title:t.mx_alertTitle,content:t.mx_message},on:{"on-hide":t.MixinAlertHideEvent},model:{value:t.mx_alertShow,callback:function(e){t.mx_alertShow=e},expression:"mx_alertShow"}})],1)])},staticRenderFns:[]};var x=n("C7Lr")(v,h,!1,function(t){n("225R")},null,null);e.default=x.exports}});
//# sourceMappingURL=10.4d581f2ca8e0db606bb3.js.map