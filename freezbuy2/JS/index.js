$(function  () {
	//购物车滚动
	$(window).load(function() {
		$('.bag-have ul').mCustomScrollbar({
			axis: "y",
			theme: "dark",
			advanced: {
				autoExpandHorizontalScroll: true
			},
			mouseWheel: true
		});
	});
	//nav切换
	$('.nav ul li').each(function  (i) {
		$(this).hover(function  () {
			$(this).children('a').addClass('active').end().siblings().children('a').removeClass('active')
			$('.nav .navcon  .evenav_deatil').eq(i).show().siblings().hide()
			$('.nav .navcon  .evenav_deatil').eq(i).hover(function  () {
				$(this).show()
			},function  () {
				$(this).hide()
			})
		},function  () {
			$('.nav .navcon  .evenav_deatil').eq(i).hide()
		})
	})
	//banner
	function bannerSlide() {
		if($('.banner').length > 0 && $('.banner .swiper-slide').length > 1) {
			var swiper = new Swiper('.banner .swiper-container', {
				slidesPerView: 1,
				pagination: '.banner .swiper-pagination',
				paginationClickable: true,
				spaceBetween: 0,
				loop: true,
				autoplay: 5000,
				autoplayDisableOnInteraction: false
			});
		}
	}
	bannerSlide();
	//主页
	function slid_qh () {
		var width_li = $(".banner_btoslid .active").find('li').width();
			$('.ind_slidpag span').each(function  (i) {
			$(this).click(function  () {
				$(this).addClass('active').siblings().removeClass('active')
				$('.banner_btoslid .eveslid').eq(i).addClass('active').siblings().removeClass('active');
				$('.banner_btoslid .eveslid').eq(i).find('li').css('width',width_li+'px')
			})
		})
	}
	slid_qh()
	function slid_two () {
		if($(window).width()<1200){
			$("#left_a>div").css('max-width','100%')
			$("#left_a>div>div>ul>li").css('width','980px')
			$("#left_a>div ul").css('transform','translate3d(-1010px, 0px, 0px)')
			$("#left_b>div").css('max-width','100%')
			$("#left_b>div>div>ul>li").css('width','980px')
			$("#left_b>div ul").css('transform','translate3d(-1010px, 0px, 0px)')
		}
	}
	slid_two()
	$(window).resize(function(){
		slid_qh()
		slid_two()
	})
	//放大镜下轮播
	function detailed() {
		//init
		var $box = $('.detailed-lb ul')
		var wid = parseInt($('.detailed-lb ul li').width()) 
		var num = $box.find('li').length;
		var li_mar = parseInt($box.find('li').css('margin-right')) 
		$box.css({
			'width': (wid + li_mar)* num + 'px'
		});
		if(num >= 5) {
			$('.detailed-lb-left').click(function() {
				$box.animate({
					"left": "0px"
				})
			})
			$('.detailed-lb-right').click(function() {
				$box.animate({
					"left": "-" + (wid + li_mar) * 5 + "px"
				})
			})
		}
	}
	detailed();
	//详情页价钱滚动图
	function price() {
		var $box = $('.detailed-price-m ul')
		var num = $box.find('li').length;
		var w = $box.find('li').width();
		var i = 0,
			m = 0
		$box.css({
			'width': (w * num) + 'px'
		});

		if(num >= 3) {
			$('.detailed-price-r').click(function() {
				if(i == num - 3) {
					m = 0;
				} else if(i == 0) {
					m = 1;
				}
				if(m) {
					i++;
					$box.stop(true, true).animate({
						"left": "-=" + w + "px"
					})
				} else {
					i--;
					$box.stop(true, true).animate({
						"left": "+=" + w + "px"
					})
				}
				if(i == num - 3) {
					$('.detailed-price-r i').removeClass("icon-right").addClass('icon-left')
				}
				if(i == 0) {
					$('.detailed-price-r i').removeClass("icon-left").addClass('icon-right')
				}
			})
		}
	}
	price();
	//详情页颜色选择
	function colorimg() {
		$('.color-img li img').each(function() {
			$(this).hover(function() {
				if($(this).parents('li').hasClass('nohave')) {
					return false
				} else {
					$(this).parents('li').addClass('add')
				}
			}, function() {
				$(this).parents('li').removeClass('add')
			})
		})
	}
	colorimg()
	$('.color-img li img').bind('click', $(this), function(e) {
			if($(this).parents('li').hasClass('nohave')) {
				return false
			} else {
				var colortitle = $(this).parents('li').attr('title')
				$(this).parents('.color-img').siblings('div').children('.showcolor').text(colortitle)
				$(this).addClass('add').siblings().removeClass('add')
				$(this).hover(function() {}, function() {
					$(this).parents('li').addClass('add').end().parents('li').siblings().removeClass('add')
				})
			}
	})
	$('.size-gg').on('change',function  () {
		var showval = $(this).find('.customshow').text()
		var settext = $(this).find("option:selected").text()
		$(this).siblings('.size-title').children('span').text(settext)
		if (settext == showval) {
			$('.custom').show()
		}else{
			$('.custom').hide()
		}
	})
	//自定义是否选择
	function zidingyi() {
		$('.size-big').text($(".custom-gg option:selected").text())
		var result = $(".custom-detailed-cm").find('option:selected').map(function() {
			return $(this).text();
		})
		var content = $(".size-gg select").children('option').eq(0).text()
		var results = []
		var err = null
		for(var i = 0; i < result.length; i++) {
			if(result[i] == content) {
				err = result[i]
				$(".custom-detailed-cm").find('section').eq(i).children('select').css('border', '1px solid #ff9829')
			} else {
				$(".custom-detailed-cm").find('section').eq(i).children('select').css('border', '1px solid #c0c0c0')
			}
			results.push(result[i].replace($(".custom-gg select option:first-child").text(), ''))
		}
		if(err) {
			 layer.msg('Please fill your specific measurement of Bust.');
		} else {
			$('.custom').css('display', 'none')
			$('.size-show').css('display', 'block')
			$('.midify').css('display', 'inline-block')
			$(".size-show section").each(function() {
				$(this).find(".size-number").html(results[$(this).index()])

			})
		}
	}
	function choose() {
		var ss = $('.size-gg select option:selected').text()
		var borderli = $(".color-img ul li")
		var count = 0
		var count2 = 0
		for(var i = 0; i < borderli.length; i++) {
			if(borderli.eq(i).hasClass('choose-img')) {
				count++
			}
		}
		var content = $(".size-gg select").children('option').eq(0).html()
		var content_last = $(".size-gg select").children('option:last-child').html()
		$('.opt ul li').each(function() {
			if($(this).hasClass('selopt')) {
				count2++
			}
		})
		if(count <= 0) {
			 layer.msg('Please select a color');
		} else if(ss == content_last) {
			zidingyi()
		} else if(ss == content) {
			 layer.msg('Please select a size');
		} else if(count2 <= 0) {
			 layer.msg('Please select a option');
		}
	}
	$(".subm").click(function() {
		zidingyi()
	})
	
	
	//自定义规格选择
	$('.opt ul li').each(function() {
		$(this).click(function() {
			if($(this).hasClass('havenone')) {
				return false
			} else {
				$(this).addClass('selopt').siblings().removeClass('selopt')
				var opttext = $(this).text()
				$(this).parents('ul').siblings('.option-show').text(opttext)
			}
		})
	})
	
	$('.make-count i').click(function() {
		$('.count-down ').slideToggle()
	})
	
	//登录框颜色
	$('.login input').each(function() {
		$(this).focus(function() {
			$(this).css('box-shadow', '0px 0px 5px #999999')
		})
	})
	$('.login input').each(function() {
		$(this).blur(function() {
			$(this).css('box-shadow', '')
		})
	})
	
	//只有4个的轮播切换
	$('.lesslisd-hid').on('mouseover mouseout','li',function  (event) {
		if(event.type == "mouseover"){
		  $(this).children('.slidupshow').children().removeClass('hid')
			$(this).children('.slidupshow').children('.changehit').css({"height":"20px",'line-height':"20px"})
			$(this).children('.slidupshow').css({'border-bottom':'1px solid #000','background-color':'#f6f6f6'})
		 }else if(event.type == "mouseout"){
			  $(this).children('.slidupshow').children().not('a').addClass('hid')
			  $(this).children('.slidupshow').children('.changehit').css({"height":"40px",'line-height':"40px"})
			  $(this).children('.slidupshow').css({'border-bottom':'none','background-color':'#fff'})
		 }
	})
	//无地址页邮费选择
	$('.express input[type=radio]').each(function() {
		if($(this).is(':checked')) {
			$(this).parents('tr').css('background', '#f6f6f6')
		}
	})
	
	$('.express input[type=radio]').click(function() {
		$(this).parents('tr').css('background', '#f6f6f6')
		$(this).parents('tr').siblings('tr').css('background', '#FFF')
	})
	
	//grid红心选择
	$('.grid li .enshrine i:first-child').each(function  (i) {
		  $(this).click(function  (e) {
		  			  e.stopPropagation();
		  	if ($(this).hasClass('icon-heart')) {
		  		$(this).removeClass('icon-heart').addClass('icon-heart1')
		  	}else{
		  		$(this).removeClass('icon-heart1').addClass('icon-heart')
		  	}
		  })
	})
	//list列表页
	$('.listr_fav i').each(function  () {
		$(this).click(function  () {
			if ($(this).hasClass("active")) {
				$(this).removeClass('active')
			}else{
				$(this).addClass('active')
			}
		})
	})
	//规格选择
	$('.shop-by ul li').each(function  () {
		$(this).hover(function  () {
			if ($(this).attr('statu') == 'nochoose') {
				$(this).children('.det_this').addClass('icon-9')
			}
			if ($(this).attr('statu') == 'choose') {
				$(this).children('.det_this').addClass('icon-close')
			}
		},function  () {
			if ($(this).attr('statu') == 'nochoose') {
				$(this).children('.det_this').removeClass('icon-9')
			}
			if ($(this).attr('statu') == 'choose') {
				$(this).children('.det_this').removeClass('icon-close')
			}
		})
		$(this).click(function  (e) {
			e.stopPropagation();
			if ($(this).attr('statu') == 'nochoose') {
				$(this).attr('statu','choose')
			}else if ($(this).attr('statu') == 'choose') {
				$(this).attr('statu','nochoose')
			}  
			if ($(this).children('.det_this').hasClass('icon-close')) {
				$(this).children('.det_this').removeClass('icon-9')
				$(this).children('.det_this').removeClass('icon-close')
			}
		})
	})
	//颜色选择
	$('.colorjs li').each(function(i) {
		$(this).hover(function() {
			if($(this).children('span').attr('choose') == "dui") {
				$(this).children('span').children('i').removeClass('icon-cuo').addClass('icon-dui')
				$(this).children('span').css('display', 'none')
			}
			$(this).children('span').css('display', 'block')
			$(this).click(function() {
				$(this).children('span').attr('choose', 'dui-show')
				$(this).children('span').css('display', 'block')
			})
			if($(this).children('span').attr('choose') == 'dui-show') {
				$(this).children('span').children('i').removeClass('icon-dui').addClass('icon-cuo')
				$(this).click(function() {
					$(this).children('span').css('display', 'none')
					$(this).children('span').attr('choose', 'dui')
				})
			}
		}, function() {
			if($(this).children('span').attr('choose') == "dui") {
				$(this).children('span').css('display', 'none')
			}
			if($(this).children('span').attr('choose') == 'dui-show') {
				$(this).children('span').css('display', 'block')
				$(this).children('span').children('i').removeClass('icon-cuo').addClass('icon-dui')
			}
			if($(this).children('span').attr('choose') == 'cuo') {
				$(this).children('span').css('display', 'none')
			}
		})
	})
	//展开合并
	$('.eve-gg .eve-ggtit span').each(function() {
		var c = $(this).text()
		if(c == "+") {
			$(this).parent('p').siblings('ul').css('display', 'none')
		}
		if(c == "-") {
			$(this).parent('p').siblings('ul').css('display', 'block')
		}
		$(this).click(function() {
			var c = $(this).text()
			if(c == "+") {
				$(this).parent('p').siblings('ul').slideDown(800)
				$(this).text("-")
			}
			if(c == "-") {
				$(this).parent('p').siblings('ul').slideUp(800)
				$(this).text("+")
			}
		})

	})
	//详情页的心选择
	$('.add_sc').click(function  () {
		if ($(this).children("i").hasClass('active')) {
			$(this).children("i").removeClass('active')
		}else{
			$(this).children("i").addClass('active')
		}
	})
	
//	地址
	$('.address  li').each(function() {
		if($(this).children('i').eq(0).hasClass('icon-dui1')) {
			$(this).show().siblings().hide()
			$(this).find('i').css('color',"#FFFFFF")
			$(this).children('section').children('.icon-cuo').css('display', 'none')
		} else if($(this).children('i').eq(0).hasClass('icon-quan')) {
			$(this).children('section').children('.icon-cuo').css('display', 'inline')
		}
		$(this).click(function() {
			$(this).addClass('address-bg').siblings().removeClass('address-bg')
			$(this).children('i').eq(0).removeClass('icon-quan').addClass('icon-dui1')
			$(this).find('i').css('color', '#fff')
			$(this).siblings().find('i').css('color', '#a59797')
			if($(this).children('i').eq(0).hasClass('icon-dui1')) {
				$(this).children('section').children('.icon-cuo').css('display', 'none')
				$(this).siblings().children('section').children('.icon-cuo').css('display', 'inline')
			} else if($(this).children('i').eq(0).hasClass('icon-quan')) {
				$(this).children('section').children('.icon-cuo').css('display', 'inline')
				$(this).siblings().children('section').children('.icon-cuo').css('display', 'none')
			}
		})
	})
	$('.hid-add .showhid').click(function() {
		if($('.address  li').is(':hidden')) {
			$(this).children('span').text("Hide")
			$(this).children('i').removeClass('icon-down1').addClass('icon-up')
		} else {
			$(this).children('span').text("Show")
			$(this).children('i').removeClass('icon-up').addClass('icon-down1')
		}
		$(".address .address-bg").siblings().slideToggle()
	})
	$('.address  li .icon-cuo').click(function() {
		$(this).parents().parents('li').remove()
	})
	//邮费选择
	$(".trans").each(function(i) {
		$(this).find("a:first").click(function(e) {
			e.stopPropagation();
			var aa = $(".trans").eq(i).find('input[type=radio]:checked').parent().next().text()
			var price = $(".trans").eq(i).find('input[type=radio]:checked').parent().next().next().children('span').text()
			$(".trans").eq(i).find('.trans-h').text(aa)
			var dd = $(".trans").eq(i).parent().parent().find('.choose .order-num').text(price)
			$(".trans").eq(i).find('.trans-child').slideUp()
		})
		$(this).find("a:last-child").click(function(e) {
			e.stopPropagation();
			$(".trans").eq(i).find('.trans-child').slideUp()
		})
		$(this).click(function(e) {
			e.stopPropagation();
			$(".trans").eq(i).find('.trans-child').slideDown()
		})
})
	//上传名字
	$(".a-upload").on("change", "input[type='file']", function() {
		var filePath = $(this).val()
		if(filePath.indexOf("jpg") != -1 || filePath.indexOf("png") != -1 || filePath.indexOf("jpeg") != -1) {
			var arr = filePath.split('\\')
			var fileName = arr[arr.length - 1]
			$(".imgname").show()
			$(".showname").text(fileName)
			$(".showname").attr('title', fileName)
		} else {
			return false
		}
	})
	
	$('.wishp').each(function  () {
		$(this).click(function  () {
			var wish =  $(this).children('i')
			if (wish.hasClass('active')) {
				wish.removeClass('active')
			}else{
				wish.addClass('active')
			}
		})
	})
	$('.carchoose').each(function  () {
		$(this).click(function  () {
			var choose =  $(this).children('i')
			if (choose.hasClass('icon-dui1')) {
				choose.removeClass('icon-dui1').addClass('icon-close')
			}else{
				choose.removeClass('icon-close').addClass('icon-dui1')
			}
		})
	})
	
	$('.carchanggg i').click(function  () {
		$(this).siblings('.slidchange').children('.r-child').slideToggle()
	})
	function addborder() {
		$('.mod-color  ul li').each(function() {
			$(this).click(function() {

				$(this).children('i').css('display', 'block')
				$(this).siblings().children('i').css('display', 'none')
			})
		})
		$('.mod-size ul li').each(function() {
			$(this).click(function() {
				$(this).addClass('on').siblings().removeClass('on')
			})
		})
		$('.mod-option ul li').each(function() {
			$(this).click(function() {
				$(this).addClass('on').siblings().removeClass('on')
			})
		})
	}
	addborder()
	$('.mod-btn a').click(function() {
		$('.r-child').slideUp()
	})
	$(".mod-btn a:first-child").click(function   () {
		var optionParent = $(this).parents('.mod-btn').siblings('.mod-option').find('li');
		var sizeParent = $(this).parents('.mod-btn').siblings('.mod-size').find("li");
		var colorParent = $(this).parents('.mod-btn').siblings('.mod-color').find("i");
		optionParent.each(function  (i) {
			if (optionParent.eq(i).hasClass('on')) {
				 var changetext = $(this).text()
				 $(this).parents('.carchanggg').siblings('p').find('.opt_c').text(changetext)
			}
		})
		sizeParent.each(function  (i) {
			if (sizeParent.eq(i).hasClass('on')) {
				 var sizetext = $(this).children('p').text()
					console.log($(this))
				 if (sizetext == "Custom Size") {
				 	 $(this).parents('.carchanggg').siblings('p').find('.size_c').text($(this).children("span").text()) 
				 }else{
				 	 $(this).parents('.carchanggg').siblings('p').find('.size_c').text(sizetext )
				 }
				
			}
		})
		colorParent.each(function  (i) {
			if (colorParent.eq(i).css('display')=='block') {
				 var colortext = $(this).parents('li').attr('title')
				 $(this).parents('.carchanggg').siblings('p').find('.color_c').text(colortext)
			}
		})
	})
	
	

   function unseal() {
		if($('.unseal-silde').length > 0 && $('.unseal-silde .swiper-slide').length > 1) {
			var swiper = new Swiper('.unseal-silde  .swiper-container', {
				slidesPerView: 1,
				pagination: '.unseal-silde  .swiper-pagination',
				uniqueNavElements: false,
				paginationClickable: true,
				spaceBetween: 0,
				loop: true,
				autoplay: 5000,
				autoplayDisableOnInteraction: false
			});
		}
		$('.unseal-silde').hover(function() {
			swiper.stopAutoplay()
		}, function() {
			swiper.startAutoplay()
		})
	}
	unseal();
  	
	
//	  var w = $(window).width();
//  if (w > 1220) {
//      $("#linkcs").attr("href", "http://img.bosscdn.com/assets08/451dacb3/bossgoo2015/css/home.css");
//  } else {
//      $("#linkcs").attr("href", "http://img.bosscdn.com/assets08/451dacb3/bossgoo2015/css/hometoo.css");
//  }
//                  $(window).resize(function() {
//  var w = $(window).width();
//  if (w > 1220) {
//      $("#linkcs").attr("href", "http://img.bosscdn.com/assets08/451dacb3/bossgoo2015/css/home.css");
//  } else {
//      $("#linkcs").attr("href", "http://img.bosscdn.com/assets08/451dacb3/bossgoo2015/css/hometoo.css");
//  }
//})
  	
  	
})