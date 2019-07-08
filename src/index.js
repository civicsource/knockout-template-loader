const utils = require("loader-utils");

function loaderFn(source) {
	this.cacheable();

	const sourcePart = source.replace("module.exports", "var htmlContent");
	const options = utils.getOptions(this);
  
  let name = options && options.name || "[name]-[ext]";
  
  if (typeof name === "function") {
    name = name(utils.interpolateName(this, "[path][name].[ext]", {}));
  }

	name = utils.interpolateName(this, name, {});

  const caseInsensitive = options && options.caseInsensitive;

  if (caseInsensitive) {
    name = name.toLowerCase();
  }

	return [
		"var ko = require('knockout');",
		"require('knockout-template-loader/lib/string-template-engine');",
    `ko.templateSources.stringTemplate.caseInsensitive = ${(caseInsensitive ? "true" : "false")};`,
		sourcePart,
		`ko.templates['${name}'] = htmlContent;`
	].join("\n");
}

module.exports = loaderFn;
