

var WidgetName = window.location.hash.replace('#', '');
HandleTitle();
var isclickSetting = false;
var SaveXML = false;

DrawListMenu();
var orgName='';


if(WidgetName=='MainList'){
	$('body').css('paddingBottom', '0');
	$('.XmlButtondiv').hide();
	var xml = GetXmlFromServer('AllURL');
	$('.AllXML').val((new XMLSerializer()).serializeToString(xml));
	
}else{
	$('.Footer').hide();
}

$('.AllXML').one('click',showHideButton);
$('.XmlSelectAll').on('click',SelectAll);
$('.AllXML').on("input propertychange",validateXML);
$('.XmlSave').on('click',SaveXMLNow);
$('#HomeButton').on('click',OpenHomePage);
$('body').on('click','.add',addButton);
$('body').on('click','#Moduleclick',function(e){Moduleclick(e);});
$('body').on('click','.box .settingIcon',settingIconClick);
$('body').on('click','.eButton',Save);
$("body").on(' keypress keydown keyup' ,"input[name='Mname']" ,function(e){ 
  if (e.keyCode == 32) return false;
				$('.sEdite').prevAll('p').text($("input[name='Mname']").val()) });
$('body').on('mouseleave' ,'.box',function(){
	 $(".shadow" ).animate({top: "-100"}, 500 ,function(){
	 $('.shadow').remove();
		 });
});
$("body").on('click','#DeleteNow',function(e){DeleteNow(e)});


function HandleTitle(){
	
	
	
	switch (WidgetName) {

        case "MainList":

		$('#Project').addClass('current');
           
						break
			
			 case "List":
			 $('#Version').addClass('current');
			$('#Project a').on('click',function(){BackFunc('#MainList')});// href='List.html#MainList
			 $('#Project').addClass('cursor');
						break
			 case "SupList":
			 $('#Module').addClass('current');
			 $('#Project').on('click',function(){BackFunc('#MainList')});// href='List.html#MainList
			 $('#Project').addClass('cursor');
			$('#Version').on('click',function(){BackFunc('#List')});// href='List.html#MainList
			$('#Version').addClass('cursor') ;
			// $('#Project a').attr('href','List.html#MainList');
			// $('#Version a').attr('href','List.html#List');
					break	
			 
			

    }
	
	
	
}

function BackFunc(url){
	
	window.location.hash=url;
	   location.reload();
}

function SaveXMLNow(){
	if(!SaveXML)
		return
			chrome.storage.local.set({'AllURL': $('.AllXML').val()},function(item){
			localStorage.setItem('AllURL',$('.AllXML').val());
			window.location.reload();
			});
	
}

function validateXML(){
	

var parser=new DOMParser();
var text=$('.AllXML').val();
var xmlDoc=parser.parseFromString(text,"text/xml");

if (xmlDoc.getElementsByTagName("parsererror").length>0)
    {
		SaveXML = false;
  $('legend').css('color','#a92b2b');
   $('.AllXML').css('color','#a92b2b');
   $('legend').text('XML Is Not Valid !!');
    }
  else
    {
  SaveXML = true;
   $('.AllXML').css('color','#FFF');
   if($('legend').text()=='XML Is Not Valid !!'){
   $('legend').text('XML Is Valid :)');
    $('legend').css('color','green');
   }
    }
  

}

function showHideButton(){
	$('fieldset').animate({marginRight:'64px'},1000);
	$('.XmlButtondiv').show(1000);
	
}

function SelectAll(){
	$('textarea').select();
}

