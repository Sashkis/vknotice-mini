'use strict';

function main () {
	$.get('http://vk.com/feed').done(function (HTML) {
		chrome.browserAction.setIcon({path: 'img/icon38.png'});
		var $menu = $(HTML).find('#side_bar ol');
		$menu.find('*').removeAttr('onclick').removeAttr('onmouseover').removeAttr('onmousedown');

		chrome.storage.local.set({
			html: $menu.html()
		});

		var sum = 0;
		if ( $menu.length == 1 ) {
			$menu.find('li .left_count').each(function(index, el) {
				var num = $( el ).text().slice(1) - 0;
				if ( !isNaN( num ) ) {
					sum += num;
				}
			});
		} else {
			chrome.browserAction.setIcon({path: 'img/icon38-off.png'});
		}
		if ( sum > 0 ) {
			sum = '' + sum;
		} else {
			sum = '';
		}
		chrome.browserAction.setBadgeText({text: sum});

	}).fail(function (j, e) {
		chrome.browserAction.setBadgeText({text: ''});
		chrome.browserAction.setIcon({path: 'img/icon38-off.png'});
	}).always(function () {
		setTimeout(main, 2000);
	});
}

main();