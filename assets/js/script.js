var bginfom = document.getElementById('bginfom'); // 新的音频
//var audio = new Audio('assets/bgm/bginfomm.wav');
//bginfom.loop = false;

let hasFixed = false; // 标志位，判断Mix图片是否已固定

img1.style.zIndex = '0'; // 确保图片在最上层
v1.style.zIndex = '2001'; // 确保图片在最上层
v2.style.zIndex = '2001'; // 确保图片在最上层
v3.style.zIndex = '2001'; // 确保图片在最上层
frame1.style.zIndex = '2001'; // 确保图片在最上层
frame2.style.zIndex = '2002'; // 确保图片在最上层
page14.style.zIndex = '2024'; // 确保图片在最上层

// 获取所有的锚点元素
const dots = document.querySelectorAll('.nav-dots .dot');

// 为每个锚点添加点击事件监听器
dots.forEach(dot => {
  dot.addEventListener('click', function(event) {
    event.preventDefault();  // 取消锚点的默认跳转行为

    // 移除所有锚点的激活状态
    dots.forEach(d => d.classList.remove('active'));
    // 为被点击的锚点添加激活状态
    this.classList.add('active');

    // 获取被点击锚点的目标区域ID
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    // 如果目标元素存在，则执行平滑滚动
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// 获取音频和图片元素
var audio = document.getElementById('chekhovm');
var chekhov = document.getElementById('chekhov');
var hasPlayed = false; // 添加一个标志来检查音频是否已经播放过
var hasPlayed2 = false; // 添加一个标志来检查音频是否已经播放过

// 检查元素是否在视口中的函数
function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

document.addEventListener('DOMContentLoaded', function() {

    // 禁用自动滚动恢复，并将视图滚动到顶部
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);



    // 获取页面元素
    var loadingScreen = document.getElementById('loadingScreen');
    var bgm = document.getElementById('bgm');
    var footerNav = document.getElementById('footerNav');
    var sitelogo = document.getElementById('sitelogo');
    var toggleMusicButton = document.getElementById('toggleMusic');
    var toggleFullscreenButton = document.getElementById('toggleFullscreen');

    var youtubeButton = document.getElementById('Youtube'); // 获取 YouTube 按钮
    var nameButton = document.getElementById('name'); // 获取 YouTube 按钮

    youtubeButton.addEventListener('click', function() {
        window.open('https://www.youtube.com/watch?v=OE8d0ANgecs', '_blank'); // 在新标签页中打开 URL
    });

   nameButton.addEventListener('click', function() {
        window.open('https://www.instagram.com/denmarkpie/', '_blank'); // 在新标签页中打开 URL
    });



 // 页面可见性变化时的处理函数
    function handleVisibilityChange() {
        if (document.visibilityState === 'hidden') {
            bgm.pause(); // 页面不可见时暂停音乐
            bginfom.pause(); // 页面不可见时暂停音乐
        } else if (document.visibilityState === 'visible') {
            bgm.play(); // 页面可见时播放音乐
        }
    }

    // 监听 visibilitychange 事件
    document.addEventListener('visibilitychange', handleVisibilityChange);



    // 检查所有必要的元素是否存在
    if (!loadingScreen || !bgm || !toggleMusicButton || !toggleFullscreenButton) {
        console.error("某些必要的元素不存在，请检查HTML中的ID是否正确。");
        return;
    }

// 修改 Loading 显示时间，然后显示 Click to start
setTimeout(function() {
   var clickToStartDiv = document.createElement('div');
clickToStartDiv.style.cssText = `
    font-family: 'Agency FB';  // 删除了逗号和多余的引号
    font-size: 90px; 
    color: white; 
    font-weight: bold; 
    position: absolute; 
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%); 
    pointer-events: none; 
    opacity: 0;`;  // 移除了额外的引号
document.body.appendChild(clickToStartDiv);  // 添加到文档中以显示该元素

    clickToStartDiv.className = 'click-to-start';
    clickToStartDiv.textContent = 'CLICK TO START';
    clickToStartDiv.classList.add('fade-in-animation');


    
    // 清空 loadingScreen 并添加新的元素
    loadingScreen.innerHTML = '';
    loadingScreen.appendChild(clickToStartDiv);
    loadingScreen.appendChild(smallTextDiv); // 确保这行代码在 setTimeout 函数内部
}, 4000);


    // 点击屏幕任何地方后关闭加载屏幕并尝试播放音乐
    loadingScreen.addEventListener('click', function() {
        document.body.classList.remove('no-scroll');
        loadingScreen.style.display = 'none';
        sitelogo.classList.add('fade-in-animation');

        setTimeout(() => {
            footerNav.style.display = 'block';
            footerNav.classList.add('fade-in-animation');
        }, 1000);

        // 尝试播放音乐
        try {
            var playPromise = bgm.play();
            if (playPromise !== undefined) {
                playPromise.then(() => console.log("自动播放开始")).catch((error) => {
                    console.error("自动播放失败: ", error);
                });
            }
        } catch (e) {
            console.error("播放音乐时发生错误: ", e);
        }
    });

    // 控制音乐播放和暂停
    toggleMusicButton.addEventListener('click', function() {
        if (bgm.paused) {
            bgm.play().then(() => console.log("音乐开始播放")).catch((error) => {
                console.error("播放失败:", error);
            });
        } else {
            bgm.pause();
            console.log("音乐已暂停。");
        }
    });

    // 控制全屏切换
    toggleFullscreenButton.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`无法进入全屏模式: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });
});


function updateScaleAndOpacity(pageId, viewportHeight, scrollY) {
    var page = document.getElementById(pageId);
    var pageRect = page.getBoundingClientRect();
    var pageTop = pageRect.top + scrollY;
    var pageHeight = pageRect.height;
    var pageMid = pageTop + (pageHeight / 2);
    var viewportMid = scrollY + (viewportHeight / 2);
    var distanceToMid = Math.abs(viewportMid - pageMid); 

    // 如果页面中心未离开视口中心，保持原大小
    if (distanceToMid < viewportHeight / 2) {
        page.style.opacity = 1;
        page.style.transform = 'scale(1)';
    } else {
        var excessDistance = distanceToMid - viewportHeight / 2;
        var scale = Math.max(1 - (excessDistance), 0.5);
        page.style.opacity = scale * 2; // 逐渐减少透明度
        page.style.transform = `scale(0.5)`;
    }
}

// 视差滚动效果
window.addEventListener('scroll', function() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    var viewportHeight = window.innerHeight;

    // 对 sitelogo 的处理逻辑保持不变
    var sitelogo = document.getElementById('sitelogo');
    var sitelogoScale = Math.max(1 - Math.min(scrollY / viewportHeight, 1), 0.5);
    sitelogo.style.transform = `scale(${sitelogoScale})`;

    // 处理 page1 缩放和透明度
    updateScaleAndOpacity('page1', viewportHeight, scrollY);

    // 处理 page2 缩放和透明度
    updateScaleAndOpacity('page2', viewportHeight, scrollY);

    var page2Bottom = page2.offsetTop + page2.offsetHeight;

    // 控制 Mix 图片的淡入效果
    var img1 = document.getElementById('img1');
    if (scrollY >= viewportHeight * 0.5) {
        img1.style.opacity = Math.min((scrollY - viewportHeight * 0.5) / viewportHeight, 1);
    } else {
        img1.style.opacity = 0;
    }

    // 获取 Mix 图片、page3 和 page4 的元素
    var page3 = document.getElementById('page3');
    var page4 = document.getElementById('page4');

    // 计算 page2 底部的位置
    var page2Bottom = page2.offsetTop + page2.offsetHeight;


    var rightNav = document.getElementById('rightNav');


    // 当页面滚动到 page2 底部时，固定 Mix 图片并填满整个屏幕
    if (scrollY >= page2Bottom) {
        img1.style.position = 'fixed';
        img1.style.top = '0';
        img1.style.left = '0';
        img1.style.width = '100vw';
        img1.style.height = '100vh';
        hasFixed = true;


         rightNav.style.display = 'block';


     // 调低当前音频的音量
        bgm.volume = 0.6; // 设置为60%的音量
       
        // 播放新的音频文件
	bginfom.play();
	hasPlayed2 = true;

    }  else {
        img1.style.position = 'relative'; // 当不在 page2 底部时，恢复原始样式
        img1.style.width = ''; // 清除宽度设置
        img1.style.height = ''; // 清除高度设置
	bgm.volume = 1.0; // 设置为100%的音量// 如果页面不在 page2 底部，恢复原始音量
            // 隐藏rightNav
            rightNav.style.display = 'none';
	hasFixed = false;
    }

    // 使用 console.log 输出值
    console.log('Scroll Y:', scrollY);

   // 计算 page3 底部的位置
    var page3Bottom = page3.offsetTop + page3.offsetHeight;
   

    // 当页面滚动到 page3 底部时，开始隐藏 Mix 图片
 if (scrollY > page3Bottom) {
    bginfom.pause(); 

    // 计算 page3 已经滚动出视窗的部分占其总高度的百分比
    var scrolledPastPage3 = (scrollY - page3Bottom) / 500;
    
    // 限制scrolledPastPage3的值不超过1
    scrolledPastPage3 = Math.min(scrolledPastPage3, 1);
    
    // 保证不透明度不低于0.15
    var opacity = Math.max(1 - scrolledPastPage3, 0.15);
    img1.style.opacity = opacity;

    // 如果滚动距离小于或等于0.908，则不隐藏图片
    if (scrolledPastPage3 <= 0.908) {
        img1.style.display = 'block';
    } else {
        // 当滚动比例大于0.908时，保持不透明度在0.092
        img1.style.opacity = 0.15;
    }
} else {
    // 当不在 page3 底部时，保持 Mix 图片可见
    img1.style.opacity = 1;
    img1.style.display = 'block';
}

    // 如果图片在视口中，音频尚未播放，且标志为 false
    if (isInViewport(chekhov) && audio.paused && !hasPlayed) {
        audio.play(); // 播放音频
        hasPlayed = true; // 更新标志为 true，表示音频已播放
    }

  // 获取页面中各部分的元素
  const sections = [
    document.getElementById('page4'),
    document.getElementById('page5'),
    document.getElementById('page8'),
    document.getElementById('page9'),
    document.getElementById('page10'),
    document.getElementById('page11'),
    document.getElementById('page12'),
    document.getElementById('page13'),
    // ... 添加其他页面部分的元素
  ];

 // 检查每个部分是否在视口中
 sections.forEach((section, index) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const bottom = top + height;

    // 如果页面滚动位置在当前部分的范围内
    if (scrollY >= top && scrollY < bottom) {
      // 移除所有锚点的激活状态
      dots.forEach(d => d.classList.remove('active'));
      // 为对应的锚点添加激活状态
      dots[index].classList.add('active');
    }
  });

});