function Save (){
	var NewNAme = $("input[name='Mname']").val();
	if(!NewNAme){
		alert('Name is not valid ! :) ');
	return
	}
	
	
	var xml = GetXmlFromServer('AllURL');	
			
		var nameM;
		if(WidgetName=='MainList'){
			
			if($('.AddNew').is(':visible')){
				$($(xml).find("AllMenu")).append("<Proj name='"+NewNAme+"'></Proj>");
			}else{
		$(xml).find("Proj[name='"+orgName+"'] ").each(function(){
			$(this).attr('name' , NewNAme);
				})
		
		
		}}else if(WidgetName=='SupList'){
			if($('.AddNew').is(':visible')){
				
				$($(xml).find("Proj[name='"+localStorage.ProjName+"'] v[name='"+localStorage.VergName+"']")).append("<vc name='"+NewNAme+"'><ME></ME><MA></MA><TE></TE><TA></TA></vc>");
			}else{
			
					
				$(xml).find(" Proj[name='"+localStorage.ProjName+"'] v[name='"+localStorage.VergName+"'] vc[name='"+orgName+"']").each(function(){
			$(this).attr('name' , NewNAme);
				});
			
			
			
			
		}}else{
			
			if($('.AddNew').is(':visible')){
				$($(xml).find("Proj[name='"+localStorage.ProjName+"']")).append("<v Color='' name='"+NewNAme+"'></v>");
			}else{
			
					
				$(xml).find(" Proj[name='"+localStorage.ProjName+"'] v[name='"+orgName+"']").each(function(){
			$(this).attr('name' , NewNAme);
				});
				
			
		}}
			

			chrome.storage.local.set({'AllURL': (new XMLSerializer()).serializeToString(xml)},function(item){
			localStorage.setItem('AllURL',(new XMLSerializer()).serializeToString(xml))
			DoneAnimet();
});
			 
	
}

function DoneAnimet(){

$('.eButton span').remove();
$(".eButton" ).animate({
    width: '31%',
    height: '31%',
    left: '30px'

}, 500 ,function(){
		
		$(".eButton").append("<img src='img/done.png' class='doneIcon'/>").show('slow');
		$(".sEdite input ").attr('disabled','disabled');
	
	
	$(".sEdite" ).animate({opacity: "0"}, 1000 ,function(){
	$('.sEdite').remove();});



	});


}

function SettingClick(test){
	
	var _html = "<div class='shadow'> "+
				"<h6>Edit Name</h6>"+
				"<div class='Line'></div>"+
				"<h6> Delete </h6>"+
				"</div>";
				
	 $(test).before(_html).show('slow');
	
	
}

function DrawListMenu(){
	var ListHTML = "";
	var MenuHTML = "";
		var xml = GetXmlFromServer('AllURL');	
		
		if (WidgetName=='MainList'){
		 var Buttons =// xml.getElementsByTagName("Proj");
		 $(xml).find("Proj");
		
		}else if(WidgetName=='SupList'){
				 var Buttons = $(xml).find(" Proj[name='"+localStorage.ProjName+"'] v[name='"+localStorage.VergName+"'] vc");	
			
		}else{
		
			 var Buttons = $(xml).find(" Proj[name='"+localStorage.ProjName+"'] v");	
		}	
			for (i = 0; i < Buttons.length; i++) { 
				  MenuHTML += "<div id='Moduleclick' class='box Color"+(Math.floor(Math.random() * 8) + 1 )+"'> "+
				  "<p>"+Buttons[i].getAttribute('name')+"</p>"+
				  "<img class='settingIcon' src='img/setting.png'/>"+
				 " </div>";   
					   }

		    $(".AppendListHere").append(MenuHTML);  
}
		
function GoTo(){
	
	
	
	

	switch(window.location.hash) {
    case "#List":
       window.location.hash="#SupList";
	   location.reload();
        break;
	 case "#SupList":
		window.location.hash = "#ModulesUrls"
		window.location.pathname = "/ListLinke.html";
		break;	 
    default:
       		window.location.hash="#List";
			location.reload();
}
	

	
	
}

function addButton(){
	
	if($('.AddNew').is(':visible'))
		return
	 var NewMenuHTML = "<div id='Moduleclick' class='box Color"+(Math.floor(Math.random() * 8) + 1 )+"'> "+
				  "<p>New</p>"+
				 " <div class='sEdite'> "+
				"<input type='text' name='Mname'>"+
				"<div class='eButton AddNew'><span> Save </span></div>"+
				"</div>"+
				  "<img class='settingIcon' src='img/setting.png'/>"+
				 " </div>";
				var $Self =  $(".AppendListHere").append(NewMenuHTML); 
				$("input[name='Mname']").val('New');
				$('.sEdite').fadeIn( "slow" );
			
				
				
	}
	
