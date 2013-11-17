/// <reference path="~/Includes/jquery-vsdoc.js" />
/***********************************************************************************************
*File name			:ScriptLibrary.js		
*File description	:Javascript functions related to rollover description and images
*					:This will help top open the floating prod decription section dynamically  
*					:positioned based on browser and its capability
*Author				:Charan Shetty
*Date Created		:07-Mar-2008
*Revised Date		: 12/15/09 & 4/15/10 - to support tab and use mouse location - Purush
*                   : 6/11/10 - Replaced the code with JQuery supported syntax - Adam
************************************************************************************************/

//-----------------------------------------------------------------------------------------------
// DTSDevToolRollOver : this method will show and hide the development tool
// description and images on call.
//-----------------------------------------------------------------------------------------------

var tempX = 0,
    tempY = 0,
    lastLoadedCPN = '';

$(document).mousemove(function(evt) {
    tempX = evt.pageX < 0 ? 0 : evt.pageX;
    tempY = evt.pageY < 0 ? 0 : evt.pageY;
});

function DTSDevToolRollOver(object, prodNumber, prodName, prodDescription, prodLongDesc, prodImgName, prodDocUrl, prodStage) {

    prodDescription = typeof (prodDescription) === 'string' ? $.trim(prodDescription) : '';
    prodDocUrl = typeof (prodDocUrl) === 'string' ? $.trim(prodDocUrl) : '';
    prodImgName = typeof (prodImgName) === 'string' ? $.trim(prodImgName) : '';
    prodName = typeof (prodName) === 'string' ? $.trim(prodName) : '';
    prodLongDesc = typeof (prodLongDesc) === 'string' ? $.trim(prodLongDesc) : '';
    prodStage = typeof (prodStage) === 'string' ? $.trim(prodStage).toUpperCase() : '';

    //make the product image to blank

    $('#TmpDec_devToolImg').hide();

    var href = window.location.toString();

    //determine whether to display description section or not
    if (showDecription(href) !== true || (prodDescription === '' && prodLongDesc === '' && prodImgName === '')) {
        // Hide the dev tool desction box
        $('#TmpDec_tblDevToolDesc').hide();
        return;
    }

    $('#TmpDec_tblDevToolDesc').show().attr({
        style: {
            width: '405',
            position: 'absolute',
            top: tempY,
            left: tempX
        }
    });

    //Check whether to show the description as floating or relative
    //if(floatDecription(href)== true)
    //{		

    //document.getElementById("TmpDec_tblDevToolDesc").style.top     = findPosTop(object) +15;
    //Adjust the floating desciption section position based on parent window size and browser
    //if(findPosLeft(object) + 400 < WindowPosition() || NotIEorMozilla())
    //	document.getElementById("TmpDec_tblDevToolDesc").style.left    = findPosLeft(object) ;
    //else	
    //	document.getElementById("TmpDec_tblDevToolDesc").style.left    = WindowPosition() - 430 ;

    //}	
    //Add product link
    if (prodName !== '' && prodName !== prodNumber) {

        $('#TmpDec_link_div').html( // update the content based on parameter values
        function() {

            switch (prodStage) {
                case 'EOL':
                    return '<b>' + prodName + ' ( span class="SubHeader">' + prodNumber +
                            '</span>) - <font color="crimson">Product is no longer available</font></b>';
                    break;

                case 'PHAS':
                    return "<b>" + prodName + " ( <a href=" + prodSerch + prodNumber + " target=target='Welcome to microchipDIRECT' > " + prodNumber + "</a>) - <font color='crimson'>Not recommended for new design</font></b>";
                    break;

                default:
                    return "<b>" + prodName + " ( <a href=" + prodSerch + prodNumber + " target=target='Welcome to microchipDIRECT' > " + prodNumber + "</a>)</b>";
                    break;
            }
        }
    );
    } else {

        $('#TmpDec_link_div').html( // update the content based on parameter values
        function() {

            switch (prodStage) {
                case 'EOL':
                    return "<b>" + prodName + " ( <span class='SubHeader'> " + prodNumber + "</span>) - <font color='crimson'>Product is no longer available</font></b>";
                    break;

                case 'PHAS':
                    return "<b>" + prodName + " ( <a href=" + prodSerch + prodNumber + " target=target='Welcome to microchipDIRECT' > " + prodNumber + "</a>) - <font color='crimson'>Not recommended for new design</font></b>";
                    break;

                default:
                    return "<b>" + prodName + " ( <a href=" + prodSerch + prodNumber + " target=target='Welcome to microchipDIRECT' > " + prodNumber + "</a>)</b>";
                    break;
            }
        }
    );
    }

    //DevTool RollOver description
    DTSDevToolRollOverDescImag(prodDescription, prodLongDesc, prodImgName, prodDocUrl)
    //Append "More Info >>" link
    if (prodDocUrl !== '')
        appendLink(prodDocUrl);
}

