
function callFunc(lblEng,txtEngOnly,hdnEnglishOnlyFlag,btnSaveAddress)
{
	var hdn = document.getElementById(hdnEnglishOnlyFlag);
	var txt = document.getElementById(txtEngOnly);
	var lbl = document.getElementById(lblEng);
	var btn = document.getElementById(btnSaveAddress);
	
	
}


function validateTextBoxInputs(lbl,txtEngOnly,hdn,btn)
{

	var isEnglish	= 1;
	var txtVal		= txtEngOnly.value;
	var searchString = ","+txtEngOnly.id+",";
	if(hdn.value=='') 
		hdn.value = hdn.value + ","+ txtEngOnly.id+",";
	else if(hdn.value.indexOf(searchString)<0) 
		hdn.value = hdn.value + txtEngOnly.id+",";
	
	isEnglish = IsInputEnglish(txtVal);
	if(isEnglish==1)
	{
		
		var ind1 = hdn.value.indexOf(searchString);
		var firstStr = hdn.value.substring(0,ind1);	
		var lenOfSearchStr = searchString.length;
		var secondStr = hdn.value.substring(ind1+lenOfSearchStr-1);
		hdn.value = firstStr+secondStr;
	}
	
	if(hdn.value.length>0 && hdn.value!=',')
	{	
		
		lbl.style.visibility = "visible";
		lbl.style.display="block";
		lbl.className = "NormalRed";
		btn.onclick= disableBtn;	
	}
	else
	{	
		lbl.style.visibility = "hidden"; 
		lbl.style.display="none";
		
		btn.onclick= enableBtn;
	}
}

function validateTextBoxInputs1(lbl,txtEngOnly,hdn,btn,btn1)
{
	if(lbl!=null && txtEngOnly!=null && hdn!=null && btn1!=null && btn!=null)
	{
	
		var isEnglish	= 1;
		var txtVal		= txtEngOnly.value;
		var searchString = ","+txtEngOnly.id+",";
		if(hdn.value=='') 
			hdn.value = hdn.value + ","+ txtEngOnly.id+",";
		else if(hdn.value.indexOf(searchString)<0) 
			hdn.value = hdn.value + txtEngOnly.id+",";
		
		
		isEnglish = IsInputEnglish(txtVal);
		
		if(isEnglish==1)
		{
			var ind1 = hdn.value.indexOf(searchString);
			var firstStr = hdn.value.substring(0,ind1);	
			var lenOfSearchStr = searchString.length;
			var secondStr = hdn.value.substring(ind1+lenOfSearchStr-1);
			hdn.value = firstStr+secondStr;
		}
		if(hdn.value.length>0 && hdn.value!=',')
		{	
			
			lbl.style.visibility = "visible";
			lbl.style.display="block";
			lbl.className = "NormalRed";
			btn.onclick= disableBtn;	
			btn1.disabled= true;	
		}
		else
		{	
			lbl.style.visibility = "hidden"; 
			lbl.style.display="none";
			btn.onclick= enableBtn;
			btn1.disabled = false;
		}
	}
}

function IsInputEnglish(txtVal)
{
	var isEnglish =0;
	for(j=0;j<txtVal.length;j++)
	{
		if(txtVal.charCodeAt(j)>=0 && txtVal.charCodeAt(j)<256) 
		{
			isEnglish=1;
		}
		else
		{
			isEnglish=0;
			break;
		}
	}
	if(txtVal=='')
		isEnglish=1;
	
	return isEnglish;
}

function disableBtn()
{
	return false;
}

function enableBtn()
{
	return true;
}

