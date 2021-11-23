export const splitByWordsWithInterpuction = (rawSms: string): string[] => {
  return rawSms.replace(/([ ]+)/g, '$1§sep§').split('§sep§');
};

//I copied this from interwebz / remove punctiations singes and returns all the substrings from message, (eg: price: 15,22456.00  will be 15 22456 00)
export const tokenize = (
  str: string,
  removeUniques: boolean = true,
): {id: string; text: string}[] => {
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
    result: {id: string; text: string}[] = [];
  // add non-empty tokens to result
  for (let i = 0, len = tokens.length; i++ < len; ) {
    if (tokens[i]) {
      const removePunctiatonSigns = tokens[i].replace(
        /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
        '',
      );

      //I dont have a clue what this function does but this is the way; Coppied it from internet and it works for me

      if (!removeUniques && removePunctiatonSigns.length > 0) {
        // i was really high while writing this sorry
        result.push({id: 'no_key', text: tokens[i]}); // this will skip the check of the uniques
        continue;
      }
      const isPresent =
        result
          .map(r => r.text.toLowerCase())
          .indexOf(tokens[i].toLowerCase()) === -1;
      if (removePunctiatonSigns.length > 0) {
        if (isPresent) {
          result.push({id: `${i}_index_${tokens[i]}`, text: tokens[i]});
        }
      }
    }
  }
  console.log(
    'token rezult',
    result.map(r => r.text),
  );
  return result;
};
