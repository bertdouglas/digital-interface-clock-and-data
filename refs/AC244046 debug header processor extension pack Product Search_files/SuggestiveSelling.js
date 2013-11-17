
var browserType;		
var request; 
var AnsCnt;
var expandMenu =false;

function SaveCustomerFeedBack(clntIDOptionYes,clntIDOptionNo,clntIDOptionSomewhat,productID,
							  clntIDComment,clntIDErrorMsg,clntIDSubmit,userGuid,msgSuccess,msgFailure)
{
	try
	{	
	
		var CheckFlag =false;
		var AnsValues, Answers,customerComment,Comment,ErrorMsg,Submit;
		
		Comment  = document.getElementById(clntIDComment);
		ErrorMsg  = document.getElementById(clntIDErrorMsg);
		Submit  = document.getElementById(clntIDSubmit);
		
			customerComment = Comment.value;
			Answers = document.getElementById(clntIDOptionYes);
			if (Answers.type == "radio" && Answers.checked == true)
			{
				CheckFlag = true;
				AnsValues = "YES";
			}
			Answers = document.getElementById(clntIDOptionNo);
			if (Answers.type == "radio" && Answers.checked == true)
			{
				CheckFlag = true;
				AnsValues = "NO";
			}
			Answers = document.getElementById(clntIDOptionSomewhat);
			if (Answers.type == "radio" && Answers.checked == true)
			{
				CheckFlag = true;
				AnsValues = "SOMEWHAT";
			}
		
		if(CheckFlag == true)
		{
			Comment.disabled=true;
			Answers = document.getElementById(clntIDOptionYes);
			Answers.disabled=true;
			Answers = document.getElementById(clntIDOptionNo);
			Answers.disabled=true;
			Answers = document.getElementById(clntIDOptionSomewhat);
			Answers.disabled=true;
			request = createRequest();
			var ajxURL = "AJAX.aspx?Action=feedback&userGuid=" +userGuid + "&productID=" + productID + "&selectedOption=" + AnsValues + "&customerComment=" + customerComment;
			SendRequest(request, ajxURL);
			ErrorMsg.style.color="";
			ErrorMsg.className = "NormalGreen";
			ErrorMsg.innerHTML =msgSuccess+"<br>";
			Submit.disabled=true;
		}else
		{
			ErrorMsg.className = "NormalText";
			ErrorMsg.style.color="red";
			ErrorMsg.innerHTML =msgFailure+"<br>";
		}
	}
	catch(ex){
	}
}

function SaveSuggestiveServiceSurvey(primaryDeviceFamily,secondaryDeviceFamily,clntIDRdoRating,clntIDlblErrorMsg)
{
	try{
		var i, CheckFlag = false;
		var RatingValues, Rating;
		
		for (i=0; i <5; i++)
		{
			Rating = clntIDRdoRating + "_" + i;
			Rating = document.getElementById(Rating);
			
			if (Rating.type == "radio" && Rating.checked == true)
			{
				CheckFlag = true;
				RatingValues = Rating.value;
			}
		}
		
		if(CheckFlag == true)
		{
			request = createRequest();
			var ajxURL = "AJAX.aspx?Action=survey&primaryDeviceFamily=" + primaryDeviceFamily + "&secondaryDeviceFamily=" + secondaryDeviceFamily + "&Rating=" + RatingValues;
			SendRequest(request, ajxURL);
			
			for (i=0; i <5; i++)
			{
				Rating = clntIDRdoRating + "_" + i;
				Rating = document.getElementById(Rating);
				Rating.disabled=true;
			}
		}
		
	}
	catch(ex){}
	
}

function SendRequest(request, ajxURL)
{
	try
	{
		ajxURL += '&' + Math.random(); 
		request.open("GET", ajxURL, true);
		request.send(null);
	}
	catch(exp)
	{
	}
}

function MakeControlVisible(clntIDOption,clntIDCommentRow)
{
	var  Answers,CommentRow;
	try
	{
			CommentRow  = document.getElementById(clntIDCommentRow);
			Answers = document.getElementById(clntIDOption);
			if (Answers.type == "radio" && Answers.checked == true)
				CommentRow.style.display = "block";		
			else
				CommentRow.style.display = "none";
	}
	catch(exp)
	{
	 
	}
}
function MakeControlInvisbleVisible(clntIDCommentRow)
{
	var  CommentRow;
	try
	{
			CommentRow  = document.getElementById(clntIDCommentRow);			
			CommentRow.style.display = "none";
	}
	catch(exp)
	{
	 
	}
}
function ClearControl(clntIDControl)
{
	try
	{
		document.getElementById(clntIDControl).value ="";
	}
	catch(exp){}
}

function LoadControlText(clntIDControl,textForDispay)
{
	try
	{
		document.getElementById(clntIDControl).value = textForDispay;
	}
	catch(exp){}
}

