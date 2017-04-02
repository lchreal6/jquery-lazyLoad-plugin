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
            
            if( oH < h + sT) {
                                
                var imgUrl = $(el[i]).attr('data-img');
                $(el[i]).attr('src', imgUrl);
                n = i;  
                
            }
        }
      }

    }
}(jQuery))