//-----------------------------------------------------------------------------------------------
// DTSDevToolRollOverDescImag : Refresh DevTool when User Mouse Over DevTools listed
//-----------------------------------------------------------------------------------------------
function DTSDevToolRollOverDescImag(prodDescription, prodLongDesc, prodImgName, prodDocUrl) {

    prodDescription = typeof (prodDescription) === 'string' ? $.trim(prodDescription) : '';
    prodLongDesc = typeof (prodLongDesc) === 'string' ? $.trim(prodLongDesc) : '';
    prodImgName = typeof (prodImgName) === 'string' ? $.trim(prodImgName) : '';
    prodDocUrl = typeof (prodDocUrl) === 'string' ? $.trim(prodDocUrl) : '';

    $('#TmpDec_tblDevToolDesc').show().attr('className', 'TBLdevpart');

    $('#TmpDec_devToolsName').html(prodDescription);

    $('#TmpDec_devToolDescription').html(
        prodLongDesc !== '' && prodLongDesc !== '&nbsp;' && prodLongDesc !== '&amp;&nbsp;' ? prodLongDesc : ''
    );

    if (prodImgName !== '' && prodImgName !== '&nbsp;' && prodImgName !== '&amp;nbsp;') {
        $('#TmpDec_devToolImg').attr('src', prodImageRoot + prodImgName).show();
    } else {
        $('#TmpDec_devToolImg').attr('src', '').hide();
    }
}

function DTSDevToolRollOverDescRehash(cpn) {

    cpn = (typeof (cpn) != 'string') ? '' : $.trim(cpn);

    var lang = 'en', tabContainer = $("#tabContainer");

    if (typeof (tabContainer) != 'undefined') {

        try {
            var activeTabs = $(tabContainer).find('td.Active');
            if (activeTabs)
                lang = activeTabs.filter(':first').attr('id');
        } catch (ex) { lang = 'en'; }
    }

    var target = $('#DTSRESULTPRODDESC');

    if (target)
        if (cpn === '') {
        $(target).html('');
    } else {

        $.ajax({
            url: DescriptionServiceURL + 'GetLongDescriptionAndImage',
            data: {
                cpn: cpn,
                language: 'en'
            },
            timeout: 30000,
            dataType: 'xml',
            beforeSend: function() {
                if (cpn == lastLoadedCPN) {
                    // query is getting called twice by firefox for some reason, so here's to prevent it
                    return false;
                }

                lastLoadedCPN = cpn;
            },
            success: function(resultXML) {

                $(resultXML).find('string').each(function() {
                    $(target).html($(this).text());
                });

                lastLoadedCPN = cpn;
            },
            error: function() {
                $(target).html('');
            }
        });
    }
}

//-----------------------------------------------------------------------------------------------
// appendLink : append "More info >>" link dynamically.
//-----------------------------------------------------------------------------------------------
function appendLink(Url) {

    $('#TmpDec_devToolDescription').append(
    '<a href="' + Url + '" target="microchip"> More Info>></a>'
    );
}

//-----------------------------------------------------------------------------------------------
// HideFootNote : hide the foot note section.
//-----------------------------------------------------------------------------------------------
function HideFootNote() {
    $('#tblFootNote').hide();
}

//-----------------------------------------------------------------------------------------------
// ShowHelpText : hide the help text section.
//-----------------------------------------------------------------------------------------------
function ShowHelpText() {
    $('#lblNote').show();
}

//-----------------------------------------------------------------------------------------------
// showDecription : determins the dev tool description section visibility.
// If a querystring (extradesc=no) is passed to page url, don’t display the mouse over action.  
//-----------------------------------------------------------------------------------------------
function showDecription(fullHref) {
    var showDecription = true;

    try {

        var hrefParts = fullHref.split('?');
        //  [0] is the URL, [1] is the query string
        var query = new String(hrefParts[1]);
        var valuePairs = query.split('&');
        for (i = 0; i < valuePairs.length; i++) {
            // [0] = key, [1] = value
            var tempPair = valuePairs[i].split('=');
            // Unescape converts the text back from URL encoding
            if (unescape(tempPair[0]).toUpperCase() == "EXTRADESC" && unescape(tempPair[1]).toUpperCase() == "NO")
                showDecription = false;
        }
    }
    catch (error) {
    }

    return showDecription;
}


