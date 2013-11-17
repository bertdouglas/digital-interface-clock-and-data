///////////////////
// _trackClicks
$(document).ready(function ($) {
    //Test if click comes from live site - stops link traking from localhost and development servers
    if (document.location.hostname == "www.microchip.com" || document.location.hostname == "microchip.com") {
        //Applies function to all anchor tags
        $('a').live('mouseup', function (e) {
            //Traverses up from anchor tag for first parent with an ID
            var linkCatagory = $(this).closest("[id]").attr("id");
            //If the link is an image this will get the alt and title attributes and if not gets the link text
            if ($(this).find("img").length > 0) {
                var linkAlt = $(this).find(':first-child').attr("alt");
                var linkTitle = $(this).find(':first-child').attr("title");
                var linkLabel = linkAlt + " - " + linkTitle;
            } else {
                var linkLabel = $(this).text().trim();
            };

            //Gets the page title
            var pageTitle = $("title").text();
            //Puts it all together and sends to Google
            _gaq.push(['_trackEvent', pageTitle + ' - ' + linkCatagory, 'click', linkLabel]);
        
            //Testing link variables
            //alert(pageTitle + ' - ' + linkCatagory + ' - ' + linkLabel);
            //alert("working");
            //console.log(this);
            //console.log(linkAlt);
            //console.log(pageTitle + ' - ' + linkCatagory + ' - ' + linkLabel);
        });

    }
});



    ///////////////////
    // _trackHeaderNav
    //$(document).ready(function ($) {
        //$('#header a').live('mouseup', function (e) {
            //var linkText = $(this).text().trim();
            //_gaq.push(['_trackEvent', 'navigation', 'click', linkText]);
        //});
    //});
