/* global chrome */
window.onload = function(){
	populateBlockedList();
}
$(document).ready(function(){
	$('#submit-item').on('click',function(){
		chrome.storage.local.get({'blockedWords':[]}, function (result) {
			var value = $('#block-item').val();
			result.blockedWords.push(value);
			chrome.storage.local.set(result);
			populateBlockedList();	
		});
	});
});

var populateBlockedList = function () {
	$('#blocked-list').empty();
	chrome.storage.local.get({'blockedWords':[]}, function (result) {
		console.log(result);
		result.blockedWords.forEach(function(item){
			var oneItem = $('<div>')
					.text(item)
					.attr('href','#')
					.on('click',function(){
						var clickedItem = $(this).text();
						chrome.storage.local.get({'blockedWords':[]}, function (result) {
							console.log(clickedItem);
							var index = result.blockedWords.indexOf(clickedItem); 
							if (index > -1) {
 							   result.blockedWords.splice(index, 1);
							}
							chrome.storage.local.set(result);
							populateBlockedList();
						});
					});
			$('#blocked-list').append(oneItem);
		});
    });
}