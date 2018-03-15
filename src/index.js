const utils = require("loader-utils");

function loaderFn(source) {
	this.cacheable();

	const sourcePart = source.replace("module.exports", "var htmlContent");
	const options = utils.getOptions(this);
	const name = (options ? options.name : null) || utils.interpolateName(this, "[name]-[ext]", {});

	return [
		"var ko = require('knockout');",
		"var stringTemplateEngine = require('knockout-template-loader/lib/string-template-engine');",
		sourcePart,
		`ko.templates['${name}'] = htmlContent;`
	].join("\n");
}

module.exports = loaderFn;
