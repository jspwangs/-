/*ajax*/
/*显示商品*/
$('#selectTime').change(function () {
    screenGoods();
        });
$('#selectPrice').change(function () {
    screenGoods();
    });
$('#selectOpus').change(function () {
    pageNumber=1;
    $('#pageNews').text('1');
    screenGoods()
    });
var pageNumber=1;
function screenGoods() {
    let color='%'+$('.search').attr('colortext-data')+'%';//颜色
    if(color=='%%%'){
        color='%';
    }
    let classify_id=$('.search').attr('classify-data');//类别
    let style_id=$('.search').attr('style-data');//风格
    let theme_id=$('.search').attr('theme-data');//题材
    let space_id=$('.search').attr('space-data');//摆放空间
    let searchtext=$('.search').attr('searchtext');//作者名称or作品名称
    let pricemin=parseInt($('.search').attr('pricemin-data'));//获取最小价格
    let pricemax=parseInt($('.search').attr('pricemax-data'));//获取最大价格
    let sizemin=parseInt($('.search').attr('sizemin-data'));//获取最小规格
    let sizemax=parseInt($('.search').attr('sizemax-data'));//获取最大规格
    let state=$('#selectOpus').find('option:selected').text();//获取页面作品状态
    let grounding=$('#selectTime').find('option:selected').text();//上架时间
    let priceSelect=$('#selectPrice').find('option:selected').text();//价格

    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    xhr.open('post','/originalArt/screenGoods', true);
    xhr.setRequestHeader("content-type", 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            if (data[0].length != 0) {
                $('.showcase').html('');
                $('.tips').text('');
                let pagenum=data[1][0].pagenum;//获取筛选结果条数
                $('#pageCount').text(parseInt(Math.ceil(pagenum/9)));//设置页面总页数
                let stateTip='';
                for(let i=0;i<data[0].length;i++){
                    if(data[0][i].state==0){
                        stateTip='已出售';
                    }else {
                        stateTip='';
                    }
                    let goods_height='';
                    if(data[0][i].goods_height==null){
                        goods_height='';
                    }
                    else {
                        goods_height='X'+data[0][i].goods_height;
                    }
                    $('.showcase').append('<li class="goodsItem">\n' +
                        '                        <div><span class="stateTip">'+stateTip+'</span><a href="/information/goodsInfo/'+data[0][i].goods_id+'" data-img><img src='+data[0][i].src+' class="goodsImg"></a></div>\n' +
                        '                        <div class="goodsText">\n' +
                        '                            <a href="#" class="goodsAuthor" goodsId>'+data[0][i].author_name+'</a>\n' +
                        '                            <p>\n' +
                        '                                <a href="" class="goodsName">'+data[0][i].goods_name+'</a>,<span class="goodsTime">'+data[0][i].goods_date+'</span><br>\n' +
                        '                                <span class="goodsMaterial">'+data[0][i].goods_material+'</span> <span class="goodsSize">'+data[0][i].goods_long+'X'+data[0][i].goods_width+''+goods_height+'cm</span>\n' +
                        '                            </p>\n' +
                        '                            <p class="goodsPrice">￥'+data[0][i].price+'</p>\n' +
                        '                        </div>\n' +
                        '                    </li>')
                }
            }else {
                $('.showcase').html('');
                $('.tips').text('对不起，没有查询到符合要求的内容，请重新选择');
            }
        }
    };
    xhr.send('color='+color+'&classify_id='+classify_id+'&style_id='+style_id+'&theme_id='+theme_id+'&space_id='+space_id+'&pricemin='+pricemin+'&pricemax='+pricemax+'&sizemin='+sizemin+'&sizemax='+sizemax+'&state='+state+'&grounding='+grounding+'&priceSelect='+priceSelect+'&pageNumber='+pageNumber+'&searchtext='+searchtext);
}
//开始高级筛选
$('#startScreen').click(function () {
    pageNumber=1;
    $('#pageNews').text('1');
    screenGoods();
});
//下一页
$('#nextPage').click(function () {
    pageNumber++;
    let pageCount=parseInt($('#pageCount').text());
    if(pageNumber<=pageCount){
        screenGoods();
    }else {
        pageNumber=pageCount;
    }
    $('#pageNews').text(pageNumber);
});
//上一页
$('#prePage').click(function () {
    pageNumber--;
    if(pageNumber>0){
        screenGoods();
    }else {
        pageNumber=1;
    }
    $('#pageNews').text(pageNumber);
});




