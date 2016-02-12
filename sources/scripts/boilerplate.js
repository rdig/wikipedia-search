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
const ApiRequest = (input) => {
	$.ajax( {
		url: Api(input),
		dataType: 'json',
		type: 'GET',
		headers: { 'Api-User-Agent': 'FreeCodeCamp/0.1 (http://www.freecodecamp.com/challenges/build-a-wikipedia-viewer; raul@glogovetan.com)' },
		beforeSend: () => {
			Hooks.lucky.hide();
			Hooks.loading.show();
		}
	}).done(function(data) {

		data[1].map((title, i) => {
			Hooks.entries.append(ArticleEntry(title, data[3][i], data[2][i]));
		});

		Hooks.loading.hide();
		Hooks.entries.fadeIn();

	}).fail(function() {

		Hooks.loading.hide();
		Hooks.error.fadeIn();

	});
};
