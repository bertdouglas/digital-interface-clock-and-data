
function ReadCookie(cookieName) {
    var theCookie = "" + document.cookie;
    var ind = theCookie.indexOf(cookieName);
    if (ind == -1 || cookieName == "") return "";
    var ind1 = theCookie.indexOf(';', ind);
    if (ind1 == -1) ind1 = theCookie.length;
    return unescape(theCookie.substring(ind + cookieName.length, ind1));
};


function getLangCookie() {
    var lang = ReadCookie("MCHP=");
    if (lang == "")
        return "en";
    else {

        lang = lang.toLowerCase();

        if (lang == "style=jp")
            return "jp";

        if (lang == "style=cn")
            return "cn";

        if (lang == "style=en")
            return "en";

    }
    return "en";
};


function SetPath(ln) {

    lngVersion = ln;
    var strPath = "" + window.location;
    var today = new Date();
    today.setMonth(today.getMonth() + 12);
    document.cookie = "MCHP=" + "Style=" + lngVersion + "; expires=" + today.toGMTString() + "; path=/";

    ofcookies = "en_us";
    if (lngVersion == "cn")
        ofcookies = "zh_cn";
    if (lngVersion == "jp")
        ofcookies = "ja_jp";

    document.cookie = "MCHP_LOCALE=" + ofcookies + "; expires=" + today.toGMTString() + "; path=/"; 

    if(lngVersion != "en" && typeof(homepage) != "undefined")
            parent.location = "/home.aspx";
    else		
	    parent.location = strPath;

}


$(document).ready(function() {

    $("#langs").val(getLangCookie()).attr('selected', true);
    $('#langs').change(function() {
        var selectedValue = $(this).find(":selected").val();
        SetPath(selectedValue);

    });

});


function SearchEnter() {
    try {
        if (document.layers) { //Netscape 4
            searchObj = eval(document.searchbar);
        }
        else if (navigator.userAgent.indexOf("Opera") != -1) { //Opera
            searchObj = eval(document.all.searchbar);
        }
        else if (document.all && !document.getElementById) { //IE 4
            searchObj = eval(document.all.searchbar);
        }
        else if (document.getElementById) { //Netscape 6 & IE 5 & FireFox
            searchObjs = document.getElementsByName('searchbar');
            searchObj = searchObjs[0];
        }
        else { }
        var UserText = searchObj.value;

        if (UserText == '') {
            return

        }

        window.location = "http://www.microchip.com/search/searchapp/searchhome.aspx?id=2&q=" + UserText;

    }
    catch (err) {
    }

}




function SearchAC() {
    try {
        if (document.layers) { //Netscape 4
            searchObj = eval(document.searchbar);
        }
        else if (navigator.userAgent.indexOf("Opera") != -1) { //Opera
            searchObj = eval(document.all.searchbar);
        }
        else if (document.all && !document.getElementById) { //IE 4
            searchObj = eval(document.all.searchbar);
        }
        else if (document.getElementById) { //Netscape 6 & IE 5 & FireFox
            searchObjs = document.getElementsByName('searchbar');
            searchObj = searchObjs[0];
        }
        else { }
        var UserText = searchObj.value;

        if (UserText == '') {
            return

        }

        window.location = "http://www.microchip.com/search/searchapp/searchhome.aspx?id=2&q=" + UserText + "&ac=1";


    }
    catch (err) {
    }
}

function formatItem(row) {
    var cpn = row[0].replace(/(<.+?>)/gi, '');
    var retStr = "";

    if (row[1] != null && row[1].length > 0)
        retStr = row[1].replace(/(<.+?>)/gi, '');
    if (retStr.length > 0)
        retStr = cpn + " - " + retStr;
    else
        retStr = cpn;

    if (row[2] != null && row[2].replace(/(<.+?>)/gi, '').length > 0)
        retStr = "<img src='http://www.microchip.com/stellent/images/mchpsiteimages/" + row[2].replace(/(<.+?>)/gi, '') + ".gif' border=0 width=15 height=15  valign='bottom' />&nbsp;&nbsp;" + retStr;
    else
        retStr = "<img src='http://www.microchipdirect.com/images/devtools/" + cpn + ".jpg' border=0 width=15 height=15 valign='bottom' />&nbsp;&nbsp;" + retStr;
    return retStr;
}

function formatResult(row) {
    var retStr = row[0].replace(/(<.+?>)/gi, '');
    if (retStr == null || retStr.length == 0)
        retStr = row[1].replace(/(<.+?>)/gi, '');
    return retStr;
}

$(document).ready(function() {

    /* set focus on search box, and autocomplete any input */
    
    $("#searchbar")/*.focus()*/.autocomplete('/SearchAuto/AutoComplete.aspx',
			{
			    matchContains: true,
			    minChars: 3,
			    width: 200,
			    autoFill: false,
			    max: 15,
			    cacheLength: 20,
			    formatItem: formatItem,
			    formatResult: formatResult,
			    scroll: true,
			    scrollHeight: 300,
			    extraParams: { doc: "yes" },
			    selectFirst: false
			});
    

    $('#searchbar').keypress(function() {
        $("#searchbar").html("");
    });


    $("#searchbar").blur(function() {

        if ($('#searchfld').val() == "")
            $("#searchbar").html("Search");

    });


    $("#searchbar").result(function(event, data, formatted) {
        if (data)
            Javascript: SearchAC();
    });
});

