const { colors, styles, bg } = require('./colors');
const fs = require('fs');

class Logtastic {
    constructor() {
        this.colors = colors;
        this.styles = styles;
        this.bg = bg;

        this.default = {
            log: {
                color: '',
                style: '',
                bg: '',
            },
            warn: {
                color: 'yellow',
                style: 'bold',
                bg: '',
            },
            err: {
                color: 'red',
                style: 'bold',
                bg: '',
            }
        }
        this.mode = {
            silent: false,
            logging: {
                logToFile: false,
                toFile: {
                    directory: '',
                },
                // TODO
                // im thinking i want user to provide the callback function that sends data to their db of choice
                // this allows them to use this logging in their current environment
                // as well as limits reliance on this to send requests
                toDB: {
                    query: '',
                    maxBatchCount: 10,
                    maxBatchTimeout: 50000,
                    batchedLogs: {
                        content: [],
                    }
                },
            }
        };
    }

    setToDB(settings = {}) {
        const {
            query = this.mode.logging.toDB.query,
            maxBatchCount = this.mode.logging.toDB.maxBatchCount,
            maxBatchTimeout = this.mode.logging.toDB.maxBatchTimeout
        } = settings;

        if (!query || !typeof query === 'string') {
            this.warn(`query required in setToDB({ query: <queryValue> })`)
        } else {
            this.mode.logging.toDB.query = query;
            this.mode.logging.toDB.maxBatchCount = maxBatchCount;
            this.mode.logging.toDB.maxBatchTimeout = maxBatchTimeout;
            this.log(
                `dB set to
                query: ${this.mode.logging.toDB.query}
                maxBatchCount: ${this.mode.logging.toDB.maxBatchCount}
                maxBatchTimeout: ${this.mode.logging.toDB.maxBatchTimeout}`
            )
        }
    }


    /**
     * Activates the logging to file mode and specifies the log directory.
     *
     * This function sets the logging mode to write logs to a file and designates
     * the directory where the log files will be saved. Additionally, it updates
     * the internal state to reflect the change in logging mode.
     *
     * @param {string} directory - The directory path where log files will be saved.
     * @returns {void}
     */
    setToFileMode(directory) {
        this.mode.logging.toFile.directory = directory;
        this.mode.logging.logToFile = true;
        this.log(
            'Logging to file mode is active. Logs will be saved to the specified directory.',
            { color: 'green', override: true }
        );
    }


    /**
     * Sets the logging mode for writing logs to a file.
     *
     * This function enables or disables the logging mode for writing logs to a file.
     * It accepts a boolean value to specify whether the logging to file mode should
     * be activated (true) or deactivated (false). If the provided value is not a boolean,
     * a warning is issued, and the function defaults to deactivating the logging mode.
     * The internal state of the application is then updated to reflect the new logging mode.
     *
     * @param {boolean} active - A boolean value indicating whether logging to file mode should be active.
     * @returns {void}
     */
    setLoggingMode(active) {
        let activeMode = active;
        if (typeof active !== 'boolean') {
            this.warn(`setLoggingMode accepts only true or false, not ${active}. Defaulting to false.`);
            activeMode = false;
        }
        this.mode.logging.logToFile = activeMode;
        this.log(`LoggingMode is set to: ${this.mode.logging.logToFile}`);
    }


    /**
     * Write a log message to a file with specified options.
     *
     * This function writes a log message to a file in the specified directory.
     * If the logging to file mode is not configured (directory not set), an error message is
     * displayed in the console. Otherwise, the log message is appended to a file named according to
     * the specified 'type' (default is 'log'; other options should be 'warn' or 'err') in the designated directory. 
     * If any errors occur during file operations, appropriate error messages are displayed.
     *
     * @param {string} text - The log message text to be written to the file.
     * @param {Object} [options={}] - Options for customizing the log entry.
     *   @param {string} [options.type='log'] - The type of the log entry (e.g., 'log', 'warn', 'err').
     * @returns {void}
     */
    logToFile(text, options = {}) {
        const { directory } = this.mode.logging.toFile;
        const { type = 'log' } = options;

        if (!directory) {
            console.log(
                'Logging to file mode is not configured. Use setToFileMode(directory) to set the log directory.',
                { color: 'red', override: true }
            );
            return;
        }

        try {
            const filePath = `${directory}/log_${type}.txt`;
            writeToFile(filePath, text + '\n');
        } catch (err) {
            console.log(err)
        }
    }

