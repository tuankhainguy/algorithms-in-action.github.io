import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import '../styles/MidPanel.scss';
import NextLineButton from './NextLineButton';

function MidPanel() {
  const { algorithm } = useContext(GlobalContext);
  console.log(algorithm.bookmark);
  // const tree = new GraphTracer('key', null, 'Test graph');
  // tree.set(algorithm.nodes);
  // tree.layoutTree(5);
  // tree.visit(5, null);
  // tree.visit(3, 5);

  return (
    <div className="midPanelContainer">
      <div className="midPanelHeader">
        <div className="algorithmTitle">{algorithm.name}</div>
        <button type="button" className="quizButton">Quiz</button>
      </div>
      <div className="midPanelBody">
        {/* Animation Goes here */}
        {algorithm.graph.render()}
      </div>
      <div className="midPanelFooter">
        <div className="controlPanel">
          <NextLineButton />
        </div>
        <div className="parameterPanel">
          ADD: []; DELETE: [];SEARCH: [];
        </div>
      </div>
    </div>
  );
}


export default MidPanel;
