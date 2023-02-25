// JavaScript Document
var dropdowns = Array();
window.addEvent("domready", function(){	
	if($$('.dropdown').length > 0){
		$$('.dropdown').each(function(dd){
			dropdowns.push(new elSelect({container : dd.get("id")}));
		});
	}
});
