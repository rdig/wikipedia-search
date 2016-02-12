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
	loading: $('.loading'),
	error: $('.error'),
	entries: $('.entries'),
	input: $('#search-input'),
	button: $('#search-button'),
	noresults: $('.noresults')
};
const ArticleEntry = (title, link, description) => {
	description = description || 'No description could be found.';
	return (
		'<div class="article">' +
		'<p class="title"><a href="' + link + '">' + title + '</a></p>' +
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
			Hooks.noresults.hide();
			Hooks.entries.empty();
			Hooks.body.addClass('results');
			Hooks.loading.show();
		}
	}).done(function(data) {
		if (data[1].length === 0) {
			Hooks.loading.hide();
			Hooks.noresults.fadeIn();
			return;
		}
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

(function() {

	Hooks.input.val('');

	Hooks.input.on('keyup', function(e) {
		if (this.value === '') {
			Hooks.entries.empty();
			Hooks.body.removeClass('results');
			return;
		}
		if (e.keyCode === 13) {
			ApiRequest(this.value);
		}
	});

	Hooks.button.on('click', function() {
		let searchValue = Hooks.input.val();
		if (searchValue !== '') {
			ApiRequest(searchValue);
		}
	});

}());
