chrome.storage.local.get(['html'], function (stg) {
	main(stg.html);
});

chrome.storage.onChanged.addListener(function (changes) {
	if ( !!changes.html ) {
		main(changes.html.newValue);
	}
});

function main (html) {
	$('ol').html(html).find('a').attr('target', '_blank').attr('href', function( i, url ) {
		return 'https://vk.com' + url;
	});
}