/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multi-spaces,indent,prefer-destructuring */
import parse from '../pseudocode/parse';
import GraphTracer from '../components/Graph/GraphTracer';
import { BSTExp } from './explanations';

export default {
  name: 'Binary Tree Search',
  pseudocode: parse(`
    \\Code{
    Main
    BST_Search(t, k)  // return subtree whose root has key k; or
                      // NotFound is no such node is present
    \\In{
        while t not Empty
        \\In{
            if t.key = k 
            \\In{
                return t
                \\Expl{  We have found a node with the desired key k.
                \\Expl}
            \\In}
            if t.key > k 
            \\Expl{  The BST condition is that nodes with keys less than the 
                    current node's key are to be found in the left subtree, and
                    nodes whose keys are greater are to be in the right subtree.
            \\Expl}
            \\In{
                t <- t.left
            \\In}
            else
            \\In{
                t <- t.right
            \\In}
        return NotFound
        \\In}
    \\In}
    \\Code}
`),
explanation: BSTExp,
nodes: [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
],
root: 5,
target: 2,
graph: new GraphTracer('key', null, 'Searching for Item = 2'),
init() {
  this.graph.set(this.nodes);
  this.graph.layoutTree(this.root);
},
// This next line is special syntax for a generator. It's just a function that uses `yield` to
// return control to the caller regularly. It yields a bookmark so the caller knows where in
// the pseudocode the execution is up to.
* run() {
    // const tree = [5, [3, [1], [4]], [8, [6], [10]]];
    const tree = [5, 
      [3, [1, [0], [2]], [4]],
      [8, [6, [7]], [10, [9]]]
    ];
    let current = null;
    let parent = null;
    
    yield { step: 1 };  current = tree[0];
                              parent = null;
                              const item = this.target;
                              let ptr = tree;
                              parent = current;
                              this.graph.visit(current, parent);
    yield { step: 2 };      while (ptr) {
    yield { step: 3 };        if (ptr[0] === item) {
    yield { step: 4 };          return;
                                }
    yield { step: 5 };        if (item < ptr[0]) {
                                  parent = current;
                                  current = ptr[1][0];
      yield { step: 6 };        ptr = ptr[1];
                                  this.graph.visit(current, parent);
                                } else {
                                  parent = current;
                                  current = ptr[2][0];
      yield { step: 8 };        ptr = ptr[2];
                                  this.graph.visit(current, parent);
                                }
                              }
    yield { step: 9 };
},
};
