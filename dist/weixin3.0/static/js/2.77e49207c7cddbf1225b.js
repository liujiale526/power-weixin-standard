webpackJsonp([2],{Pc3P:function(e,t){},RtE1:function(e,t){},iBy1:function(e,t){},iI4X:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s("IHPB"),o=s.n(n),i=s("3cXf"),c=s.n(i),r=s("aA9S"),a=s.n(r),l=s("4YfN"),u=s.n(l),d=s("9rMa"),h=s("tiSE"),f=s("GUsc"),v=s("undV"),p=s("W/7t"),C=s("RAwi"),k=s("CKVb"),w=s("lGeB"),S=s("N8Hv"),m=s("Mlu6"),N={name:"workflow",data:function(){return{selectType:"single",query:{},formState:"",WorkFlowList:[],WorkFlow:{},currentWorkFlow:null,currentNodeList:null,showPeopleContent:!0,filterNormalNode:!0,currentStop:"",peopleLists:[],MindInfo:"",IsMindMustInput:!0,NodeList:[],NextNodeList:[],current:{},positionUserParams:{},byDraft:{users:[],NodeCode:""},ConfigUserList:[],currentRow:{}}},mounted:function(){this.workNodeLoad()},computed:{PeopleContentHeight:function(){return this.showPeopleContent?"calc(60% - 50px)":"0px"}},methods:u()({workNodeLoad:function(){this.getQuery(),this.query.flowOperate&&this.getWorkFlowData()},getFlowNode:function(e){var t=this,s=a()({},{WorkFlowID:e.WorkFlowID,Version:e.Version,FormId:this.query.FormId,KeyWord:this.query.KeyWord,KeyValue:this.query.KeyValue,WorkInfoID:e.WorkInfoID?e.WorkInfoID:Object(m.c)()});this.positionUserParams=a()({},{SubOperate:"SaveUserToInstanNode",FlowOperate:"SupplyFlow",Current:s,ConfigUserList:[]});var n=a()({},{SubOperate:"ReadNodeList",FlowOperate:"SupplyFlow",Current:s});this.FlowActionData(c()(n)).then(function(e){var s=e.data.value,n=[];s.NodeList&&(n=s.NodeList.concat()),n.map(function(e,t){return e.CanSendUsers=JSON.parse(e.CanSendUsers),e}),t.NodeList=n.concat()}).catch(function(e){t.AlertShowEvent(e)})},getSelectedNode:function(){var e=[],t="";return this.NextNodeList.forEach(function(s,n){var o={};o.NodeCode=s.NodeCode,o.SendUserList=[],o.CopyUserList=[],s.CanSelectUsers.forEach(function(e,t){if(e.checked&&!0===e.checked){var s=a()({},e);delete s.checked,o.SendUserList.push(s)}}),s.CanSelectCopyUsers.forEach(function(e,t){if(e.checked&&!0===e.checked){var s=a()({},e);delete s.checked,o.CopyUserList.push(s)}}),0===o.SendUserList.length&&!1===s.IsMustNotUsers&&(t=s.NodeName+"节点没有选择送审人员"),s.checked&&e.push(o)}),0===e.length&&(t="节点数据为空"),{data:e,error:t}},submitFlow:function(){var e=this,t=this.getSelectedNode();if(""!==t.error)return this.MixinAlertShowEvent(t.error),!1;if(this.IsMindMustInput&&""===this.MindInfo)return this.MixinAlertShowEvent("审批意见不许为空"),!1;var s=a()(this.current,{KeyWord:this.query.KeyWord,KeyValue:this.query.KeyValue,FormId:this.query.FormId}),n=a()({Current:s,FlowOperate:"Send",MindInfo:this.MindInfo,SelectedNode:t.data,VoteText:"",VoteValue:""});this.FlowActionData(c()(n)).then(function(t){e.GetInformCount().then(function(){"view"===e.formState?e.$router.push("/workinfos"):e.$router.back()}).catch(function(t){e.AlertShowEvent(t.message)})}).catch(function(t){e.AlertShowEvent(t.message)})},selectCopyUsersEvent:function(e,t){var s=[].concat(o()(this.NextNodeList));s[e].checked?s[e].CanSelectCopyUsers[t].checked=!s[e].CanSelectCopyUsers[t].checked:this.MixinAlertShowEvent("请先选择"+this.NextNodeList[e].NodeName+"节点"),this.NextNodeList=[].concat(o()(s))},selectUsersEvent:function(e,t){var s=[].concat(o()(this.NextNodeList)),n=s[e].checked,i=s[e].AllowMulitUser,c=s[e].SelectUserMode;if(n){if("SelectAllAndDisabled"===c)return this.MixinAlertShowEvent("你没有修改权限"),!1;i?s[e].CanSelectUsers[t].checked=!s[e].CanSelectUsers[t].checked:s[e].CanSelectUsers.forEach(function(e,s){e.checked=s===t&&!e.checked})}else this.MixinAlertShowEvent("请先选择"+this.NextNodeList[e].NodeName+"节点");this.NextNodeList=[].concat(o()(s))},nodeListTitleSelect:function(e){var t=[].concat(o()(this.NextNodeList)),s=t[e].checked;if("SelectedAndDisabled"===t[e].SelectNodeMode)return this.MixinAlertShowEvent("禁止取消"),!1;t[e].checked=!s,t[e].checked?(t[e].LineType===p.c.ExcludeLine&&t.forEach(function(s,n){n!==e&&(t[n].checked=!1,t[n].CanSelectUsers.forEach(function(e){e.checked=!1}),t[n].CanSelectCopyUsers.forEach(function(e){e.checked=!1}))}),t[e].AllowMulitUser&&t[e].CanSelectUsers.forEach(function(e,t){e.checked=!1}),1===t[e].CanSelectUsers.length&&(t[e].CanSelectUsers[0].checked=!0),t[e].CanSelectCopyUsers.forEach(function(e,t){e.checked=!0})):(t[e].CanSelectUsers.forEach(function(e,t){e.checked=!1}),t[e].CanSelectCopyUsers.forEach(function(e,t){e.checked=!1})),this.NextNodeList=[].concat(o()(t))},peopleSelectFlow:function(e){var t=this,s=a()({},{WorkFlowID:e.WorkFlowID,Version:e.Version,PlanEndDate:e.PlanEndDate,FormId:this.query.FormId,KeyWord:this.query.KeyWord,KeyValue:this.query.KeyValue});this.query.WorkInfoID&&(s=a()(s,{WorkInfoID:this.query.WorkInfoID})),this.query.GroupID&&(s=a()(s,{GroupID:this.query.GroupID})),e.WorkInfoID?s=a()(s,{WorkInfoID:e.WorkInfoID}):s.WorkInfoID||(s=a()(s,{WorkInfoID:Object(m.c)()}));var n={Current:s,FlowOperate:p.d.Active};this.FlowActionData(c()(n)).then(function(e){var s=e.data.value,n=[];s&&(n=s.NextNodeList.concat()),t.byDraft.users.length>0&&n.forEach(function(e){e.NodeCode===t.byDraft.NodeCode&&(e.CanSelectUsers=t.byDraft.users.concat())}),t.current=a()({},s.Current),t.NextNodeList=t.formatNextNodeList(n)}).catch(function(e){t.AlertShowEvent(e.message)})},formatNextNodeList:function(e){var t=this,s=[];return e.forEach(function(n,o){t.IsMindMustInput=n.IsMindMustInput,"SelectedNode"===n.SelectNodeMode||"SelectedAndDisabled"===n.SelectNodeMode?n.checked=!0:n.checked=!1,1===e.length&&(e[0].checked=!0),"DeselectAll"===n.SelectUserMode?n.CanSelectUsers.forEach(function(e,t){e.checked=!1}):"SelectAll"===n.SelectUserMode||"SelectAllAndDisabled"===n.SelectUserMode?n.CanSelectUsers.forEach(function(e,t){e.checked=!0}):n.CanSelectUsers.forEach(function(e,t){n.DefaultUserID===e.UserID?e.checked=!0:e.checked=!1}),1===n.CanSelectUsers.length&&(n.CanSelectUsers[0].checked=!0),n.CanSelectCopyUsers.forEach(function(e,t){e.checked=!1}),n.IsCancel||s.push(n)}),s},toNextStep:function(e){var t=this.getCurrentFlowItem();switch(e){case"selectFlow":this.currentStop=e;break;case"nodeSelect":if(!t)return this.MixinAlertShowEvent("请选择一个流程"),!1;this.currentStop=e,this.getFlowNode(t);break;case"peopleSelect":if(!t)return this.MixinAlertShowEvent("请选择一个流程"),!1;this.currentStop=e,this.peopleSelectFlow(t);break;default:return!1}},toUpStep:function(e){this.currentStop=e},getCurrentFlowItem:function(){for(var e=null,t=0;t<this.WorkFlowList.length;t++)if(this.WorkFlowList[t].checked){e=a()({},this.WorkFlowList[t]);break}return e},getWorkFlowData:function(){var e=this,t={KeyWord:this.query.KeyWord,KeyValue:this.query.KeyValue,FormId:this.query.FormId,FlowOperate:p.d.SelectFlow,SequeID:this.query.SequeID};this.FlowActionData(c()(t)).then(function(t){var s=t.data.value,n=[];e.WorkFlow=s,(n=s&&s.WorkFlowList?s.WorkFlowList.concat():[]).map(function(e,t){s.WorkFlowID===e.WorkFlowID?e.checked=!0:e.checked=!1}),e.WorkFlowList=n,1===n.length&&n[0].IsAutoSelect?e.$nextTick(function(){e.$refs.personSelectList[0].setChecked(),e.timer&&clearTimeout(e.timer),e.timer=setTimeout(function(){e.toNextStep("selectFlow")},300)}):(e.timer&&clearTimeout(e.timer),e.timer=setTimeout(function(){e.toNextStep("selectFlow")},300))}).catch(function(t){e.AlertShowEvent(t.message)})},selectItem:function(e){var t=this;this.$refs.personSelectList.forEach(function(s,n){e===n?t.$refs.personSelectList[n].setChecked():t.$refs.personSelectList[n].setCheckedDefault()})},selectFlowItem:function(e,t,s){this.WorkFlowList[s].checked=!!t},getPositionAndUserList:function(e){this.currentRow=a()({},e),this.$refs.positionUserList.load()},selectNodeList:function(e){this.currentNodeList=e},draftUser:function(e){this.currentNodeList=e;var t=this.NodeList[e];"ByDraft"===t.SendUserMode&&this.getPositionAndUserList(t)},completeByDraft:function(e){var t=this,s=this.currentRow,n=a()(this.positionUserParams,{NodeCode:s.NodeCode,ConfigUserList:e});if(0===e.length)return this.MixinAlertShowEvent("人员不能为空"),!1;this.byDraft.users=e,this.byDraft.NodeCode=s.NodeCode;var o="";e.forEach(function(t,s){s!==e.length-1?o+=t.UserName+",":o+=t.UserName}),this.NodeList.forEach(function(t,n){t.NodeCode===s.NodeCode&&(t.UserList=c()(e),t.CanSendUsers=e,t.ShowUserInfo=o,t.Status=!0)}),this.FlowActionData(c()(n)).then(function(){t.ToastShowEvent("完成选择")}).catch(function(e){t.AlertShowEvent(e.message)})},normalNodeIsShow:function(e){return"Normal"!==e.SendUserMode||!this.filterNormalNode},transformNodeListAction:function(e){var t=e.UserList,s=e.SendUserMode;if(!t)return"";var n=JSON.parse(t);if("ByDraft"===s){if(0===n.length)return"选择人员";if(n.length>0)return"二次筛选"}else if("ByMainNode"===s){if(0===n.length)return"选择人员";if(n.length>0)return"二次筛选"}else if("BySendUser"===s)return"发送时定义"},tranformStatus:function(e){return!0===e?"正常":"异常"},isShow:function(e){return this.currentStop===e},getQuery:function(){var e=this.$router.history.current.query;e&&(this.query=a()({},e),this.formState=this.query.FormState)},cancel:function(){this.$router.back()}},Object(d.b)(["GetInformCount","FlowActionData","AlertShowEvent","ToastShowEvent"])),components:{PersonSelectList:v.a,XTextarea:C.a,Group:k.a,InlineXSwitch:w.a,CheckIcon:S.default,LineBreak:h.default,PositionUserList:f.a}},y={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("transition",{attrs:{name:"slide"}},[s("div",{staticClass:"work-node-select"},[s("div",{directives:[{name:"show",rawName:"v-show",value:e.isShow("selectFlow"),expression:"isShow('selectFlow')"}],staticClass:"before-select-content"},[s("div",{staticClass:"workflow-select"},[s("header",{staticClass:"header"},[s("div",{staticClass:"title"},[e._v("\n            流程选择\n          ")])]),e._v(" "),s("line-break"),e._v(" "),s("ul",{staticClass:"select-lists"},e._l(e.WorkFlowList,function(t,n){return e.WorkFlowList.length>0?s("li",{key:n,staticClass:"select-list",on:{click:function(t){e.selectItem(n)}}},[s("person-select-list",{ref:"personSelectList",refInFor:!0,attrs:{index:n,selectType:e.selectType,item:t,isChecked:t.checked},on:{selectFlowItem:e.selectFlowItem}})],1):e._e()}))],1),e._v(" "),s("div",{staticClass:"person-select-bar"},[s("div",{staticClass:"select-bar",on:{click:function(t){e.toNextStep("nodeSelect")}}},[s("span",[e._v("下一步")])]),e._v(" "),s("div",{staticClass:"select-bar",on:{click:e.cancel}},[s("span",[e._v("返回")])])])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.isShow("nodeSelect"),expression:"isShow('nodeSelect')"}],staticClass:"node-select-content"},[s("div",{staticClass:"node-select"},[s("header",{staticClass:"header"},[s("div",{staticClass:"title"},[e._v("\n            节点选择\n          ")]),e._v(" "),s("div",{staticClass:"toggle-bar"},[s("cube-switch",{staticClass:"toggle-switch",model:{value:e.filterNormalNode,callback:function(t){e.filterNormalNode=t},expression:"filterNormalNode"}})],1)]),e._v(" "),s("line-break"),e._v(" "),s("ul",{staticClass:"node-select-lists"},e._l(e.NodeList,function(t,n){return s("li",{directives:[{name:"show",rawName:"v-show",value:e.normalNodeIsShow(t),expression:"normalNodeIsShow(item)"}],key:n,staticClass:"node-select-list",class:{selected:n===e.currentNodeList},on:{click:function(t){t.preventDefault(),t.stopPropagation(),e.selectNodeList(n)}}},[s("div",{staticClass:"list-inner"},[s("div",{staticClass:"list-inner-header"},[s("div",{staticClass:"node-name"},[s("span",{staticClass:"name"},[e._v("节点名称:")]),e._v(" "),s("span",{staticClass:"text"},[e._v(e._s(t.NodeName))])]),e._v(" "),s("div",{staticClass:"node-status"},[s("span",{staticClass:"name"},[e._v("节点状态:")]),e._v(" "),s("span",{staticClass:"text"},[e._v(e._s(e.tranformStatus(t.Status)))])])]),e._v(" "),s("div",{staticClass:"list-inner-body"},[s("div",{staticClass:"node-info"},[s("span",{staticClass:"name"},[e._v("节点描述:")]),e._v(" "),s("span",{staticClass:"text"},[e._v(e._s(t.ShowUserInfo))])]),e._v(" "),s("div",{staticClass:"node-action"},[s("span",{staticClass:"name"},[e._v("操作:")]),e._v(" "),s("span",{staticClass:"text action",on:{click:function(t){t.preventDefault(),t.stopPropagation(),e.draftUser(n)}}},[e._v(e._s(e.transformNodeListAction(t)))])])])])])}))],1),e._v(" "),s("div",{staticClass:"person-select-bar"},[s("div",{staticClass:"select-bar",on:{click:function(t){e.toNextStep("peopleSelect")}}},[s("span",[e._v("下一步")])]),e._v(" "),"view"!==e.formState?s("div",{staticClass:"select-bar",on:{click:function(t){e.toUpStep("selectFlow")}}},[s("span",[e._v("上一步")])]):e._e()])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.isShow("peopleSelect"),expression:"isShow('peopleSelect')"}],staticClass:"after-select-content"},[s("div",{staticClass:"people-select"},[s("header",{staticClass:"header"},[s("div",{staticClass:"title"},[e._v("\n            人员选择\n          ")]),e._v(" "),s("div",{staticClass:"toggle-bar"},[s("cube-switch",{staticClass:"toggle-switch",model:{value:e.showPeopleContent,callback:function(t){e.showPeopleContent=t},expression:"showPeopleContent"}})],1)]),e._v(" "),s("section",{staticClass:"people-content",style:{height:e.PeopleContentHeight}},e._l(e.NextNodeList,function(t,n){return s("div",{key:n,staticClass:"next-node-list"},[s("h1",{staticClass:"node-list-title",on:{click:function(t){e.nodeListTitleSelect(n)}}},[s("div",{staticClass:"name"},[e._v(e._s(t.NodeName))]),e._v(" "),s("div",{staticClass:"check-box"},[s("check-icon",{attrs:{checked:t.checked}})],1)]),e._v(" "),t.CanSelectUsers.length>0?s("div",{staticClass:"next-node-list-unit can-select-users"},[s("h1",{staticClass:"title"},[e._v("可送审人员")]),e._v(" "),s("ul",{staticClass:"people-lists"},e._l(t.CanSelectUsers,function(t,o){return s("li",{key:o,staticClass:"people-list",on:{click:function(t){e.selectUsersEvent(n,o)}}},[s("div",{staticClass:"user-name"},[e._v(e._s(t.UserName))]),e._v(" "),s("div",{staticClass:"check-box"},[s("check-icon",{attrs:{checked:t.checked}})],1)])}))]):e._e(),e._v(" "),t.CanSelectCopyUsers.length>0?s("div",{staticClass:"next-node-list-unit can-select-copy-users"},[s("h1",{staticClass:"title"},[e._v("可抄送人员")]),e._v(" "),s("ul",{staticClass:"people-lists"},e._l(t.CanSelectCopyUsers,function(t,o){return s("li",{key:o,staticClass:"people-list",on:{click:function(t){e.selectCopyUsersEvent(n,o)}}},[s("div",{staticClass:"user-name"},[e._v(e._s(t.UserName))]),e._v(" "),s("div",{staticClass:"check-box"},[s("check-icon",{attrs:{checked:t.checked}})],1)])}))]):e._e()])})),e._v(" "),s("section",{staticClass:"approve-text-content"},[s("h1",{staticClass:"text-title"},[e._v("审批意见")]),e._v(" "),s("group",{staticClass:"textarea-content"},[s("x-textarea",{attrs:{name:"description",max:300,placeholder:"输入审批意见"},model:{value:e.MindInfo,callback:function(t){e.MindInfo="string"==typeof t?t.trim():t},expression:"MindInfo"}})],1)],1)]),e._v(" "),s("div",{staticClass:"person-select-bar"},[s("div",{staticClass:"select-bar",on:{click:e.submitFlow}},[s("span",[e._v("提交")])]),e._v(" "),"view"!==e.formState?s("div",{staticClass:"select-bar",on:{click:function(t){e.toUpStep("nodeSelect")}}},[s("span",[e._v("上一步")])]):e._e()])]),e._v(" "),s("position-user-list",{ref:"positionUserList",attrs:{subParams:e.positionUserParams,currentUserList:e.ConfigUserList},on:{complete:e.completeByDraft}})],1)])},staticRenderFns:[]};var _=s("C7Lr")(N,y,!1,function(e){s("Pc3P")},null,null);t.default=_.exports},lGeB:function(e,t,s){"use strict";var n={name:"x-switch",methods:{toBoolean:function(e){return this.valueMap?1===this.valueMap.indexOf(e):e},toRaw:function(e){return this.valueMap?this.valueMap[e?1:0]:e}},props:{disabled:Boolean,value:{type:[Boolean,String,Number],default:!1},valueMap:{type:Array,default:function(){return[!1,!0]}}},data:function(){return{currentValue:this.toBoolean(this.value)}},watch:{currentValue:function(e){var t=this.toRaw(e);this.$emit("input",t),this.$emit("on-change",t)},value:function(e){this.currentValue=this.toBoolean(e)}}},o={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],staticClass:"inline-x-switch weui-switch",attrs:{type:"checkbox",disabled:e.disabled},domProps:{checked:Array.isArray(e.currentValue)?e._i(e.currentValue,null)>-1:e.currentValue},on:{change:function(t){var s=e.currentValue,n=t.target,o=!!n.checked;if(Array.isArray(s)){var i=e._i(s,null);n.checked?i<0&&(e.currentValue=s.concat([null])):i>-1&&(e.currentValue=s.slice(0,i).concat(s.slice(i+1)))}else e.currentValue=o}}})},staticRenderFns:[]};var i=s("C7Lr")(n,o,!1,function(e){s("RtE1")},null,null);t.a=i.exports},undV:function(e,t,s){"use strict";var n={props:{isChecked:{type:Boolean,default:function(){return!1}},index:{type:Number,default:0},selectType:{type:String,default:"single"},item:{type:Object,default:function(){return{}}}},data:function(){return{checked:!1}},methods:{setChecked:function(e){this.checked=!this.checked},setCheckedDefault:function(e){this.checked=!1}},watch:{checked:function(e){this.$emit("selectFlowItem",this.item,this.checked,this.index)}}},o={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"person-select-list"},[s("div",{staticClass:"person-select-item title"},[s("p",{staticClass:"text"},[e._v(e._s(e.item.WorkFlowName))])]),e._v(" "),s("div",{staticClass:"person-select-item select-box"},[s("div",{staticClass:"check-icon-wrap"},[s("div",{staticClass:"vux-check-icon"},[e.checked?s("i",{staticClass:"weui-icon weui_icon_success weui-icon-success"}):e._e(),e._v(" "),e.checked?e._e():s("i",{staticClass:"weui-icon weui_icon_circle weui-icon-circle"}),e._v(" "),s("span")])])])])},staticRenderFns:[]};var i=s("C7Lr")(n,o,!1,function(e){s("iBy1")},null,null);t.a=i.exports}});
//# sourceMappingURL=2.77e49207c7cddbf1225b.js.map