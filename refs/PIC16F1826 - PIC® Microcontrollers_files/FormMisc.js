/// <reference path="~/Includes/jquery-vsdoc.js" />
// Name:  FormMisc.js
// Purpose:  Miscellaneous form handling javascript
// Version:  1.0
// Revisions:
// 6/11/2010 - Replaced the code with JQuery supported syntax
//

//Opens a new window with the URL and options passed in
function LaunchInCenter(url, h, w, opts) {
    var height = h, width = w;
    var str = "height=" + height + ",innerHeight=" + height;
    str += ",width=" + width + ",innerWidth=" + width + "," + opts;
    
    if (window.screen) {
        var ah = screen.availHeight - 30;
        var aw = screen.availWidth - 10;

        var xc = (aw - width) / 2;
        var yc = (ah - height) / 2;

        str += ",left=" + xc + ",screenX=" + xc;
        str += ",top=" + yc + ",screenY=" + yc;
        str += ",resizable=yes,scrollbars=yes";

    }
    window.open(url, '', str);
}


//Refresh DevTool when User Mouse Over DevTools listed
function DevToolMainRollOver(sName, sDesc, sPartNumber, sImg) {

    sName = typeof (sName) === 'string' ? sName : '';
    sDesc = typeof (sDesc) === 'string' ? $.trim((sDesc + '')).toLowerCase() : '';
    sImg = typeof (sImg) === 'string' ? $.trim(sImg) : '';
    
    $('#uc_DevToolChart_lblDevToolName').html(sName);    

    if (sDesc !== '' && sDesc !== '&nbsp;' && sDesc !== '&amp;&nbsp;') {
        $('#uc_DevToolChart_lblDevToolDescription').html(sDesc);
        
        //To change the list items styles to normal styles. Since these are overlapping header list styles.
        if ($('#uc_DevToolChart_lblDevToolDescription ul') && $('#uc_DevToolChart_lblDevToolDescription ul') != undefined
        && $('#uc_DevToolChart_lblDevToolDescription ul') != '') {
            $('#uc_DevToolChart_lblDevToolDescription ul').css('display', 'list-item');
            $('#uc_DevToolChart_lblDevToolDescription ul li').css( 'list-style-image', 'none');
            $('#uc_DevToolChart_lblDevToolDescription ul li').css('list-style-type', 'disc');  //list-style-type:disc
        }
    } else {
        $('#uc_DevToolChart_lblDevToolDescription').html('');
    }

    if (sImg !== '' && sImg !== '&nbsp;' && sImg !== '&amp;&nbsp;') {
        $('#uc_DevToolChart_imgDevTool').attr({ src: 'http://www.microchipdirect.com/images/devtools/' + sImg }).show();
    } else {
        $('#uc_DevToolChart_imgDevTool').attr({ src: '' }).hide();
    }
}


function showMenu(id, count, mnuLevel) {
    var selElement = document.getElementById(id);
    var obj = document.getElementById("Uc_TopNav1_C3_menu");
    var ohmenu1 = document.getElementById("hmenu1");

    for (var i = 1; i <= count; i++) {
        var node = 'smenu' + i;
        if (document.getElementById(node)) {
            document.getElementById(node).style.display = 'none';
            document.getElementById(node).style.visibility = 'hidden';

            var startCt = i * 10;
            var endCt = startCt + document.getElementById(node).childNodes.length;

            if (mnuLevel == 'M3' || mnuLevel == 'Hide') {
                for (var ict = startCt; ict <= endCt; ict++) {
                    var cnode = 'cmenu' + ict;
                    if (document.getElementById(cnode)) {
                        document.getElementById(cnode).style.display = 'none';
                        document.getElementById(cnode).style.visibility = 'hidden';

                    }
                }
            }
        }
    }

    if (selElement) {
        if (obj.offsetParent) {
            var curleft = 0;
            curleft = obj.offsetLeft;
            uw = obj.offsetWidth;
            curleft = curleft - uw - 70;
        }
        selElement.style.display = 'block';
        selElement.style.visibility = 'visible';
        //selElement.style.marginLeft = curleft + 'px';
    }
}
function ShowHideSection(imgID, lblID, divID, oHid) {

    imgID = typeof(imgID)==='string' ? $.trim(imgID) : '';
    lblID = typeof(lblID)==='string' ? $.trim(lblID) : '';
    divID = typeof(divID)==='string' ? $.trim(divID) : '';
    
    if (imgID==='' || divID === '' || lblID === '')
        return ;

    var oTarget = $('#' + divID);
    var oImage = $('#' + imgID);
    var oLabel = $('#' + lblID);
    var oHide = $('#hidHide'), oShow = $('#hidShow');
    
    if (oTarget)
        if ($(oTarget).css('display') == 'none') {//show
            $(oTarget).css('display', 'block').show();
            $(oImage).attr('src', 'images/minus.gif');
            $(oLabel).html($(oHide).val());
        } else {//hide
            $(oTarget).css('display', 'none').hide();
            $(oImage).attr('src', 'images/plus.gif');
            $(oLabel).html($(oShow).val());
        }
    }

    function ShowHideSectionLive(imgID, divID) {

        imgID = typeof (imgID) === 'string' ? $.trim(imgID) : '';
        divID = typeof (divID) === 'string' ? $.trim(divID) : '';

        if (imgID === '' || divID === '')
            return;

        var oTarget = $('#' + divID);
        var oImage = $('#' + imgID);

        if (oTarget)
            if ($(oTarget).css('display') == 'none') {//show
            $(oTarget).css('display', 'block').show();
            $(oImage).attr('src', 'images/minus.gif');
        } else {//hide
            $(oTarget).css('display', 'none').hide();
            $(oImage).attr('src', 'images/plus.gif');
        }
    }


// Side By Side Comparision: Show comparision product
function showotherwindow(productid1, productid2) {

    productid1 = typeof (productid1) === 'string' ? $.trim(productid1) : '';
    productid2 = typeof(productid2) === 'string' ? $.trim(productid2) : '';
    
    var product1 = $('#' + productid1);
    var product2 = $('#' + productid2);
    var tag = $('#lblProduct2'), tag2 = $('#lblCompare');

    if ($(product1).is(':hidden')) {
        $(product1).show();
        $(product2).hide();
    } else {
        $(product1).hide();
        $(product2).show();
    }

    var tag3 = tag.html();
    
    tag.html(tag2.html());
    tag2.html(tag3);

    $('#hypProduct2URL').attr('href', $('form[name=Devices]').find('[name=HiddenCompareProductURL]').val());
    $('#HiddenCompareProductURL').val($('#hypProduct2URL').attr('href'));
    
    printURL();

}
//Change the print URL according to devices selected
function printURL() {

    var product1 = $('#lblDevice');
    var product2 = $('#lblProduct2');

    var temp = $(product1).html(); 
    var temp1 = $(product2).html();

    temp = temp.substring(0, temp.indexOf("("));
    $('#hypPrintPage').attr(
        'href',
        'javascript:void(LaunchInCenter("ComparePrinterVersion.aspx?product1=' + temp + '&product2=' + temp1 + '&lang=en' + '",500,500,"location=0,status=0"));'
    );
}