webpackJsonp([16],{"+yhJ":function(t,e){},c1ZO:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o("mvHQ"),r=o.n(a),i=o("woOf"),n=o.n(i),s=o("Gu7T"),m=o.n(s),l=o("Dd8w"),d=o.n(l),u=o("xrTZ"),f=o("NYxO"),c=o("bGai"),h=o("F4+m"),w=o("Mlu6"),v=o("baZb");var F={name:"h5Form",mixins:[h.d,h.c],data:function(){return{currentIndex:0,switches:[],actionMenu:[],tabUnitWidth:100,mainformData:{},KeyWord:"",openformid:"",lineHeight:1.5,direction:"horizontal",computedWidth:{width:"400px"},formAllConfig:{},keywordright:{},workflowdata:{},submit:!1}},computed:d()({switcheWidth:function(){return this.tabUnitWidth*this.switches.length+"px"}},Object(f.c)(["formStatus","routerParams","formStatusValue"])),created:function(){var t=this.$router.history.current.params;this.probeType=1,this.setFormStatus(t.formstate),this.setRouterParams(t)},mounted:function(){var t=this;this.$nextTick(function(){t.timer&&clearTimeout(t.timer),t.timer=setTimeout(function(){t.mainLoad()},500)})},methods:d()({mainLoad:function(){var t=this;this._FormInit(function(){t._FormMainLoad(),"add"!==t.routerParams.formstate&&t._FormData()})},verifyRequireError:function(t,e){this.submit=!0;var o=[].concat(m()(e)).filter(function(t){if(t.required)return t});if(0===o.length)return!1;for(var a=0;a<o.length;a++){if(!t[o[a].field])return!0}return!1},saveFromData:function(t,e){var o=this,a=this.routerParams.formstate,r=function(t){var e=n()({KeyWord:"",mainformData:{},routerParams:{},formAllConfig:{}},t),o=e.KeyWord,a=e.mainformData,r=e.routerParams,i=e.formAllConfig,s=r.FromId,m=r.formstate,l={KeyWord:o,formAllConfig:i,KeyWordType:"BO",data:[Object(w.i)(i.comboboxdata,a,o)],formDate:m,FormId:s};return Object(w.t)(l)}({KeyWord:this.KeyWord,mainformData:this.mainformData,routerParams:this.routerParams,formAllConfig:this.formAllConfig}),i=this.formAllConfig.formconfig.appconfig;if(this.verifyRequireError(this.mainformData,i.controls))return this.AlertShowEvent("请补充必填项"),!1;this.FormSaveData(r).then(function(r){e?o.ToastShowEvent(e):o.ToastShowEvent("保存数据完成"),t&&t(),"add"===a&&o.$router.back()}).catch(function(t){o.errLogin(t)})},setFormDataFromConfig:function(t){var e=t.formTitle;document.title=e||"表单详情",this.switches=Object(w.u)(t),this.tabUnitWidth=140},_FormInit:function(t){var e=this,o=this.routerParams,a=o.FromId,r=o.formstate,i=o.Id,s=i;if("add"===r&&(s=""),a){var m={FormId:a,KeyValue:s||"",FormState:r};this.FormInitData(m).then(function(o){var s=n()({},o.data);e.formAllConfig=Object(w.h)(s),e.keywordright=e.formAllConfig.keywordright,e.workflowdata=e.formAllConfig.workflowdata;var m=e.formAllConfig.formconfig.appconfig;m?(e.KeyWord=m.KeyWord,e.setFormDataFromConfig(m),t&&t()):e.openPCForm(a,r,i)}).catch(function(t){e.errLogin(t)})}else this.$nextTick(function(){e.AlertShowEvent("openformid is "+a)})},openPCForm:function(t,e,o){var a=this,r="?FormId="+t+"&KeyValue="+o,i="/Form/ValidForm/650540a6-af98-4669-b1c3-925691912d79/"+e+"/"+o+"/"+u.Base64.encode(t)+r,n=Object(v.a)(),s={sessionId:n.SessionId,userId:n.UserId};this.GetUserSessionData(s).then(function(t){window.open(i,"_self")}).catch(function(t){a.AlertShowEvent(t.message)})},checkSwitchPermission:function(t,e,o,a){var r=this,i=t.switchsPermission,n=t.switchs,s=this.routerParams.formstate;this.tabUnitWidth=t.tabUnitWidth,n=Object(w.o)(n,i,e,s,o,a),this.switches=Object(w.u)(n,t),this.timer=setTimeout(function(){r.$refs.navBarScroll.refresh()},200)},_FormMainLoad:function(){var t=this,e=this.routerParams,o=e.formstate,a=e.Id;"add"===o&&(a="");var r={KeyWord:this.KeyWord,KeyValue:a,KeyWordType:"BO",swhere:"",select:"",formstate:o};this.FormLoadData(r).then(function(e){var a=t.formAllConfig.formconfig.config.joindata.statusfield,r=e.data.value,i=JSON.parse(r),s=i[a];if(t.setFormStatusValue(s),t.actionMenu=Object(w.B)(t.workflowdata,o,s),r||""!==r){var m=Object(w.j)(t.formAllConfig.comboboxdata,i,t.KeyWord);t.mainformData=n()({},m)}}).catch(function(e){t.errLogin(e)})},_FormData:function(){var t=this,e={FormId:this.routerParams.FromId,KeyValue:this.routerParams.Id,extparams:""};this.FormDataChilds(e).then(function(e){var o=e.data.value;console.log(o),[].concat(m()(o.children)).forEach(function(e,o){e.values||(e.values=[]),t.switches.forEach(function(t,o){t.KeyWord===e.KeyWord&&(t.data=n()({},e))})})}).catch(function(e){t.errLogin(e)})},upDateForm:function(t,e){var o=this,a=this.KeyWord,i=this.routerParams.formstate,n=Object(w.i)(this.formAllConfig.comboboxdata,this.mainformData,a),s={KeyWord:a,formAllConfig:this.formAllConfig,KeyWordType:"BO",data:[n],formDate:i,FormId:this.routerParams.FromId},m=Object(w.t)(s),l={};this.workflowdata&&"view"===i?l.IsWorkFlowHuman="1":"add"===i&&(l.IsRegHuman="1");var d={OpenTrans:"true",Update:{MessageCode:"Power.Controls.PMS.SaveWebForm",data:{formId:m.FormId,json:JSON.parse(m.JsonData),params:u.Base64.encode(r()(l)),FlowOperate:"Update"}}};this.UpDateFormData(r()(d)).then(function(){e?o.ToastShowEvent(e):o.ToastShowEvent("更新数据完毕"),t&&t()}).catch(function(t){o.AlertShowEvent(t.message)})},selectActionMenu:function(t){var e=this,o=this.routerParams,a=o.formstate,i=o.Id,s=o.FromId;if(!t)return!1;if(t.value&&"SaveForm"===t.value&&this.saveFromData(function(){e.mainLoad()}),t.value&&"Active"===t.value&&this.upDateForm(function(){var t={KeyWord:e.KeyWord,KeyValue:i,FormId:s,flowOperate:"Active",SequeID:e.workflowdata.CanFlowOperate.SequeID,FormState:a};e.$router.push({path:"/forkflow/active",query:t})},"更新数据完毕"),t.value&&"Send"===t.value&&this.upDateForm(function(){var t={KeyWord:e.KeyWord,KeyValue:i,FormId:s,flowOperate:"Send",SequeID:e.workflowdata.CanFlowOperate.SequeID,WorkInfoID:e.workflowdata.CanFlowOperate.CanFlowList.ShowMonitor.WorkInfoID,FormState:a};e.$router.push({path:"/forkflow/agree",query:t})},"更新数据完毕"),t.value&&"GetBack"===t.value&&this.upDateForm(function(){var t=n()({},{Current:{KeyWord:e.KeyWord,KeyValue:i,FormId:s,SequeID:e.workflowdata.CanFlowOperate.SequeID+"",FormState:a},FlowOperate:"GetBack"});e.FlowActionData(r()(t)).then(function(t){e.mainLoad()}).catch(function(t){e.AlertShowEvent(t.message)})},"更新数据完毕"),t.value&&"ShowMonitor"===t.value){var m={flowOperate:"ShowMonitor",WorkInfoID:this.workflowdata.CanFlowOperate.CanFlowList.ShowMonitor.WorkInfoID};this.$router.push({path:"/forkflow/monitor",query:m})}if(t.value&&"Return"===t.value&&this.upDateForm(function(){var t={KeyWord:e.KeyWord,KeyValue:i,FormId:s,SequeID:e.workflowdata.CanFlowOperate.SequeID,FormState:a};e.$router.push({path:"/forkflow/return",query:t})},"更新数据完毕"),t.value&&"Delegate"===t.value&&this.upDateForm(function(){var t={KeyWord:e.KeyWord,KeyValue:i,FormId:s,SequeID:e.workflowdata.CanFlowOperate.SequeID,FormState:a};e.$router.push({path:"/forkflow/delegate",query:t})},"更新数据完毕"),t.value&&"Delegateing"===t.value&&this.upDateForm(function(){var t={KeyWord:e.KeyWord,KeyValue:i,FormId:s,SequeID:e.workflowdata.CanFlowOperate.SequeID,FormState:a};e.$router.push({path:"/forkflow/delegateing",query:t})},"更新数据完毕"),t.value&&"Stop"===t.value&&this.upDateForm(function(){var t={KeyWord:e.KeyWord,KeyValue:e.routerParams.Id,FormId:e.routerParams.FromId,SequeID:e.workflowdata.CanFlowOperate.SequeID,FormState:a};e.$router.push({path:"/forkflow/stop",query:t})},"更新数据完毕"),t.value&&"ShowHistoryMonitor"===t.value){var l={KeyWord:this.KeyWord,KeyValue:this.routerParams.Id,FormId:this.routerParams.FromId,SequeID:this.workflowdata.CanFlowOperate.SequeID,FormState:a};this.$router.push({path:"/forkflow/history",query:l})}},formRowChange:function(t){this.mainformData[t.field]=t.value},switchItem:function(t){this.currentIndex=t},_isShow:function(t){return this.currentIndex===t}},Object(f.d)({setFormStatus:"SET_FORM_STATUS",setRouterParams:"SET_ROUTER_PARAMS",setFormStatusValue:"FORMSTATUSVALUE"}),Object(f.b)(["FormInitData","FormLoadData","FormSaveData","FormDataChilds","FlowActionData","UpDateFormData","AlertShowEvent","ToastShowEvent","GetUserSessionData"])),destroyed:function(){this.timer&&clearTimeout(this.timer)},components:{FormRow:c.g,FormAction:c.e,commonChildTable:c.r,treeGridChildTable:c.t,treeGridChildTableCustomize:c.u}},p={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("transition",{attrs:{name:"slide"}},[o("div",{ref:"mainForm",staticClass:"main-form"},[o("header",{staticClass:"nav-bar nav-header"},[t.switches.length>0?o("nav-list",{ref:"navBarScroll",staticClass:"nav-bar-scroll",attrs:{"probe-type":t.probeType,data:t.switches,direction:t.direction,unitWidth:t.tabUnitWidth}},[o("div",{staticClass:"nav-scroll-inner"},[o("switches-box",{attrs:{switcheWidth:t.switcheWidth,lineHeight:t.lineHeight,switches:t.switches,currentIndex:t.currentIndex},on:{switch:t.switchItem}})],1)]):t._e()],1),t._v(" "),t.switches.length>0?o("div",{staticClass:"form-content"},t._l(t.switches,function(e,a){return o("div",{directives:[{name:"show",rawName:"v-show",value:t._isShow(a),expression:"_isShow(tableIndex)"}],key:a,class:"form-content-item "+e.type},["mainTable"===e.type?o("div",{staticClass:"main-table-item",attrs:{for:"主表"}},[e.tableShowField.length>0&&""!==t.KeyWord?o("form",{staticClass:"input-textarea-group"},t._l(e.tableShowField,function(e){return o("form-row",{key:e.field,attrs:{label:e.title,type:e.format,readonly:e.readonly,required:e.required,disabled:e.disabled,placeholder:e.placeholder,field:e.field,KeyWord:t.KeyWord,fieldItem:e,mainformData:t.mainformData,comboboxdata:t.formAllConfig.comboboxdata||{},submit:t.submit},on:{enterChange:t.formRowChange}})})):t._e(),t._v(" "),t.actionMenu.length>0&&("40"!==t.formStatusValue||"50"!==t.formStatusValue)?o("div",{staticClass:"form-action-wrap"},[o("form-action",{attrs:{actions:t.actionMenu},on:{selectActionMenu:t.selectActionMenu}})],1):t._e()]):t._e(),t._v(" "),"childTable"===e.type?o("div",{directives:[{name:"show",rawName:"v-show",value:t._isShow(a),expression:"_isShow(tableIndex)"}],class:"form-content-item "+e.type,attrs:{for:"子表list"}},[!e.data||"common"!==e.style&&e.style?t._e():o("common-child-table",{attrs:{for:"common",KeyValue:t.routerParams.Id,formAllConfig:t.formAllConfig,comboboxdata:t.formAllConfig.comboboxdata,chileTableItem:e,tableData:e.data,mainformData:t.mainformData},on:{saveChildFrom:function(e){t._FormData()}}}),t._v(" "),e.data&&"treeGrid"===e.style?o("tree-grid-child-table",{attrs:{KeyValue:t.routerParams.Id,formAllConfig:t.formAllConfig,openformid:t.openformid,comboboxdata:t.formAllConfig.comboboxdata,chileTableItem:e,tableData:e.data,mainformData:t.mainformData},on:{saveChildFrom:function(e){t._FormData()}}}):t._e(),t._v(" "),e.data&&"treeGridCustomize"===e.style?o("tree-grid-child-table-customize",{attrs:{KeyValue:t.routerParams.Id,formAllConfig:t.formAllConfig,openformid:t.openformid,comboboxdata:t.formAllConfig.comboboxdata,chileTableItem:e,tableData:e.data,mainformData:t.mainformData},on:{saveChildFrom:function(e){t._FormData()}}}):t._e()],1):t._e(),t._v(" "),"fileAttach"===e.type?o("div",{directives:[{name:"show",rawName:"v-show",value:t._isShow(a),expression:"_isShow(tableIndex)"}],staticClass:"form-content-item file-attach",attrs:{for:"附件"}},[o("file-attach",{attrs:{loadStart:t.currentIndex===a,KeyWord:t.KeyWord,KeyValue:t.routerParams.Id}})],1):t._e(),t._v(" "),"report"===e.type?o("div",{directives:[{name:"show",rawName:"v-show",value:t._isShow(a),expression:"_isShow(tableIndex)"}],staticClass:"form-content-item",attrs:{for:"报表"}},[o("report",{ref:"Report",refInFor:!0,attrs:{loadStart:t.currentIndex===a,KeyWord:t.KeyWord}})],1):t._e(),t._v(" "),"comment"===e.type?o("div",{directives:[{name:"show",rawName:"v-show",value:t._isShow(a),expression:"_isShow(tableIndex)"}],staticClass:"form-content-item",attrs:{for:"评论"}},[o("comment",{attrs:{loadStart:t.currentIndex===a,KeyWord:t.KeyWord}})],1):t._e()])})):t._e()])])},staticRenderFns:[]};var y=o("VU/8")(F,p,!1,function(t){o("+yhJ")},null,null);e.default=y.exports}});
//# sourceMappingURL=16.650c506fae7b8a022b39.js.map