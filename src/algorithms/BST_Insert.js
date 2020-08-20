/* eslint-disable require-yield */
/* eslint-disable brace-style */
/* eslint-disable no-plusplus */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multi-spaces,indent,prefer-destructuring */
import parse from '../pseudocode/parse';
import GraphTracer from '../components/Graph/GraphTracer';
import { BSTExp } from './explanations';

export default {
  name: 'Binary Tree Insertion',
  pseudocode: parse(`
  \\Code{
    Main
    BST_Build(keys)  // return the BST that results from inserting nodes
                     // with keys 'keys', in the given order, into an
                     // initially empty BST
    t <- Empty
    for each k in keys
    \\In{
        t <- BST_Insert(t, k) \\Ref Insert
    \\In}
    \\Code}
  \\Code{
    Insert
    BST_Insert(t, k) // Insert key k in BST t, maintaining the BST invariant
    \\In{
        n <- new Node     // create a new node to hold key k
        n.key <- k
        n.left <- Empty   // it will be a leaf, that is,
        n.right <- Empty  // it has empty subtrees
        
        if t = Empty
        \\In{
            return n      // in this case, the result is a tree with just one node
            \\Expl{  If the tree is initially empty, the resulting BST is just
                    the new node, which has key k, and empty sub-trees.
            \\Expl}
        \\In}
        Locate the node p that should be the parent of the new node n. \\Ref Locate
        if k < p.key 
        \\Expl{  The new node n (whose key is k) will be a child of p. We just 
                need to decide whether it should be a left or a right child of p.
        \\Expl}
        \\In{
            p.left <- n       // insert n as p's left child         
        \\In}
        else
        \\In{
            p.right <- n      // insert n as p's right child        
        \\In}
        return t                                                    
    \\In}
    \\Code}
    
    \\Code{
    Locate
    c <- t            // c traverses the path from the root to the insertion point
    
    \\Expl{  c is going to follow a path down to where the new node is to 
            be inserted. We start from the root (t).
    \\Expl}
    repeat
    \\In{
        p <- c        // when the loop exits, p will be c's parent
        \\Expl{  Parent p and child c will move in lockstep, with p always 
                trailing one step behind c.
        \\Expl}
        if k < c.key
        \\Expl{  The BST condition is that nodes with keys less than the current
                node's key are to be found in the left subtree, and nodes whose
                keys are greater (or the same) are to be in the right subtree.
        \\Expl}
        \\In{
            c <- c.left
        \\In}
        else
        \\In{
            c <- c.right
        \\In}
    \\In}
    until c = Empty
    \\Expl{  At the end of this loop, c has located the empty subtree where new
            node n should be located, and p will be the parent of the new node.
    \\Expl}
    \\Code}
`),
  explanation: BSTExp,
  elements: [1, 2],  // elements to be inserted, e.g. [5,8,10,3,1,6,9,7,2,0,4]
  graph: new GraphTracer('key1', null, 'BST - Insertion'),
  tree: {},
  reset() {
    // reset the graph
    this.graph = new GraphTracer('key2', null, 'BST - Insertion');
    this.elements = [];
    this.tree = {};
  },
  /**
   * 
   * @param {array} nodes array of numbers
   * @return the new graph and tree
   */
  init() {
    // set data dynamically
    this.elements = [1, 2];
    return { 
      graph: this.graph, 
      tree: this.tree 
    };
  },
  // This next line is special syntax for a generator. It's just a function that uses `yield` to
  // return control to the caller regularly. It yields a bookmark so the caller knows where in
  // the pseudocode the execution is up to.
  * run() {
                            let parent;
                            let root;

    yield { step: 3 };      for (let i = 0; i < this.elements.length; i++) {
    yield { step: 4 };
                              if (i === 0) {
                                root = this.elements[i];
                                if (root) {
                                  this.tree[root] = { root: true };
                                }
                                this.graph.addNode(root);
    yield { step: 6 };          this.graph.layoutTree(root, true);
                              } else {
                              const element = this.elements[i];
                              this.tree[element] = {};
    yield { step: 6 };        this.graph.addNode(element);

                              let ptr = this.tree;
                              parent = root;
    yield { step: 12 };                            
    yield { step: 14 };       while (ptr) {
    yield { step: 16 };         if (element < parent) {
                                  if (this.tree[parent].left !== undefined) {
                                    // if has left child
                                    parent = this.tree[parent].left;
                                    ptr = this.tree[parent];
                                  } else {
                                    break;
                                  }
    yield { step: 18 };         } else if (element > parent) {
                                  if (this.tree[parent].right !== undefined) {
                                    // if has right child
                                    parent = this.tree[parent].right;
                                    ptr = this.tree[parent];
                                  } else {
                                    break;
                                  }
                                }
                              }
                              
    yield { step: 21 };       if (element < parent) {
                                this.tree[parent].left = element;
    yield { step: 22 };         this.graph.addEdge(parent, element);
    yield { step: 23 };       } else {
                                this.tree[parent].right = element;
    yield { step: 24 };         this.graph.addEdge(parent, element);
                              }
                            }
                            }
  },
};
