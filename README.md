# power-weixin-standard

> A Vue.js project vue2.0, vux, cube-ui , axios, ES6, webpack3.0

# 启动工程项目和打包项目

安装项目所需的依赖包:

1. 如果网速良好，并且可以翻墙，可以执行 npm install。
2. 如果npm安装报错，可以先全局安装npm install cnpm --g,然后执行cnpm install。
3. 如果你喜欢使用[yarn](https://yarn.bootcss.com)，你也可以全局安装yarn,然后执行yarn就可以了。
4. 开发环境中端口号为8080， 确保你本机8080端口不被占用，否则会抛错
5. localhost:8080 npm run dev / cnpm run dev / yarn dev / yarn start
6. 构建压缩好的生产文件npm run build / cnpm run build / yarn build
7. 构建压缩好的生产文件并且生成分析报表npm run build --report

# 项目说明
#### 微信应用使用的前提 ####
1. 把微信模块的补丁更新到项目中去
2. 在微信企业号官网注册相关应用(下面会有详细的步奏)
3. 把本项目中的dist文件夹下的weixin3.0拷贝到项目的跟目录下面

#### 关于一些报错问题 ####
1. 当窗体中没有配置信息的时候，会出现报错行为，此种现象属于正常
2. 当表单中没有配置信息的时候，页面会跳转PC的对应的表单页面
3. 表单中的附件，当在开发环境或者在生产环境的PC端浏览器打开对应页面的时候，会出现报错行为，此行为属于正常，在微信上打开就正常了

#### 关于微信项目拓展功能的问题 ####
假如客户想添加一下其他功能，可以在本项目的项目门户中自建相关的功能模块，项目门户中嵌入了一个iframe 链接指向/weixin3.0/static/html/index.html 可以在这个.html文件中构建自定义的功能模块。由于本项目是单页面应用项目，所以不推荐自建复杂的功能模块

#### 一.开通企业微信 ####
1. 目前企业微信与原企业号已经合并，登录[企业微信官网](https://work.weixin.qq.com/ "企业微信官网") 让客户自行注册即可。年审费用目前是300元/年。 ![企业微信登录页](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/weixinpic/weixinlogin.png)
2. 注册成功后，会自动生成企业CorpId，记录下来，需要在后面PMS应用站点配置![企业应用门户](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/weixinpic/yiyong.png)
3. 导入通讯录。在通讯录菜单下，可以创建部门，批量导入成员，并邀请用户关注，可通过短信或邮件或微信号批量邀请关注。![通讯录](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/weixinpic/users.png)

#### 二.配置企业应用参数 ####
1. 进入企业微信后台，进入企业应用——自建应用，点击新建应用，创建应用，应用名称会出现在微信通讯录，请客户想好名称。![应用创建](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/weixinpic/yiyongcreate.png)
2. 创建应用后，会生成应用的AgentId和Secret码，复制出来，后面配置会用到。点击编辑按钮，可以编辑该应用的可见范围，可以选择人员或部门。![提取创建应用的信息](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/weixinpic/yiyongmsg.png)
3. 为应用设置可信域名。点击“网页授权及JS-SDK”，输入PMS站点域名，点击申请校验按钮。注意，此处一定要是域名才行，IP地址是不行的。![设置可信域名](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/weixinpic/getkey.png) 校验完成后，会产生一个文档，下载后放到PMS站点根目录下。 ![获取校验文档](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/weixinpic/keytext.png)
4. 配置菜单，进入应用，点击自定义菜单，为应用配置默认菜单。![配置菜单](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/weixinpic/configmenu.png) 目前PowerM3提供了一个默认菜单。![查看菜单](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/weixinpic/seemenu.png)![编辑菜单](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/weixinpic/editmenu.png)对应的地址分别如下，将域名替换即可（注意是 weixin3.0，以前在用老版本的用户也可以替换成新版本，改这个地址就可以了）账号绑定：http://xxxx.xxxxx.xxxx:9508/weixin3.0/index.html/#/login

#### 三.配置PMS站点参数 ####
将上面提到的几个参数复制到如下图位置。![在项目上配置](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/weixinpic/configpc.png)注意:站点外网访问地址必须有http://前缀，不可省略，不然安卓消息推送会有问题。到此步骤，已经可以实现微信端接收PMS推送的消息。若要进一步在微信端配置其它模块，继续往后。

#### 四.输出微信端模块 ####
1. 输出移动端菜单 ![输入菜单](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/weixinpic/ouyputmenu.png)
2. 配置权限，同web端 ![配置菜单权限](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/weixinpic/configright.png)


# 在开发平台配置文档说明
## [窗体文件配置](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/json/window.json "窗体文件配置") (窗体配置文档案例 click the blue fonts) ##

	{
	    "KeyWord": "PS_IncomeContract", // (必填)当前窗体的KeyWord
	    "idfield": "Id",// (必填)主键字段名，一般为Id
	    "swhere": "",// (可填)请求窗体数据时的where条件（程序中暂时没有使用此属性）
	    "size": "10",// (必填)数据一页的数据个数
	    "type": "grid",// (可填)窗体中数据格式是什么形式（程序中暂时没有用到此属性）
	    "winTitle": "合同登记",// (可填)窗体的title（默认值是窗体）
	    "tableListType": "default",// (可填)窗体数据的UI展示形式
	    "title": {// 窗体中每一条数据的title位置相关的属性和信息
	        "title": "合同名称",// title的字段名
	        "field": "ContractName",// title要显示的对应的字段
	        "format": ""// 字段的显示格式 "" 默认代表是text类型
	    },
	    "left": {// 窗体中每条数据的left位置显示的相关属性和信息
	        "title": "合同编号",// left的字段名
	        "field": "ContractCode",//left要显示的字段
	        "format": ""// 字段要显示的格式 "" 默认代表是text类型
	    },
	    "center": {// 窗体中每条数据的center位置显示的相关属性和信息
	        "title": "最终金额",// center的字段名
	        "field": "FinalContractAmount",// center要显示的字段
	        "format": "n2"// 字段要显示的格式 "n2" 代表是千分位 保留两个小数点类型
	    },
	    "right": {// 窗体中每条数据的right位置显示的相关属性和信息
	        "title": "签订日期",// right的字段名
	        "field": "SignedDate",// right要显示的字段
	        "format": "yyyy-MM-dd"// 字段要显示的格式 "yyyy-MM-dd" 代表是日期格式
	    },
	    "tag": {// 窗体中每条数据的tag位置显示的相关属性和信息
	        "title": "状态",// tag的字段名(这个位置特殊，字段名不会显示出来)
	        "field": "Status",// tag要显示的字段
	        "format": "combobox"// 字段要显示的格式 "combobox" 代表是下拉框	    },
	    "search": {//这个是窗体中搜索框search的相关信息
	        "title": "请输入合同名称",// search的placeholder
	        "field": "ContractName",// 根据什么字段执行搜索
	        "format": ""// 类型，一般给一个""就可以了，也可以不加
	    }
	}

#### 以上窗体配置注意事项
1. tableListType的属性值有
	- 默认风格:"default"
	- 简约风格:"contractStyle"
	- 靓丽风格:"beauty"
	- Table风格:"table"
	- 豪华风格: "luxury"
	- 豪华简约 "luxuryBeauty"
2. winTitle属性：如果想看到标题，这里最好要配置一下，如果不配置，默认的是窗体

3. title,left,center,right这个四个属性的相关属性：
	- title: 字段名称
	- field: 要显示的字段
	- format: 数据类型 目前支持格式如下：
		1. "": 默认为"text" 代表的是text类型
		2. "n2": 显示千分位保留两位小数点，一般是金额字段的显示格式
		3. "number": number类型的格式，不显示千分位 保留两位小数点
		4. "percent": 百分比格式 显示的结果是 (x * 100).00 + "%"
		5. "money": 显示千分位保留两位小数点，一般是金额字段的显示格式 和"n2"是同一种
		6. "yyyy-MM-dd": 显示为日期格式 XXXX年XX月XX日
		7. "rate": 汇率 小数点后面有8位
		8. "combobox": 下拉框格式的

4. tag属性：这是窗体专属的一个属性，表示要显示当前的审批状态一般这个属性的字段名为Status，但具体的还要根据项目的实际情况来处理

	- title: 这个属性值可以为""也可以为"状态"， 但是最终不显示这个字段，
	- field: 一般这个字段是Status,但是具体的要根据项目的具体的字段来填写
	- format: 如果是状态的话，一般都是下拉框的格式 "combobox"


#### 配置之后的效果图

![](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/window.png)


## [表单的配置](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/json/form.json, "表单的配置")  (表单的配置 click the blue fonts)  ##

	{
		"print": "false",(可填)这个属性暂时没用到
		"comment": true,//(可填)是否启用表单的评论模块 true启用， false或者不填为禁用
		"report": true,//(可填)是否启用表单的报表模块 true启用， false或者不填为禁用
		"fileAttach": true,//(可填)是否启用表单的附件模块 true启用， false或者不填为禁用
		"type": "form",(可填)这个属性暂时没用到
		"KeyWord": "PS_IncomeContract",// 表单主表的关键字
		"idfield": "Id",// (必填，不过暂时没用用到此属性)表单主表的主键字段 一般为Id
		"swhere": "",// where条件，暂时没用到
		"name": "基本信息",// 主表要显示的名称 一般为基本信息
		"formTitle": "合同表单",// 表单的标题，最好加上，默认是表单
		"controls": [//(必填)主表中要显示的字段 记住这是一个数组
			{
				"field": "ContractCode",//(必填) 显示字段
				"title": "合同编号",//(必填) 显示字段名称
				"format": "",// (可填)数据类型 （在下方会详细解释这些类型）
				"readonly": false,// (可填)只读类型 true or false
				"placeholder": "请输入合同编号"// (可填)对应控制器的placeholder
			},
			{
				"field": "ContractName",
				"title": "合同名称",
				"format": "",
				"readonly": false,
				"placeholder": "请输入合同名称"
			},
			{
				"field": "ContractType",
				"title": "合同类型",
				"format": "",
				"readonly": false,
				"placeholder": "请输入合同类型"
			},
			{
				"field": "ContractForm",
				"title": "合同形式",
				"format": "",
				"readonly": false,
				"placeholder": "请输入合同形式"
			},
			{
				"field": "ContractAmount",
				"title": "合同金额",
				"format": "n2",
				"readonly": false,
				"placeholder": "请输入合同金额"
			},
			{
				"field": "ChangeAmount",
				"title": "变更金额",
				"format": "n2",
				"readonly": false,
				"placeholder": "请输入变更金额"
			},
			{
				"field": "FinalContractAmount",
				"title": "最终金额",
				"format": "n2",
				"readonly": false,
				"placeholder": "请输入最终金额"
			},
			{
				"field": "CurrencyType",
				"title": "币种",
				"format": "",
				"readonly": false,
				"placeholder": "请输入币种"
			},
			{
				"field": "ProductType",
				"title": "产品类型",
				"format": "",
				"readonly": false,
				"placeholder": "请输入产品类型"
			},
			{
				"field": "ReviewWay",
				"title": "评审方式",
				"format": "",
				"readonly": false,
				"placeholder": "请输入评审方式"
			},
			{
				"field": "ReviewDate",
				"title": "评审日期",
				"format": "yyyy-MM-dd",
				"readonly": false,
				"placeholder": "请输入评审日期"
			},
			{
				"field": "SignedDate",
				"title": "签订日期",
				"format": "yyyy-MM-dd",
				"readonly": false,
				"placeholder": "请输入签订日期"
			},
			{
				"field": "Status",
				"title": "状态",
				"format": "combobox",
				"readonly": false,
				"placeholder": "请输入状态"
			}
		],
		"children": [{//(必填) 表单中的子表 记住这里是个数组，如果没有子表 默认给一个空的数组就可以了
			"KeyWord": "PS_IncomeContract_PayNodes",//(必填) 子表的关键字
			"tableListType": "default",//(可填) 子表列表显示的样式 和上面窗体中的tableListType值一样 具体的参考窗体的tableListType属性
			"idfield": "Id",(必填，目前程序中暂时没有使用到此属性，但是后面会用到) 子表的主键
			"type": "grid",//(可填，暂时没用到此属性，后面会用到) 子表的类表的类型
			"name": "付款节点",// (必填) 表的名称 字数最好控制在4-6个字
			"title": {// 具体可以参考窗体的此属性
				"title": "节点名称",
				"field": "PayNodes",
				"format": ""
			},
			"left": {// 具体可以参考窗体的此属性
				"title": "收款类型",
				"field": "PayType",
				"format": "combobox"
			},
			"center": {// 具体可以参考窗体的此属性
				"title": "收款金额",
				"field": "PayAmount",
				"format": "n2"
			},
			// 上面有 title,left, center三个属性，实际上还有right,tag属性， tag属性一般在子表中不建议添加， 对于title,left, center, right这个四个属性，如果不想显示可以不添加 一旦添加 要严格按照标准格式填写
			"tableShowField": [{// 子表要显示的字段 和 上面表单中的主表属性 controls 一样的功能 但是子表的字段必须是tableShowField，下面的属性参考主表controls里面的配置项，这里不再重述
				"field": "PayNodes",
				"title": "节点名称",
				"format": "",
				"readonly": false,
				"placeholder": "请输入节点名称"
			}, {
				"field": "PayType",
				"title": "收款类型",
				"format": "combobox",
				"readonly": false,
				"placeholder": "请输入收款类型"
			}, {
				"field": "PayAmount",
				"title": "收款金额",
				"format": "n2",
				"readonly": false,
				"placeholder": "请输入收款金额"
			}, {
				"field": "PayDescription",
				"title": "描述",
				"format": "",
				"readonly": false,
				"placeholder": "请输入描述"
			}]
		}]
	}


#### 表单配置注意事项 ####

1. 上面表单 主要是针对 项目上一些简单的表单，没有牵扯到计算相关的，主要用于审批功能
2. 表单中controls属性里面的format属性：
	- "text": 默认的是text类型，不填或者""会默认text类型 (最好填写)
	- "number": 数组类型 一般会保留两位小数
	- "n2": 加千分位，保留两位小数点
	- "rate": 汇率类型，一般指币种之间的汇率，小数点之后是8位
	- "percent": 百分比类型 这里显示不带%,最好在对应的title属性里面添加%,提示一下客户
	- "checkBox"： checkBox类型值一些选择框，一般对应的字段名为"1" or "0", "1" checkBox勾选， "0"则不选
	- "yyyy-MM-dd": 日期类型
	- "combobox": 下拉框类型
	- "textarea": 多行文本类型

#### 表单配置之后的样式图 ####
![](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/form1.png)
![](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/form2.png)
![](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/form3.png)
![](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/form4.png)


# 微信企业号最终的效果图

![登录页](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/login.png)
![业务中心](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/business.png)
![个人中心](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/my.png)
![项目中心](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/project.png)
![修改密码](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/changepass.png)
![项目切换](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/changeproject.png)
![设置窗体和子表列表显示的样式](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/tablestyle.png)
![个人信息详情](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/userinfo.png)
![审批列表](https://github.com/JohnJiang900526/power-weixin-standard/blob/master/src/common/img/workflow.png)
