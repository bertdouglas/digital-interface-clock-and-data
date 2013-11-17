function VldResult(status, msg){
	this.status = status;
	this.message = msg;
}
function createRequest()
{
	try
	{
		try
		{
			request=new ActiveXObject("Msxml2.XMLHTTP");
			browserType='IE';
		}
		catch(othermicrosoft)
		{
			try
			{
				request=new ActiveXObject("Microsoft.XMLHTTP");
				browserType='IE';
			}
			catch(trymozilla)
			{
				request = new XMLHttpRequest();
				browserType='MOZ';
			}
		}
	}
	catch(failed)
	{
		request=null;
	}
	if (request == null) 
	{
		
	} 
	else 
	{
		return request;
	}
}

function getValidationResult(request){
	var XMLDoc = request.responseXML;
	var objStatus = XMLDoc.getElementsByTagName("status");
	var objErr = XMLDoc.getElementsByTagName("msg");
	var status, msg;
	if (browserType=="MOZ"){
			status = objStatus[0].textContent;
			msg = objErr[0].textContent;
	}
	else if (browserType == "IE"){
			status = objStatus[0].text;
			msg = objErr[0].text;
	}
	var res = new VldResult(status,msg);
	return res;
}

var dvMiniCartHolder = "";
var imgCartLoader;
var browserType;
var ajxRequest;
var spnCartCountId;
function LoadMiniCart(dvMiniCart, trLoadingImg, spnCartCount, mdROOT)
{ 
	imgCartLoader = document.getElementById(trLoadingImg)
	dvMiniCartHolder = window.document.getElementById(dvMiniCart);
	spnCartCountId = spnCartCount;
	try
	{	
		if(dvMiniCartHolder.innerHTML == "")
		{
			imgCartLoader.style.display = "Block";
			window.document.getElementById(spnCartCount).style.display = "None";	
			ajxRequest = createRequest();
			var url = ""
			if(mdROOT == null || mdROOT == "")		
				url = "ShoppingCartAjax.aspx?action=LoadCart";
			else
			{
				
			    if(document.location.href.indexOf("http://") != -1)
					mdROOT = mdROOT.replace("https://","http://");
				else if(document.location.href.indexOf("https://") != -1)
					mdROOT = mdROOT.replace("http://","https://")
	
				url = mdROOT + "/ShoppingCartAjax.aspx?action=LoadCart";
			}
			SendMiniCartRequest(ajxRequest, url);
		}
		else
		{
		    showCart('tblShoppingCart','Show');
		}
	}
	catch(exp)
	{
	  if(imgCartLoader)
		imgCartLoader.style.display = "None";
	  if(dvMiniCartHolder)
		dvMiniCartHolder.style.display = "None";
	  if(window.document.getElementById(spnCartCount))
		window.document.getElementById(spnCartCount).style.display = "block";
	}
}


function SendMiniCartRequest(ajxRequest, url)
{
	try
	{
		ajxRequest.onreadystatechange = FillMiniCart;
		
		var currentTime = new Date();
		var random = currentTime.getHours()+"" +currentTime.getMinutes()+currentTime.getSeconds();
					
		url += '&' + random;
		ajxRequest.open("GET", url, true);
		ajxRequest.send(null);
	}
	catch(exp)
	{}
}

function FillMiniCart()
{
	if(ajxRequest.readyState == 4 || ajxRequest.readyState=="complete")
	{
		if(ajxRequest.status == 200)
		{
			var xmlDoc = ajxRequest.responseXML;
			dvMiniCartHolder.innerHTML = xmlDoc.getElementsByTagName("MiniCartList")[0].firstChild.nodeValue;
			imgCartLoader.style.display="none";
			dvMiniCartHolder.style.display = "block";
			showCart('tblShoppingCart','Show'); 
			window.document.getElementById(spnCartCountId).style.display = "block";
		}
	}
}

var messageCtrl;
var imgProcesser;
function LoadFeeDescriptionMsg(feeCode, msgControl,imgProcessing)
{		
	imgProcesser = document.getElementById(imgProcessing)
	messageCtrl = msgControl; 
	try
	{
	xmlHTTP = createRequest();
	var URL = "AJAX.aspx?Action=specialFee&FeeCode=" + feeCode;
	SendSpecialFeeRequest(xmlHTTP, URL,msgControl);
	}
	catch(ex)
	{
		
		if(imgProcesser)
			imgProcesser.style.display="none";
	}
}


