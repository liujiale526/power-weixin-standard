webpackJsonp([15],{"0aYT":function(t,e){},Fap6:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("Gu7T"),i=s.n(a),r=s("Dd8w"),o=s.n(r),n=s("NYxO"),l=(s("W/7t"),{props:{loadStart:{type:Boolean,default:!1},KeyWord:{type:String,default:""}},computed:o()({},Object(n.c)(["routerParams"])),data:function(){return{ReportData:[],fileLink:"",offset:100}},methods:o()({GetReport:function(){var t=this,e=this.routerParams.FromId;this.GetReportData({FormId:e,where:""}).then(function(e){var s=e.data.value;t.ReportData=s?[].concat(i()(JSON.parse(s))):[]}).catch(function(e){t.AlertShowEvent(e.message)})},openReport:function(t){var e=this.routerParams.Id,s="/PowerPlat/FormXml/ReportView.aspx?rid="+t.Id+"&KeyWord="+this.KeyWord+"&KeyValue="+e;this.fileLink=s,this.offset=0},closeFile:function(){var t=this;this.offset=100,this.timer&&clearTimeout(this.timer),this.timer=setTimeout(function(){t.fileLink=""},400)}},Object(n.b)(["GetReportData","AlertShowEvent"])),destroyed:function(){clearTimeout(this.timer)},watch:{loadStart:{handler:function(t,e){this.loadStart&&this.GetReport()},immediate:!0}}}),c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"Report"},[s("div",{staticClass:"report-lists-wrap"},[s("ul",{staticClass:"report-lists"},t._l(t.ReportData,function(e){return s("li",{key:e.Id,staticClass:"report-list"},[s("div",{staticClass:"report-list-inner",on:{click:function(s){t.openReport(e)}}},[s("div",{staticClass:"list-massage"},[s("p",{staticClass:"text"},[t._v(t._s(e.Name)+"."+t._s(e.ExpType))])]),t._v(" "),s("div",{staticClass:"list-icon"},[s("div",{staticClass:"icon-wrap"},[s("svg",{staticClass:"vux-x-icon vux-x-icon-ios-arrow-right",attrs:{type:"ios-arrow-right",size:"20",xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 512 512"}},[s("path",{attrs:{d:"M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"}})])])])])])}))]),t._v(" "),s("div",{staticClass:"iframe-wrap",style:{transform:"translate3d("+this.offset+"%, 0, 0)"}},[s("iframe",{staticClass:"iframe",attrs:{src:t.fileLink,frameborder:"0"}}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.offset<=100,expression:"offset <= 100"}],staticClass:"back-wrap",on:{click:t.closeFile}},[s("span",{staticClass:"fa fa-reply"})])])])},staticRenderFns:[]};var f=s("VU/8")(l,c,!1,function(t){s("0aYT")},null,null);e.default=f.exports}});
//# sourceMappingURL=15.3645c4944130bcb8648b.js.map