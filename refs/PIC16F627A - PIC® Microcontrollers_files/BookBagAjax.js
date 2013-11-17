/// <reference path="~/Includes/jquery-vsdoc.js" />

//*********************************Start of Mini Cart AJAX code********************************************//
function createRequest() {
    try {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP"); //IE
            browserType = 'IE';
        }
        catch (othermicrosoft) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP"); //IE
                browserType = 'IE';
            }
            catch (trymozilla) {
                request = new XMLHttpRequest(); //Mozilla
                browserType = 'MOZ';
            }
        }
    }
    catch (failed) {
        request = null;
    }
    if (request == null) {

    }
    else {
        return request;
    }
}

var dvMiniCartHolder = "";
var imgCartLoader;
var browserType;
var ajxRequest;
var spnCartCountId;

function LoadMiniCart(dvMiniCart, trLoadingImg, spnCartCount, mdROOT) {
    imgCartLoader = document.getElementById(trLoadingImg)
    dvMiniCartHolder = window.document.getElementById(dvMiniCart);
    spnCartCountId = spnCartCount;
    try {
        //checks the content in firefox, chrome, and internet explorer
        if (dvMiniCartHolder.innerHTML == "" || dvMiniCartHolder.innerHTML == "\n                    ") {
            imgCartLoader.style.display = "Block";
            window.document.getElementById(spnCartCount).style.display = "None";
            ajxRequest = createRequest(); //new XMLHttpRequest();
            var url = ""
            if (mdROOT == null || mdROOT == "")
                url = "BookBagAjax.aspx?action=LoadCart";
            else {
                //To fix https Vs http and http Vs https ajax call issue.
                if (document.location.href.indexOf("http://") != -1)
                    mdROOT = mdROOT.replace("https://", "http://");
                else if (document.location.href.indexOf("https://") != -1)
                    mdROOT = mdROOT.replace("http://", "https://")

                url = mdROOT + "/BookBagAjax.aspx?action=LoadCart";
            }
            SendMiniCartRequest(ajxRequest, url);
        }
        else {
            showCart('tblShoppingCart');
        }
    }
    catch (exp) {
        if (imgCartLoader)
            imgCartLoader.style.display = "None";
        if (dvMiniCartHolder)
            dvMiniCartHolder.style.display = "None";
        if (window.document.getElementById(spnCartCount))
            window.document.getElementById(spnCartCount).style.display = "block";
    }
}

///Takes the httpRequest as an input parameter and sends the asynchronous request to the server
function SendMiniCartRequest(ajxRequest, url) {
    try {
        ajxRequest.onreadystatechange = FillMiniCart;
        //to avoid caching in browser,we need to trick the browser to believe that 
        //we are sending a different request every time
        url += '&' + Math.random();
        ajxRequest.open("GET", url, true);
        ajxRequest.send(null);
    }
    catch (exp)
				{ }
}

function FillMiniCart() {
    if (ajxRequest.readyState == 4 || ajxRequest.readyState == "complete") {
        if (ajxRequest.status == 200) {
            //Get the XML response.
            var xmlDoc = ajxRequest.responseXML;
            //Parse the html inside xml and assign it to div control.
            dvMiniCartHolder.innerHTML = xmlDoc.getElementsByTagName("MiniCartList")[0].firstChild.nodeValue;
            //Hide the loader image
            imgCartLoader.style.display = "none";
            dvMiniCartHolder.style.display = "block";
            showCart('tblShoppingCart');
            window.document.getElementById(spnCartCountId).style.display = "block";
        }
    }
}

function showCart(id) {
    if (typeof (id) == 'string' && $.trim(id) != '')
        $('#' + id).css('visibility', 'visible').show();

    $('#imgCart').attr('src', 'Images/top_arrow_down.gif');
}

function hideCart(id) {
    if (typeof (id) == 'string' && $.trim(id) != '')
        $('#' + id).css('visibility', 'hidden').hide();

    $('#imgCart').attr('src', 'Images/top_arrow.gif'); 
}
//*********************************End of Mini Cart AJAX code********************************************//
