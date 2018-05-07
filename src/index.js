const utils = require("loader-utils");

function loaderFn(source) {
	this.cacheable();

	const sourcePart = source.replace("module.exports", "var htmlContent");
	const options = utils.getOptions(this);
  
  let name = options && options.name || "[name]-[ext]";
  
  if (typeof name === "function") {
    const pathObject = {
      fullpath: utils.interpolateName(this, "[path][name].[ext]", {}),
      path: utils.interpolateName(this, "[path]", {}),
      name: utils.interpolateName(this, "[name]", {}),
      ext: utils.interpolateName(this, "[ext]", {})
    };
    name = name(pathObject);
  }

	name = utils.interpolateName(this, name, {});

	return [
		"var ko = require('knockout');",
		"var stringTemplateEngine = require('knockout-template-loader/lib/string-template-engine');",
		sourcePart,
		`ko.templates['${name}'] = htmlContent;`
	].join("\n");
}

module.exports = loaderFn;
