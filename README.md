# Knockout Template Loader for Webpack

This is a webpack loader that will load knockout templates from html files. When chained with the [html loader](https://github.com/webpack/html-loader), it utilizes the [stringTemplateEngine](https://github.com/rniemeyer/SamplePresentation/blob/master/js/stringTemplateEngine.js) by Ryan Niemeyer to load the html template and make it available to knockout's template parsing logic.

## Install

```
npm install knockout-template-loader --save-dev
```

## Usage

Either add it to your global `webpack.config.js`:

```js
{
	module: {
		loaders: [{
			test: /\.html$/,
			loader: "knockout-template!html"
		}]
	}
}
```

or, if you don't want to use it globally, on a case-by-case basis:

```js
require("knockout-template!html!./my-template-file.html");
```

By default, it will make the template available to knockout using the template's file name. If you want to override that, you can specify the `name` parameter:

```js
require("knockout-template?name=myBetterName!html!./my-template-file.html");
```
