webpackJsonp([0],{GUsc:function(e,t,a){"use strict";var s=a("mvHQ"),i=a.n(s),r=a("woOf"),o=a.n(r),n=a("Dd8w"),c=a.n(n),l=a("NYxO"),u=a("tiSE"),d=a("bGai"),p=a("N8Hv"),h={props:{currentUserList:{type:Array,default:function(){return[]}}},computed:{SourceMode:function(){return this.depart?"DeptAndUser":"PositionAndUser"}},data:function(){return{depart:!0,position:!1,searchQuery:"",UserList:[],defaultUserList:[],offset:100,selectedLists:[]}},methods:c()({change:function(e){this.searchQuery=e},changePosition:function(){if(this.position)return!1;this.position=!this.position,this.depart=!this.depart,this.loadPositionUsers()},changeDepart:function(){if(this.depart)return!1;this.depart=!this.depart,this.position=!this.position,this.loadPositionUsers()},load:function(){var e=this;this.show(),this.timer&&clearTimeout(this.timer),this.timer=setTimeout(function(){e.loadPositionUsers()},300)},selectItem:function(e){var t=this.UserList.concat();t[e].checked=!t[e].checked;var a=t[e].checked;this.toggleSelectItem(t,e,a)},toggleSelectItem:function(e,t,a){var s=e[t];e.map(function(e,a){return s.UserID===e.UserID&&t!==a&&(e.checked=!1),e}),this.UserList=e.concat(),this.selectedLists=this.fliterUser(a,s)},fliterUser:function(e,t){var a=[];return this.selectedLists.forEach(function(e,s){t.UserID!==e.UserID&&a.push(e)}),e&&a.push(t),a},loadPositionUsers:function(){var e=this,t=o()({},{Where:"",order:"x1.Name",SubOperate:"ReadUserList",SourceMode:this.SourceMode,ShowAllEps:"true",pageIndex:0,pageSize:0,Current:{},FlowOperate:"SupplyFlow"});this.selectedLists=this.currentUserList.concat(),this.FlowActionData(i()(t)).then(function(t){var a=t.data.value,s=a.UserList?JSON.parse(a.UserList).concat():[];e.UserList=s.concat(),e.UserList.map(function(e,t){return e.checked=!1,e}),e.defaultUserList=e.UserList.concat()}).catch(function(t){e.AlertShowEvent(t.message)})},getSelectedUsers:function(){var e=JSON.parse(i()(this.selectedLists));e.map(function(e){return delete e.checked,e}),this.$emit("complete",e),this.hide()},search:function(e){var t=[],a=new RegExp(e);this.defaultUserList.forEach(function(e){(a.test(e.UserName)||a.test(e.UserCode)||a.test(e.DeptPositionName))&&(e.checked=!1,t.push(e))}),this.UserList=t.concat()},show:function(){this.offset=0},hide:function(){var e=this.UserList.concat();e.map(function(e){return e.checked=!1,e}),this.UserList=e,this.selectedLists=[],this.offset=100}},Object(l.b)(["FlowActionData","AlertShowEvent"])),watch:{searchQuery:function(e){""!==e?this.search(e):this.load()}},components:{LineBreak:u.default,SearchBox:d.m,CheckIcon:p.default}},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{ref:"positionUserList",staticClass:"position-user-list",style:{transform:"translate3d("+this.offset+"%, 0, 0)"}},[a("header",{staticClass:"header"},[a("div",{staticClass:"search-box-wrap"},[a("search-box",{attrs:{placeholder:"搜索人员姓名/编号/岗位、部门"},on:{change:e.change},model:{value:e.searchQuery,callback:function(t){e.searchQuery=t},expression:"searchQuery"}})],1),e._v(" "),a("div",{staticClass:"condition-lists"},[a("div",{staticClass:"condition-list"},[a("div",{staticClass:"text"},[e._v("\n          部门\n        ")]),e._v(" "),a("div",{staticClass:"icon",on:{click:e.changeDepart}},[a("check-icon",{attrs:{checked:e.depart}})],1)]),e._v(" "),a("div",{staticClass:"condition-list"},[a("div",{staticClass:"text"},[e._v("\n          岗位\n        ")]),e._v(" "),a("div",{staticClass:"icon",on:{click:e.changePosition}},[a("check-icon",{attrs:{checked:e.position}})],1)])])]),e._v(" "),a("line-break"),e._v(" "),a("section",{staticClass:"user-content"},[a("div",{staticClass:"user-inner-content"},[a("ul",{staticClass:"user-lists"},e._l(e.UserList,function(t,s){return a("li",{key:s,staticClass:"user-list",on:{click:function(t){e.selectItem(s)}}},[a("div",{staticClass:"user-list-inner"},[a("div",{staticClass:"check-box"},[a("div",{staticClass:"check-icon-wrap"},[a("check-icon",{attrs:{checked:t.checked}})],1)]),e._v(" "),a("div",{staticClass:"user-list-content"},[a("div",{staticClass:"user-msg"},[a("div",{staticClass:"msg-item"},[a("span",[e._v("姓名:")]),e._v(" "),a("span",[e._v(e._s(t.UserName))])]),e._v(" "),a("div",{staticClass:"msg-item"},[a("span",[e._v("编号:")]),e._v(" "),a("span",[e._v(e._s(t.UserCode))])])]),e._v(" "),a("div",{staticClass:"user-msg"},[a("div",{staticClass:"msg-item"},[a("span",[e._v("岗位/部门:")]),e._v(" "),a("span",[e._v(e._s(t.DeptPositionName))])])])])])])}))]),e._v(" "),a("div",{staticClass:"user-action-bar"},[a("div",{staticClass:"user-action",on:{click:e.getSelectedUsers}},[e._v("确定")]),e._v(" "),a("div",{staticClass:"user-action",on:{click:e.hide}},[e._v("取消")])])])],1)},staticRenderFns:[]};var f=a("VU/8")(h,v,!1,function(e){a("edo1")},null,null);t.a=f.exports},HyQK:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("Dd8w"),i=a.n(s),r=a("NYxO"),o=a("bGai"),n=a("rKCU"),c=a("Mlu6"),l=a("ALGc"),u=a("rHil"),d=a("N8Hv"),p={props:{readonly:{type:Boolean,default:!1},required:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},value:null,KeyWord:{type:String,default:""},field:{type:String,default:""},mainformData:{type:Object,default:function(){return{}}},label:{type:String,default:""},type:{type:String,default:""},ToFixed:{type:Number,default:2},placeholder:{type:String,default:"请输入"},comboboxdata:{type:Object,default:function(){return{}}},fieldItem:{type:Object,default:function(){return{}}}},data:function(){return{rowValue:"",rowType:"text",canEdit:!1,dataPicker:{title:"日期",min:new Date(1920,1,1),max:new Date(2100,12,30),value:new Date,dateShowFormat:{year:"YYYY",month:"MM",date:"DD"}}}},computed:i()({},Object(r.c)(["formStatus"])),mounted:function(){this.setData()},methods:{setData:function(){var e=this;this.$nextTick(function(){var t=e.mainformData[e.field];switch(e.rowType=e.type,(e.readonly||e.disabled||"view"===e.formStatus)&&(e.canEdit=!0),e.rowType.indexOf("yyyy")>-1&&(e.rowType="datePicker"),e.rowType){case"datePicker":e.rowValue=Object(c.f)(t);break;case"number":t&&""!==t||(t=0),e.rowValue=parseFloat(t).toFixed(2);break;case"n2":t&&""!==t||(t=0),e.rowValue=t=Object(c.B)(t);break;case"percent":t&&""!==t||(t=0),e.rowValue=parseFloat(100*Number(t)).toFixed(2);break;case"rate":t&&""!==t||(t=0);var a=(t+="").split(".")[0],s=t.split(".")[1];e.rowValue=Object(c.B)(a,!0)+"."+Object(c.j)(s,8);break;case"checkBox":e.rowValue=e.formatCheckBoxDataToView(t);break;default:e.rowValue=t}})},change:function(e){this.rowValue=e},formatCheckBoxDataToView:function(e){var t=this.fieldItem.fieldType;if(!t)throw new Error("checkBox need set fieldType");switch(t){case"Boolean":return e;case"Number":return 1===e;case"String":return"1"===e;default:return!1}},formatCheckBoxDataToSave:function(e){var t=this.fieldItem.fieldType;if(!t)throw new Error("checkBox need set fieldType");switch(t){case"Boolean":return e;case"Number":return e?1:0;case"String":return e?"1":"0";default:return""}},changeCheckBox:function(){if(!0===this.readonly||!0===this.disabled||"view"===this.formStatus)return!1;var e=this.rowValue;this.rowValue=!e},showDatePicker:function(){if(this.disabled||this.readonly)return!1;this.$refs.updateDataPicker.show()},selectDatePicker:function(e){this.rowValue=Object(c.f)(e)}},watch:{mainformData:function(e){this.setData()},rowValue:function(e){var t=this;this.timer&&clearTimeout(this.timer),this.timer=setTimeout(function(){var a={KeyWord:t.KeyWord,field:t.field,value:e};if(""===t.KeyWord)throw Error("your KeyWord is null, set it please");if(""===t.field)throw Error("your field is null, set it please");switch(t.type){case"money":a.value=e.replace(",","");break;case"percent":a.value=parseFloat(e)/100;break;case"checkBox":a.value=t.formatCheckBoxDataToSave(e),console.log(t.fieldItem,a);break;default:a.value=a.value}t.$emit("enterChange",a)},500)}},components:{PowerSelect:o.k,XTextarea:l.a,Group:u.a,DatePicker:n.a,CheckIcon:d.default}},h={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-row"},[""===e.type||"text"===e.type?a("div",{staticClass:"input-row input"},[a("label",{staticClass:"label-text",attrs:{for:"input框 text类型"}},[e._v(e._s(e.label))]),e._v(" "),a("div",{staticClass:"input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.rowValue,expression:"rowValue"}],staticClass:"input-text",attrs:{type:"text",contenteditable:"true",readonly:e.readonly,required:e.required,disabled:e.canEdit,placeholder:e.placeholder},domProps:{value:e.rowValue},on:{input:function(t){t.target.composing||(e.rowValue=t.target.value)}}})])]):e._e(),e._v(" "),"number"===e.type?a("div",{staticClass:"input-row input"},[a("label",{staticClass:"label-text",attrs:{for:"input框 number类型"}},[e._v(e._s(e.label))]),e._v(" "),a("div",{staticClass:"input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.rowValue,expression:"rowValue"}],staticClass:"input-text",attrs:{type:"number",contenteditable:"true",readonly:e.readonly,required:e.required,disabled:e.canEdit,placeholder:e.placeholder},domProps:{value:e.rowValue},on:{input:function(t){t.target.composing||(e.rowValue=t.target.value)}}})])]):e._e(),e._v(" "),"n2"===e.type?a("div",{staticClass:"input-row input"},[a("label",{staticClass:"label-text",attrs:{for:"input框 千分位类型"}},[e._v(e._s(e.label))]),e._v(" "),a("div",{staticClass:"input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.rowValue,expression:"rowValue"}],staticClass:"input-text",attrs:{type:"text",contenteditable:"true",readonly:e.readonly,required:e.required,disabled:e.canEdit,placeholder:e.placeholder},domProps:{value:e.rowValue},on:{input:function(t){t.target.composing||(e.rowValue=t.target.value)}}})])]):e._e(),e._v(" "),"rate"===e.type?a("div",{staticClass:"input-row input"},[a("label",{staticClass:"label-text",attrs:{for:"input框 rate"}},[e._v(e._s(e.label))]),e._v(" "),a("div",{staticClass:"input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.rowValue,expression:"rowValue"}],staticClass:"input-text",attrs:{type:"text",contenteditable:"true",readonly:e.readonly,required:e.required,disabled:e.canEdit,placeholder:e.placeholder},domProps:{value:e.rowValue},on:{input:function(t){t.target.composing||(e.rowValue=t.target.value)}}})])]):e._e(),e._v(" "),"percent"===e.type?a("div",{staticClass:"input-row input"},[a("label",{staticClass:"label-text",attrs:{for:"input框 percent类型"}},[e._v(e._s(e.label))]),e._v(" "),a("div",{staticClass:"input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.rowValue,expression:"rowValue"}],staticClass:"input-text",attrs:{type:"number",contenteditable:"true",readonly:e.readonly,required:e.required,disabled:e.canEdit,placeholder:e.placeholder},domProps:{value:e.rowValue},on:{input:function(t){t.target.composing||(e.rowValue=t.target.value)}}})])]):e._e(),e._v(" "),"checkBox"===e.type?a("div",{staticClass:"input-row input"},[a("label",{staticClass:"label-text",attrs:{for:"input框 checkBox类型"}},[e._v(e._s(e.label))]),e._v(" "),a("div",{staticClass:"input",on:{click:e.changeCheckBox}},[a("check-icon",{staticClass:"input-text",attrs:{checked:e.rowValue}})],1)]):e._e(),e._v(" "),e.type.indexOf("yyyy")>-1?a("div",{staticClass:"input-row datePicker"},[a("label",{staticClass:"label-text",attrs:{for:"input框 datePicker类型"}},[e._v(e._s(e.label))]),e._v(" "),a("div",{staticClass:"input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.rowValue,expression:"rowValue"}],staticClass:"input-text",attrs:{type:"text",contenteditable:"true",readonly:!0,required:e.required,disabled:e.canEdit,placeholder:e.placeholder},domProps:{value:e.rowValue},on:{click:e.showDatePicker,input:function(t){t.target.composing||(e.rowValue=t.target.value)}}})])]):e._e(),e._v(" "),"combobox"===e.type?a("div",{staticClass:"input-row select"},[a("label",{staticClass:"label-text",attrs:{for:"移动端下拉框 select类型"}},[e._v(e._s(e.label))]),e._v(" "),a("power-select",{staticClass:"input",attrs:{comboboxdata:e.comboboxdata,KeyWord:e.KeyWord,field:e.field,title:e.label,readonly:e.readonly,required:e.canEdit,disabled:e.canEdit},on:{change:e.change},model:{value:e.rowValue,callback:function(t){e.rowValue=t},expression:"rowValue"}})],1):e._e(),e._v(" "),"textarea"===e.type?a("div",{staticClass:"textarea-row textarea"},[a("label",{staticClass:"label-text",attrs:{for:"移动端多文本框 textarea类型"}},[e._v(e._s(e.label))]),e._v(" "),a("group",{staticClass:"textarea-content"},[a("x-textarea",{attrs:{name:"description",contenteditable:"true",max:200,disabled:e.canEdit,readonly:e.readonly,required:e.required,placeholder:e.placeholder},model:{value:e.rowValue,callback:function(t){e.rowValue=t},expression:"rowValue"}})],1)],1):e._e(),e._v(" "),e.type.indexOf("yyyy")>-1?a("date-picker",{ref:"updateDataPicker",staticClass:"data-picker",attrs:{min:e.dataPicker.min,max:e.dataPicker.max,value:e.dataPicker.value,title:e.dataPicker.title,format:e.dataPicker.dateShowFormat},on:{select:e.selectDatePicker}}):e._e()],1)},staticRenderFns:[]};var v=a("VU/8")(p,h,!1,function(e){a("yBlv")},null,null);t.default=v.exports},N8Hv:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={props:{checked:{type:Boolean,default:!1}}},i={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"vux-check-icon"},[this.checked?t("i",{staticClass:"weui-icon weui_icon_success weui-icon-success"}):this._e(),this._v(" "),this.checked?this._e():t("i",{staticClass:"weui-icon weui_icon_circle weui-icon-circle"}),this._v(" "),t("span")])},staticRenderFns:[]};var r=a("VU/8")(s,i,!1,function(e){a("Y0k5")},null,null);t.default=r.exports},Y0k5:function(e,t){},edo1:function(e,t){},yBlv:function(e,t){}});
//# sourceMappingURL=0.ea7d73dd0ef7e8f989e4.js.map