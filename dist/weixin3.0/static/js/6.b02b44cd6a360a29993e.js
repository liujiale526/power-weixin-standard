webpackJsonp([6],{"4OwY":function(t,s){},ADT4:function(t,s){},BOLi:function(t,s){},DNT4:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=e("IHPB"),a=e.n(n),i=e("4YfN"),o=e.n(i),c=e("9rMa"),l=e("baZb"),r=(e("W/7t"),e("Mlu6")),u={props:{list:{type:Object,default:function(){return{}}},self:{type:Boolean,default:!0}},computed:{RegHeader:function(){return this.list.RegHeader}},methods:{formatDate:function(t){return Object(r.f)(t,"yyyy-MM-dd HH:mm:ss")}}},d={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"comments-list"},[t.self?e("div",{staticClass:"comments-main-content"},[e("div",{staticClass:"send-time",style:{"text-align":t.self?"right":"left"}},[t._v("\n      "+t._s(t.formatDate(t.list.RegDate))+" "+t._s(t.list.RegHumName)+"\n    ")]),t._v(" "),e("div",{staticClass:"list-main"},[e("div",{staticClass:"list-text-content right"},[e("p",{staticClass:"at-warp",style:{"text-align":"left"}},[t.list.AtHumanList.length?e("span",{staticClass:"at-group"},t._l(t.list.AtHumanList,function(s){return e("span",{key:s.HumanId,staticClass:"at-list"},[t._v("\n              @"+t._s(s.HumanName)+"\n            ")])})):t._e(),t._v(" "),e("span",{staticClass:"list-text"},[t._v(t._s(t.list.CommentText))])])]),t._v(" "),e("div",{staticClass:"list-avatar"},[e("img",{attrs:{src:t.RegHeader,alt:""}})])])]):e("div",{staticClass:"comments-main-content"},[e("div",{staticClass:"send-time",style:{"text-align":t.self?"right":"left"}},[t._v("\n      "+t._s(t.list.RegHumName)+" "+t._s(t.formatDate(t.list.RegDate))+"\n    ")]),t._v(" "),e("div",{staticClass:"list-main"},[e("div",{staticClass:"list-avatar"},[e("img",{attrs:{src:t.RegHeader,alt:""}})]),t._v(" "),e("div",{staticClass:"list-text-content left"},[e("p",{staticClass:"at-warp",style:{"text-align":"left"}},[t.list.AtHumanList.length?e("span",{staticClass:"at-group"},t._l(t.list.AtHumanList,function(s){return e("span",{key:s.HumanId,staticClass:"at-list"},[t._v("@"+t._s(s.HumanName))])})):t._e(),t._v(" "),e("span",{staticClass:"list-text"},[t._v(t._s(t.list.CommentText))])])])])])])},staticRenderFns:[]};var m=e("C7Lr")(u,d,!1,function(t){e("BOLi")},null,null).exports,h=e("RAwi"),f=e("CKVb"),v=e("neaj"),p=e("bGai"),C={props:{selectUsers:{type:Array,default:function(){return[]}},HumanId:{type:String,default:""}},data:function(){return{searchQuery:"",offset:100,List:[],index:0,size:20,pullDownRefreshThreshold:60}},computed:{options:function(){return{pullDownRefresh:{threshold:parseInt(this.pullDownRefreshThreshold),txt:"刷新成功"},pullUpLoad:{threshold:parseInt(this.pullDownRefreshThreshold),txt:"加载成功"},scrollbar:!0}},usersId:function(){var t=[].concat(a()(this.selectUsers)).map(function(t){return t.Id});return t}},methods:o()({load:function(t,s){var e=this,n=this.organizeParams(t);this.GridPageLoadData(n).then(function(n){var i=n.data.value;i&&e.organizeGetData(t,[].concat(a()(JSON.parse(i)))),s&&s()}).catch(function(t){e.AlertShowEvent(t.message)})},onPullingUp:function(){var t=this;this.load("PullUp",function(){t.$refs.Scroll.forceUpdate()})},onPullingDown:function(){var t=this;this.load("PullDown",function(){t.$refs.Scroll.forceUpdate()})},searchChange:function(t){this.searchQuery=t,this.load()},organizeParams:function(t){var s=" 1=1 and Id<>'"+this.HumanId+"'";return this.searchQuery?(s+=" and (Name like '%"+this.searchQuery+"%' or Code like '%"+this.searchQuery+"%')",this.index=0,this.size=0):(this.size=20,"PullDown"===t?this.index=0:"PullUp"===t?this.index++:this.index=0),{KeyWord:"Human",KeyWordType:"BO",index:this.index,size:this.size,swhere:s,select:"",sort:"",extparams:""}},organizeGetData:function(t,s){this.searchQuery?(this.searchQuery||""!==this.searchQuery)&&(this.List=[].concat(a()(s))):"PullDown"===t?this.List=[].concat(a()(s)):"PullUp"===t?(0===s.length&&this.index--,this.List=[].concat(a()(this.List),a()(s))):this.List=[].concat(a()(s))},selectItem:function(t){var s=[].concat(a()(this.selectUsers));if(this.usersId.includes(t.Id)?s=[].concat(a()(this.filerUsers(s,t.Id))):s.push(t),s.length>3)return this.AlertShowEvent("@人员最多选择3个"),!1;this.$emit("getAtUsers",s)},filerUsers:function(t,s){var e=[];return t.forEach(function(t){t.Id!==s&&e.push(t)}),e},show:function(){this.offset=0,this.$refs.Scroll.forceUpdate(),this.load()},hide:function(){this.offset=100,this.List=[]}},Object(c.b)(["GridPageLoadData","AlertShowEvent"])),components:{SearchBox:p.m,checkBreak:p.q}},_={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"at-human-block",style:{transform:"translate3d("+this.offset+"%, 0, 0)"}},[e("div",{staticClass:"people-list-content"},[e("div",{staticClass:"search-box-wrap"},[e("search-box",{attrs:{placeholder:"输入名字/登录名"},on:{change:t.searchChange},model:{value:t.searchQuery,callback:function(s){t.searchQuery=s},expression:"searchQuery"}})],1),t._v(" "),e("div",{staticClass:"list-content"},[e("cube-scroll",{ref:"Scroll",attrs:{data:t.List,options:t.options},on:{"pulling-down":t.onPullingDown,"pulling-up":t.onPullingUp}},[e("div",[e("ul",{staticClass:"lists"},t._l(t.List,function(s){return e("li",{key:s.Id,staticClass:"list-unit",on:{click:function(e){t.selectItem(s)}}},[e("div",{staticClass:"list-inner"},[e("div",{staticClass:"checkbox"},[e("check-break",{attrs:{checked:t.usersId.includes(s.Id)}})],1),t._v(" "),e("div",{staticClass:"list-msg"},[e("div",{staticClass:"name"},[t._v(t._s(s.Name)+"("+t._s(s.DeptName)+")")]),t._v(" "),e("div",{staticClass:"code"},[t._v(t._s(s.Code))])])])])}))])])],1)]),t._v(" "),e("div",{staticClass:"action-btn"},[e("div",{staticClass:"action-item",on:{click:t.hide}},[t._v("关闭")])])])},staticRenderFns:[]};var g=e("C7Lr")(C,_,!1,function(t){e("4OwY")},null,null).exports,y={props:{loadStart:{type:Boolean,default:!1},KeyWord:{type:String,default:""}},data:function(){return{commentValue:"",subscribeChecked:!1,HumanId:"",Subscribe:"N",comments:[],selectUsers:[]}},computed:o()({loginHumanId:function(){var t=Object(l.a)();return t?t.HumanId:""}},Object(c.c)(["routerParams"])),methods:o()({deleteSelectUser:function(t){var s=[].concat(a()(this.selectUsers)).filter(function(s){if(s.Id!==t.Id)return s});this.selectUsers=[].concat(a()(s))},getAtUsers:function(t){this.selectUsers=[].concat(a()(t))},openAtWizard:function(){this.$refs.AtHuman.show()},PostComment:function(){var t=this;if(!this.commentValue||""===this.commentValue)return this.AlertShowEvent("评论内容不能为空"),!1;var s=this.selectUsers.map(function(t){return{HumanId:t.Id,HumanName:t.Name}}),e={FormId:this.routerParams.FromId,KeyWord:this.KeyWord,KeyValue:this.routerParams.Id,CommentText:this.commentValue,AtHumanList:[].concat(a()(s))};this.PostCommentData(e).then(function(s){t.commentValue="",t.selectUsers=[],t.GetComment(function(){t._scrollBottom(),t.ToastShowEvent("提交成功")})}).catch(function(s){t.AlertShowEvent(s.message)})},GetComment:function(t){var s=this,e=this.KeyWord,n=this.routerParams.Id;this.GetCommentData({KeyWord:e,KeyValue:n}).then(function(e){var n=e.data;s.HumanId=n.HumanId,s.Subscribe=n.Subscribe,s.comments=[].concat(a()(n.value)).reverse(),t&&t()}).catch(function(t){s.AlertShowEvent(t.message)})},_scrollBottom:function(){var t=this;this.$nextTick(function(){t.ListsContent=t.$refs.commentsListsContent,t.ListsContent.scrollTop=t.ListsContent.scrollHeight})}},Object(c.b)(["PostCommentData","GetCommentData","AlertShowEvent","ToastShowEvent"])),watch:{loadStart:{handler:function(t,s){var e=this;this.loadStart&&this.GetComment(function(){e._scrollBottom()})},immediate:!0}},components:{CommentsList:m,XTextarea:h.a,Group:f.a,CheckIcon:v.a,AtHuman:g}},x={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{ref:"comments",staticClass:"comments"},[e("div",{ref:"commentsListsContent",staticClass:"comments-lists-content"},[e("ul",{staticClass:"comments-lists"},t._l(t.comments,function(s){return e("li",{key:s.Id,staticClass:"list-unit"},[e("comments-list",{attrs:{list:s,self:s.RegHumId===t.HumanId}})],1)}))]),t._v(" "),e("div",{staticClass:"send-action-content"},[e("div",{staticClass:"send-action"},[e("div",{staticClass:"action-list list-at",on:{click:t.openAtWizard}},[e("span",{staticClass:"at-text"},[t._v("@")])]),t._v(" "),e("div",{staticClass:"action-list show-box"},[e("div",{staticClass:"select-lists",on:{click:function(s){return s.stopPropagation(),t.openAtWizard(s)}}},t._l(t.selectUsers,function(s){return e("span",{key:s.Id,staticClass:"select-list"},[e("span",[t._v(t._s(s.Name))]),t._v(" "),e("svg",{staticClass:"vux-x-icon vux-x-icon-ios-close-empty",attrs:{type:"ios-close-empty",size:"25",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",width:"25",height:"25",viewBox:"0 0 512 512"},on:{click:function(e){e.stopPropagation(),t.deleteSelectUser(s)}}},[e("path",{staticClass:"st0",attrs:{d:"M340.2 160l-84.4 84.3-84-83.9-11.8 11.8 84 83.8-84 83.9 11.8 11.7 84-83.8 84.4 84.2 11.8-11.7-84.4-84.3 84.4-84.2z"}})])])}))]),t._v(" "),e("div",{staticClass:"action-list send-btn-box",on:{click:t.PostComment}},[e("span",{staticClass:"send-btn"},[t._v("发送")])])]),t._v(" "),e("group",{staticClass:"text-wrap"},[e("x-textarea",{attrs:{max:200,placeholder:"输入评论"},on:{"on-focus":t._scrollBottom},model:{value:t.commentValue,callback:function(s){t.commentValue=s},expression:"commentValue"}})],1)],1),t._v(" "),e("div",[e("at-human",{ref:"AtHuman",attrs:{selectUsers:t.selectUsers,HumanId:t.HumanId},on:{getAtUsers:t.getAtUsers}})],1)])},staticRenderFns:[]};var I=e("C7Lr")(y,x,!1,function(t){e("ADT4")},null,null);s.default=I.exports}});
//# sourceMappingURL=6.b02b44cd6a360a29993e.js.map