const { colors, styles, bg } = require('./colors');

class Logtastic {
    constructor() {
        this.colors = colors;
        this.styles = styles;
        this.bg = bg;
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
    log(text, { color = this.colors.reset, style = '', bgStyle }) {
        const appliedColors = color ? this.colors[color] : "";
        const appliedStyles = style ? this.styles[style] : "";
        const appliedBg = bgStyle ? this.bg[bgStyle] : "";
        try {
            if (typeof text === 'string') {
                console.log(`${appliedColors}${appliedStyles}${appliedBg}${text}${colors.reset}${styles.reset}`);
            } else {
                const styledObject = JSON.stringify(text, null, 2); // Pretty-print with 2-space indentation
                console.log(`${appliedColors}${appliedStyles}${appliedBg}${styledObject}${styles.reset}${colors.reset}`);
            }
        } catch (err) {
            console.warn('Issue with Logtastic. Which is not very logtastic of it');
            console.log(text);
        }
    }
}

module.exports = new Logtastic();