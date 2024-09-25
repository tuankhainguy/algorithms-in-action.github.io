import Array2DTracer from '../../components/DataStructures/Array/Array2DTracer';
import GraphTracer from '../../components/DataStructures/Graph/GraphTracer';
import {
  hash1,
  setIncrement,
  HASH_TABLE,
  EMPTY_CHAR,
  Colors
} from './HashingCommon';

const MAX_PARAMS_SIZE = 100;

const IBookmarks = {
  Init: 1,
  ApplyHash: 5,
  ChooseIncrement: 6,
  WhileNot: 2,
  Increment: 3,
  CheckValue: 4,
  Found: 7,
  NotFound: 8,
}

const TYPE = 'Search';

export default {
  initVisualisers({ visualisers }) {
    return {
      array: {
        instance: visualisers.array.instance,
        order: 0,
      },
      graph: {
        instance: visualisers.graph.instance,
        order: 1,
      },
    };
  },

  run(chunker, params) {

    const TARGET = params.target; // Target value we are searching for
    const SIZE = params.hashSize; // Hash Modulo being used in the table
    let table = params.visualisers.array.instance.extractArray(1, EMPTY_CHAR); // The table with inserted values

    const INDEX = 0;
    const POINTER = 2;
    const POINTER_VALUE = "i";
    const SMALL = 11;

    let found = true;

    // Clear previous stuff and set start value to target value
    // Currently has a bug where if you search for a different number, the previous one remains on the screen
    chunker.add(
      IBookmarks.Init,
      (vis, target) => {

        vis.array.showKth({key: target});
        vis.array.unfill(INDEX, 0, undefined, SIZE - 1);
        vis.array.resetVariable(POINTER);

        vis.graph.updateNode(HASH_TABLE.Key, target);
        vis.graph.updateNode(HASH_TABLE.Value, ' ');

        for (let i = 0; i < SIZE; i++) {
          vis.array.unfill(INDEX, 0, undefined, SIZE - 1)
        }
      },
      [TARGET]
    );

    // Hashing the search value
    let i = hash1(chunker, IBookmarks.ApplyHash, TARGET, SIZE); // Target value after being hashed

    // Fix later, should have different line of Pseudocode
    let increment = setIncrement(chunker, IBookmarks.ChooseIncrement, TARGET, SIZE, params.name, TYPE);

    // Highlight initial search position
    chunker.add(
      IBookmarks.WhileNot,
      (vis, idx) => {
        if (SIZE === SMALL) {
          vis.array.assignVariable(POINTER_VALUE, POINTER, idx);
        }
        vis.array.fill(INDEX, idx, undefined, undefined, Colors.Pending);
      },
      [i]
    );

    // Search for the target key, checking each probed position
    while (table[i] !== TARGET && table[i] !== undefined) {

      // Highlight the position with Red since not a match
      chunker.add(
        IBookmarks.WhileNot,
        (vis, idx) => {
          vis.array.fill(INDEX, idx, undefined, undefined, Colors.Collision);
        },
        [i]
      );

      // Move to the next index based on collision handling
      i = (i + increment) % SIZE;

      // Move number to next position based on Increment
      chunker.add(
        IBookmarks.Increment,
        (vis, idx) => {
          if (SIZE === SMALL) {
            vis.array.assignVariable(POINTER_VALUE, POINTER, idx);
          }
        },
        [i]
      );

      // Changes colour for pending search status
      chunker.add(
        IBookmarks.WhileNot,
        (vis, idx) => {
            vis.array.fill(INDEX, idx, undefined, undefined, Colors.Pending);
        },
        [i]
      );
    }
    // If target has been found in search
    if (table[i] === TARGET) {
      chunker.add(
        IBookmarks.Found,
        (vis, idx) => {
          vis.array.fill(INDEX, idx, undefined, undefined, Colors.Insert); // Indicate that the key is found
        },
        [i]
      );
    }

    // If target is not found in the list
    else {
      chunker.add(
        IBookmarks.NotFound,
        (vis, idx) => {
          vis.array.fill(INDEX, idx, undefined, undefined, Colors.Collision);
          found = false;
        },
        [i]
      );
    }
    return found;
  },
};
