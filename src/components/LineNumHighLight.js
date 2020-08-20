/* eslint-disable dot-notation */
/* eslint-disable linebreak-style */
import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
// eslint-disable-next-line import/named
import '../styles/LineNumHighLight.css';

let pseaudo = '';
const lineOfCode = {};


function addIndentation(json, name) {
  json[name].forEach((line) => {
    if (line['ref'].length > 0) {
      pseaudo = '\xa0\xa0\xa0\xa0'.repeat(line['indentation']) + line['code'] + line['bookmark'];
      lineOfCode[pseaudo] = line['bookmark'];
      addIndentation(json, line['ref'], line['indentation']);
    } else {
      pseaudo = '\xa0\xa0\xa0\xa0'.repeat(line['indentation']) + line['code'] + line['bookmark'];
      lineOfCode[pseaudo] = line['bookmark'];
    }
  });
}

export const Global = {
  PAINT_CODELINE: (lineOfCode1) => {
    const codeLines = [];
    let i = 0;
    for (const [key, value] of Object.entries(lineOfCode1)) {
      codeLines.push(
        <p>
          <span>{i + 1}</span>
          <span>{key}</span>
        </p>,
      );
      i += 1;
    }
    return codeLines;
  },
};

const LineNumHighLight = () => {
  const { algorithm } = useContext(GlobalContext);
  addIndentation(algorithm.pseudocode, 'Main');

  /* render data */

  return (
    <div className="line-light">
      <div className="code-container">
        {Global.PAINT_CODELINE(lineOfCode)}
      </div>
    </div>
  );
};

export default LineNumHighLight;