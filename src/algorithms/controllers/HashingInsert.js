export default {
    initVisualisers() {
        return null;
    },

    run(chunker, params) {
        const SMALL= 11;
        const BIG = 97;
        const BIGPRIME = 3457;
        let tableType = 0;
        let incrementType = 0;
        let insertions = 0;

        const SMALLTABLE = 1;
        const BIGTABLE = 2;
        const LINEARPROBING = 3;
        const DOUBLEHASH = 4;
        const NOTFOUND = -1;

// initialises the hash table
        function hashInit() {
            let tableSize = tableType == SMALLTABLE ? SMALL : BIG;
            let table = new Array(tableSize);

            return table;
        }

// main hashing function, changes hash based on table size
        function hash(k) {
            if (tableType == SMALLTABLE) {
                return k*BIGPRIME % SMALL;
            }
            return (k*BIGPRIME) % BIG;
        }

// sets increment based on type of collision handling as well as key
// for double hashing, the key is hashed over a different prime, 3 for small tables, 23 for large
        function setIncrement(k) {
            let smallishprime = tableType == SMALLTABLE ? 3 : 23;
            return incrementType == LINEARPROBING ? 1 : (k*BIGPRIME) % smallishprime;
        }

// changes table size, used in hashing and increment setting
        function switchTableSize() {
            tableType = tableType == SMALLTABLE ? BIGTABLE : SMALLTABLE;
        }

// toggles between linear probing and double hashing collision handling
        function changeIncrementType() {
            incrementType = incrementType == LINEARPROBING ? DOUBLEHASH : LINEARPROBING;
        }

// insert input into hash table, hashing algorithm based on table size and collision handling type
        function hashInsert(table, key) {
            let tableSize = tableType == SMALLTABLE ? SMALL : BIG;
            // checks if all but the last slot is filled
            if (insertions == tableSize) {
                console.log("Table too full");
            }
            else {
                insertions = insertions + 1;
                // get initial hash index
                let i = hash(key);

                // determines how much to increment in case of a collision
                let increment = setIncrement(key);
                // collision handling, if the key is already in the table, it will be replaced with
                // the input as if the slot was empty
                while (typeof table[i] !== 'undefined' && table[i] !== null && table[i] != key) {
                    i = (i + increment) % table.length;

                }
                table[i] = key;
            }
        }
// finds input index in table
        function hashSearch(table, key) {
            let i = hash(key);
            let startIndex = i;
            let increment = setIncrement(key);
            while (table[i] != key) {
                i = (i + increment) % table.length;

                // UNTESTED, if the index returns to the start, return not found since looping
                if (i == startIndex) {
                    return NOTFOUND;
                }
            }
            return i;
        }
// finds input in table and deletes it
        function hashDelete(table, key) {
            let i = hashSearch(table, key);
            if (i != NOTFOUND) {
                table[i] = null;
            }
        }
    },
};