    writeToFile(path, data) {
        fs.appendFile(path, data, (err) => {
            if (err) {
                console.error('Error writing to log file.', err);
            } else {
                console.log(
                    'Log written to file successfully.',
                    { color: 'green', override: true }
                );
            }
        });
    }



    /**
     *
     * This function logs a message with customizable color, style, and background. The content
     * of the message and its formatting can be customized using the 'text' parameter and the
     * 'options' object. If the 'override' option is true, the message is displayed regardless
     * of the logging mode. Otherwise, the message is displayed only if the logging mode is not
     * silent (or if overridden). Additionally, if logging to file mode is enabled, the message
     * is also written to a file. Timestamps and trace information can be added to the message
     * if specified in the 'options' object.
     *
     * @param {string|object} text - The text or object to be logged.
     * @param {Object} [options={}] - Options for styling and logging the message.
     *   @param {string} [options.color] - The text color to apply to the message.
     *   @param {string} [options.style] - The text style to apply to the message.
     *   @param {string} [options.bgStyle] - The background color for the message.
     *   @param {boolean} [options.time=false] - Whether to include a timestamp in the message.
     *   @param {boolean} [options.override=false] - Forcefully override the logging mode.
     *   @param {boolean} [options.trace=false] - Whether to include stack trace information.
     * @returns {void}
     */
    log(text, options = {}) {
        const {
            color = this.default.log.color,
            style = this.default.log.style,
            bgStyle = this.default.log.bg,
            time = false,
            override = false,
            trace = false
        } = options;

        if (this.mode.silent && !override) {
            return;
        }

        const appliedColors = this.colors[color] || "";
        const appliedStyles = this.styles[style] || "";
        const appliedBg = this.bg[bgStyle] || "";

        const timestamp = time ? new Date().toLocaleString() + '\n' : '';

        const traceStack =
            trace
                ? new Error()
                    .stack
                    .split('\n')
                    .slice(2)
                    .join('\n') + '\n'
                : '';

        try {
            let formattedText =
                typeof text === 'string'
                    ? text
                    : text instanceof Error
                        ? text.message
                        : JSON.stringify(text, null, 2);

            console.log(
                `${appliedColors}${appliedStyles}${appliedBg}${timestamp}${formattedText}${trace && '\n' + traceStack || ''}${this.colors.reset}${this.styles.reset}`
            );
            this.mode.logging.logToFile && this.logToFile(new Date().toLocaleString() + ':' + formattedText, { type: 'log' })
        } catch (err) {
            console.warn('Issue with Logtastic. Which is not very logtastic of it');
            console.error(err);
        }
    }


