#jQuery懒加载插件

* 原理：判断加载元素是否出现在视窗，是的话将img的data-img属性替换成src属性，显示图片。

* api

```javascript

$("#img1 img").lazyLoad();

```

html:
```html
<body>
      <div id="img1">
          <img src="" alt="" data-img="http://img12.360buyimg.com/da/jfs/t4483/350/1431185885/40802/a8b0e897/58de3643N3dea3e69.jpg">
          <img src="" alt="" data-img="http://img12.360buyimg.com/da/jfs/t4483/350/1431185885/40802/a8b0e897/58de3643N3dea3e69.jpg">
          <img src="" alt="" data-img="http://img12.360buyimg.com/da/jfs/t4483/350/1431185885/40802/a8b0e897/58de3643N3dea3e69.jpg">
          <img src="" alt="" data-img="http://img12.360buyimg.com/da/jfs/t4483/350/1431185885/40802/a8b0e897/58de3643N3dea3e69.jpg">
          <img src="" alt="" data-img="http://img12.360buyimg.com/da/jfs/t4483/350/1431185885/40802/a8b0e897/58de3643N3dea3e69.jpg">
      </div>


      <script src="jquery.min.js"></script>
      <script src="plugin.js"></script>

      <script>

          $("#img1 img").lazyLoad();
           
      </script>
    </body>
```

js:
```javascript
(function($) {
    $.fn.lazyLoad = function() {
        
        var el = $(this),
            l = $(this).length,
            n = 0,
            h = document.documentElement.clientHeight || document.body.clientHeight,
            isLast = false;

        window.addEventListener('scroll', throttle(loadImg,250,500));

        

        //节流函数
        function throttle(func, wait, mustRun) {
	        var timeout,
                timer,
		        startTime = new Date();

	        return function() {
		        var context = this,
			    args = arguments,
			    curTime = new Date();

		        clearTimeout(timeout);
                clearTimeout(timer);
            
            //滑动时添加进制鼠标事件样式，提高性能
            if (!$('body').hasClass('disable-hover')) {
                    $('body').addClass('disable-hover');
            }


		    // 如果达到了规定的触发时间间隔，触发 handler
		    if (curTime - startTime >= mustRun) {
			    func.apply(context,args);
			    startTime = curTime;

		    // 没达到触发间隔，重新设定定时器
            }else{
            
			    timeout = setTimeout(func, wait);

		    }

            //滑动停止后，去掉鼠标进制样式，恢复正常
            timer = setTimeout(function() {

                $('body').removeClass('disable-hover');

            }, 250);
	    };
      };

      //加载图片
      function loadImg() {
            
            for (var i = n;i < l; i++) {

            //判断是否最后一个元素
            if (isLast === true) break;

            if (n == l-1) {
                isLast = true;
                var imgUrl = $(el[l]).attr('data-img');
                $(el[l]).attr('src', imgUrl);
                n = i;
            }

            var sT = document.documentElement.scrollTop || document.body.scrollTop;             
            var oH = $(el[i]).offset().top;
            
            //判断元素是否在视窗内
            if( oH < h + sT) {
                                
                var imgUrl = $(el[i]).attr('data-img');
                $(el[i]).attr('src', imgUrl);
                n = i;  //储存已经替换的元素，避免反复操作
                
            }
        }
      }

    }
}(jQuery))
```

采用节流函数，目的是避免执行scoll时多次执行绑定事件，影响性能，此外还加了scoll时去除鼠标进制事件样式，完成后自动去除该样式，因为滚动时出现鼠标触发hover等事件也会影响性能。

节流函数：
```javascript
// 简单的节流函数
function throttle(func, wait, mustRun) {
	var timeout,
		startTime = new Date();

	return function() {
		var context = this,
			args = arguments,
			curTime = new Date();

		clearTimeout(timeout);
		// 如果达到了规定的触发时间间隔，触发 handler
		if(curTime - startTime >= mustRun){
			func.apply(context,args);
			startTime = curTime;
		// 没达到触发间隔，重新设定定时器
		}else{
			timeout = setTimeout(func, wait);
		}
	};
};
// 实际想绑定在 scroll 事件上的 handler
function realFunc(){
	console.log("Success");
}
// 采用了节流函数
window.addEventListener('scroll',throttle(realFunc,500,1000));

```
