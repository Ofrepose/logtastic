const { colors, styles, bg } = require('./colors');

class Logtastic {
    constructor() {
        this.colors = colors;
        this.styles = styles;
        this.bg = bg;

        this.default = {
            color: '',
            style: '',
            bg: '',
        }
        this.mode = {
            silent: false
        };
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
        const { color = this.default.color, style = this.default.style, bgStyle = this.default.bg, time = false, override = false } = options;
        if (!this.mode.silent || override) {
            const appliedColors = color ? this.colors[color] : "";
            const appliedStyles = style ? this.styles[style] : "";
            const appliedBg = bgStyle ? this.bg[bgStyle] : "";

            let timestamp = time && new Date().toLocaleString() || '';

            try {
                if (typeof text === 'string') {
                    console.log(`${timestamp}\n${appliedColors}${appliedStyles}${appliedBg}${text}${this.colors.reset}${this.styles.reset}`);
                } else {
                    const styledObject = JSON.stringify(text, null, 2); // Pretty-print with 2-space indentation
                    console.log(`${timestamp+'\n'}${appliedColors}${appliedStyles}${appliedBg}${styledObject}${this.styles.reset}${this.colors.reset}`);
                }
            } catch (err) {
                console.warn('Issue with Logtastic. Which is not very logtastic of it');
                console.log(text);
            }
        }
    }

    getDefaults() {
        this.log(`Your default settings are:`, { color: 'blue', override: true });
        this.log(this.default, { color: 'blue', override: true });
        this.log(`You can change these settings by using:\nIE: logger.setDefaults({ color: "white", style: "bold" })`, { override: true });
    }

    setDefaults(options = {}) {
        const { color, style, bgStyle } = options;
        this.log(`Logtastic:`, { color: 'blue', override: true })
        let status = '';
        if (color) {
            if (!this.colors[color]) {
                this.log(`Your color choice: ${color} is not a valid choice`, { color: 'red', override: true });
            } else {
                this.default.color = color;
                status += `default color is now: ${color}\n`
            }
        }
        if (style) {
            if (!this.styles[style]) {
                this.log(`Your style choice: ${style} is not a valid choice`, { color: 'red', override: true });
            } else {
                this.default.style = style;
                status += `default style is now: ${style}\n`
            }
        }
        if (bgStyle) {
            if (!this.bg[bgStyle]) {
                this.log(`Your bgStyle choice: ${bgStyle} is not a valid choice`, { color: 'red', override: true });
            } else {
                this.default.bg = bgStyle;
                status += `default background style is now: ${bgStyle}\n`
            }
        }
        this.log(status)
    };

    getMode() {
        this.log(`Your current mode is:`, { color: 'blue', override: true });
        this.log(this.mode, { color: 'blue', override: true });
        this.log(`You can change these settings by using:\nIE: logger.setMode({ silent: true/false })`, { override: true });
    }

    setMode(options = {}) {
        const { silent } = options;
        if (silent && !!silent) {
            this.mode.silent = silent;
        }
        this.log(`Silent mode is ${silent && 'active, logs will not be visible' || 'inactive, logs will be visible'}`,{ override: true })

    }
}

module.exports = new Logtastic();