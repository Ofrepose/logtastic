[<img src="https://github.com/Ofrepose/Ofrepose/blob/master/imgs/logtastic2.jpg">](https://github.com/Ofrepose/Ofrepose/blob/master/imgs/logtastic2.jpg)

![npm (scoped)](https://img.shields.io/npm/v/%40ofrepose/logtastic)![npm package minimized gzipped size (scoped version select exports)](https://img.shields.io/bundlejs/size/%40ofrepose/logtastic%401.0.1)![npm](https://img.shields.io/npm/dw/%40ofrepose/logtastic)

Logtastic is a versatile Node.js logging utility that allows you to easily log messages, warnings, and errors with customizable formatting options. It provides flexibility in adjusting text color, style, background color, and more. You can also choose to log messages to files, databases, or both.

[<img src="https://github.com/Ofrepose/Ofrepose/blob/master/imgs/logtasticExampleNew.gif">](https://github.com/Ofrepose/Ofrepose/blob/master/imgs/logtasticExampleNew.gif)


## Installation

To use Logtastic in your project, you can install it using npm:

```bash
npm install @ofrepose/logtastic
```

## Usage

```javascript
const logger = require('@ofrepose/logtastic');

// Simple Logging a simple text message
logger.log("Hello, Logtastic!", { color: "green", style: "bold" });

// Simple Logging an object with custom styling
const data = { name: "John", age: 30, occupation: "Developer" };
logger.log(data, { color: "blue", bgStyle: "yellow" });

// Log messages
logger.log('This is a log message.', {
    color: 'green', // optional - else default values are used
    style: 'bold', // optional - else default values are used
    bgStyle: 'black', // optional - else default values are used
    time: true, // optional
    override: false, // optional
    trace: false // optional
});

// Log warnings
logger.warn('This is a warning.', {
    color: 'yellow', // optional - else default values are used
    style: 'dim', // optional - else default values are used
    bgStyle: 'red', // optional - else default values are used
    time: true, // optional
    override: false, // optional
    trace: false // optional
});

// Log errors
logger.err('This is an error.', {
    color: 'red', // optional else default values are used
    style: 'bold', // optional else default values are used
    bgStyle: 'white', // optional else default values are used
    time: true, // optional
    override: false, // optional
    trace: true, // optional
    escape: true // optional
});

// Configure logging mode
logger.setMode({ silent: false }); // Enable log visibility

// Configure default settings
logger.setDefaults({
    color: 'blue',
    style: 'dim',
    bgStyle: 'reset',
    type: 'log'
});

// Activate logging to file mode
logger.setToFileMode('./logs');

// Get current mode and defaults
logger.getMode();
logger.getDefaults();
```

# Features

**Custom Formatting**
You can easily customize the formatting of log messages, warnings, and errors by specifying color, style, and background options.

**Logging to File**
Logtastic allows you to log messages to files. You can set the directory where log files will be saved using the `setToFileMode(directory)` method.

**Silent Mode**
You can control whether log messages are visible by using the `setMode({ silent: true/false })` method. When silent mode is active, logs will not be visible in the console.

**Default Settings**
Logtastic comes with default settings for log messages, warnings, and errors. You can modify these settings using the `setDefaults(options)` method.

## API Reference

### `logger.log(text, options)`

Log a message with customizable formatting options.

- `text`: The message text or object to be logged.
- `options`: An object containing formatting options such as:
  - `color`: Text color for the message.
  - `style`: Text style for the message.
  - `bgStyle`: Background style for the message.
  - `time`: Whether to include a timestamp in the message (default: false).
  - `override`: Forcefully override the logging mode (default: false).
  - `trace`: Whether to include stack trace information (default: false).

### `logger.warn(text, options)`

Log a warning message with customizable formatting options.

- `text`: The warning message text or object to be logged.
- `options`: An object containing formatting options such as:
  - `color`: Text color for the warning message.
  - `style`: Text style for the warning message.
  - `bgStyle`: Background style for the warning message.
  - `time`: Whether to include a timestamp in the message (default: false).
  - `override`: Forcefully override the logging mode (default: false).
  - `trace`: Whether to include stack trace information (default: false).

### `logger.err(text, options)`

Log an error message with customizable formatting options.

- `text`: The error message text or object to be logged.
- `options`: An object containing formatting options such as:
  - `color`: Text color for the error message.
  - `style`: Text style for the error message.
  - `bgStyle`: Background style for the error message.
  - `time`: Whether to include a timestamp in the message (default: true).
  - `override`: Forcefully override the logging mode (default: false).
  - `trace`: Whether to include stack trace information (default: true).
  - `escape`: Whether to forcefully exit the application after logging (default: true).

### `logger.setMode(options)`

Set the logging mode to control log visibility.

- `options`: An object containing a `silent` property. If `silent` is `true`, logs will not be visible.

### `logger.setDefaults(options)`

Set default log message formatting options.

- `options`: An object containing options to update default formatting settings, including:
  - `color`: Default text color.
  - `style`: Default text style.
  - `bgStyle`: Default background style.
  - `type`: type of log you are editing default type for ('log', 'warn', or 'err').

### `logger.setLoggingMode(active)`

Sets the logging mode for writing logs to a file.

- `active`: A boolean value indicating whether logging to file mode should be active.

### `logger.setToFileMode(directory)`

Activate logging to file mode and specify the log directory.

- `directory`: The directory path where log files will be saved.

### `logger.getMode()`

Display the current logging mode and its configuration.

### `logger.getDefaults()`

Display the default settings and provide instructions on modifying them.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