function DeleteNow(e){

	var xml = GetXmlFromServer('AllURL');	
	var orgName = $('.sEdite').prevAll('p')[0].innerText;
	if(WidgetName=='MainList'){
		$(xml).find("Proj[name='"+orgName+"'] ").remove();
	}else if(WidgetName=='SupList'){
		$(xml).find(" Proj[name='"+localStorage.ProjName+"'] v[name='"+localStorage.VergName+"'] vc[name='"+orgName+"']").remove();
	}else{
	
			$(xml).find(" Proj[name='"+localStorage.ProjName+"'] v[name='"+orgName+"']").remove();
	}
	
			chrome.storage.local.set({'AllURL': (new XMLSerializer()).serializeToString(xml)},function(item){
			localStorage.setItem('AllURL',(new XMLSerializer()).serializeToString(xml));});
			DoneAnimet();
			
			
			
			$('.sEdite').parent().animate({opacity: "0"}, 1000 ,function(){
			$('.sEdite').parent().remove();
			});

}	

function Moduleclick(e){
		if(isclickSetting || $('.shadow').is(":visible") || $('.sEdite').is(":visible")){
		isclickSetting = false;
		return
		}
	if(WidgetName=='List'){
		localStorage.setItem("VergName",e.currentTarget.textContent.replace(/\s/g,''));
		}
		else if(WidgetName=='SupList'){
			localStorage.setItem("ModuleName",e.currentTarget.textContent.replace(/\s/g,''));
			
		}else{
		localStorage.setItem("ProjName",e.currentTarget.textContent.replace(/\s/g,''));
		}
		GoTo(e);
	
}

function settingIconClick(){
		isclickSetting = true;
	_self =this;
	
	
	$(".sEdite" ).animate({opacity: "0"}, 500 ,function(){
		
		$(this).prevAll('p').text(orgName);
	$('.sEdite').remove();
	
	
	}
	);
	var _html = "<div class='shadow'> "+
				"<h6 class='EditName'>Edit Name</h6>"+
				"<div class='Line'></div>"+
				"<h6 class='DeleteM'> Delete </h6>"+
				"</div>";
				
				
	 $(this).before(_html);
	 
	 $( ".shadow" ).animate({top: 0}, 500);
	 
	 
		$('.DeleteM').on('click',function(){
				var _html = "<div class='sEdite'> "+
							"<span class='AttIcon'>!</span>"+
							"<p class='deleteAlertT'>Are You Sure to delete All Module</p>"+
							"<div id='DeleteNow' class='eButtonYes'><span> Yes </span></div>"+
							"<div class='eButtonYes No'><span> No </span></div>"+
							"</div>";
		$(".shadow" ).animate({opacity: "0"}, 500 ,function(){
			$('.shadow').remove();
			$(_self).before(_html);
			$('.sEdite').fadeIn( "slow" );
			$('.sEdite .No').on('click',function(){
				$(".sEdite" ).animate({opacity: "0"}, 1000 ,function(){
				$('.sEdite').remove();});
			   });
			});
		 });

	 $('.EditName').on('click',function(){
	var _html = "<div class='sEdite'> "+
				"<input type='text' name='Mname'>"+
				"<div class='eButton'><span> Save </span></div>"+
			"</div>";
			$(".shadow" ).animate({opacity: "0"}, 500 ,function(){
			$('.shadow').remove();
			$(_self).before(_html);
			orgName=$(_self).prevAll('p').text();
			$("input[name='Mname']").val(orgName);
			$('.sEdite').fadeIn( "slow" );
			//$("input[name='Mname']").on(' keypress keydown keyup' ,function(){ 
			//orgName
			//$(_self).prevAll('p').text($("input[name='Mname']").val()) });
		 
		 });
			
		
			
})

}
