# Hashing (linear probing)
---

XXX not complete

Hashing is a method for storing and looking up records that can be very
effiient.  It is based on the arithmetic transformation of the record
key into a table address.

Hashing provides a good quick search, providing that certain conditions
are observed.

In particular, the hashed keys should spread out over the table as evenly
as possible.  To achieve this, the hash function should use as much
of the key as possible, and the hashed key and the table size should
be be relatively prime.  This last can be achieved by making the table
size prime.
XXX Here we use 97.

Additionally, even in sparse tables, sometimes two keys will hash to the
same value. Provision must be taken to resolve collisions, as there is
always the chance resolve these collisions. Three commonly used methods
for collision resolution common and are shown in this XXX module: linear
probing, double hashing, and chaining.

While the average case for search is quite fast for hash, performance
degrades quite dramatically as the table starts to get full, particularly
for unsuccessful searches, which must effecively search the whole
table XXX.  It is necessary to keep track of the number of records in
the table, and to make sure this is well below the size of the table.
One tactic used is to increase the table size every time the number of
records gets above the capacity; previously inserted records need to
have their keys rehashed and relocated in the larger table.




The hash table size and the




blah blah  O(1), catastrophic failure, chaining advantages and complexity
see Sedgewick p592 for heuristic O() for double and linear.



This module uses open addressing methods for collision resolution -
linear probing and double hashing.

XXX
Deletion from hash tables is a bit subtle - we cannot just remove an
element and make the slot empty as the slot may have been skipped over
to resolve a collision in a previous insertion. The simplest solution is
to just mark slots as deleted. Here our pseudocode assumes table slots
can be occupied by a key or have one of two special values: Empty or
Deleted. Insertion can fill Empty and Deleted slots but searching must
continue if a Deleted slot is encountered. Deleted slots can slow down
searching, so if the number of Deleted slots reaches some threshold is
may be worth reconstructing the whole table to eliminate them.

module.  XXX not too hard if you just mark things as deleted - could
include it perhaps?

Put this somewhere:
The performance of open addressing hash methods degrades
as the table gets full.  Setting a maximum capacity prevents
this degradation. Often the strategy will be to double the
table size when the capacity is met.

Load factor stuff separate from Real but we should have a quick way for
students to set various load factors to see what happens, maybe 0, 50%,
80%, 95%?

Should say array index starts at zero
