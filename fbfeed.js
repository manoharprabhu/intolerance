/* global $ */

var blackList = [];
function blockUnwantedFeeds(){
	var suspects = $('#contentArea div[data-testid="fbfeed_story"]');
	suspects.each(function(i) {
		var str = $(this).text().toLowerCase();
		var flag = true;
		blackList.forEach(function(item){
			if(this.attr('data-bullshit') === undefined){
				if(str.indexOf(item) !== -1 && flag){
					this.css('-webkit-filter','grayscale(0.5) blur(10px)');
					var salvation = $('<div>').css('position','relative')
									.css('width','100%')
									.css('color','#FFFFFF')
									.css('background-color','#2980b9')
									.css('border-radius','8px')
									.css('font-size','30pt')
									.css('text-align','center')
									.text('Bullshit Blocked!');
					salvation.insertBefore(this);
					this.attr('data-bullshit',true);
					flag = false;
				}	
			}
			
		},$(this));
	});
}

function DOMModificationHandler(){
    $(this).unbind('DOMSubtreeModified.event1');
    setTimeout(function(){
		blockUnwantedFeeds();
        $('#contentArea').bind('DOMSubtreeModified.event1',DOMModificationHandler);
    },1000);
};


chrome.storage.local.get({'blockedWords':[]}, function (result) {
	blackList = result.blockedWords
});
//after document-load
$('#contentArea').bind('DOMSubtreeModified.event1',DOMModificationHandler);
