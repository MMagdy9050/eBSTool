// get xml from servar or from cach
function GetXmlFromServer(PathFile){
	var BackXML ;
	if(localStorage.getItem(PathFile)){
		BackXML = localStorage.getItem(PathFile);
	}else{
		 PathURL= "XML/"+PathFile+".XML";
		$.ajax({
			type: "GET",
			url: PathURL,
			async: false,
			dataType: "xml",
			success: function(xml) {BackXML = (new XMLSerializer()).serializeToString(xml);}
			});
		}
		return $.parseXML(BackXML)
}

// get xml from chrome.storage and save it in localstorge
function GetAllDataFromStorage(){
	isCashed = false;
	DataArray = ["AllURL" , "ShortUrl"];	
	chrome.storage.local.get(null, function(items){
    DataArray.forEach(function(nameFile) {
	 if(items[nameFile])
	 localStorage.setItem(nameFile,items[nameFile]);
	});
isCashed = true;
});

}


function OpenHomePage(){
	window.location.hash = "";
	window.location.pathname = "/index.html";
}

//String Extenstion to format string for xml content.
//Replces xml escape chracters to their equivalent html notation.
String.prototype.EncodeXMLEscapeChars = function () {
    var OutPut = this;
    if ($.trim(OutPut) != "") {
        OutPut = OutPut.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
        OutPut = OutPut.replace(/&(?!(amp;)|(lt;)|(gt;)|(quot;)|(#39;)|(apos;))/g, "&amp;");
        OutPut = OutPut.replace(/([^\\])((\\\\)*)\\(?![\\/{])/g, "$1\\\\$2");  //replaces odd backslash(\\) with even.
    }
    else {
        OutPut = "";
    }
    return OutPut;
};