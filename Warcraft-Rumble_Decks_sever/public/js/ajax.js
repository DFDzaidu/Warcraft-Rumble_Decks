function ajax(options) {
	//默认初始化
	var defaults = {
		type: 'get', //请求类型
		url: '', //请求地址
		data: {},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		success: function() {},
		error: function() {}
	}
	//如果没有传递那就使用默认值 使用对象覆盖、
	Object.assign(defaults, options)


	var xhr = new XMLHttpRequest();
	//拼接请求参数变量
	var params = '';
	//循环用户传递进来的对象格式参数
	for (var attr in defaults.data) {
		params += attr + '=' + defaults.data[attr] + '&'
	}
	//截取参数
	params = params.substr(0, params.length - 1)
	console.log(params)
	//配置ajax对象
	if (defaults.type == 'get') {
		var reg = /[?#]/
		if (reg.test(defaults.url)) {
			console.log('有问号')
			defaults.url = defaults.url + '&' + params
			console.log(defaults.url)
		}else{
			defaults.url = defaults.url + '?' + params
		}
		
		console.log(defaults.url)
	}
	xhr.open(defaults.type, defaults.url)
	//发送请求
	if (defaults.type == 'post') {
		//post必须设置请求参数的格式类型
		var contentType = defaults.header['Content-Type']
		xhr.setRequestHeader('Content-Type', contentType)
		//如果想传递json的数据类型
		if (contentType == 'application/json') {
			xhr.send(JSON.stringify(defaults.data)); //将对象转换成字符串传递
		} else { //否则就是普通拼接参数
			xhr.send(params);
		}
	} else {
		xhr.send()
	}
	//xhr接受完响应数据后触发
	xhr.onload = function() {
		//xhr.getResponseHeader() 获取响应头当中的数据
		var contentType = xhr.getResponseHeader('Content-Type')
		//服务器端返回的数据
		var responseText = xhr.responseText;
		//如果返回的是json类型
		if (contentType.includes('application/json')) {
			//重新赋值
			responseText = JSON.parse(responseText)
		}
		// console.log(xhr.getResponseHeader('Content-Type'))
		if (xhr.status == 200) { //成功时调用的方法
			defaults.success(responseText, xhr)
		} else {
			defaults.error(responseText, xhr)
		}

	}
}
