import React from 'react';
import { GraphRenderer } from './renderers';
import './App.css';
import parsePseudocode from './pseudocode/parse';
import algorithms from './algorithms';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <head>
          This is a short example to show correct parsing of the pseudocode
        </head> */}
        <br />
        { JSON.stringify(parsePseudocode(algorithms.binaryTreeSearch.pseudocode)) }
      </header>
      <GraphRenderer />
    </div>
  );
}

export default App;
