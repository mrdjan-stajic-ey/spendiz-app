//I copied this from interwebz
export const tokenize = (str: string): {id: string; text: string}[] => {
  const punct =
      '\\[' +
      '\\!' +
      '\\"' +
      '\\#' +
      '\\$' + // since javascript does not
      '\\%' +
      '\\&' +
      "\\'" +
      '\\(' +
      '\\)' + // support POSIX character
      '\\*' +
      '\\+' +
      '\\,' +
      '\\\\' +
      '\\-' + // classes, we'll need our
      '\\.' +
      '\\/' +
      '\\:' +
      '\\;' +
      '\\<' + // own version of [:punct:]
      '\\=' +
      '\\>' +
      '\\?' +
      '\\@' +
      '\\[' +
      '\\]' +
      '\\^' +
      '\\_' +
      '\\`' +
      '\\{' +
      '\\|' +
      '\\}' +
      '\\~' +
      '\\]',
    re = new RegExp( // tokenizer
      '\\s*' + // discard possible leading whitespace
        '(' + // start capture group #1
        '\\.{3}' + // ellipsis (must appear before punct)
        '|' + // alternator
        '\\w+\\-\\w+' + // hyphenated words (must appear before punct)
        '|' + // alternator
        "\\w+'(?:\\w+)?" + // compound words (must appear before punct)
        '|' + // alternator
        '\\w+' + // other words
        '|' + // alternator
        '[' +
        punct +
        ']' + // punct
        ')', // end capture group #1
    ),
    tokens = str.split(re), // split string using tokenizing regex
    result = [];

  // add non-empty tokens to result
  for (let i = 0, len = tokens.length; i++ < len; ) {
    if (tokens[i]) {
      const removePunctiatonSigns = tokens[i].replace(
        /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
        '',
      );
      if (removePunctiatonSigns.length > 0) {
        result.push({id: `${i}_index_${tokens[i]}`, text: tokens[i]});
      }
    }
  }

  return result;
};
