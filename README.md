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

# 在开发平台配置文档说明

## 窗体文件配置 ##

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


......持续更新中，敬请期待
