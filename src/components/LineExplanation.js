import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import findBookmark from '../pseudocode/findBookmark';

function LineExplanation() {
  const { algorithm } = useContext(GlobalContext);
  console.log(findBookmark(algorithm.pseudocode, algorithm.bookmark));
  return (
    <div className="lineExplanation">
      {findBookmark(algorithm.pseudocode, algorithm.bookmark).explanation}
    </div>
  );
}

export default LineExplanation;
