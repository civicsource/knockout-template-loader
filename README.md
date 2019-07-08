# Knockout Template Loader for Webpack

This is a webpack loader that will load knockout templates from html files. When chained with the [html loader](https://github.com/webpack/html-loader), it utilizes the [stringTemplateEngine](https://github.com/rniemeyer/SamplePresentation/blob/master/js/stringTemplateEngine.js) by Ryan Niemeyer to load the html template and make it available to knockout's template parsing logic.

## Install

```
npm install knockout-template-loader --save-dev
```

## Usage

Either add it to your global `webpack.config.js`, chaining after the `html-loader`:

```js
{
  module: {
    loaders: [{
      test: /\.html$/,
      use: [{
        loader: "knockout-template-loader",
        options: {
          name: "[name]",
          caseInsensitive: true
        }
      },
      {
        loader: "html-loader"
      }]
    }]
  }
}
```

or, if you don't want to use it globally, on a case-by-case basis:

```js
require("knockout-template!html!./my-template-file.html");
```

## Options

### `name: string | function(string) => string`

By default, the loader will make the template available to knockout using the template's file name. If you want to override that, you can specify the `name` parameter. 

- Use a string value utilizing the available replacement tokens, like `[name]` for filename without extension. 
- Pass a callback function which receives the full path of the HTML file being loaded and returns a name for the template. 

**Examples**

```js
...
name: "[name]" // use file name without extension
name: function(fullname) {
  // use parent directory name + filename
  var directoryName = path.basename(path.dirname(fullname));
  var filename = path.basename(fullname).replace(/\.[^/.]+$/, "");
  return directoryName + "-" + filename;
}  
...
```

Or using as an inline loader parameter:

```js
require("knockout-template?name=myBetterName!html!./my-template-file.html");
```

### `caseInsensitive: boolean` (default: `false`)

If set to `true`, the underlying template name resolution will happen case-insensitively, otherwise it will be case sensitive.