//-----------------------------------------------------------------------------------------------
// showDecription : determins the dev tool description section visibility.
// If a querystring (extradesc=no) is passed to page url, don’t display the mouse over action.  
//-----------------------------------------------------------------------------------------------
function floatDecription(fullHref) {
    var floatDecription = false;
    try {
        var hrefParts = fullHref.split('?');
        //  [0] is the URL, [1] is the query string
        var query = new String(hrefParts[1]);
        var valuePairs = query.split('&');
        for (i = 0; i < valuePairs.length; i++) {
            // [0] = key, [1] = value
            var tempPair = valuePairs[i].split('=');
            // Unescape converts the text back from URL encoding
            if (unescape(tempPair[0]).toUpperCase() == "FLOATDESC" && unescape(tempPair[1]).toUpperCase() == "YES")
                floatDecription = true;
        }
    }
    catch (error) {
    }
    return floatDecription;
}

//-----------------------------------------------------------------------------------------------
// findPosX : find the top position of an object
//-----------------------------------------------------------------------------------------------
function findPosLeft(obj) {
    var curleft = 0;
    if (obj.offsetParent)
        while (1) {
        curleft += obj.offsetLeft;
        if (!obj.offsetParent)
            break;
        obj = obj.offsetParent;
    }
    else if (obj.x)
        curleft += obj.x;
    return curleft;
}

//-----------------------------------------------------------------------------------------------
// findPosY : find the left position of an object
//-----------------------------------------------------------------------------------------------
function findPosTop(obj) {
    var curtop = 0;
    if (obj.offsetParent)
        while (1) {
        curtop += obj.offsetTop;
        if (!obj.offsetParent)
            break;
        obj = obj.offsetParent;
    }
    else if (obj.y)
        curtop += obj.y;
    return curtop;
}

//-----------------------------------------------------------------------------------------------
// HideMe : hide the floating description
//-----------------------------------------------------------------------------------------------
function HideMe() {
    $('#TmpDec_tblDevToolDesc').hide();
}

//-----------------------------------------------------------------------------------------------
// WindowPosition : retuns the window width/position 
//-----------------------------------------------------------------------------------------------
function WindowPosition() {

    var winW;

    if (parseInt(navigator.appVersion) > 3) {
        if (navigator.appName == "Netscape") {
            winW = window.innerWidth;
        }
        if (navigator.appName.indexOf("Microsoft") != -1) {
            winW = document.body.offsetWidth;
        }
    }
    return winW;
}


function TabDevToolsSelector() {
    
    var tabContainers = $('div.tabs > div');
    $(tabContainers).hide().filter(':first').show();

    $('div.tabs ul.tabNavigation a').click(function() {
        tabContainers.hide();
        tabContainers.filter(this.hash).show();
        $('div.tabs ul.tabNavigation a').removeClass('selected');
        $('div.tabs ul.tabNavigation DIV').removeClass('selected');
        $(this).addClass('selected');
        $(this).parent().addClass('selected');
        

        return false;
    }).filter(':first').click();
}



//-----------------------------------------------------------------------------------------------
// NotIEorMozilla : Check for browser 
//-----------------------------------------------------------------------------------------------
function NotIEorMozilla() {
    var NotIEorMozilla = true;

    if (navigator.appName == "Netscape" || navigator.appName.indexOf("Microsoft") != -1)
        NotIEorMozilla = false;

    return NotIEorMozilla;
}

//*********************************Start of AJAX code********************************************//
var ph;
var BrowserType;
var xmlhttp;
var ddl;

function LoadSuggestions(ddl, key, objId) {

    var obj = undefined;

    try {

        ddl = typeof (ddl) === 'string' && $.trim(ddl) !== '' ? $('#' + $.trim(ddl)) : undefined;
        key = typeof (key) === 'string' ? $.trim(key) : '';
        obj = typeof (objId) === 'string' && $.trim(objId) !== '' ? $('#' + $.trim(objId)) : undefined;
    } catch (Ex) { }


    if (typeof (obj) == 'undefined')
        return;

    if (key === '') {
        $(obj).html('');
    }
    else {

        var indx = (!ddl || ddl === undefined || ddl == null) ? '0' : $(ddl).val();
         
        $.ajax({
            url: DTSHOST + 'SiliconDevToolsRel.aspx',
            data: {
                query: key,
                METHOD: 'AJAX',
                INDX: indx
            },
            dataType: "text",
            success: function(response, txtStatus, reqObj) {
                $(obj).html(response);

                var res = $.trim(response).toLowerCase(); // get the response so we can evaluate it
                var devToolChart = $('#ctl00_cphContainer_uc_DevToolChart_pnlDevTools');


                if (res.length == 0 || res === '<br/>' || res === '<br>') {
                    //$(devToolChart).hide();
                    $(devToolChart).hide();

                }

                TabDevToolsSelector();
                window.scrollTo(0, document.body.scrollHeight); 
            }, //END of success
            error: function(jqXHR, textStatus, errorThrown) {
            }
        });                 //end of ajax
    } //end of else
}

//*********************************End of AJAX code********************************************//