//条件筛选板块切换
$('#searchBt').on('click',searchBtn);
function searchBtn() {
    $('.fastScreen').slideToggle(400);
    $('.seniorScreen').slideToggle(400);
    $('#startScreen').slideToggle(400);
    if($('.searchText').text()=='高级搜索'){
        $('.searchText').text('快速搜索');
    }else {
        $('.searchText').text('高级搜索');
    }
}
//筛选right--详解分类-移入切换-风格
$('.styleLabel>li').on('mouseover',styleLi);
$('.styleLabel>li').on('click',styleLi);
$('.themeLabel>li').on('mouseover',themeLi);
$('.themeLabel>li').on('click',themeLi);
//筛选right--详解分类-移入切换-风格
function styleLi() {
    let num=$(this).index();
    let h3fText='';
    let h3lText='';
    let pText='';
    $('.fastScreenSug').css('background-image','url("../image/originalArt/'+num+'.jpg")');
    if(num===0){
        h3fText='抽象';
        h3lText='Abstract Expression';
        pText='是既不模仿又不直接再现外在现实，以形式和色彩本身来打动观众的艺术风格。\n' +
            '                        通过对现实的扭曲变形来表现艺术家的激情和内心幻象，强调表现的自发性和\n' +
            '                        艺术家的个性。';
    }
    else if(num===1){
        h3fText='具象';
        h3lText='Realism';
        pText='起源于十九世纪的法国。写实不是描绘抽象的符号，而是对真实存在的物体或想象出来的对象的描述。';
    }
    else if(num===2){
        h3fText='观念艺术';
        h3lText='Chinese Painting';
        pText='观念艺术质疑艺术这一整体观念，例如：艺术是否可以指涉及其自身之外的东西。观念艺术需要通过语言和文字进行表达，它的呈现方式为绘画、方案计划书、照片、影像等。';
    }
    else if(num===3){
        h3fText='传统国画';
        h3lText='Realism';
        pText='传统国画：国画一词起源于汉代，汉朝人认为中国是居天地之中者，所以称为中国，将中国的绘画称为“中国画”，简称“国画”。主要指的是画在绢、宣纸、帛上并加以装裱的卷轴画';
    }
    $('.fastScreenSug>h3:first').text(h3fText);
    $('.fastScreenSug>h3:last').text(h3lText);
    $('.fastScreenSug>p').text(pText);
}
//筛选right--详解分类-移出还原-风格
$('.styleLabel>li').mouseleave(function () {
    fastScreenSug();
});
//筛选right--详解分类-移入切换-题材
function themeLi() {
    let num=$(this).index()+4;
    let h3fText='';
    let h3lText='';
    let pText='';
    $('.fastScreenSug').css('background-image','url("../image/originalArt/'+num+'.jpg")');
    if(num===4){
        h3fText='人物';
        h3lText='Portrait';
        pText='是以人物为形象主体的画。中国画人物力求逼真传神，气韵生动，形神兼备，西方人物画严谨规整，秉承理性思维，以光感，质感体积和空间感来体现人物。';
    }else if(num===5){
        h3fText='风景';
        h3lText='Landscape';
        pText='风景的概念起源于绘画，人类绘画早先的主题是动物，然后是人类自己，最早有记载的的单纯风景画是中国晋代展子虔的《游春图》，以后中国画中的风景画被称为山水画。';
    }else if(num===6){
        h3fText='静物';
        h3lText='Still-life';
        pText='仅以画家近距离观察的物体（大多数为家居用品——餐具、花卉、书籍，但有时是头盖骨、已死的猎物等）为内容的绘画。静物在早期东方艺术中相当重要，在西方，它直到16世纪才作为独立题材出现。';
    }
    $('.fastScreenSug>h3:first').text(h3fText);
    $('.fastScreenSug>h3:last').text(h3lText);
    $('.fastScreenSug>p').text(pText);
}
//筛选right--详解分类-移出还原-风格
$('.themeLabel>li').mouseleave(function () {
    fastScreenSug();
});
//fastScreenSug面板的数据集合
function fastScreenSug(){
    let num=parseInt($('.fastScreenSug').attr('fastScreenSug-data'));
    let h3fText='';
    let h3lText='';
    let pText='';
    $('.fastScreenSug').css('background-image','url("../image/originalArt/'+num+'.jpg")');
    if(num===0){
        h3fText='抽象';
        h3lText='Abstract Expression';
        pText='是既不模仿又不直接再现外在现实，以形式和色彩本身来打动观众的艺术风格。\n' +
            '                        通过对现实的扭曲变形来表现艺术家的激情和内心幻象，强调表现的自发性和\n' +
            '                        艺术家的个性。';
    }
    else if(num===1){
        h3fText='具象';
        h3lText='Realism';
        pText='起源于十九世纪的法国。写实不是描绘抽象的符号，而是对真实存在的物体或想象出来的对象的描述。';
    }
    else if(num===2){
        h3fText='观念艺术';
        h3lText='Chinese Painting';
        pText='观念艺术质疑艺术这一整体观念，例如：艺术是否可以指涉及其自身之外的东西。观念艺术需要通过语言和文字进行表达，它的呈现方式为绘画、方案计划书、照片、影像等。';
    }
    else if(num===3){
        h3fText='传统国画';
        h3lText='Realism';
        pText='传统国画：国画一词起源于汉代，汉朝人认为中国是居天地之中者，所以称为中国，将中国的绘画称为“中国画”，简称“国画”。主要指的是画在绢、宣纸、帛上并加以装裱的卷轴画';
    }
    else if(num===4){
        h3fText='人物';
        h3lText='Portrait';
        pText='是以人物为形象主体的画。中国画人物力求逼真传神，气韵生动，形神兼备，西方人物画严谨规整，秉承理性思维，以光感，质感体积和空间感来体现人物。';
    }
    else if(num===5){
        h3fText='风景';
        h3lText='Landscape';
        pText='风景的概念起源于绘画，人类绘画早先的主题是动物，然后是人类自己，最早有记载的的单纯风景画是中国晋代展子虔的《游春图》，以后中国画中的风景画被称为山水画。';
    }
    else if(num===6){
        h3fText='静物';
        h3lText='Still-life';
        pText='仅以画家近距离观察的物体（大多数为家居用品——餐具、花卉、书籍，但有时是头盖骨、已死的猎物等）为内容的绘画。静物在早期东方艺术中相当重要，在西方，它直到16世纪才作为独立题材出现。';
    }
    $('.fastScreenSug>h3:first').text(h3fText);
    $('.fastScreenSug>h3:last').text(h3lText);
    $('.fastScreenSug>p').text(pText);
}

