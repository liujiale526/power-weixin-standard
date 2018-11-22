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
	    "KeyWord": "PS_IncomeContract", // 当前窗体的KeyWord
	    "idfield": "Id",				// 主键字段名，一般为Id
	    "swhere": "",					// 请求窗体数据时的where条件（程序中暂时没有使用此属性）
	    "size": "10",					// 数据一页的数据个数
	    "type": "grid",					// 窗体中数据格式是什么形式（程序中暂时没有用到此属性）
	    "winTitle": "合同登记",			// 窗体的title（默认值是窗体）
	    "tableListType": "default",		// 窗体数据的UI展示形式
	    "title": {						// 窗体中每一条数据的title相关的属性
	        "title": "合同名称",			// title的字段名
	        "field": "ContractName",	// title要显示的对应的字段
	        "format": ""				// 字段的显示格式 "" 默认代表是text类型
	    },
	    "left": {
	        "title": "合同编号",
	        "field": "ContractCode",
	        "format": ""
	    },
	    "center": {
	        "title": "最终金额",
	        "field": "FinalContractAmount",
	        "format": "n2"
	    },
	    "right": {
	        "title": "签订日期",
	        "field": "SignedDate",
	        "format": "yyyy-MM-dd"
	    },
	    "tag": {
	        "title": "状态",
	        "field": "Status",
	        "format": "combobox"
	    },
	    "search": {
	        "title": "请输入合同名称",
	        "field": "ContractName",
	        "format": ""
	    }
	}
