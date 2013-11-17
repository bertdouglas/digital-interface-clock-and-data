
function LaunchInCenter(url,h,w,opts)
{ 
	var height=h, width=w;
	var str = "height=" + height + ",innerHeight=" + height; 
	str += ",width=" + width + ",innerWidth=" + width + "," + opts; 
	if (window.screen)
	{ 
		var ah = screen.availHeight - 30; 
		var aw = screen.availWidth - 10; 
	
		var xc = (aw - width) / 2; 
		var yc = (ah - height) / 2; 
	
		str += ",left=" + xc + ",screenX=" + xc; 
		str += ",top=" + yc + ",screenY=" + yc;
		str += ",resizable=yes,scrollbars=yes"; 
		
	} 
	return window.open(url, '', str); 
	
}

function SearchMicrochip()
{
	if (document.forms[0].q.value.length > 0)
	{
	var str = "http://google.microchip.com/search?q=";
	str += document.forms[0].q.value;
	str += "&sa=Search+Microchip&restrict=English-Graphics&site=my_collection&client=my_collection&proxystylesheet=my_collection&output=xml_no_dtd";
	LaunchInCenter(str,600,800,"status=yes,toolbar=yes,menubar=no,location=no");
	}
}

function toggle(elemId){
		value=document.getElementById(elemId).style.display;
		value= (value=="") ? "none" : "";
		document.getElementById(elemId).style.display=value;
}

/****************************************************************************************************
	Added On	:	24th Aug 09
	Added By	:	Balaji.R
	Abstract	:	To load Programming Center left nav items on ProgParts.aspx page
*****************************************************************************************************/
/*********Code starts here********/
var browserType;
var pcLeftNav;
var ajxPCRequest;
var pcLoadImg;
function LoadPCLeftNav(dvPCLeftNav, dvPCLoadImg, pcURL)
{
	pcLeftNav = document.getElementById(dvPCLeftNav);
	pcLoadImg = document.getElementById(dvPCLoadImg);
	pcLoadImg.style.display = "block";
	if(pcLeftNav.innerHTML == "")
	{
		ajxPCRequest = CreatePCRequest();//new XMLHttpRequest();
		pcURL = pcURL + "mDLeftNav.aspx?action=mDRequest";
		if(document.location.href.indexOf("http://") != -1)
			pcURL = pcURL.replace("https://","http://");
		else if(document.location.href.indexOf("https://") != -1)
			pcURL = pcURL.replace("http://","https://")
		SendPCRequest(ajxPCRequest, pcURL);
	}
}

function CreatePCRequest()
{
	try
	{
		try
		{
			request = new ActiveXObject("Msxml2.XMLHTTP");//IE
			browserType ='IE';
		}
		catch(othermicrosoft)
		{
			try
			{
				request = new ActiveXObject("Microsoft.XMLHTTP");//IE
				browserType = 'IE';
			}
			catch(trymozilla)
			{
				request = new XMLHttpRequest();//Mozilla
				browserType = 'MOZ';
			}
		}
	}
	catch(failed)
	{
		request = null;
	}
	if (request == null) 
	{
		
	} 
	else 
	{
		return request;
	}
}

///Takes the httpRequest as an input parameter and sends the asynchronous request to the server
function SendPCRequest(ajxPCRequest, pcURL)
{
	try
	{
		ajxPCRequest.onreadystatechange = FillPC;
		//to avoid caching in browser,we need to trick the browser to believe that 
		//we are sending a different request every time
		pcURL += '&' + Math.random();
		ajxPCRequest.open("GET", pcURL, true);
		ajxPCRequest.send(null);
	}
	catch(exp)
	{}
}

function FillPC()
{
	if(ajxPCRequest.readyState == 4 || ajxPCRequest.readyState == "complete")
	{
		if(ajxPCRequest.status == 200)
		{
			//Get the XML response.
			var xmlDoc = ajxPCRequest.responseXML;
			//Parse the html inside xml and assign it to div control.
			pcLeftNav.innerHTML = xmlDoc.getElementsByTagName("PCMenu")[0].firstChild.nodeValue;
			pcLeftNav.style.display = "block";
			pcLoadImg.style.display = "none";
		}
	}
}
/*********Code ends here********/