//高级筛选-价格双滑块-min
$('.range1Min').on('mousedown',range1MinDn);
$(document).on('mouseup',range1MinUp);
//鼠标按下赋予鼠标移动事件
var downNum=0;
function range1MinDn() {
    $('body').on('mousemove',range1MinMove);
    downNum=1;
}
//鼠标松开取消事件绑定
function range1MinUp() {
    $('body').off('mousemove',range1MinMove);
    if(downNum==1){
        checkStartScreen();
        $('#reset').css('display','inline-block');
        $('.pricedata').remove();
        let min=$('.pricemin').text();
        let max=$('.pricemax').text();
        let price=$('.pricemin').attr('pricemin');
        $('.search').attr('pricemin-data',price);
        $('.search>div').prepend('<span class="iconfont pricedata">'+min+'-'+max+'<img src="../image/originalArt/close_input.svg" class="closeImg"></span>');
        downNum=0;
    }
}
//移动滑块改变按钮位置
function range1MinMove(e) {
    let chanum=0;
    let readBar1=$('.readBar1');//获取readBar1
    let range1Min=$('.range1Min');//获取range1Min
    let rangeWidth=parseInt($('#range1').css('width'));//获取range的宽度
    let rangeLeft=$('#range1').offset().left;// 获取父元素距离窗口左边距
    let mouseX=e.pageX;//鼠标距离窗口左边距
    let cha=parseInt(mouseX-rangeLeft);
    if(cha>rangeWidth-16){
        chanum=rangeWidth-16;
    }
    else if(cha<0){
        chanum=0;
    }
    else {
        chanum=cha;
    }
    range1Min.css('left',chanum);
    let minLeft=parseInt(range1Min.css('left'));//计算range1Min左边距
    let minTomax=parseInt($('.range1Max').position().left)-minLeft+16;//获取min到max的距离
    let pricemin=parseInt(minLeft/(rangeWidth/30))*1000;
    $('.pricemin').text('￥'+pricemin);
    $('.pricemin').attr('pricemin',pricemin);
    readBar1.css({'width':minTomax,'left':chanum});
}


