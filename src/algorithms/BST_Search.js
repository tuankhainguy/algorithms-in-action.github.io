/* eslint-disable brace-style */
/* eslint-disable linebreak-style */
/* eslint-disable no-lonely-if */
/* eslint-disable comma-dangle */
/* eslint-disable no-prototype-builtins */
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
  nodes: [[]], // a 2D array of nodes, e.g.
              // [
              //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              //   [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
              //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              //   [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
              //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              //   [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
              //   [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
              //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              //   [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
              //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
              // ],
  tree: {},  // an object contains nodes and edges, e.g.
          //  {
          //   0: {},
          //   1: { right: 2, left: 0 },
          //   2: {},
          //   3: { left: 1, right: 4 },
          //   4: {},
          //   5: { root: true, right: 8, left: 3 },
          //   6: { right: 7 },
          //   7: {},
          //   8: { right: 10, left: 6 },
          //   9: {},
          //   10: { left: 9 },
          // };
  root: -1,
  target: -1,
  graph: new GraphTracer('key1', null, 'BST - Search'),
  reset() {
    // reset the graph
    this.graph = new GraphTracer('key2', null, 'BST - Search');
    this.tree = {};
  },
  /**
   * populate the graph object using provided data
   * @param {object} tree a tree object
   * @param {number} target the item needs to be searched
   * @return the new graph and tree
   */
  init(tree, target) {
    this.tree = tree;
    this.target = target;
    this.graph.setTree(tree);
    this.setRoot(tree);
    this.graph.layoutTree(this.root);

    return { graph: this.graph, tree: this.tree };
  },
  /**
   * find and set the root node in a tree
   * @param {object} tree a tree object
   */
  setRoot(tree) {
    for (const [node, children] of Object.entries(tree)) {
      // set root node
      if (children.hasOwnProperty('root')) {
        this.root = +node;
      }
    }
  },
// This next line is special syntax for a generator. It's just a function that uses `yield` to
// return control to the caller regularly. It yields a bookmark so the caller knows where in
// the pseudocode the execution is up to.
* run() {
  let current = null;
  let parent = null;

  yield { step: 1 };        current = this.root;
                            const item = this.target;
                            let ptr = this.tree;  
                            parent = current;       
                            this.graph.visit(current, parent);
  yield { step: 2 };        while (ptr) {
  yield { step: 3 };          if (current === item) {
  yield { step: 4 };            return;
                              }
  yield { step: 5 };        if (item < current) {
                                if (this.tree[current].left !== undefined) {
                                  // if has left child
                                  parent = current;
                                  current = this.tree[current].left;
  yield { step: 6 };              ptr = this.tree[current];
                                  this.graph.visit(current, parent);
                                } else {
                                  break;
                                }
  yield { step: 7 };        } else {
                                if (this.tree[current].right !== undefined) {
                                  // if has right child
                                  parent = current;
                                  current = this.tree[current].right;
  yield { step: 8 };              ptr = this.tree[current];
                                  this.graph.visit(current, parent);
                                } else {
                                  break;
                                }
                              }
                            }
  yield { step: 9 }; 
},
};