    /**
     *
     * This function logs a warning message with customizable color, style, and background.
     * The content of the warning message and its formatting can be customized using the 'text'
     * parameter and the 'options' object. If the 'override' option is true, the warning message
     * is displayed regardless of the logging mode. Otherwise, the warning message is displayed
     * only if the logging mode is not silent (or if overridden). Additionally, if logging to file
     * mode is enabled, the warning message is also written to a file. Timestamps and trace information
     * can be added to the message if specified in the 'options' object.
     *
     * @param {string|object} text - The text or object to be logged as a warning message.
     * @param {Object} [options={}] - Options for styling and logging the warning.
     *   @param {string} [options.color] - The text color to apply to the warning message.
     *   @param {string} [options.style] - The text style to apply to the warning message.
     *   @param {string} [options.bgStyle] - The background color for the warning message.
     *   @param {boolean} [options.time=false] - Whether to include a timestamp in the message.
     *   @param {boolean} [options.override=false] - Forcefully override the logging mode.
     *   @param {boolean} [options.trace=false] - Whether to include stack trace information.
     * @returns {void}
     */
    warn(text, options = {}) {
        const {
            color = this.default.warn.color,
            style = this.default.warn.style,
            bgStyle = this.default.warn.bg,
            time = false,
            override = false,
            trace = false
        } = options;

        if (this.mode.silent && !override) {
            return;
        }

        const appliedColors = this.colors[color] || "";
        const appliedStyles = this.styles[style] || "";
        const appliedBg = this.bg[bgStyle] || "";

        const timestamp = time ? new Date().toLocaleString() + '\n' : '';
        const traceStack =
            trace
                ? new Error()
                    .stack
                    .split('\n')
                    .slice(2)
                    .join('\n') + '\n'
                : '';

        try {
            let formattedText =
                typeof text === 'string'
                    ? text
                    : text instanceof Error
                        ? text.message
                        : JSON.stringify(text, null, 2);

            console.log(`${appliedColors}${appliedStyles}${appliedBg}${timestamp}${formattedText}${trace && '\n' + traceStack || ''}${this.colors.reset}${this.styles.reset}`);
            this.mode.logging.logToFile && this.logToFile(new Date().toLocaleString() + ':' + formattedText, { type: 'warn' })
        } catch (err) {
            console.warn('Issue with Logtastic. Which is not very logtastic of it');
            console.error(err);
        }
    }


    /**
     *
     * This function logs an error message with customizable color, style, and background. The content
     * of the error message and its formatting can be customized using the 'text' parameter and the
     * 'options' object. If the 'override' option is true, the error message is displayed regardless
     * of the logging mode. Otherwise, the error message is displayed only if the logging mode is not
     * silent (or if overridden). Additionally, if logging to file mode is enabled, the error message
     * is also written to a file. Timestamps, trace information, and the ability to force an exit (if specified)
     * can be added to the message if specified in the 'options' object.
     *
     * @param {string|object} text - The text or object to be logged as an error message.
     * @param {Object} [options={}] - Options for styling and logging the error.
     *   @param {string} [options.color] - The text color to apply to the error message.
     *   @param {string} [options.style] - The text style to apply to the error message.
     *   @param {string} [options.bgStyle] - The background color for the error message.
     *   @param {boolean} [options.time=true] - Whether to include a timestamp in the message.
     *   @param {boolean} [options.override=false] - Forcefully override the logging mode.
     *   @param {boolean} [options.trace=true] - Whether to include stack trace information.
     *   @param {boolean} [options.escape=true] - Whether to forcefully exit the application after logging.
     * @returns {void}
     */
    err(text, options = {}) {
        const {
            color = this.default.warn.color,
            style = this.default.warn.style,
            bgStyle = this.default.warn.bg,
            time = true,
            override = false,
            trace = true,
            escape = true
        } = options;

        if (this.mode.silent && !override) {
            return
        }

        const appliedColors = this.colors[color] || "";
        const appliedStyles = this.styles[style] || "";
        const appliedBg = this.bg[bgStyle] || "";

        const timestamp =
            time
                ? new Date().toLocaleString() + '\n'
                : '';

        const traceStack =
            trace
                ? new Error()
                    .stack
                    .split('\n')
                    .slice(2)
                    .join('\n') + '\n'
                : '';

        try {
            const formattedText =
                typeof text === 'string'
                    ? text
                    : text instanceof Error
                        ? text.message
                        : JSON.stringify(text, null, 2);

            console.log(`${appliedColors}${appliedStyles}${appliedBg}${timestamp}${formattedText}${trace && '\n' + traceStack || ''}${this.colors.reset}${this.styles.reset}`);
            this.mode.logging.logToFile && this.logToFile(new Date().toLocaleString() + ':' + formattedText, { type: 'err' })
            if (escape) process.exit(1);
        } catch (err) {
            console.warn('Issue with Logtastic. Which is not very logtastic of it');
            console.error(err);
        }
    }


