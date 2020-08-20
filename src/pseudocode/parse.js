/* eslint-disable linebreak-style */
/* eslint-disable dot-notation */
/* eslint-disable linebreak-style */
function removeLineContinuation(input) {
  const lines = input.split('\n');
  const output = [];
  let builtLine = '';
  for (const line of lines) {
    builtLine = `${line.trim()}`;
    if (builtLine.indexOf('//') >= 0) {
      builtLine = builtLine.substring(0, builtLine.indexOf('//'));
    }
    if (builtLine !== '') {
      output.push(builtLine);
    }
  }
  return output;
}


function extractCode(lines) {
  const jsons = [];
  let json = {};
  let explanation = '';
  let explFlag = false;
  let ind = 0;
  for (const line of lines) {
    if (line.localeCompare('\\In{') === 0) {
      ind += 1;
    } else if (line.localeCompare('\\In}') === 0) {
      ind -= 1;
    } else if (line.indexOf('\\Expl{ ') >= 0) {
      explFlag = true;
      explanation = '';
      explanation += line.substring(7, line.length);
    } else if (line.localeCompare('\\Expl}') === 0) {
      explFlag = false;
      if (Object.keys(json).length !== 0) {
        json['explanation'] = explanation;
      }
      explanation = '';
    } else if (explFlag) {
      explanation += ' ';
      explanation += line;
    } else {
      if (Object.keys(json).length !== 0) {
        jsons.push(json);
        json = {};
      }
      if (line.indexOf(' \\Ref ') >= 0) {
        json['code'] = line.substring(0, line.indexOf(' \\Ref '));
        json['ref'] = line.substring(line.indexOf(' \\Ref ') + 6, line.length);
      } else {
        json['code'] = line;
        json['ref'] = '';
      }
      json['explanation'] = '';
      json['indentation'] = ind;
    }
  }
  if (Object.keys(json).length !== 0) {
    jsons.push(json);
  }
  return jsons;
}

function extractCodeBlock(lines) {
  let codeBlock = 'Default';
  const json = {};
  let value = [];
  let codeFlag = false;
  let blockFlag = false;
  for (const line of lines) {
    if (line.localeCompare('\\Code}') === 0) {
      json[codeBlock] = extractCode(value);
      value = [];
      codeFlag = false;
    } else if (line.localeCompare('\\Code{') === 0) {
      codeFlag = true;
      blockFlag = true;
    } else if (codeFlag === true) {
      if (blockFlag) {
        codeBlock = line;
        blockFlag = false;
      } else {
        value.push(line);
      }
    }
  }
  return json;
}

let c = 0;

function addBookmark(json, name, indentation) {
  json[name].forEach((line) => {
    c += 1;
    // eslint-disable-next-line no-param-reassign
    line['indentation'] += indentation;
    if (line['ref'].length > 0) {
      // eslint-disable-next-line no-param-reassign
      line['bookmark'] = c;
      addBookmark(json, line['ref'], line['indentation']);
    } else {
      // eslint-disable-next-line no-param-reassign
      line['bookmark'] = c;
    }
  });
}

export default function parse(input) {
  const rawCode = removeLineContinuation(input);
  const json = extractCodeBlock(rawCode);
  addBookmark(json, 'Main', 0);
  return json;
}
