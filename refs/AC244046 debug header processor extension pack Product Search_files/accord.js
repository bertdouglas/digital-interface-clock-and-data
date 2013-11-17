// JavaScript Document
$(document).ready(function() {

    $(".topnav").accordion({
        accordion: true,
        speed: 500
    });
 
	//HIDE THE DIVS ON PAGE LOAD	
	//$("ul.leftnav li > ul, div.accordionContentD").hide();
	$("div.accordionToggleContent, div.accordionToggle2Content").hide();
	
	//ACCORDION BUTTON ACTION FOR LEFT NAV
	$('ul.leftnav li, div.accordionButtonD').click(function() {
	//alert(this);
//	$(this).next().slideToggle('fast');
//	//$("ul.leftnav li > ul, div.accordionContentD").slideToggle('normal');
//	$(this).toggleClass('leftactD');
		
	});
	
	//SLIDETOGGLE ACCORDION BUTTON ACTION FOR DEV TOOL PRODUCT PAGE	
	$('div.accordionToggle').click(function() {
	    //alert(this);	
		$(this).next().slideToggle('normal');
		$(this).toggleClass('downArrow');
		
	});
	
	//SLIDETOGGLE ACCORDION BUTTON ACTION FOR TOOLS AND APPLICATIONS	
	$('div.accordionToggle2').click(function() {
	    //alert(this);	
		$(this).next().slideToggle('normal');
		$(this).find('span').toggleClass('downArrow2');
		
	});

});

(function($) {
    $.fn.extend({
        accordion: function(options) {

            var defaults = {
                accordion: 'true',
                speed: 300
            };

            // Extend our default options with those provided.
            var opts = $.extend(defaults, options);
            //Assign current element to variable, in this case is UL element
            var $this = $(this);

            //add a closed image to a multilevel menu
            $this.find("li").each(function() {
                if ($(this).find("ul").size() != 0) {
                    //get link content to append a sign
                    var aContent = $(this).find("a:first").html();
                    //add the multilevel sign next to the link
                    $(this).find("a:first").html("<span class='close'></span>" + aContent);
                    //$(this).find("a:first").html("<span class='close'></span><div class='divItemText'>" + aContent + "</div>");

                    //$(this).find("a:first").before("<span class='close'></span>");
                    //$("<span class='close'></span>").insertBefore("li:first");

                    //avoid jumping to the top of the page when the href is an #
                    if ($(this).find("a:first").attr('href') == "#") {
                        $(this).find("a:first").click(function() { return false; });
                    }

                    $(this).find("a:first").addClass('mainParent');
                    //$(this).addClass('mainParent');
                }
                else {
                    var aContent = $(this).find("a:first").html();
                    $(this).find("a:first").html("<span class='spnExtLink'></span>" + aContent);
                    //$(this).find("a:first").before("<span class='spnExtLink'></span>");
                    $(this).find("a:first").addClass('aExtLink');
                    //$(this).addClass('aExtLink');
                }
            });

            //open active level
            $this.find("li.active").each(function() {
                //added by Manjunath
                $(this).find("a:first").removeClass('mainParent').addClass('openLink');
                $(this).find("a:first").find("span:first").removeClass('close').addClass('open');
                $(this).find("ul:first").css({ display: 'block' });
                //end add

                //commented by Manjunath
                //                $(this).parents("ul").slideDown(opts.speed);
                //                $(this).parents("ul").parent("li").find("span:first").removeClass('close').addClass('open');
                //                //$(this).parents("ul").parent("li").find("a:first").addClass('openLink');
                //                $(this).parents("ul").parent("li").find("a:first").removeClass('mainParent').addClass('openLink');
                //end comment
            });
            //added by Manjunath
            //open subactive level
            $this.find("li.subactive").each(function() {
                $(this).parents("ul").css({ display: 'block' });
                $(this).parent().parent().find("a:first").removeClass('mainParent').addClass('openLink');
                $(this).parent().parent().find("a:first").find("span:first").removeClass('close').addClass('open');
            });
            //end add

            //added by Manjunath
            //make 32bit pic mcu and discount parts similar to other links
            $this.find("a.mainNoChild").each(function() {
                $(this).removeClass('aExtLink');
                $(this).find("span").removeClass('spnExtLink');
                $(this).find("span").addClass('close');
                //$(this).removeClass('mainNoChild');
                $(this).addClass("mainParent");
            });
            //end add
            //added by Manjunath
            //fix to expan/collapse open links
            $this.find("a.openLink").prop("onclick", null);
            //end add

            $this.find("li a").click(function() {
                if ($(this).parent().find("ul").size() != 0) { //item has childrens
                    if (opts.accordion) { //do this when accordion is active

                        if (!$(this).parent().find("ul").is(':visible')) { //do this if closed, else do nothing
                            parents = $(this).parent().parents("ul");

                            //alert('Parents: ' + parents.length);
                            visible = $this.find("ul:visible");
                            //alert('Visible: ' + visible.length);
                            visible.each(function(visibleIndex) {
                                //alert($(this).find("a:first").html());
                                var close = true;
                                parents.each(function(parentIndex) {
                                    if (parents[parentIndex] == visible[visibleIndex]) {
                                        close = false;
                                        return false;
                                    }
                                });
                                if (close) {
                                    if ($(this).parent().find("ul") != visible[visibleIndex]) {
                                        $(visible[visibleIndex]).slideUp(opts.speed, function() {
                                            $(this).parent("li").find("span:first").removeClass('open').addClass('close');
                                            //$(this).parent("li").find("a:first").removeClass('openLink');
                                            $(this).parent("li").find("a:first").removeClass('openLink').addClass('mainParent');
                                        });

                                    }
                                }
                            });
                        } //end of if closed
                    }
                    if ($(this).parent().find("ul:first").is(":visible")) { //item is open
                        //search for child items and if they are open then close them
                        var opened = $(this).next("ul");
                        if (opened) {
                            var openedChild = $(opened).find("ul:visible");
                            openedChild.each(function(openIndex) {
                                $(openedChild[openIndex]).slideUp(opts.speed, function() {
                                    $(this).parent("li").find("span:first").removeClass('open').addClass('close');
                                    $(this).parent("li").find("a:first").removeClass('openLink').addClass('mainParent');
                                });
                            });
                        }

                        $(this).parent().find("ul:first").slideUp(opts.speed, function() { //close item
                            $(this).parent("li").find("span:first").delay(opts.speed).removeClass('open').addClass('close');
                            //$(this).parent("li").find("a:first").removeClass('openLink');
                            $(this).parent("li").find("a:first").removeClass('openLink').addClass('mainParent');
                        });
                    }
                    else { //item is closed

                        $(this).parent().find("ul:first").slideDown(opts.speed, function() { //open item
                            $(this).parent("li").find("span:first").delay(opts.speed).removeClass('close').addClass('open');
                            //$(this).parent("li").find("a:first").addClass('openLink');
                            $(this).parent("li").find("a:first").removeClass('mainParent').addClass('openLink');
                        });
                    }
                }
            });
        }
    });
})(jQuery);