function ToggleControlDisplay(clntIDControl,clntIDImage)
{

	var menuOptionId =1;
	var menuHeaderCntrl;
	var menuHeaderCntrlId;
	
	var menuContent;
	var  numOfTabs;
	
	var menuOptionCntlId  = "Uc_TopNav_CrossSelling1_menuOptionId"
	
	var arrowControlId    = "Uc_TopNav_CrossSelling1_trNavSectCSub2"
						
	var  Control,ctrlBtnImage;
	try
	{	
			menuContent  = document.getElementById("Uc_TopNav_CrossSelling1_trControl");
			numOfTabs = document.getElementById("Uc_TopNav_CrossSelling1_numOfTabs");
	
			if(document.getElementById(menuOptionCntlId))
				menuOptionId = document.getElementById(menuOptionCntlId).value;
			
			menuHeaderCntrlId	= "Uc_TopNav_CrossSelling1_tcNavSub" + menuOptionId;
			
			menuHeaderCntrl		= document.getElementById(menuHeaderCntrlId)
			
			Control  = document.getElementById(clntIDControl);
			
			ctrlBtnImage = document.getElementById(clntIDImage);
			
			if(Control.style.display=='block')
			{	
				Control.style.display ="none";
				ctrlBtnImage.src="Images/expand.GIF";
				menuHeaderCntrl.className = "SuggestionServiceHeaderInActive";
				menuContent.className = "";
				if(menuOptionId == numOfTabs.value || menuOptionId ==3)
					document.getElementById(arrowControlId).className = "SuggestionServiceHeaderInActive";
				
			} 
			else
			{
				Control.style.display ="block";
				ctrlBtnImage.src="Images/collapse.GIF";
				menuHeaderCntrl.className = "SuggestionServiceHeaderActive";
				if(menuOptionId == numOfTabs.value  || menuOptionId ==3)
					document.getElementById(arrowControlId).className = "SuggestionServiceHeaderActive";
			}			
	}
	catch(exp)
	{
	 
	} 
}

function ToggleSuggestionDisplay(clntIDControlProdLineList,clntIDControlSuggList,clntIDImage)
{
	var  Control,ctrlBtnImage,ControlProdLine;
	
	try
	{
			Control  = document.getElementById(clntIDControlSuggList);
			ControlProdLine  = document.getElementById(clntIDControlProdLineList);
			ctrlBtnImage = document.getElementById(clntIDImage);
			if(Control.style.display =='block')
			{	
				Control.style.display ="none";
				ControlProdLine.style.display ="block";
				ctrlBtnImage.src="Images/expand.GIF";				
			}
			else
			{		
				Control.style.display ="block";
				ControlProdLine.style.display ="none";
				ctrlBtnImage.src="Images/collapse.GIF";
			}			
	}
	catch(exp)
	{
	 
	}
}


function ChangeMenu(mnuControlId, keepExpanded)
{
	var childControl;
	var parentControl;
	var menuLink;
	var numOfTabs;
	var imgArrowPHId;
	try
	{
	imgArrowPHId = "Uc_TopNav_CrossSelling1_trNavSectCSub2"
	
	document.getElementById(imgArrowPHId).className = "SuggestionServiceHeaderInActive";
	
	numOfTabs = document.getElementById("Uc_TopNav_CrossSelling1_numOfTabs");	
	for (i=1; i <=3; i++)
		{		
			childControl	= "Uc_TopNav_CrossSelling1_mnuControlTab" + i;
			parentControl	= "Uc_TopNav_CrossSelling1_tcNavSub" + i;
			
			childControl	=  document.getElementById(childControl);		
			parentControl	=  document.getElementById(parentControl);						
			
			parentControl.className = "SuggestionServiceHeaderInActive";
							
			if (i == mnuControlId)
			{	
				
				childControl.style.display ="block";
				
				document.getElementById("Uc_TopNav_CrossSelling1_menuOptionId").value = mnuControlId;
				
				if(keepExpanded)
				{			
			 		parentControl.className = "SuggestionServiceHeaderActive";
					var Control  = document.getElementById("Uc_TopNav_CrossSelling1_trControl");
					var ctrlBtnImage = document.getElementById("Uc_TopNav_CrossSelling1_imgBtnControl");
					ctrlBtnImage.src="Images/collapse.GIF";
					Control.style.display ="block";
				if(mnuControlId == numOfTabs.value)
					document.getElementById(imgArrowPHId).className = "SuggestionServiceHeaderActive";				
			   }
			}
			else
			{
				childControl.style.display ="none";
				parentControl.className = "SuggestionServiceHeaderInActive";
			}
			
			if(mnuControlId==3)
				document.getElementById(imgArrowPHId).className = "SuggestionServiceHeaderActive";				
		}
		
	}
	catch(exp)
	{
	 
	}
}


var dv = "";
var BrowserType;
var xmlhttp;
var phLoadingImg;

