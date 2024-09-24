import { array } from 'prop-types';
import Array2DTracer from '../../components/DataStructures/Array/Array2DTracer';
import GraphTracer from '../../components/DataStructures/Graph/GraphTracer';
import { HashingExp } from '../explanations';
import {
  hash1,
  setIncrement,
  HASH_TABLE,
  EMPTY_CHAR,
  Colors
} from './HashingCommon.js';


const IBookmarks = {
  Init: 1,
  EmptyArray: 2,
  InitInsertion: 3,
  IncrementInsertions: 4,
  Hash1: 5,
  ChooseIncrement: 6,
  Probing: 7,
  Collision: 8,
  PutIn: 9,
  Done: 10,
}

const TYPE = 'Insert';

export default {
  explanation: HashingExp,
  initVisualisers() {
    return {
      array: {
        instance: new Array2DTracer('array', null, 'Hash Table'),
        order: 0,
      },
      graph: {
        instance: new GraphTracer('graph', null, 'Hashing Functions'),
        order: 1,
      },
    };
  },

  run(chunker, params) {
    const ALGORITHM_NAME = params.name;
    const SIZE = params.hashSize;
    let inputs = params.values;
    let indexArr = Array.from({ length: SIZE }, (_, i) => i);
    let valueArr = Array(SIZE).fill(EMPTY_CHAR);
    let nullArr = Array(SIZE).fill('');
    let table_result;

    const INDEX = 0;
    const VALUE = 1;
    const POINTER = 2;

    let insertions = 0;

    function hashInsert(table, key, prevKey, prevIdx) {
      insertions = insertions + 1;
      chunker.add(
        IBookmarks.IncrementInsertions,
        (vis, key, insertions, prevKey, prevIdx) => {
          vis.array.showKth(insertions);
          vis.array.unfill(INDEX, 0, undefined, SIZE - 1);

          // change variable value
          vis.array.assignVariable(key, POINTER, prevIdx, prevKey);

          // update key value
          vis.graph.updateNode(HASH_TABLE.Key, key);
          vis.graph.updateNode(HASH_TABLE.Value, ' ');

          if (ALGORITHM_NAME === "HashingDH") {
            vis.graph.updateNode(HASH_TABLE.Key2, key);
            vis.graph.updateNode(HASH_TABLE.Value2, ' ');
          }
        },
        [key, insertions, prevKey, prevIdx]
      );
      // get initial hash index
      let i = hash1(chunker, IBookmarks.Hash1, key, SIZE);
      let increment = setIncrement(
        chunker, IBookmarks.ChooseIncrement, key, SIZE, ALGORITHM_NAME, TYPE
      );

      chunker.add(
        IBookmarks.Probing,
        (vis, key, idx) => {
          vis.array.assignVariable(key, POINTER, idx);
          vis.array.fill(INDEX, idx, undefined, undefined, Colors.Pending);
        },
        [key, i]
      )
      while (table[i] !== undefined) {
        let prevI = i;
        i = (i + increment) % SIZE;
        chunker.add(
          IBookmarks.Collision,
          (vis, idx) => {
            vis.array.fill(INDEX, idx, undefined, undefined, Colors.Collision);
          },
          [prevI]
        )

        chunker.add(
          IBookmarks.Probing,
          (vis, key, idx) => {
            vis.array.assignVariable(key, POINTER, idx);
            vis.array.fill(INDEX, idx, undefined, undefined, Colors.Pending);
          },
          [key, i]
        )
      }

      table[i] = key;
      chunker.add(
        IBookmarks.PutIn,
        (vis, val, idx) => {
          vis.array.updateValueAt(VALUE, idx, val);
          vis.array.fill(INDEX, idx, undefined, undefined, Colors.Insert);
        },
        [key, i]
      )

      return i;
    }

    // Init hash table
    // Hide third row to show assigned variables
    let table = new Array(SIZE);
    chunker.add(
      IBookmarks.Init,
      (vis, array) => {
        vis.array.set(array, params.name, '', { rowLength: 20, rowHeader: ['Index', 'Value', ''] });
        vis.array.hideArrayAtIndex([VALUE, POINTER]);

        vis.graph.weighted(true);
        switch (ALGORITHM_NAME) {
          case "HashingLP" :
            vis.graph.set([[0, 'Hash'], [0, 0]], [' ', ' '], [[-5, 0], [5, 0]]);
            break;
          case "HashingDH" :
            vis.graph.set([[0, 'Hash1', 0, 0], [0, 0, 0, 0], [0, 0, 0, 'Hash2'], [0, 0, 0, 0]], [' ', ' ', ' ', ' '], [[-5, 2], [5, 2], [-5, -2], [5, -2]]);
            break;
        }
      },
      [[indexArr, valueArr, nullArr]]
    );

    chunker.add(
      IBookmarks.EmptyArray,
      (vis) => {
        // Show the value row
        vis.array.hideArrayAtIndex(POINTER);
      },
    );

    chunker.add(
      IBookmarks.InitInsertion,
      (vis) => {
        vis.array.showKth([0, ""]);
      }
    )

    let prevKey;
    let prevIdx;
    for (const key of inputs) {
      prevIdx = hashInsert(table, key, prevKey, prevIdx);
      prevKey = key;
    }

    chunker.add(
      IBookmarks.Done,
      (vis, key) => {
        vis.array.assignVariable(key, POINTER, undefined);
        vis.array.unfill(INDEX, 0, undefined, SIZE - 1);

        vis.graph.updateNode(HASH_TABLE.Key, ' ');
        vis.graph.updateNode(HASH_TABLE.Value, ' ');
        
        if (ALGORITHM_NAME === 'HashingDH') {
          vis.graph.updateNode(HASH_TABLE.Key2, ' ');
          vis.graph.updateNode(HASH_TABLE.Value2, ' ');
        }

        table_result = vis.array.extractArray([1], "x")
      },
      [prevKey]
    )
    
    return table_result;
  },
};
