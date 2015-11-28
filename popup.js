/*jslint browser: true*/
/*global $, jQuery, chrome*/
(function () {
    'use strict';
    var populateBlockedList = function () {
        $('#blocked-list').empty();
        $('#block-item').val('');
        chrome.storage.local.get({'blockedWords': []}, function (result) {
            result.blockedWords.forEach(function (item) {
                var oneItem = $('<li>')
                    .text(item)
                    .attr('href', '#')
                    .on('click', function () {
                        var clickedItem = $(this).text();
                        chrome.storage.local.get({'blockedWords': []}, function (result) {
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
    };
    window.onload = function () {
        populateBlockedList();
    };
    $(document).ready(function () {
        $('#submit-item').on('click', function () {
            if ($('#block-item').val().length === 0) {
                return false;
            }
            chrome.storage.local.get({'blockedWords': []}, function (result) {
                var value = $('#block-item').val();
                result.blockedWords.push(value);
                chrome.storage.local.set(result);
                populateBlockedList();
            });
        });
        $('#block-item').keydown(function (event) {
            if (event.keyCode === 13) {
                $('#submit-item').click();
            }
        });

        $('#clear-all').on('click', function () {
            chrome.storage.local.clear();
            populateBlockedList();
        });
    });

}());