//高级筛选-价格双滑块-max
$('.range1Max').on('mousedown',range1MaxDn);
$(document).on('mouseup',range1MaxUp);
//鼠标按下赋予鼠标移动事件
function range1MaxDn() {
    $('body').on('mousemove',range1MaxMove);
    downNum=2;
}
//鼠标松开取消事件绑定
function range1MaxUp() {
    $('body').off('mousemove',range1MaxMove);
    if(downNum==2){
        checkStartScreen();
        $('#reset').css('display','inline-block');
        $('.pricedata').remove();
        let min=$('.pricemin').text();
        let max=$('.pricemax').text();
       let price= $('.pricemax').attr('pricemax');
       $('.search').attr('pricemax-data',price);
        $('.search>div').prepend('<span class="iconfont pricedata">'+min+'-'+max+'<img src="../image/originalArt/close_input.svg" class="closeImg"></span>');
        downNum=0;
    }
}
//移动滑块改变按钮位置
function range1MaxMove(e) {
    let pricemax=0;
    let readBar1=$('.readBar1');//获取readBar1
    let range1Max=$('.range1Max');//获取range1Min
    let range1min=$('.range1Min');//获取range1Max
    let minLeft=parseInt(range1min.css('left'));//计算range1Min左边距
    let maxLeft=parseInt(range1Max.css('left'));//计算range1Max左边距
    let rangeWidth=parseInt($('#range1').css('width'));//获取range的宽度
    let rangeLeft=$('#range1').offset().left;// 获取父元素距离窗口左边距
    let mouseX=e.pageX;//鼠标距离窗口左边距
    let cha=parseInt(mouseX-rangeLeft);
    let chanum=0;
    if(cha>rangeWidth-16){
        chanum=rangeWidth-16;
    }else if(cha<1){
        chanum=0;
    }
    else {
        chanum=cha;
    }
        range1Max.css('left',chanum);
    pricemax=parseInt(maxLeft/(rangeWidth/30))*1000;
    if(pricemax>28000){
        pricemax='max';
        $('.pricemax').text(pricemax);
        $('.pricemax').attr('pricemax','99999999999');
    }else {
        $('.pricemax').text('￥'+pricemax);
        $('.pricemax').attr('pricemax',pricemax);
    }
    let minTomax=maxLeft-minLeft;//获取min到max的距离
        readBar1.css({'width':minTomax});
}


//高级筛选-尺寸双滑块-min
$('.range2Min').on('mousedown',range2MinDn);
$(document).on('mouseup',range2MinUp);
//鼠标按下赋予鼠标移动事件
function range2MinDn() {
    $('body').on('mousemove',range2MinMove);
    downNum=3;
}
//鼠标松开取消事件绑定
function range2MinUp() {
    $('body').off('mousemove',range2MinMove);
    if(downNum==3){
        checkStartScreen();
        $('#reset').css('display','inline-block');
        $('.sizedata').remove();
        let sizemin=$('.sizemin').text();
        let sizemax=$('.sizemax').text();
        let size=$('.sizemin').attr('sizemin');
        $('.search').attr('sizemin-data',size);
        $('.search>div').prepend('<span class="iconfont sizedata">'+sizemin+'-'+sizemax+'<img src="../image/originalArt/close_input.svg" class="closeImg"></span>');
        downNum=0;
    }
}
//移动滑块改变按钮位置
function range2MinMove(e) {
    let chanum=0;
    let readBar2=$('.readBar2');//获取readBar2
    let range2Min=$('.range2Min');//获取range2Min
    let range2Max=$('.range2Max');//获取range2Max
    let rangeWidth=parseInt($('#range2').css('width'));//获取range的宽度
    let rangeLeft=$('#range2').offset().left;// 获取父元素距离窗口左边距
    let mouseX=e.pageX;//鼠标距离窗口左边距
    let cha=parseInt(mouseX-rangeLeft);
    if(cha>rangeWidth){
        chanum=rangeWidth-16;
    }
    else if(cha<0){
        chanum=0;
    }
    else {
        chanum=cha;
    }
        range2Min.css('left',chanum);
    let sizeminText=parseInt(chanum/(rangeWidth/21))*10;
    if(sizeminText==0){
        sizeminText=0;
    }
    else {
        sizeminText=sizeminText+'cm';
    }
    $('.sizemin').text(sizeminText);
    $('.sizemin').attr('sizemin',parseInt(sizeminText));
    let minLeft=parseInt(range2Min.css('left'));//计算range2Min左边距
    let minTomax=parseInt(range2Max.position().left)-minLeft+16;//获取min到max的距离
    readBar2.css({'width':minTomax,'left':chanum});
}

