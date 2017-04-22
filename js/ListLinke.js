var WidgetName = window.location.hash.replace('#', '');
(WidgetName=="EditShortUrl")?DrawShortUrl():DrawDiveice();
$('#HomeButton').on('click',OpenHomePage);
$('#ButtonSaveLinkes').on('click',SaveLinkes);
$('#ButtonAddLinkes').on('click',AddNew);
$('body').on('click','.deleteimge',function  (e){
	
	var DrawNow = ($($(this).parent('div')).find('.SureBatton')).length;
	$('.SureBatton').remove();
	if(!DrawNow)
	 $($(this).parent('div')).prepend('<div class="SureBatton" ><span style="margin-top: 3%;" >sure</span></div>');
 
	
	});

	
	$('body').on('click','.SureBatton',function(){
	
		$('.SureBatton').parent().animate({opacity: "0"}, 1000 ,function(){
			$('.SureBatton').parent().remove();
			});
		
		});


var Color=['blue','red','magenta','orange','yellow','jira','DailyReport','mail'];




function AddNew(){
	
	var Newcolor =Color[(Math.floor(Math.random() * 5) )];
	HTMLToAppend = "<div class='AllLinkeDiv'>"+
		"<input type='text' id='Name' class='Linke inputeStyle "+Newcolor+"' placeholder='Name'>"+
		"<span>:</span>"+
		"<input type='text' id='Url' class='name inputeStyle "+Newcolor+"' placeholder='URL'></input>"+
		"<img src='img/delete.png' class='deleteimge'/></div>";
		
		 $("#AppindHere").append(HTMLToAppend);	
}

function DrawShortUrl(){
	$('.Container_head section li').remove();
	var xml = GetXmlFromServer('ShortUrl');
	
	var HTMLToAppend = "";
	var Index=0;
	$(xml).find('url').each(function(index){
		
		HTMLToAppend += "<div class='AllLinkeDiv' DevIndex="+Index+">"+
		"<input type='text' id='Name' class='Linke inputeStyle  "+$(this).attr('color')+" ' placeholder='Name'' value='"+$(this).attr('name')+"'>"+
		"<span>:</span>"+
		"<input type='text' id='Url' class='name inputeStyle "+$(this).attr('color')+" ' placeholder='URL' value='"+ $(this).text()+"'></input>"+
		"<img src='img/delete.png' class='deleteimge'/></div>";
		Index++;
	})
  
		 
		 $("#AppindHere").append(HTMLToAppend);	
	
}

function DrawDiveice(){
	
	$('#ButtonAddLinkes').hide();
	var xml = GetXmlFromServer('AllURL');
	var innerHTML = "";
	
	var supXML =$(xml).find(" Proj[name='"+localStorage.ProjName+"'] v[name='"+localStorage.VergName+"'] vc[name='"+localStorage.ModuleName+"']");
	
	
		innerHTML += "<div class='AllLinkeDiv'>"+
		"<input type='text' class='Linke inputeStyle' placeholder='Linke Site'' value='Mobile Engish' disabled>"+
		"<span>:</span>"+
		"<input type='text' id='ME' class='name inputeStyle' placeholder='name Site' value='"+ $(supXML).find('ME').text()+"'></input>"+
		"</div>";
		
		innerHTML += "<div class='AllLinkeDiv'>"+
		"<input type='text' class='Linke inputeStyle' placeholder='Linke Site'' value='Mobile Arabic' disabled>"+
		"<span>:</span>"+
		"<input type='text' id='MA' class='name inputeStyle' placeholder='name Site' value='"+ $(supXML).find('MA').text()+"'></input>"+
		"</div>";
		
		innerHTML += "<div class='AllLinkeDiv'>"+
		"<input type='text' class='Linke inputeStyle' placeholder='Linke Site'' value='Tablet Engish' disabled>"+
		"<span>:</span>"+
		"<input type='text'  id='TE' class='name inputeStyle' placeholder='name Site' value='"+ $(supXML).find('TE').text()+"'></input>"+
		"</div>";
		
		innerHTML += "<div class='AllLinkeDiv'>"+
		"<input type='text' class='Linke inputeStyle' placeholder='Linke Site'' value='Tablet Arabic' disabled>"+
		"<span>:</span>"+
		"<input type='text'  id='TA' class='name inputeStyle' placeholder='name Site' value='"+ $(supXML).find('TA').text()+"'></input>"+
		"</div>";
	
	
	
	$('#AppindHere').append(innerHTML); 
}

function SaveLinkes(){
	
	(WidgetName=="EditShortUrl")?SaveShortUrLinke():saveDivLinke();
}

function SaveShortUrLinke(){
	var xml ="";
	xml+= "<shorturl>";
	
	$('.AllLinkeDiv').each(function(index){
		
		if($(this).find('#Name').val()){
			
			var URLLinke = $(this).find('#Url').val();
			URLLinke = ValditeXMLUrl(URLLinke);
		
		var color="red";
		var classList = $(this).find('#Name').attr('class').split(/\s+/);
			$.each(classList, function(index, item) {
				if (Color.indexOf(item) != -1) {
					 color = item;
				}
			});
		
		
			xml+="<url  color='"+color+"' name='"+$(this).find('#Name').val()+"'>"+URLLinke+"</url>";
		}
	
		
	
	});

	 xml += "</shorturl>";
	 chrome.storage.local.set({'ShortUrl': xml},function(item){
			localStorage.setItem('ShortUrl',xml);
			DoneAnimet();
						});
}


function ValditeXMLUrl(TextXml){
	
	if (!/^http(s?):\/\//.test(TextXml)) {
            TextXml = "http://" + TextXml;
        }
	TextXml =TextXml.EncodeXMLEscapeChars();
	return TextXml
}
function saveDivLinke(){
	
	var xml = GetXmlFromServer('AllURL');
	
	var ME =ValditeXMLUrl($('#ME').val());
	var MA =ValditeXMLUrl($('#MA').val());
	var TE =ValditeXMLUrl($('#TE').val());
	var TA =ValditeXMLUrl($('#TA').val());
	
	
	
	$(xml).find(" Proj[name='"+localStorage.ProjName+"'] v[name='"+localStorage.VergName+"'] vc[name='"+localStorage.ModuleName+"']").find('ME').text(ME);
	$(xml).find(" Proj[name='"+localStorage.ProjName+"'] v[name='"+localStorage.VergName+"'] vc[name='"+localStorage.ModuleName+"']").find('MA').text(MA);
	$(xml).find(" Proj[name='"+localStorage.ProjName+"'] v[name='"+localStorage.VergName+"'] vc[name='"+localStorage.ModuleName+"']").find('TE').text(TE);
	$(xml).find(" Proj[name='"+localStorage.ProjName+"'] v[name='"+localStorage.VergName+"'] vc[name='"+localStorage.ModuleName+"']").find('TA').text(TA);
	
	
			chrome.storage.local.set({'AllURL': (new XMLSerializer()).serializeToString(xml)},function(item){
			localStorage.setItem('AllURL',(new XMLSerializer()).serializeToString(xml));
			DoneAnimet();
						});
	
}

function DoneAnimet(){

		window.location.pathname = "/index.html";	
/*$('#ButtonSaveLinkes span').remove();
$("#ButtonSaveLinkes" ).animate({opacity: "0"}, 500);
$(".Container" ).animate({opacity: "0"}, 700, function(){
	
});

//$("body" ).animate({    height: '421px'}, 500);
*/
}