function LoadSuggestions(dvCrossSelling, phLoadingImage, productCPN, expand, isCartItem)
{  
	phLoadingImg = document.getElementById(phLoadingImage)
	dv = window.document.getElementById(dvCrossSelling);
	
	expandMenu = expand;
	try
	{		
		xmlhttp = CreateRequest();
		var url = "SuggestiveSellingAjax.aspx?OP=LOAD&CPN=" + productCPN + "&expand=" + expand + "&isCartItem=" + isCartItem;
		SendCSRequest(xmlhttp, url); 
	}
	catch(exp)
	{
	  if(phLoadingImg)
		phLoadingImg.style.display ="None";
	  if(dv)
		dv.style.display ="None";
	}
}

function FillSuggestionList()
{
	if(xmlhttp.readyState == 4 || xmlhttp.readyState=="complete")
	{
		if(xmlhttp.status == 200)
		{
			var xmlDoc = xmlhttp.responseXML;
			dv.innerHTML = xmlDoc.getElementsByTagName("SuggestionList")[0].firstChild.nodeValue;
			
			phLoadingImg.style.display="none";
			
			if(expandMenu == 'True' || expandMenu =='true' || expandMenu == 'TRUE')
				expandMenu = true;
			else
				expandMenu =false;
			if(document.getElementById("Uc_TopNav_CrossSelling1_menuOptionId"))
				ChangeMenu(document.getElementById("Uc_TopNav_CrossSelling1_menuOptionId").value,expandMenu);
			
			ShowAssociateProdLink();
			
		}
	}
}

function CreateRequest()
{
	try
	{
		try
		{
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
			BrowserType = 'IE';
		}
		catch(othermicrosoft)
		{
			try
			{
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				BrowserType = 'IE';
			}
			catch(trymozilla)
			{
				xmlhttp = new XMLHttpRequest();
				BrowserType = 'MOZ';
			}
		}
	}
	catch(failed)
	{
		xmlhttp = null;
	}
	if (xmlhttp == null) 
	{
		
	} 
	else 
	{
		return xmlhttp;
	}
}


function SendCSRequest(xmlhttp, url)
{
	try
	{
		xmlhttp.onreadystatechange = FillSuggestionList;
		url += '&' + Math.random();
		xmlhttp.open("GET", url, true);
		xmlhttp.send(null);
	}
	catch(exp)
	{}
}

function SendNormalRequest(xmlhttp, url)
{
	try
	{
		xmlhttp.open("GET", url, true);
		xmlhttp.send(null);
	}
	catch(exp)
	{}
}

function UpdateSuggestedPartClickCount(pyDeviceFamily, sgDeviceFamily, mID)
{
	var url = "SuggestiveSellingAjax.aspx?OP=UPD&pyDeviceFamily=" + pyDeviceFamily + "&sgDeviceFamily=" + sgDeviceFamily;
	xmlhttp = CreateRequest();
	SendNormalRequest(xmlhttp, url);
}

function HighlightSuggestionMenu(mnuControlId,action)
{
	var menuLink;
	try
	{
	for (i=1; i <=3; i++)
		{	
			menuLink		= "Uc_TopNav_CrossSelling1_lbTop" + i;						
			menuLink		=  document.getElementById(menuLink);					
			if (i == mnuControlId  && action =='onmouseover')
					menuLink.className="CrossSellTabMouseOver";
			if (i == mnuControlId && action =='onmouseout')
					menuLink.className="CrossSellTabMouseOut";
		}
	
	}
	catch(exp)
	{
	}
}

function ToggleSuggestionBox(dvCrossSelling, lnkSuggestion, txtViewSuggestion, txtHideSuggestion, keepBoxExpanded)
{
	try
	{
		var dvCS = document.getElementById(dvCrossSelling);
		var lnkCS = document.getElementById(lnkSuggestion);
		if(dvCS.style.display == "none" || (dvCS.style.display == "none" && keepBoxExpanded))
		{
			dvCS.style.display = "block";
			lnkCS.innerHTML = txtHideSuggestion;
			
			if(document.getElementById("Uc_TopNav_CrossSelling1_menuOptionId"))
					ChangeMenu(document.getElementById("Uc_TopNav_CrossSelling1_menuOptionId").value,true);
			
		}
		else
		{
			dvCS.style.display = "none";
			lnkCS.innerHTML = txtViewSuggestion;
		}
	}
	catch(exp)
	{
	}
}

function ShowAssociateProdLink()
{
	try
	{
		var numOfTabs = document.getElementById("Uc_TopNav_CrossSelling1_numOfTabs");
		var lnkControl = document.getElementById("lnkSuggestion");
		
		if(numOfTabs != null && numOfTabs.value >=1)
			lnkControl.style.display = "block";
		
	}
	catch(exp)
	{
	}
}

function ShowTopNavAssociateProdLink()
{
 var suggestionExists;
 try
	{
			suggestionExists = readCookie("SuggestiveSelling");
			
			if(suggestionExists != null && suggestionExists == 'YES')
				document.getElementById("Uc_TopNav1_hypRelProd").style.display ="block";
	}
 catch(exp)
	{
	}
}