function SendSpecialFeeRequest(xmlHTTP, URL,messageCtrl)
{
	try
	{		
		xmlHTTP.onreadystatechange = FillFeeDescription;
		URL += '&' + Math.random();
		xmlHTTP.open("GET", URL, true);
		xmlHTTP.send(null);
	}
	catch(exp)
	{}
}

function FillFeeDescription()
{	
	if(xmlHTTP.readyState == 4 || xmlHTTP.readyState=="complete")
	{
		if(xmlHTTP.status == 200)
		{
			
			var xmlDoc = xmlHTTP.responseXML;
			var lblMessage = document.getElementById(messageCtrl);
			var message =xmlDoc.getElementsByTagName("message")[0].firstChild.nodeValue;			
			if(message!= "ERROR" || message!="")
			{
				lblMessage.style.display ="block";
				lblMessage.innerHTML=message;				
			}			
			else
				lblMessage.style.display ="none";
			
			imgProcesser.style.display="none";
		}
	}
}

function LoadHPAProductGrid(filter, phControl)
{		
	messageCtrl = phControl; 
	var URL
	try
	{
	
	  xmlHTTP = createRequest();	
	  URL = "HPAProductAjax.aspx?HPAFilter=" + filter;  
	 
	  SendHPARequest(xmlHTTP, URL,phControl);
	}
	catch(ex)
	{
	}
}

function LoadHPAContractGrid(filter, phControl)
{		
	messageCtrl = phControl; 
	var URL
	try
	{
	
	  xmlHTTP = createRequest();
	
	  URL = "HPAContractAjax.aspx?HPAFilter=" + filter;	
	 
	  SendHPARequest(xmlHTTP, URL,phControl);
	}
	catch(ex)
	{
	}
}


function SendHPARequest(xmlHTTP, URL,messageCtrl)
{
	try
	{		
		xmlHTTP.onreadystatechange = FillHPAGrid;
		
		URL += '&' + Math.random();
		xmlHTTP.open("GET", URL, true);
		xmlHTTP.send(null);
	}
	catch(exp)
	{}
}

function FillHPAGrid()
{	
	if(xmlHTTP.readyState == 4 || xmlHTTP.readyState=="complete")
	{
		if(xmlHTTP.status == 200)
		{
			var xmlDoc = xmlHTTP.responseXML;
			var lblMessage = document.getElementById(messageCtrl);
			var message =xmlDoc.getElementsByTagName("message")[0].firstChild.nodeValue;			
			if(message!= "ERROR" || message!="")
			{
				lblMessage.style.display ="block";
				lblMessage.innerHTML=message;		
				JT_initReady();		
			}			
			else
				lblMessage.style.display ="none";
		}
	}
}

function LoadProductChart(phControl,branchId,treeid)
{		
	
	messageCtrl = phControl; 
	var URL
	try
	{
	
	  xmlHTTP = createRequest();	
	  URL = "http://idc-srv-vayu/MCHPProductChart/ProductChartAjax.aspx?branchId=1009&mid=10&treeid=1" ;  
	 
	  SendChartRequest(xmlHTTP, URL,phControl);
	}
	catch(ex)
	{
		
	}
}

function SendChartRequest(xmlHTTP, URL,messageCtrl)
{
	try
	{		
	
		xmlHTTP.onreadystatechange = FillChartGrid;
		URL += '&' + Math.random();
		xmlHTTP.open("GET", URL, true);
		xmlHTTP.send(null);
	}
	catch(exp)
	{
		
	}
}

function FillChartGrid()
{	
	if(xmlHTTP.readyState == 4 || xmlHTTP.readyState=="complete")
	{
		if(xmlHTTP.status == 200)
		{
		
			var xmlDoc = xmlHTTP.responseXML;			
			var lblMessage = document.getElementById(messageCtrl);
			var message =xmlDoc.getElementsByTagName("message")[0].firstChild.nodeValue;			
			if(message!= "ERROR" || message!="")
			{
				lblMessage.style.display ="block";
				lblMessage.innerHTML=message;		
				
			}			
			else
				lblMessage.style.display ="none";
		}
	}
}