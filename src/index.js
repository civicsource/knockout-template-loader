import utils from "loader-utils";

function loaderFn(source) {
	this.cacheable();

	const sourcePart = source.replace("module.exports", "var htmlContent");
	const options = utils.getLoaderConfig(this, "knockoutTemplateLoader");
	const name = options.name || utils.interpolateName(this, "[name]-[ext]", {});

	return [
		"var knockout = require('knockout');",
		"var stringTemplateEngine = require('knockout-template-loader/lib/string-template-engine');",
		sourcePart,
		`ko.templates['${name}'] = htmlContent;`
	].join("\n");
}

module.exports = loaderFn;
