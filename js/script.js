var categoriesSnippet = require('../snippets/categoriesSnippet')

function script() {
	document.getElementById("body")
		.innerHTML = categoriesSnippet;
	}


module.exports = script;