//高级筛选-尺寸双滑块-max
$('.range2Max').on('mousedown',range2MaxDn);
$(document).on('mouseup',range2MaxUp);
//鼠标按下赋予鼠标移动事件
function range2MaxDn() {
    $('body').on('mousemove',range2MaxMove);
    downNum=4;
}
//鼠标松开取消事件绑定
function range2MaxUp() {
    $('body').off('mousemove',range2MaxMove);
    if(downNum==4){
        checkStartScreen();
        $('#reset').css('display','inline-block');
        $('.sizedata').remove();
        let sizemin=$('.sizemin').text();
        let sizemax=$('.sizemax').text();
        let size=$('.sizemax').attr('sizemax');
        $('.search').attr('sizemax-data',size);
        $('.search>div').prepend('<span class="iconfont sizedata">'+sizemin+'-'+sizemax+'<img src="../image/originalArt/close_input.svg" class="closeImg"></span>');
        downNum=0;
    }
}
//移动滑块改变按钮位置
function range2MaxMove(e) {
    let chanum=0;
    let readBar2=$('.readBar2');//获取readBar1
    let range2Max=$('.range2Max');//获取range1Min
    let range2min=$('.range2Min');//获取range1Max
    let minLeft=parseInt(range2min.css('left'));//计算range1Min左边距
    let maxLeft=parseInt(range2Max.css('left'));//计算range1Max左边距
    let rangeWidth=parseInt($('#range2').css('width'));//获取range的宽度
    let rangeLeft=$('#range2').offset().left;// 获取父元素距离窗口左边距
    let mouseX=e.pageX;//鼠标距离窗口左边距
    let cha=parseInt(mouseX-rangeLeft);
    if(cha>rangeWidth-16){
        chanum=rangeWidth-16;
    }
    else if(cha<0){
        chanum=0;
    }
    else {
        chanum=cha;
    }
    let sizemaxText=parseInt(chanum/(rangeWidth/22))*10;
    if(sizemaxText==210){
        sizemaxText='max';
        $('.sizemax').attr('sizemax','99999');
    }else {
        $('.sizemax').attr('sizemax',parseInt(sizemaxText));
        sizemaxText=sizemaxText+'cm';
    }
    range2Max.css('left',chanum);
    $('.sizemax').text(sizemaxText);
    let minTomax=maxLeft-minLeft;//获取min到max的距离
    readBar2.css({'width':minTomax});
}

