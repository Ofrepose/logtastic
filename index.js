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
        // also, create custom .log | .warn | .err
        this.mode = {
            silent: false,
            logging: {
                logToFile: false,
                toFile: {
                    directory: '',
                },
                toDB: {
                    query: ''
                },
            }
        };
    }

    setToFileMode(directory) {
        this.mode.logging.toFile.directory = directory;
        this.mode.logging.logToFile = true;
        this.log('Logging to file mode is active. Logs will be saved to the specified directory.', { color: 'green', override: true });
    }

    setLoggingMode(active){
        let activeMode = active;
        if(typeof active !== 'boolean'){
            this.warn(`setLoggingMode accepts only true or false, not ${active}. Defaulting to false.`);
            activeMode = false;
        }
        this.mode.logging.logToFile = activeMode;
        this.log(`LoggingMode is set to: ${this.mode.logging.logToFile}`);
    }

    logToFile(text, options = {}) {
        const { directory } = this.mode.logging.toFile;
        const { type = 'log' } = options;

        if (!directory) {
            console.log('Logging to file mode is not configured. Use setToFileMode(directory) to set the log directory.', { color: 'red', override: true });
            return;
        }

        try {
            const filePath = `${directory}/log_${type}.txt`;

            fs.appendFile(filePath, text + '\n', (err) => {
                if (err) {
                    console.error('Error writing to log file.', err);
                } else {
                    console.log('Log written to file successfully.', { color: 'green', override: true });
                }
            });
        } catch (err) {
            console.log(err)
        }
    }



    /**
     * Logs a message with customizable color, style, and background.
     *
     * @param {string|object} text - The text or object to be logged.
     * @param {Object} options - Options for styling the output.
     *   @param {string} [options.color] - The text color to apply.
     *     Possible values: 'reset', 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'.
     *   @param {string} [options.style] - The text style to apply.
     *     Possible values: 'reset', 'bold', 'dim', 'italic', 'underline', 'inverse', 'hidden', 'strikethrough'.
     *   @param {string} [options.bgStyle] - The background color to apply.
     *     Possible values: 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'.
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
        if (!this.mode.silent || override) {
            const appliedColors = this.colors[color] || "";
            const appliedStyles = this.styles[style] || "";
            const appliedBg = this.bg[bgStyle] || "";

            const timestamp = time ? new Date().toLocaleString() + '\n' : '';
            const traceStack = trace ? (new Error().stack.split('\n').slice(2).join('\n') + '\n') : '';

            try {
                let formattedText = (typeof text === 'string') ? text : (text instanceof Error) ? text.message : JSON.stringify(text, null, 2);

                console.log(`${appliedColors}${appliedStyles}${appliedBg}${timestamp}${formattedText}${trace && '\n' + traceStack || ''}${this.colors.reset}${this.styles.reset}`);
                this.mode.logging.logToFile && this.logToFile(new Date().toLocaleString() + ':' + formattedText, { type: 'log' })
            } catch (err) {
                console.warn('Issue with Logtastic. Which is not very logtastic of it');
                console.error(err);
                console.log(text);
            }
        }
    }


    warn(text, options = {}) {
        const {
            color = this.default.warn.color,
            style = this.default.warn.style,
            bgStyle = this.default.warn.bg,
            time = false,
            override = false,
            trace = false
        } = options;
        if (!this.mode.silent || override) {
            const appliedColors = this.colors[color] || "";
            const appliedStyles = this.styles[style] || "";
            const appliedBg = this.bg[bgStyle] || "";

            const timestamp = time ? new Date().toLocaleString() + '\n' : '';
            const traceStack = trace ? (new Error().stack.split('\n').slice(2).join('\n') + '\n') : '';

            try {
                let formattedText = (typeof text === 'string') ? text : (text instanceof Error) ? text.message : JSON.stringify(text, null, 2);

                console.log(`${appliedColors}${appliedStyles}${appliedBg}${timestamp}${formattedText}${trace && '\n' + traceStack || ''}${this.colors.reset}${this.styles.reset}`);
                this.mode.logging.logToFile && this.logToFile(new Date().toLocaleString() + ':' + formattedText, { type: 'warn' })
            } catch (err) {
                console.warn('Issue with Logtastic. Which is not very logtastic of it');
                console.error(err);
                console.log(text);
            }
        }
    }


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
        if (!this.mode.silent || override) {
            const appliedColors = this.colors[color] || "";
            const appliedStyles = this.styles[style] || "";
            const appliedBg = this.bg[bgStyle] || "";

            const timestamp = time ? new Date().toLocaleString() + '\n' : '';
            const traceStack = trace ? (new Error().stack.split('\n').slice(2).join('\n') + '\n') : '';

            try {
                const formattedText = (typeof text === 'string') ? text : (text instanceof Error) ? text.message : JSON.stringify(text, null, 2);

                console.log(`${appliedColors}${appliedStyles}${appliedBg}${timestamp}${formattedText}${trace && '\n' + traceStack || ''}${this.colors.reset}${this.styles.reset}`);
                this.mode.logging.logToFile && this.logToFile(new Date().toLocaleString() + ':' + formattedText, { type: 'err' })
                if (escape) process.exit(1);
            } catch (err) {
                console.warn('Issue with Logtastic. Which is not very logtastic of it');
                console.error(err);
                console.log(text);
            }
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
        this.log(`Your default settings are:`, { color: 'blue', override: true });
        this.log(this.default, { color: 'blue', override: true });
        this.log(`You can change these settings by using:\nIE: logger.setDefaults({ color: "white", style: "bold", type: 'log'|'warn'|'err' })`, { override: true });
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

        this.log(`Logtastic:`, { color: 'blue', override: true });

        const validTypes = ['log', 'warn', 'err'];

        if (!validTypes.includes(type)) {
            this.log(`Your chosen type '${type}' is not valid. Please choose from: ${validTypes}`,
                { color: 'red', override: true });
            return;
        }

        let status = '';

        if (color) {
            if (!this.colors[color]) {
                this.log(`The color '${color}' is not valid.`, { color: 'red', override: true });
            } else {
                this.default[type].color = color;
                status += `Default color set to: ${color}\n`;
            }
        }

        if (style) {
            if (!this.styles[style]) {
                this.log(`The style '${style}' is not valid.`, { color: 'red', override: true });
            } else {
                this.default[type].style = style;
                status += `Default style set to: ${style}\n`;
            }
        }

        if (bgStyle) {
            if (!this.bg[bgStyle]) {
                this.log(`The background style '${bgStyle}' is not valid.`, { color: 'red', override: true });
            } else {
                this.default[type].bg = bgStyle;
                status += `Default background style set to: ${bgStyle}\n`;
            }
        }

        this.log(status);
    }


    getMode() {
        this.log(`Your current mode is:`, { color: 'blue', override: true });
        this.log(this.mode, { color: 'blue', override: true });
        this.log(`You can change these settings by using:\nIE: logger.setMode({ silent: true/false })`, { override: true });
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
        this.log(`Silent mode is ${silent && 'active, logs will not be visible' || 'inactive, logs will be visible'}`, { override: true })
    }
}

module.exports = new Logtastic();