    /**
     * Display default settings and configuration instructions.
     *
     * Logs a message to the console displaying the default settings and provides
     * instructions on how users can modify these settings. The function logs a series
     * of messages with blue color and an override option to ensure consistent styling.
     *
     * @returns {void}
     */
    getDefaults() {
        this.log(
            `Your default settings are:`,
            { color: 'blue', override: true }
        );
        this.log(
            this.default,
            { color: 'blue', override: true }
        );
        this.log(
            `You can change these settings by using:\nIE: logger.setDefaults({ color: "white", style: "bold", type: 'log'|'warn'|'err' })`,
            { override: true }
        );
    }


    /**
     * Set default log message formatting options.
     *
     * Modifies the default settings for log message formatting, including color, style,
     * and background style. Accepts an options object containing color, style, and bgStyle.
     * If provided options are valid, the function updates the corresponding default value
     * and logs a status message confirming the change. If an option is invalid, an error
     * message is logged.
     *
     * @param {Object} options - Options for updating default formatting settings.
     *   @param {string} [options.color] - The text color to set as the default.
     *     Possible values: 'reset', 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'.
     *   @param {string} [options.style] - The text style to set as the default.
     *     Possible values: 'reset', 'bold', 'dim', 'italic', 'underline', 'inverse', 'hidden', 'strikethrough'.
     *   @param {string} [options.bgStyle] - The background color to set as the default.
     *     Possible values: 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'.
     * @returns {void}
     */
    setDefaults(options = {}) {
        const { color, style, bgStyle, type } = options;

        const validTypes = ['log', 'warn', 'err'];

        if (!validTypes.includes(type)) {
            this.log(`Your chosen type '${type}' is not valid. Please choose from: ${validTypes}`,
                { color: 'red', override: true }
            );
            return;
        }

        let status = '';

        if (color) {
            if (!this.colors[color]) {
                this.log(
                    `The color '${color}' is not valid.`,
                    { color: 'red', override: true }
                );
            } else {
                this.default[type].color = color;
                status += `Default color set to: ${color}\n`;
            }
        }

        if (style) {
            if (!this.styles[style]) {
                this.log(
                    `The style '${style}' is not valid.`,
                    { color: 'red', override: true }
                );
            } else {
                this.default[type].style = style;
                status += `Default style set to: ${style}\n`;
            }
        }

        if (bgStyle) {
            if (!this.bg[bgStyle]) {
                this.log(
                    `The background style '${bgStyle}' is not valid.`,
                    { color: 'red', override: true }
                );
            } else {
                this.default[type].bg = bgStyle;
                status += `Default background style set to: ${bgStyle}\n`;
            }
        }

        this.log(status);
    }


    getMode() {
        this.log(
            `Your current mode is:`,
            { color: 'blue', override: true }
        );
        this.log(
            this.mode,
            { color: 'blue', override: true }
        );
        this.log(
            `You can change these settings by using:\nIE: logger.setMode({ silent: true/false })`,
            { override: true }
        );
    }


    /**
     * Set the logging mode to control log visibility.
     *
     * Modifies the logging mode to control whether log messages are visible or not.
     * Accepts an options object containing a `silent` property. If the `silent` property
     * is set to `true`, log messages will not be visible; if set to `false`, log messages
     * will be visible.
     *
     * @param {Object} options - Options for updating logging mode.
     *   @param {boolean} [options.silent] - If true, activates silent mode (logs are not visible).
     * @returns {void}
     */
    setMode(options = {}) {
        const { silent } = options;
        if (silent && !!silent) {
            this.mode.silent = silent;
        }
        this.log(
            `Silent mode is ${silent && 'active, logs will not be visible' || 'inactive, logs will be visible'}`,
            { override: true }
        )
    }
}

module.exports = new Logtastic();