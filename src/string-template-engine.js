//https://github.com/rniemeyer/SamplePresentation/blob/master/js/stringTemplateEngine.js
import ko from "knockout";

//define a template source that simply treats the template name as its content
var templates = {},
	data = {},
	engine = new ko.nativeTemplateEngine();

ko.templateSources.stringTemplate = function(template) {
	this.templateName = template;
};

ko.templateSources.stringTemplate.caseInsensitive = false;

ko.utils.extend(ko.templateSources.stringTemplate.prototype, {
	data: function(key, value) {
		data[this.templateName] = data[this.templateName] || {};

		if(arguments.length === 1) {
			return data[this.templateName][key];
		}

		data[this.templateName][key] = value;
	},
	text: function(value) {
	  if(arguments.length === 0) {
			return templates[this.templateName];
		}

		templates[this.templateName] = value;
	}
});

engine.makeTemplateSource = function(template, templateDocument) {
  // Named template
  if (typeof template == "string") {
    templateDocument = templateDocument || document;

    var elem = templateDocument.getElementById(template);
    if (elem) {
      return new ko.templateSources.domElement(elem);
    }

    var templateName = template;
    if (ko.templateSources.stringTemplate.caseInsensitive) {
      templateName = templateName.toLowerCase();
    }

    if (ko.templates[templateName]) {
      return new ko.templateSources.stringTemplate(templateName);
    }

    throw new Error("Cannot find template with ID " + template);
  } else if ((template.nodeType == 1) || (template.nodeType == 8)) {
    // Anonymous template
    return new ko.templateSources.anonymousTemplate(template);
  } else {
    throw new Error("Unknown template type: " + template);
  }
};

//make the templates accessible
ko.templates = templates;

//make this new template engine our default engine
ko.setTemplateEngine(engine);
