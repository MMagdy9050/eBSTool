

//
if(localStorage.device&&localStorage.Lan){
	 $(".deviceimage").attr("src", "img/" + localStorage.device + localStorage.Lan + ".png");
	 var Tablet= (localStorage.device =='T')?true:false;
	 $('.buttonL input').prop('checked', Tablet);
	 var LangNow =(localStorage.Lan=="A")?true:false;
	 $('.buttonR input').prop('checked', LangNow);
	 ($('.buttonL input').is(":checked")) ? $('.BKIM').addClass("Tab"): $('.BKIM').removeClass('Tab');
}
	
// Function in load
GetAllDataFromStorage();
DrawMenu();
DrawShortUrlMenu();
HandleClickMenu("FristTime");


$('.Model input').on( "change",CheckModel);
$('#reset').on('click',resetApp);
$('.appendHere').on("click", ".ButtonMeuno",function(e) {HandleClickMenu(e);});
$('.tags').on("click",".OpenUrlButton",function (e) {HandleClickToOpenVirgin(e);});
$('.Footer').on("click",'.awesome',function(e) {HandelShortLinkeButtons(e);});
$('#AddNewShortUrl').on("click",AddOrEditShortUrl);


function AddOrEditShortUrl(){
	window.location.hash = "#EditShortUrl"
	window.location.pathname = "/ListLinke.html";
}

function DrawShortUrlMenu(){
	var xml = GetXmlFromServer('ShortUrl');
	
	var HTMLToAppend = "";
	$(xml).find('url').each(function(index){
		
		HTMLToAppend  +=" <a class='awesome "+$(this).attr('color')+"'>"+ $(this).attr('name')+" </a> ";
		
	})
  
		 
		 $("#appendHereShortUrl").append(HTMLToAppend);	
	
}


var Res = 0;
function resetApp(){
	if(Res>=7 ){
		 chrome.storage.local.clear(function() {
    var error = chrome.runtime.lastError;
	
    if (error) {
        console.error(error);
		
		
    }else{
		localStorage.clear();
	   location.reload();
	}
});
	}else{
		Res++;
		$('#reset').text('reset ('+(7-Res)+')');
	}
	


}


// handel click open simletor link
function HandleClickToOpenVirgin(e){	
	var ProjectName = e.currentTarget.attributes[1].nodeValue;
	var ModuleVer = e.currentTarget.attributes[2].nodeValue;
	var ModuleName = e.currentTarget.childNodes[0].textContent;
	var device = ($('.buttonL input').is(":checked")) ? "T" : "M";
    var Lan = ($('.buttonR input').is(":checked")) ? "A" : "E";
	var LinkeToOpen ="";
	
	var xml = GetXmlFromServer('AllURL');
	
	LinkeToOpen=$(xml).find("Proj[name='"+ProjectName+"']  v[name='"+ModuleVer+"']  vc[name='"+ModuleName+"'] "+device+Lan+" ").text();
			if (LinkeToOpen) {
                ExcCode('window.location ="' + LinkeToOpen + '";');
							 }
	
}

// handel click Menu 
function HandleClickMenu(e){
	
	
	var ModuoleName,ModuleVerg;
	var MenuHTML = "";
	var nameM;
	
	if(e=="FristTime"){
		ModuoleName =localStorage.ModuoleName;
		ModuleVerg =localStorage.ModuleVerg;
	}else{
		ModuoleName =	e.currentTarget.name;
		ModuleVerg =e.currentTarget.outerText;
		localStorage.setItem("ModuoleName",e.currentTarget.name);
		localStorage.setItem("ModuleVerg",e.currentTarget.outerText);
		}

	$('.Titel').text(ModuoleName);
	
	var xml = GetXmlFromServer('AllURL');	
		$(xml).find("Proj[name='"+ModuoleName+"']  v[name='"+ModuleVerg+"']").each(
		function(){
			$(".tags").removeClass("green").removeClass("blue").addClass( $(this).attr('Color'));
			 
			$(this).find('vc').each(function(Name){
					MenuHTML +="<li><a  class='OpenUrlButton' ModuoleName='"+ModuoleName+"' ModuleVerg='"+ModuleVerg+"' >"+$(this).attr('name')+"<span>"+ModuleVerg+"</span></a></li>";
					})
			
				})
			 $(".tags").empty();
             $(".tags").append(MenuHTML);
			 
}

// To Draw Menu 
function DrawMenu(){
	if(!isCashed){
		setTimeout(DrawMenu, 50);
		return
	}

	var xml = GetXmlFromServer('AllURL');	
	var MenuHTML = "";
	var Buttons = xml.getElementsByTagName("Proj");

	for (i = 0; i < Buttons.length; i++) { 
			MenuHTML += "<li><a href='#'>"+Buttons[i].getAttribute('name')+"</a><ul>";
			var SupButton = Buttons[i].getElementsByTagName("v");
			for (j = 0; j < SupButton.length; j++) {
					MenuHTML += "<li><a Class='ButtonMeuno' Name='"+Buttons[i].getAttribute('name')+"'>"+SupButton[j].getAttribute('name')+"</a></li>";
					}
			MenuHTML += "</ul></li> ";			   
		}	
	MenuHTML +="<li><a href='List.html#MainList'>Add/Edit</a></li>";		   
	$(".appendHere").append(MenuHTML);	

	
	
 }
		   
// Handel ShortLinke Buttons 
function HandelShortLinkeButtons(e){
	
    if (HandelSaveButton(e))
			return

	var xml = GetXmlFromServer('ShortUrl');
    var URLL = $(xml).find("url[name = '"+e.currentTarget.innerText+"']");
            if (URLL) {
                ExcCode('window.location ="' + URLL[0].textContent + '";');
            }
	}

// To check the module and change icon device
function CheckModel(){
    var device = ($('.buttonL input').is(":checked")) ? "T" : "M";
    var Lan = ($('.buttonR input').is(":checked")) ? "A" : "E";
    $(".deviceimage").attr("src", "img/" + device + Lan + ".png");
	
	localStorage.setItem('device',device);
	localStorage.setItem('Lan',Lan);
	
    // BackGround Device 
    ($('.buttonL input').is(":checked")) ? $('.BKIM').addClass("Tab"): $('.BKIM').removeClass('Tab');
}

// To Call carent Tab and Excut JS
function ExcCode(Cod){
    chrome.tabs.query({active: true,currentWindow: true}, function(tabs) {
        var code = Cod.toString();
        chrome.tabs.executeScript(tabs[0].id, {code: code});
    });
}

// Handel Save Button
function HandelSaveButton(e){

    var AllCode = "";

    switch (e.currentTarget.innerText.toString()) {

        case "localStorage":

            AllCode = "location.href='javascript:localStorage.clear();localStorage.clear();localStorage.clear();location.reload(true)'";
			break
			 case "HideloadSpinner":

            AllCode = 'location.href="javascript:HideLoadingSpinner()"';
			

    }
    if (AllCode) {
        ExcCode(AllCode);
        return true

    } else {
        return false
    }


}