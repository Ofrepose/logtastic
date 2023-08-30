[<img src="https://github.com/Ofrepose/Ofrepose/blob/master/imgs/logtastic2.jpg">](https://github.com/Ofrepose/Ofrepose/blob/master/imgs/logtastic2.jpg)
![npm (scoped)](https://img.shields.io/npm/v/%40ofrepose/logtastic)![npm package minimized gzipped size (scoped version select exports)](https://img.shields.io/bundlejs/size/%40ofrepose/logtastic%401.0.1)

Logtastic is a versatile npm package designed to enhance your console logging experience by allowing you to customize the appearance of your log messages with various colors, styles, and backgrounds. By integrating Logtastic into your project, you can make your terminal output more visually engaging and improve the distinction between different types of log messages.
[<img src="https://github.com/Ofrepose/Ofrepose/blob/master/imgs/logtasticExampleNew.gif">](https://github.com/Ofrepose/Ofrepose/blob/master/imgs/logtasticExampleNew.gif)


## Installation

To use Logtastic in your project, you can install it using npm:

```bash
npm install @ofrepose/logtastic
```

## Usage

```javascript
const logger = require('@ofrepose/logtastic');

// Logging a simple text message
logger.log("Hello, Logtastic!", { color: "green", style: "bold" });

// Logging an object with custom styling
const data = { name: "John", age: 30, occupation: "Developer" };
logger.log(data, { color: "blue", bgStyle: "yellow" });
```

## API

### `log(text, options)`

Logs a message with customizable color, style, and background.

- `text` (string|object): The text or object to be logged.
- `options` (Object):
  - `color` (string, optional): The text color to apply. Possible values: 'reset', 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'.
  - `style` (string, optional): The text style to apply. Possible values: 'reset', 'bold', 'dim', 'italic', 'underline', 'inverse', 'hidden', 'strikethrough'.
  - `bgStyle` (string, optional): The background color to apply. Possible values: 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'.

### `err(text, options)`

Logs an error message with customizable color, style, and background.

- `text` (string|object): The error message or object to be logged.
- `options` (Object):
  - `color` (string, optional): The text color to apply. Possible values: 'reset', 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'.
  - `style` (string, optional): The text style to apply. Possible values: 'reset', 'bold', 'dim', 'italic', 'underline', 'inverse', 'hidden', 'strikethrough'.
  - `bgStyle` (string, optional): The background color to apply. Possible values: 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'.
  - `time` (boolean, optional): Whether to include a timestamp. Default is true.
  - `override` (boolean, optional): Override the silent mode and log even in silent mode. Default is false.
  - `trace` (boolean, optional): Include stack trace. Default is true.
  - `escape` (boolean, optional): Whether to exit the process after logging. Default is true.
 
### `getDefaults()`

This function displays the default settings and provides instructions for modifying them. It logs a series of messages in blue color for consistent styling.

### `setDefaults(options)`

This function allows you to set default log message formatting options. You can update default values for color, style, and background style.

### `getMode()`

This function displays the current logging mode and provides instructions for changing it. It logs the current mode and instructions in blue color.

### `setMode(options)`

This function lets you modify the logging mode to control the visibility of log messages. You can enable silent mode (logs not visible) or deactivate it.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