function readCookie(name) 
{

    var nameEQ = name + "=";

    var ca = document.cookie.split(';');

    for(var i=0; i < ca.length;i++) 
    {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function showKey(e)
{
	var ctlgSupportsUnicode = readCookie("ctlgSupportUnicode=SupportUnicode"); 

	if(ctlgSupportsUnicode!=null)
	{
		if(ctlgSupportsUnicode == 'False' || ctlgSupportsUnicode == 'false')
		{
			var allInputs = document.getElementsByTagName('input');
			for (i=0; i<allInputs.length; i++)
			{
					if(allInputs[i].type =='text' )
					{
						var txtInputObj = allInputs[i];
						txtInputObj.onblur = callFuncNew;
					}
			}
		}
	}
}

function loadtopmenus()
{
	
	var isCSS, isW3C, isIE4;
	var iResult, HTMLPrefix, HTMLSPrefix;
	iResult = initJSAPI();
	
	var x=1;
	var y=5;  
	
	
	HTMLPrefix = "";
	HTMLSPrefix = "";
	
	
	topx = new Array();   
	htmx = new Array();   
	
	topx[0] = new Array();
	htmx[0] = new Array();
	topx[0][0] = "PICmicro&#174; Microcontrollers";
	htmx[0][0] = HTMLPrefix + "ProductTree.aspx?mid=00&Catalog=BuyMicrochip&Category=PICmicro%26%23174%3b+Microcontrollers&TreeID=1";
	topx[0][1] = "Analog & Interface";
	htmx[0][1] = HTMLPrefix + "ProductTree.aspx?mid=01&Catalog=BuyMicrochip&Category=Analog%2fInterface+Products&TreeID=2";
	topx[0][2] = "Memory";
	htmx[0][2] = HTMLPrefix + "ProductTree.aspx?mid=02&Catalog=BuyMicrochip&Category=Memory+Products&TreeID=3";
	topx[0][3] = "rfPIC Devices";
	htmx[0][3] = HTMLPrefix + "ProductTree.aspx?mid=03&Catalog=BuyMicrochip&Category=rfPIC+Devices&TreeID=4";
	topx[0][4] = "Security";
	htmx[0][4] = HTMLPrefix + "ProductTree.aspx?mid=04&Catalog=BuyMicrochip&Category=Security+Products&TreeID=5";
	topx[0][5] = "Development Tools";
	htmx[0][5] = HTMLPrefix + "ProductTree.aspx?mid=00&Catalog=BuyMicrochip&Category=Development+Tools&TreeID=6";
	topx[0][6] = "";
	htmx[0][6] = "";
	topx[0][7] = "";
	htmx[0][7] = "";
	topx[0][8] = "";
	htmx[0][8] = "";
	
	
	topx[1] = new Array();
	htmx[1] = new Array();
	topx[1][0] = "Login";
	htmx[1][0] = HTMLPrefix + "Loginuser.aspx?mid=10";
	topx[1][1] = "Register";
	htmx[1][1] = HTMLPrefix + "NewAccount.aspx?mid=11&returnURL=MyAccount.aspx";
	topx[1][2] = "Profile";
	htmx[1][2] = HTMLPrefix + "MyAccount.aspx?mid=12";
	topx[1][3] = "Addresses";
	htmx[1][3] = HTMLPrefix + "Address.aspx?mid=13";
	topx[1][4] = "Payment Options";
	htmx[1][4] = HTMLPrefix + "PaymentOptions.aspx?mid=14";
	topx[1][5] = "Change Password";
	htmx[1][5] = HTMLPrefix + "ChangePassword.aspx?mid=15";
	topx[1][6] = "Change E-mail";
	htmx[1][6] = HTMLPrefix + "ChangeEmail.aspx?mid=16";
	topx[1][7] = "Order History";
	htmx[1][7] = HTMLPrefix + "OrderHistory.aspx?mid=17";
	topx[1][8] = "Corp. Upgrade";
	htmx[1][8] = HTMLPrefix + "CorpUpgrade.aspx?mid=18";

	
	topx[2] = new Array();
	htmx[2] = new Array();
	topx[2][0] = "Getting Started";
	htmx[2][0] = HTMLPrefix + "Default.aspx?mid=20";
	topx[2][1] = "Order Info";
	htmx[2][1] = HTMLPrefix + "Default.aspx?mid=21";
	topx[2][2] = "Payment Info";
	htmx[2][2] = HTMLPrefix + "Default.aspx?mid=22";
	topx[2][3] = "Shipping Info";
	htmx[2][3] = HTMLPrefix + "Default.aspx?mid=23";
	topx[2][4] = "RMA Info";
	htmx[2][4] = HTMLPrefix + "Default.aspx?mid=24";
	topx[2][5] = "FAQ";
	htmx[2][5] = HTMLPrefix + "Default.aspx?mid=25";
	topx[2][6] = "Contact Us";
	htmx[2][6] = HTMLPrefix + "Default.aspx?mid=26";
	topx[2][7] = "Terms & Conditions";
	htmx[2][7] = HTMLPrefix + "Default.aspx?mid=27";
	topx[2][8] = "Privacy Statement";
	htmx[2][8] = HTMLPrefix + "Default.aspx?mid=28";
	
	topx[3] = new Array();
	htmx[3] = new Array();
	topx[3][0] = "Engineer's Toolbox";
	htmx[3][0] = "http://www.microchip.com/1010/suppdoc/index.htm";
	topx[3][1] = "Investors";
	htmx[3][1] = "http://www.microchip.com/1010/ir/index.htm";
	topx[3][2] = "Jobs";
	htmx[3][2] = "http://www.microchip.com/1010/employ/index.htm";
	topx[3][3] = "Product Info";
	htmx[3][3] = "http://www.microchip.com/1010/search/prodsel/index.htm";
	topx[3][4] = "Samples";
	htmx[3][4] = "http://sample.microchip.com";
	topx[3][5] = "Technical Support";
	htmx[3][5] = "http://www.microchip.com/1010/tsupport/index.htm";
	topx[3][6] = "";
	htmx[3][6] = "";
	topx[3][7] = "";
	htmx[3][7] = "";
	topx[3][8] = "";
	htmx[3][8] = "";
	
	topx[4] = new Array();
	htmx[4] = new Array();
	topx[4][0] = "Select Corporate Account";
	htmx[4][0] = HTMLPrefix + "CorpSelect.aspx?mid=40";
	topx[4][1] = "Corporate Profile";
	htmx[4][1] = HTMLPrefix + "CorpAccount.aspx?mid=41";
	topx[4][2] = "Corporate Addresses";
	htmx[4][2] = HTMLPrefix + "CorpAddress.aspx?mid=42";
	topx[4][3] = "Corporate Payment";
	htmx[4][3] = HTMLPrefix + "CorpPayment.aspx?mid=43";
	topx[4][4] = "Manage Users";
	htmx[4][4] = HTMLPrefix + "CorpManage.aspx?mid=44";
	topx[4][5] = "Invite Users";
	htmx[4][5] = HTMLPrefix + "CorpInvite.aspx?mid=45";
	topx[4][6] = "";
	htmx[4][6] = "";
	topx[4][7] = "";
	htmx[4][7] = "";
	topx[4][8] = "";
	htmx[4][8] = "";
	

	FORM_DATA = createRequestObject();
	
}


function initmenu(m,s) 
{

	buildtopmenu(m);
	activateSubMenu(m,s);
}


function buildmenu(m)
{
	
	switch(m)
	{
		case 0:
			styleActivate(0);
			buildSubMenus(0);
			break;	
		case 1:
			styleActivate(1);
			buildSubMenus(1);
			break;	
		case 2:
			styleActivate(2);
			buildSubMenus(2);
			break;	
		case 3:
			styleActivate(3);
			buildSubMenus(3);
			break;	
		case 4:
			styleActivate(4);
			buildSubMenus(4);
			break;	
	}
	return 1;
}

function buildtopmenu(m)
{
		
	switch(m)
	{
		case "0":
			styleActivate(0);
			break;	
		case "1":
			styleActivate(1);
			break;	
		case "2":
			styleActivate(2);
			break;	
		case "3":
			styleActivate(3);
			break;	
		case "4":
			styleActivate(4);
			break;	
	}
	return 1;
}


function resetmenu()
{
	
	if (FORM_DATA["mid"]) {
		var st, m, s;
		st = FORM_DATA["mid"].toString();
		m = st.charAt(0);
		s = st.charAt(1); 
		initmenu(m,s);
	}
}

function activateSubMenu(m,t)
{
	var str;
	
	str = "<table width=\"760\" cellpadding=0 cellspacing=0 class=\"HeaderActive\"> <tr>";
	
	for (x=0; x<=8; x++){
		if (x == t) {
			str = str + "<td align=\"center\"  >";
			str = str + "<a href=\"" + htmx[m][x] + "\" style=\"color: \#ffffff \" >";
			str = str + topx[m][x];
			str = str + "</a>";
			str = str + "</td>";
		} else {
			str = str + "<td align=\"center\"  >";
			str = str + "<a href=\"" + htmx[m][x] + "\" style=\"color: \#cccccc \" >";
			str = str + topx[m][x];
			str = str + "</a>";
			str = str + "</td>";
		}
		if ((x < 8) && (topx[m][x] != "") && (topx[m][x+1]!= "")){
			str = str + "<td width=\"2\">|<td>";
		}
	}
	str = str + "</tr></table>";
	setInnerHTML(getRawObject("SubMenuLinks"), str);

}


function styleActivate(m)
{
	for (count = 0;count <= 5; count++) {
		if (count == m) {
			setStyle(getRawObject("TopNavSect" + m),"HeaderActive");
			setStyle(getRawObject("TopNavU" + m),"HeaderUnderBarActive");
		} else {
			setStyle(getRawObject("TopNavSect" + (count)),"HeaderInactive");
			setStyle(getRawObject("TopNavU" + (count)),"HeaderUnderBarInactive");
		}
	}
}

function buildSubMenus(m)
{
	var str;
	
	str = "<table width=\"760\" cellpadding=0 cellspacing=0 class=\"HeaderActive\"> <tr>";
	
	for (x=0; x<=8; x++){
		str = str + "<td align=\"center\">";
		str = str + "<a href=\"" + htmx[m][x] + "\" class=\"TopNav\" id=\"topnavsub" + (m) + (x) + "\">";
		str = str + topx[m][x];
		str = str + "</a>";
		str = str + "</td>";
		if ((x < 8) && (topx[m][x] != "") && (topx[m][x+1]!= "")){
			str = str + "<td width=2>|<td>";
		}
	}
	str = str + "</tr></table>";
	setInnerHTML(getRawObject("SubMenuLinks"), str);

}

function styleInactivate(m)
{
	setStyle(getRawObject("TopNavSect" + (m)),"HeaderInactive");
	setStyle(getRawObject("TopNavU" + (m)),"HeaderUnderBarInactive");
}

function initJSAPI()
{
	if (document.images)
	{
		isCSS = (document.body && document.body.style) ? true : false;
		isW3C = (isCSS && document.getElementById) ? true : false;
		isIE4 = (isCSS && document.all) ? true : false;
		isNN4 = (document.layers) ? true : false;
		isIE6CSS = (document.compatMode && document.compatMode.indexOf("CSS1") >= 0) ? true : false;
	}	
	return 1;	
}

function getRawObject(obj) 
{
	var theObj;
	if (typeof obj == "string") {
		if (isW3C) {
			theObj = document.getElementById(obj);
		} else if (isIE4) {
			theObj = document.all(obj);
		} else if (isNN4) {
			theObj = seekLayer(document, obj);
		}
	} else {
		
		theObj = obj;
	}
	return theObj;
}


function getObj(obj)
{
	var theObj = getRawObject(obj);
	if (theObj && isCSS) {
		theObj = theObj.style;
	}
	return theObj;
}

function seekLayer(doc, name)
{
	var theObj;
	for (var i=0; i< doc.layers.length; i++) {
		if (doc.layers[i].name == name) {
			theObj = doc.layers[i];
			break;
		}
		
		if (doc.layers[i].document.layers.length > 0) {
			theObj = seekLayer(document.layers[i].document, name);
			}
		}
		return theObj;
}

function setBGColor(obj, color)
{
	var theObj = getObject(obj);
	if (theObj) {
		if (isNN4) {
			theObj.bgcolor = color;
		} else if (isCSS) {
			theObj.backgroundColor = color;
		}
	}
}

function setColor(obj, color)
{
	if (obj) {
		if (isNN4) {
			obj.color = color;
		} else if (isCSS) {
			obj.color = color;
		}
	}
}

function setStyle(obj, style)
{
	if (obj) {
		if (isCSS) {
			obj.className = style;
		}
	}
}

function setInnerHTML(obj, str)
{
	if (obj) {
		if (isCSS) {
			obj.innerHTML = str;
		} else if (isNN4) {
			obj.innerHTML = str;
		}
	}
}

function setInnerText(obj, str)
{
	if (obj) {
		if (isCSS) {
			obj.innerText = str;
		}
	}
}

function createRequestObject() {
  
  FORM_DATA = new Object();
  
  separator = ',';
  
  query = '' + this.location;
    
  query = query.substring((query.indexOf('?')) + 1);
  
  if (query.length < 1) { return false; }  
  
  keypairs = new Object();
  numKP = 1;
    
  while (query.indexOf('&') > -1) {
    keypairs[numKP] = query.substring(0,query.indexOf('&'));
    query = query.substring((query.indexOf('&')) + 1);
    numKP++;
  }

  keypairs[numKP] = query;
  
  for (i in keypairs) {
    keyName = keypairs[i].substring(0,keypairs[i].indexOf('='));
    keyValue = keypairs[i].substring((keypairs[i].indexOf('=')) + 1);
    while (keyValue.indexOf('+') > -1) {
      keyValue = keyValue.substring(0,keyValue.indexOf('+')) + ' ' + keyValue.substring(keyValue.indexOf('+') + 1);
    }
    
    keyValue = unescape(keyValue);
      
    if (FORM_DATA[keyName]) {
      FORM_DATA[keyName] = FORM_DATA[keyName] + separator + keyValue;
    } else {
      FORM_DATA[keyName] = keyValue;
    }
  }

  return FORM_DATA;
}

function disableEnterKey()
{
	if (window.event.keyCode == 13) 
		window.event.keyCode = 0;
}
function showCalendar(elemId){
	if(elemId.indexOf('showCalenderButton')>=0)
	{
		elemId=elemId.substring(0, elemId.lastIndexOf('showCalenderButton'));
		elemId=elemId+'RequestDateCalendar';
		value=document.getElementById(elemId).style.display;
		value= (value=="") ? "none" : "";
		document.getElementById(elemId).style.display=value;
	}
}

function showQuotePanel(elemId){
	if(elemId.indexOf('showQuotePanelButton')>=0)
	{
		elemId=elemId.substring(0, elemId.lastIndexOf('showQuotePanelButton'));
		elemId=elemId+'QuoteSelectionPanel';
		value=document.getElementById(elemId).style.display;
		value= (value=="") ? "none" : "";
		document.getElementById(elemId).style.display=value;
	}
}

function showQuotePanelAlt(elemId){
	if(elemId.indexOf('showQuotePanelButtonAlt')>=0)
	{
		elemId=elemId.substring(0, elemId.lastIndexOf('showQuotePanelButtonAlt'));
		elemId=elemId+'QuoteSelectionPanelAlt';
		value=document.getElementById(elemId).style.display;
		value= (value=="") ? "none" : "";
		document.getElementById(elemId).style.display=value;
	}
}

function ExpandCollapse(imgIndex)
{
	var imgName = 'imgQus' + imgIndex;
	var rowName = 'tblAns' + imgIndex;
	var imgCntrl = document.getElementById(imgName);
	var rowCntrl = document.getElementById(rowName);
	if(imgCntrl.src.indexOf('plus.gif') != -1)
	{
		imgCntrl.src = 'Images/UI/open.gif';
		rowCntrl.style.display = 'block';
	}
	else
	{
		imgCntrl.src = 'Images/UI/plus.gif';
		rowCntrl.style.display = 'none';
	}
}
var WindowObjectReference = null; 
function openExternalLink(strUrl, strWindowName)
{
  var PreviousUrl;
  if(WindowObjectReference == null || WindowObjectReference.closed)
  {
	WindowObjectReference = window.open(strUrl, strWindowName,
         "toolbar=1,scrollbars=1,location=1,statusbar=1,menubar=1,resizable=1");
  }
  else if(PreviousUrl!= strUrl)
  {
	WindowObjectReference = window.open(strUrl, strWindowName,
      "toolbar=1,scrollbars=1,location=1,statusbar=1,menubar=1,resizable=1");
   
	WindowObjectReference.focus();
  }
  else
  {
	WindowObjectReference.focus();
  };
  PreviousUrl= strUrl;
  
    return false;
}


function ToggleMask(mode)
{
    var maskDiv = parent.document.getElementById('divMask');
    if(mode == 'ON')
    {
        maskDiv.className = 'maskOn';
        maskDiv.style.width = (screen.width-25) + 'px';
        maskDiv.style.height = (document.body.scrollTop + screen.height) + 'px';        
    }
    else
    {
        maskDiv.className = 'maskOff';
    }
}

function ToggleMaskById(mode, id) {
    var maskDiv = parent.document.getElementById(id);
    if (mode == 'ON') {
        maskDiv.className = 'maskOn';
        maskDiv.style.width = (screen.width - 25) + 'px';
        maskDiv.style.height = (document.body.scrollTop + screen.height) + 'px';
    }
    else {
        maskDiv.className = 'maskOff';
    }
}

function OpenCommonIFrameById(src, l, t, w, h, id) {
    var objFrm = document.getElementById(id);
    objFrm.style.top = t;
    objFrm.style.left = l;
    objFrm.style.width = w;
    objFrm.style.height = h;
    objFrm.style.display = "block";
    objFrm.src = src;
}

function OpenHOPIFrame(src, w, h, idFrame, hTd, idTd) {
    var objFrm = document.getElementById(idFrame);
    objFrm.style.width = w;
    objFrm.style.height = h;
    objFrm.style.display = "block";
    objFrm.src = src;
    var objTd = document.getElementById(idTd);
    objTd.style.visibility = "visible";
    //objTd.style.display = "block";
    objTd.style.height = hTd;
}

function OpenIFrame(src)
{
	var rely=0;
	var posy=0;
	var posx=0;
	var ctlgIFrame = document.getElementById('ifrmpromptForCatalog'); 
  	if(window.event) 
	{  //IE
 		var curY = window.event.clientY;
 		if (curY > document.body.clientHeight/2)
 			curY = curY -  215;
		ctlgIFrame.style.top =  document.body.scrollTop + 80;
		ctlgIFrame.style.left  = window.event.clientX + document.body.scrollLeft - 800;
	} 
	else 
	{
		if (rely > window.innerHeight/2)
			posy = posy - 210;
		ctlgIFrame.style.top = posy + document.body.scrollTop  +80;
		ctlgIFrame.style.left  = posx+100 ;				
	}
	ctlgIFrame.style.width = "825px";
	ctlgIFrame.style.height="458px";	
	ctlgIFrame.src = src;	
	ctlgIFrame.style.display = "block";
}

function OpenCommonIFrame(src, l, t, w, h)
{
    ToggleMask('ON');
    var objFrm = document.getElementById('iFrame');    
    objFrm.style.top = t;
    objFrm.style.left = l;
    objFrm.style.width = w;
    objFrm.style.height = h;
    objFrm.style.display = "block";
    objFrm.src = src;
}

function OpenHPAIFrame(src, l, t, w, h,p) {
    var objFrm = document.getElementById('iFrame'); 
    var obj= document.getElementById(p);


    objFrm.style.top = findPosTop(obj) + "px";
    objFrm.style.left = l;
    objFrm.style.width = w;
    objFrm.style.height = h;
    objFrm.style.display = "block";
    objFrm.src = src;
}

function CloseCommonIFrame()
{
    var objIFrm = parent.document.getElementById('iFrame');    
	objIFrm.style.display="none"			
    objIFrm.src = '';
    ToggleMask('OFF');
}

function SetPageUrl(url)
{
    window.location.replace(url);
}

function ShowMessage_Login(object, frameCtrl)
{

	var scrolledX, scrolledY; 
	if( self.pageYoffset ) 
	{ 
	scrolledX = self.pageXoffset; 
	scrolledY = self.pageYoffset; 
	} 
	else if( document.documentElement && document.documentElement.scrollTop ) 
	{ 
	scrolledX = document.documentElement.scrollLeft; 
	scrolledY = document.documentElement.scrollTop; 
	} 
	else if( document.body ) 
	{ 
	scrolledX = document.body.scrollLeft; 
	scrolledY = document.body.scrollTop;
	}
	var centerX, centerY; 
	if( self.innerHeight ) 
	{ 
	centerX = self.innerWidth; 
	centerY = self.innerHeight; 
	} 
	else if( document.documentElement && document.documentElement.clientHeight ) 
	{ 
	centerX = document.documentElement.clientWidth; 
	centerY = document.documentElement.clientHeight; 
	} 
	else if( document.body ) 
	{ 
	centerX = document.body.clientWidth; 
	centerY = document.body.clientHeight; 
	} 
	Xwidth=300;
	Yheight=220;
	
	var leftoffset = scrolledX + (centerX - Xwidth) / 2; 
	var topoffset = scrolledY + (centerY - Yheight) / 2; 
	
	var o=document.getElementById(frameCtrl); 
	var r=o.style; 
	r.position='absolute'; 
	r.top = topoffset + 'px'; 
	r.left = leftoffset + 'px'; 
	r.display = "block"; 
	r.visibility = "visible";
	
}


		function ExpandCollapseinfo(imgIndex,imgIndex2)
		{
			
			var imgName = imgIndex;
			var rowName = imgIndex2;
			
			
			var imgCntrl = document.getElementById(imgName);
			var rowCntrl = document.getElementById(rowName);
			
			
			if(imgCntrl.src.indexOf('plus.gif') != -1 )
			{   
				imgCntrl.src = 'Images/UI/open.gif';
				rowCntrl.style.display = 'block';
				
			}
			
			else
			{		
				imgCntrl.src = 'Images/UI/plus.gif';
				rowCntrl.style.display = 'none';
				
			}
			
		}	
		
		function ExpandCollapseinfocl(imgIndex,imgIndex2)
		{
			
			var imgName = imgIndex;
			var rowName = imgIndex2;
			
			
			var imgCntrl = document.getElementById(imgName);
			var rowCntrl = document.getElementById(rowName);
						
			if(imgCntrl.src.indexOf('plus.gif') != -1 )
			{   
				imgCntrl.src = 'Images/UI/open.gif';
				rowCntrl.style.visibility = 'visible';
				
			}
			
			else
			{		
				imgCntrl.src = 'Images/UI/plus.gif';
				rowCntrl.style.visibility = 'hidden';	
			}
			
		}

function ShowMessage(object, frameCtrl)
{	
	if (object != null)
	{
		var obj = document.getElementById(object);
		document.getElementById(frameCtrl).style.top     = findPosTop(obj) + 14;
		
		if(findPosLeft(object) + 400 < WindowPosition() || NotIEorMozilla())
			document.getElementById(frameCtrl).style.left    = findPosLeft(obj) ;
		else	
			document.getElementById(frameCtrl).style.left    = WindowPosition() - 430 ;
	}
	document.getElementById(frameCtrl).style.display = "block";
	document.getElementById(frameCtrl).style.visibility = "visible";
	document.getElementById(frameCtrl).style.position = "absolute";
}

function ShowMsg(object, frameCtrl)
{	
	if (object != null)
	{
		var obj = document.getElementById(object);
		document.getElementById(frameCtrl).style.top     = findPosTop(obj) + 14;
		
		if(findPosLeft(object) + 400 < WindowPosition() || NotIEorMozilla())			
			document.getElementById(frameCtrl).style.left = 746 ;
		else	
			document.getElementById(frameCtrl).style.left    = WindowPosition() - 430 ;
	}
	
	document.getElementById(frameCtrl).style.display = "block";
	document.getElementById(frameCtrl).style.visibility = "visible";
	document.getElementById(frameCtrl).style.position = "absolute"
}

function HideMessage(frameCtrl)
{
	mouseover = false;	
	document.getElementById(frameCtrl).style.display = "none";
	document.getElementById(frameCtrl).style.visibility = "hidden";
}

function ShowDynamicMessage(object, frameCtrl,msgObject)
{
	if (object != null)
	{
		var obj = document.getElementById(object);
		document.getElementById(frameCtrl).style.top     = findPosTop(obj) + 14;
		
		if(findPosLeft(object) + 400 < WindowPosition() || NotIEorMozilla())
			document.getElementById(frameCtrl).style.left    = findPosLeft(obj) ;
		else	
			document.getElementById(frameCtrl).style.left    = WindowPosition() - 430 ;
			
					
		var msgObj = document.getElementById(msgObject);		
		document.getElementById(frameCtrl).innerHTML="<table width=100% bgcolor=#ffffff><tr><td class=DarkGreenNormal align=left>" + msgObj.value +" </td></tr></table>";
		
	}
	document.getElementById(frameCtrl).style.display = "block";
	document.getElementById(frameCtrl).style.visibility = "visible";
	document.getElementById(frameCtrl).style.position = "absolute"
}

function findPosTop(obj)
{
	var curtop = 0;
	if(obj.offsetParent)
		while(1)
		{
		curtop += obj.offsetTop;
		if(!obj.offsetParent)
			break;
		obj = obj.offsetParent;
		}
	else if(obj.y)
	    curtop += obj.y;
	return curtop;
}


function findPosLeft(obj)
{
	var curleft = 0;
	if(obj.offsetParent)
		while(1) 
		{
		curleft += obj.offsetLeft;
		if(!obj.offsetParent)
			break;
		obj = obj.offsetParent;
		}
	else if(obj.x)
		curleft += obj.x;
		
	return curleft;
}


function WindowPosition()
{

	var winW;

	if (parseInt(navigator.appVersion)>3) {
		if (navigator.appName=="Netscape") {
			winW = window.innerWidth;
		}
		if (navigator.appName.indexOf("Microsoft")!=-1) {
			winW = document.body.offsetWidth;
		}
	}
return winW;
}


function NotIEorMozilla()
{
	var NotIEorMozilla =true;
	
	if(navigator.appName=="Netscape" || navigator.appName.indexOf("Microsoft")!=-1)
		NotIEorMozilla = false;
		
	return NotIEorMozilla;
}

var mouseover = false;
function ShowCustMessage(object, frameCtrl)
{
	mouseover = true; 
	setTimeout(
		function() {
			if (object != null)
			{
				var obj = document.getElementById(object);
				var objFrmCntrl = document.getElementById(frameCtrl);
				objFrmCntrl.style.top     = findPosTop(obj) -60 ;
				
				if(findPosLeft(object) + 400 < WindowPosition() || NotIEorMozilla())
					objFrmCntrl.style.left    = findPosLeft(obj) + 8;
				else	
					objFrmCntrl.style.left    = WindowPosition() - 430 ;					
			}
			if(mouseover)
			{
				objFrmCntrl.style.display = "block";	
				objFrmCntrl.style.visibility = "visible";
				objFrmCntrl.style.position = "absolute"
			}
		  }
			, 2000);
}


function ShowTable(tableCtrl)
{	
	document.getElementById(tableCtrl).style.display = "block";
	document.getElementById(tableCtrl).style.visibility = "visible";	
}

function HideTable(tableCtrl)
{		
	var tblCtrl = document.getElementById(tableCtrl);
	
	if(tblCtrl != null)
	{
		tblCtrl.style.display = "none";
		tblCtrl.style.visibility = "hidden";	
	}
}

function HideEXW(tableCtrl,spcInstruction)
{	
	document.getElementById(spcInstruction).value="";
	document.getElementById(tableCtrl).style.display = "none";
	document.getElementById(tableCtrl).style.visibility = "hidden";		
}

function HideEmail(tableCtrl,email)
{			
	document.getElementById(email).value="";
	document.getElementById(tableCtrl).style.display = "none";
	document.getElementById(tableCtrl).style.visibility = "hidden";			
}