//条件搜索获取条件
//价格
$('.priceLabel>li').click(function () {
    $('#reset').css('display','inline-block');
    let num=$(this).index();
    $(this).css('background-color','black');
    $('.priceLabel>li:not(:eq('+num+'))').css('background-color','#dddddd');
    $('.pricedata').remove();
    $('.search>div').prepend('<span class="iconfont pricedata">'+$(this).attr("pricetext")+'<img src="../image/originalArt/close_input.svg" class="closeImg"></span>');
    $('.search').attr('pricemin-data',$(this).attr('pricemin'));
    $('.search').attr('pricemax-data',$(this).attr('pricemax'));
    pageNumber=1;
    $('#pageNews').text('1');
    screenGoods();
});
//尺寸
$('.sizeLabel>li').click(function () {
    $('#reset').css('display','inline-block');
    let num=$(this).index();
    $(this).css('background-color','black');
    $('.sizeLabel>li:not(:eq('+num+'))').css('background-color','#dddddd');
    $('.sizedata').remove();
    $('.search>div').prepend('<span class="iconfont sizedata">'+$(this).attr("sizetext")+'<img src="../image/originalArt/close_input.svg" class="closeImg"></span>');
    $('.search').attr('sizemin-data',$(this).attr('sizemin'));
    $('.search').attr('sizemax-data',$(this).attr('sizemax'));
    pageNumber=1;
    $('#pageNews').text('1');
    screenGoods();
});
//颜色
$('.colorLabel>li').click(colorLabel);//快速
$('.ssColor>li').click(colorLabel);//高级
function colorLabel() {
    let num=$(this).index();
    $(this).css('outline','1px solid black');
    $('.colorLabel>li:not(:eq('+num+'))').css('outline','none');
    $('.ssColor>li:not(:eq('+num+'))').css('outline','none');
    checkStartScreen();//
    $('#reset').css('display','inline-block');
    $('.colordata').remove();
    $('.search>div').prepend('<span class="iconfont colordata">'+$(this).attr("colortext")+'<img src="../image/originalArt/close_input.svg" class="closeImg"></span>');
    if($(this).attr("colortext")=='白色'){
        $('.colordata').css({'color':'#666','border':'1px solid #666'});
        $('.closeImg').attr('src','../image/originalArt/closeInput-black.svg');
    }else {
        $('.closeImg').attr('src','../image/originalArt/close_input.svg');
    }
    $('.colordata').css('background',$(this).attr('colorattr'));
    $('.search').attr('colortext-data',$(this).attr('colortext'));
    if($(this).parent().hasClass('colorLabel')){
        pageNumber=1;
        $('#pageNews').text('1');
        screenGoods();
    }
}
//摆放空间
$('.spaceLabel>ul>li').click(spaceLabel);//快速
$('.ssSpace>ul>li').click(spaceLabel);//高级
function spaceLabel() {
    let num=$(this).index();
    $(this).css({'color':'black','font-weight':'bold'});
    $('.spaceLabel>ul>li:not(:eq('+num+'))').css({'color':'#666','font-weight':'normal'});
    $('.ssSpace>ul>li:not(:eq('+num+'))').css({'color':'#666','font-weight':'normal'});
    checkStartScreen();
    $('#reset').css('display','inline-block');
    $('.spacedata').remove();
    $('.search>div').prepend('<span class="iconfont spacedata">'+$(this).text()+'<img src="../image/originalArt/close_input.svg" class="closeImg"></span>');
    $('.search').attr('space-data',$(this).attr('spaceId'));
    if($(this).parent().parent().hasClass('spaceLabel')){
        pageNumber=1;
        $('#pageNews').text('1');
        screenGoods();
    }
}
//按笔分类
$('.classify>ul>li').click(classify);//快速
$('.ssClassify>ul>li').click(classify);//高级
function classify() {
    let num=$(this).index();
    $(this).css({'color':'black','font-weight':'bold'});
    $('.classify>ul>li:not(:eq('+num+'))').css({'color':'#666','font-weight':'normal'});
    $('.ssClassify>ul>li:not(:eq('+num+'))').css({'color':'#666','font-weight':'normal'});
    checkStartScreen();
    $('#reset').css('display','inline-block');
    $('.classifydata').remove();
    $('.search>div').prepend('<span class="iconfont classifydata">'+$(this).text()+'<img src="../image/originalArt/close_input.svg" class="closeImg"></span>');
    $('.search').attr('classify-data',$(this).attr('classifyId'));
    if($(this).parent().parent().hasClass('classify')){
        pageNumber=1;
        $('#pageNews').text('1');
        screenGoods();
    }
}
//风格
$('.styleLabel>li').click(styleLabel);//快速
$('.ssStyle>li').click(styleLabel);//高级
function styleLabel() {
    checkStartScreen();
    let num=$(this).index();
    $('.fastScreenSug').attr('fastScreenSug-data',num);
    $(this).css({'color':'black','font-weight':'bold'});
    $('.styleLabel>li:not(:eq('+num+'))').css({'color':'#666','font-weight':'normal'});
    $('.ssStyle>li:not(:eq('+num+'))').css({'color':'#666','font-weight':'normal'});
    $('#reset').css('display','inline-block');
    $('.styledata').remove();
    $('.search>div').prepend('<span class="iconfont styledata">'+$(this).text()+'<img src="../image/originalArt/close_input.svg" class="closeImg"></span>');
    $('.search').attr('style-data',$(this).attr('styleID'));
    if($(this).parent().hasClass('styleLabel')){
        pageNumber=1;
        $('#pageNews').text('1');
        screenGoods();
    }
}
//题材
$('.themeLabel>li').click(themeLabel);//快速
$('.ssTheme>li').click(themeLabel);//高级
function themeLabel() {
    checkStartScreen();
    let num=$(this).index();
    $('.fastScreenSug').attr('fastScreenSug-data',num+4);
    $(this).css({'color':'black','font-weight':'bold'});
    $('.themeLabel>li:not(:eq('+num+'))').css({'color':'#666','font-weight':'normal'});
    $('.ssTheme>li:not(:eq('+num+'))').css({'color':'#666','font-weight':'normal'});
    $('#reset').css('display','inline-block');
    $('.themedata').remove();
    $('.search>div').prepend('<span class="iconfont themedata">'+$(this).text()+'<img src="../image/originalArt/close_input.svg" class="closeImg"></span>');
    $('.search').attr('theme-data',$(this).attr('themeId'));
    if($(this).parent().hasClass('themeLabel')){
        pageNumber=1;
        $('#pageNews').text('1');
        screenGoods();
    }
}
//搜索框
$('#search').focus(function () {
        $(document).keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                $('.searchtext').remove();
                $('#reset').css('display','inline-block');
                let txt=$('#search').val();
                console.log(txt);
                $('.search>div').prepend('<span class="iconfont searchtext">'+txt+'<img src="../image/originalArt/close_input.svg" class="closeImg"></span>');
                $('.search').attr('searchtext',txt);
                $('#search').val('');
                screenGoods();
            }
        })
});
$('.searchgggg').click(function () {
    $('.searchtext').remove();
    $('#reset').css('display','inline-block');
    let txt=$('#search').val();
    console.log(txt);
    $('.search>div').prepend('<span class="iconfont searchtext">'+txt+'<img src="../image/originalArt/close_input.svg" class="closeImg"></span>');
    $('.search').attr('searchtext',txt);
    $('#search').val('');
    screenGoods();
});
//label删除按钮
$('.search>div').on('click','.closeImg',function () {
    let num=$(this).parent();
    if(num.hasClass('pricedata')){
        $('.priceLabel>li').css('background-color','#dddddd');//价格还原背景
        $('.pricemin').text('￥0');
        $('.pricemax').text('max');

        $('.range1Min').css('left','0');
        $('.range1Max').css('left','auto');

        $('.readBar1').css({'width':'100%','left':'0'});
        $('.search').attr('pricenum-data','%');
    }
    else if(num.hasClass('sizedata')){
        $('.sizeLabel>li').css('background-color','#dddddd');//大小还原背景
        $('.sizemin').text('0');
        $('.sizemax').text('max');

        $('.range2Min').css('left','0');
        $('.range2Max').css('left','auto');

        $('.readBar2').css({'width':'100%','left':'0'});
        $('.search').attr('sizetext-data','%');
    }
    else if(num.hasClass('colordata')){
        $('.colorLabel>li').css('outline','none');//快速筛选颜色还原
        $('.ssColor>li').css('outline','none');//高级筛选颜色还原
        $('.search').attr('colortext-data','%');
    }
    else if(num.hasClass('spacedata')){
        $('.spaceLabel>ul>li').css({'color':'#666','font-weight':'normal'});//快速筛选空间还原字体
        $('.ssSpace>ul>li').css({'color':'#666','font-weight':'normal'});//高级筛选空间还原字体
        $('.search').attr('space-data','%');
    }
    else if(num.hasClass('classifydata')){
        $('.classify>ul>li').css({'color':'#666','font-weight':'normal'});//快速筛选笔类还原字体
        $('.ssClassify>ul>li').css({'color':'#666','font-weight':'normal'});//高级筛选笔类还原字体
        $('.search').attr('classify-data','%');
    }
    else if(num.hasClass('styledata')){
        $('.styleLabel>li').css({'color':'#666','font-weight':'normal'});//快速筛选风格还原字体
        $('.ssStyle>li').css({'color':'#666','font-weight':'normal'});//高级筛选风格还原字体
        $('.search').attr('style-data','%');
    }
    else if(num.hasClass('themedata')){
        $('.themeLabel>li').css({'color':'#666','font-weight':'normal'});//快速筛选题材还原字体
        $('.ssTheme>li').css({'color':'#666','font-weight':'normal'});//高级筛选题材还原字体
        $('.search').attr('theme-data','%');
    }
    else if(num.hasClass('searchtext')){
        $('.search').attr('searchtext','%');
        $('.search').attr('search','-1');
    }
    $('#reset').css('display','inline-block');
    $(this).parent().remove();
    checkReset();
    screenGoods();
});
//条件重置按钮
$('#reset').click(function () {
    $('.priceLabel>li').css('background-color','#dddddd');//价格还原背景
    $('.sizeLabel>li').css('background-color','#dddddd');//大小还原背景
    $('.pricemin').text('￥0');
    $('.pricemax').text('max');
    $('.sizemin').text('0');
    $('.sizemax').text('max');

    $('.range1Min').css('left','0');
    $('.range1Max').css('left','auto');

    $('.range2Min').css('left','0');
    $('.range2Max').css('left','auto');

    $('.readBar1').css({'width':'100%','left':'0'});
    $('.readBar2').css({'width':'100%','left':'0'});

    $('.colorLabel>li').css('outline','none');//快速筛选颜色还原
    $('.ssColor>li').css('outline','none');//高级筛选颜色还原
    $('.spaceLabel>ul>li').css({'color':'#666','font-weight':'normal'});//快速筛选空间还原字体
    $('.ssSpace>ul>li').css({'color':'#666','font-weight':'normal'});//高级筛选空间还原字体
    $('.classify>ul>li').css({'color':'#666','font-weight':'normal'});//快速筛选笔类还原字体
    $('.ssClassify>ul>li').css({'color':'#666','font-weight':'normal'});//高级筛选笔类还原字体
    $('.styleLabel>li').css({'color':'#666','font-weight':'normal'});//快速筛选风格还原字体
    $('.ssStyle>li').css({'color':'#666','font-weight':'normal'});//高级筛选风格还原字体
    $('.themeLabel>li').css({'color':'#666','font-weight':'normal'});//快速筛选题材还原字体
    $('.ssTheme>li').css({'color':'#666','font-weight':'normal'});//高级筛选题材还原字体
    $('#reset').css('display','none');//隐藏重置按钮
    $('.search>div>span:not(:last)').remove();//清空条件
    $('#startScreen').css('background-color','#999999');//开始筛选按钮还原色
    $('.search').attr('pricemin-data','0');
    $('.search').attr('pricemax-data','99999999');
    $('.search').attr('sizemin-data','0');
    $('.search').attr('sizemax-data','9999');
    $('.search').attr('colortext-data','%');
    $('.search').attr('space-data','%');
    $('.search').attr('classify-data','%');
    $('.search').attr('style-data','%');
    $('.search').attr('theme-data','%');
    $('.search').attr('searchtext','%');
    screenGoods();
});
//判断是否需要隐藏重置按钮
$(document).ready(checkReset);
function checkReset() {
    let num=$('.search>div>span').length;
    if(num<2){
        $('#reset').css('display','none');
        $('#startScreen').css('background-color','#999999');
    }
}
//判断是否显示startScreen
function checkStartScreen() {
    let num=$('.search>div>span').length;
    if($('.seniorScreen').css('display')=='block'){
        $('#startScreen').css('display','block');
        if(num>0){
            $('#startScreen').css('background-color','black');
        }else {
            $('#startScreen').css('background-color','#999999');
        }
    }
}



