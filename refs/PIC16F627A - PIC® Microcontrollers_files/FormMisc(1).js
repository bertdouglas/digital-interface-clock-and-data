//Opens a new window with the URL and options passed in
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
//Opens a new window with the URL and options passed in
function LaunchIt(url,h,w,opts)
{ 
	return window.open(url, '', 'left=10,top=10,width=800,height=500,toolbar=1,resizable=1,scrollbars=1,location=1'); 
	
}

function SetWarning(name)
{
 var e=document.getElementsByName(name);
 for(var i=0;i<e.length;i++)
 {
	e[i].style.visibility = "visible";
 }
}

/**************************** Global Search ***************************/
var MicroControllerPanel = document.getElementById("left_SearchResults_panel");
function closeGSbox()
{
	try
	{
		document.getElementById("globalSearch").style.visibility = "hidden";
		
		// This is added for the Microcontroller on 18 Jan 2008
		// added condition to avoid the bug when this is null
		if(document.getElementById("left_SearchResults_panel"))
			document.getElementById("left_SearchResults_panel").style.visibility = "visible";
		var hdnSpecEnable = document.getElementById("hdnSpecEnable");
		var hdnDevEnable = document.getElementById("hdnDevEnable");
		var hdnEnable = document.getElementById("hdnEnable");
		var hdnBPEnable = document.getElementById("hdnBPEnable");
		var hdnFeatures = document.getElementById("hdnFeatures");
		if(hdnSpecEnable.value == "2")
		{
			document.getElementById("dvSpecHolder").style.display = "block";
			document.getElementById("tblDevTools").style.display = "none";
			document.getElementById("dvTechDocHolder").style.display = "none";
			document.getElementById("tblTechDocs").style.display = "none";
			document.getElementById("dvBPHolder").style.display = "none";
			document.getElementById("tblShowOtherFeatures").style.visibility = "hidden";
		}
		else if(hdnDevEnable.value == "1")
		{
			document.getElementById("dvSpecHolder").style.display = "none";
			document.getElementById("tblDevTools").style.display = "block";
			document.getElementById("dvTechDocHolder").style.display = "none";
			document.getElementById("tblTechDocs").style.display = "none";
			document.getElementById("dvBPHolder").style.display = "none";
			document.getElementById("tblShowOtherFeatures").style.visibility = "hidden";
		}
		else if(hdnEnable.value == "0")
		{
			document.getElementById("dvTechDocHolder").style.display = "block";
			document.getElementById("tblTechDocs").style.display = "block";
			document.getElementById("dvSpecHolder").style.display = "none";
			document.getElementById("tblDevTools").style.display = "none";
			document.getElementById("dvBPHolder").style.display = "none";
			document.getElementById("tblShowOtherFeatures").style.visibility = "hidden";
		}
		else if(hdnBPEnable.value == "3")
		{
			document.getElementById("dvSpecHolder").style.display = "none";
			document.getElementById("tblDevTools").style.display = "none";
			document.getElementById("dvTechDocHolder").style.display = "none";
			document.getElementById("tblTechDocs").style.display = "none";
			document.getElementById("dvBPHolder").style.display = "block";
			document.getElementById("tblShowOtherFeatures").style.visibility = "hidden";
		}
		else if(hdnFeatures.value == "4")
		{
			document.getElementById("dvSpecHolder").style.display = "block";
			document.getElementById("tblDevTools").style.display = "none";
			document.getElementById("dvTechDocHolder").style.display = "none";
			document.getElementById("tblTechDocs").style.display = "none";
			document.getElementById("dvBPHolder").style.display = "none";
			document.getElementById("tblShowOtherFeatures").style.visibility = "visible";
		}				
	}
	catch(e)
	{
		//alert(e.description);
	}
}

function showGSbox()
{	
	try
	{	// This is common for all pages
		document.getElementById("globalSearch").style.visibility = "visible"; 
		//document.getElementById("globalSearch").style.display = "block"; 
	
		// This is added for the Microcontroller on 18 Jan 2008
		// added condition to avoid the bug when this is null	
		//alert(document.getElementById("left_SearchResults_panel"));
		if( document.getElementById("left_SearchResults_panel"))
			document.getElementById("left_SearchResults_panel").style.visibility = "hidden";
			//document.getElementById("left_SearchResults_panel").style.display = "none";
			document.getElementById("dvSpecHolder").style.display = "none";
			document.getElementById("tblDevTools").style.display = "none";
			document.getElementById("dvTechDocHolder").style.display = "none";
			document.getElementById("tblTechDocs").style.display = "none";
			document.getElementById("dvBPHolder").style.display = "none";
			document.getElementById("tblShowOtherFeatures").style.visibility = "hidden";
		
	}
	catch(e)
	{
		//alert(e.description);
	}
}

function doSearch()
{
	var mask = document.getElementById("gsMask");
	
	var results = document.getElementById("gsResults");
	results.style.display = "";
	
	// This is for Search2_Old.aspx page
	//results.src = "GlobalPartSearch.aspx?globalsearch=" + mask.value;
	
	// This is for Microcontroller.aspx page on 18th Jan 2008
	results.src = "GlobalPartSearch_new.aspx?globalsearch=" + mask.value;
	
}

function doSearchOnCondition(e)	//e is event object passed from function invocation
{ 
	var characterCode = (window.event)? event.keyCode : e.which; //literal character code will be stored in this variable

	
	if(characterCode == 13)//if generated character code is equal to ascii 13 (if enter key)
	{ 
		doSearch();
			
		if(navigator.appName == "Microsoft Internet Explorer")
		{
			event.keyCode = 0;
        }
	
	    return false;
    }
    
}

function HideDisclaimer()
{
	// To hide the Desclaimer in Main.aspx page	
	parent.document.getElementById("iframeDesclaimer").style.visibility = "hidden";	
}

function ShowDesclaimer()
{
	// Show the Desclaimer in the iframe	
	parent.document.getElementById("iframeDesclaimer").style.visibility = "visible";	
}


