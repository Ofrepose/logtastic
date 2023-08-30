# Logtastic
![npm (scoped)](https://img.shields.io/npm/v/%40ofrepose/logtastic)![npm package minimized gzipped size (scoped version select exports)](https://img.shields.io/bundlejs/size/%40ofrepose/logtastic%401.0.1)

Logtastic is a simple npm package that provides a flexible way to log messages with customizable colors, styles, and backgrounds. It's designed to make your console logs more visually appealing and easier to differentiate. With Logtastic, you can easily add a touch of style to your terminal output.

[<img src="https://github.com/Ofrepose/Ofrepose/blob/master/imgs/logtastic2.jpg">](https://github.com/Ofrepose/Ofrepose/blob/master/imgs/logtastic2.jpg)

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

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
