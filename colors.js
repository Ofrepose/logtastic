  // Define ANSI color codes
const colors = {
    reset: "\x1b[0m",
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    gray: "\x1b[90m",
    brightRed: "\x1b[91m",
    brightGreen: "\x1b[92m",
    brightYellow: "\x1b[93m",
    brightBlue: "\x1b[94m",
    brightMagenta: "\x1b[95m",
    brightCyan: "\x1b[96m",
    brightWhite: "\x1b[97m",
    orange: "\x1b[38;5;202m",
    pink: "\x1b[38;5;206m",
    teal: "\x1b[38;5;51m",
    lavender: "\x1b[38;5;183m",
    turquoise: "\x1b[38;5;80m",
    gold: "\x1b[38;5;178m",
    maroon: "\x1b[38;5;124m",
    navy: "\x1b[38;5;17m",
    olive: "\x1b[38;5;100m",
    deepPurple: "\x1b[38;5;57m",
    lime: "\x1b[38;5;190m",
    indigo: "\x1b[38;5;62m",
    skyBlue: "\x1b[38;5;117m",
    lightPink: "\x1b[38;5;211m",
    salmon: "\x1b[38;5;209m",
    darkGreen: "\x1b[38;5;28m",
    darkCyan: "\x1b[38;5;30m",
    darkBlue: "\x1b[38;5;18m"
  };

  const bg = {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
  }
  
  // Define ANSI style codes
  const styles = {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    italic: "\x1b[3m",
    underline: "\x1b[4m",
    inverse: "\x1b[7m",
    hidden: "\x1b[8m",
    strikethrough: "\x1b[9m",
    blink: "\x1b[5m",        // some terminals wont like this.
    rapidBlink: "\x1b[6m",   // some terminals wont like this but in a more rapid fashion.
    doubleUnderline: "\x1b[21m", 
    overline: "\x1b[53m",
  };

  module.exports = {
    colors,
    styles,
    bg
  }