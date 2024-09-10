import parse from '../../pseudocode/parse';

export default parse(`

\\Code{
    Main
    HashInit(T)    // TableSize is prime
        \\In{
            Initialize Hash Table Slots to Empty   \\Ref NullTable
            Insertions <- 0    // Keep track of how full table is \\Ref Insert
        \\In}
\\Code}

\\Code{
    NullTable
        i <- 0
        while i<TableSize
        \\In{
            T[i] <- Empty     // Table must start with all slots empty
            i <- i+1
        \\In}
\\Code}

\\Code{
    Insert
    HashInsert(T, k)  // Insert key k into table T
        \\In{
            Check how full the table is
            \\Expl{ One empty slot must always be maintained,
                to prevent to potential for infinite looping. Even before this point,
                performance degrades if the table gets too full, say over 80% full.
                See Overview for more details.
            \\Expl}
            \\Note{ The animation should stop inserting with a "Table too full" message
                if there is an attempt to fill the last slot.
                It would be good to ask if student wants to switch to "Search" and then allow searches.
            \\Note}

            Insertions <- Insertions + 1
            \\Expl{ To check how full the table is we can maintain a simple
                counter.
            \\Expl}
            i <- hash(k) \\Ref Hash1
            Choose Increment value in case of collisions \\Ref SetIncrementLinearProbing
            while T[i] is occupied by another element // search for unoccupied slot
            \\Expl{ Duplicate keys should be avoided for hashing. If T[i] = k
                   then k already exists in the table. We could explicitly check
                   for this but the code here simply over-writes the previous
                   ocurrence of k, as if the slot was empty.
           \\Expl}
                \\In{
                    i <- (i + Increment) mod TableSize
                    \\Expl{ T[i] is occupied so we jump ahead Increment steps.
                        We use modulo TableSize to "wrap around" if we reach the end.
                    \\Expl}
                \\In}
            T[i] <- k // unoccupied slot found so we put k in it
        \\In}
\\Code}

\\Code{
    HashDelete(T, i)    // mark T[i] as Deleted
                        // To delete a key we need to search for it first
        T[i] <- Deleted
        \\Expl{ T[i] is no longer considered occupied, so a key may be
                inserted here, but searching does not stop at Deleted slots,
                only Empty ones (or if we find the key).
        \\Expl}
        Check how many Deleted slots there are in the table
        \\Expl{ Deleted slots slow down searching and limit table capacity as
                there must be at least one Empty slot for searching. If
                some threshold is reached a new table can be allocated with
                all slots Empty then all keys in the old table can be
                inserted into the new table and the old table discarded.
        \\Expl}
\\Code}

\\Code{
    Hash1
        i <- (k * BIGPRIME) mod TableSize
        \\Expl{ XXX blah blah Want BIGPRIME much bigger than TableSize
            Here we use BIGPRIME = 3457
        \\Expl}
\\Code}

\\Code{
    SetIncrementLinearProbing
        Increment <- 1
        \\Expl{ For linear probing, if we have a collision we just look at the
            next table entry. This tends to form "clusters" of full table
            entries, reducing performance.  Offset linear probing adds some
            fixed number n to the table index for collisions. It's harder to
            see the clusters in the table but effectively they are still there
            and performance is not improved.
        \\Expl}
\\Code}

\\Code{
    SetIncrementDoubleHashing
        Increment <- (k * BIGPRIME2) mod SMALLISHPRIME + 1
        \\Expl{ For double hashing, the increment we use for the table index
            to resolve collisions depends on the key k. We apply a secondary
            hash function to k but must also ensure the increment is non-zero.
            This reduces clustering in the table. Here we use
            BIGPRIME2=1429, SMALLISHPRIME=23
        \\Expl}
\\Code}
`);
