var aniShow = {};
mui.init({
	swipeBack: true //启用右滑关闭功能
});
mui.plusReady(function() {
	var self = plus.webview.currentWebview(),
		nviews = self.getSubNViews(),
		subpages = util.options.subpages,
		leftPos = Math.ceil((window.innerWidth - 60) / 2); // 设置凸起大图标为水平居中

	/**	
	 * drawNativeIconBg 绘制带边框的半圆，
	 * 实现原理：
	 *   id为bg的tag 创建带边框的圆
	 *   id为bg2的tag 创建白色矩形遮住圆下半部分，只显示凸起带边框部分
	 *   注意创建先后顺序，创建越晚的层级越高
	 */
	var drawNativeIconBg = util.drawNative('iconBg', {
		bottom: '5px',
		left: leftPos + 'px',
		width: '60px',
		height: '60px'
	}, [{
		tag: 'rect',
		id: 'bg',
		position: {
			top: '1px',
			left: '0px',
			width: '100%',
			height: '100%'
		},
		rectStyles: {
			color: '#fff',
			radius: '50px',
			borderColor: '#ccc',
			borderWidth: '1px'
		}
	}, {
		tag: 'rect',
		id: 'bg2',
		position: {
			bottom: '0px',
			left: '0px',
			width: '100%',
			height: '45px'
		},
		rectStyles: {
			color: '#fff'
		}
	}]);

	/**
	 * 凸起图标最后创建  浮在最顶层
	 *	id为iconBg的红色背景图
	 * 	id为icon的字体图标
	 * 	
	 */
	var drawNativeIcon = util.drawNative('tabIcon', {
		bottom: '10px',
		left: leftPos + 5 + 'px',
		width: '50px',
		height: '50px',
		position: 'dock' //此种停靠方式表明该控件应浮在窗口最上层，以免被其他窗口遮住
	}, [{
		tag: 'rect',
		id: 'iconBg',
		position: {
			top: '0px',
			left: '0px',
			width: '50px',
			height: '100%'
		},
		rectStyles: {
			color: '#D33945',//圆圈背景色
			size: '50px',
			radius: '50%'
		}
	}, {
		tag: 'font',
		id: 'icon',
		text: '\ue600', //此为字体图标Unicode码'\e600'转换为'\ue600'
		position: {
			top: '0px',
			left: '0px',
			width: '50px',
			height: '100%'
		},
		textStyles: {
			fontSrc: '_www/fonts/iconfont.ttf',
			align: 'center',
			color: '#fff',
			size: '30px'
		}
	}]);
	// append 到父webview中
	self.append(drawNativeIconBg);
	self.append(drawNativeIcon);

	//自定义监听图标点击事件
	drawNativeIcon.addEventListener('click', function(e) {
		mui.alert('你点击了图标，你在此可以打开摄像头或者新窗口等自定义点击事件。', '悬浮球点击事件');
		// 重绘字体颜色
		drawNativeIcon.drawText('\ue600', {}, {
			fontSrc: '_www/fonts/iconfont.ttf',
			align: 'center',
			color: '#000',
			size: '30px'
		}, 'icon');
	});
	
	//创建子webview窗口 并初始化
	util.initSubpage();
	var activePage = plus.webview.currentWebview();

	//给每个view 添加监听点击切换
	for(var i = 0; i < 4; i++) {
		nviews[i].addEventListener('click', clickEvent, false);
	}

	// 自定义 tab 点击事件
	function clickEvent(e) {
		var currId = e.target.id,
			currIndex = parseInt(currId.substr(currId.length - 1, 1) - 1),
			currView = self.getStyle().subNViews[currIndex];
			console.log(currId.length);
			console.log("123");
		// 匹配对应tab窗口	
		if(currIndex > 0){
			targetPage = plus.webview.getWebviewById(subpages[currIndex-1]);						
		}else {
			targetPage = plus.webview.currentWebview();
		}

		if(targetPage == activePage) {
			return;
		}

//		if(currIndex !== 3) {
			//底部选项卡切换
			util.toggleNview(currView, currIndex);
			// 子页面切换
			util.changeSubpage(targetPage, activePage);
			//更改当前活跃的页面
			activePage = targetPage;
//		} else {
//			//第四个tab 打开新窗口
//			var newWV = plus.webview.create('../html/new-webview.html', 'new');
//			newWV.show('slide-in-right', 200);
//		}
	}
});