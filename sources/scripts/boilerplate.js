const Api = (search) => {
	return (
		'http://en.wikipedia.org/w/api.php' + '?' +
		'action=opensearch' + '&' +
		'format=json' + '&' +
		'search=' + search + '&' +
		'limit=20' + '&' +
		'callback=?'
	);
};
const Hooks = {
	body: $('body'),
	lucky: $('#random'),
	loading: $('.loading'),
	error: $('.error'),
	entries: $('.entries')
};
const ArticleEntry = (title, link, description) => {
	return (
		'<div class="article">' +
		'<p class="title"><a href="' + link + '"></a>' + title + '</p>' +
		'<p class="description">' + description + '</p>' +
		'</div>'
	);
};
