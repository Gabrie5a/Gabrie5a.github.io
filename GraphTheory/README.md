# RNA Reconstruction Problem

## Description
The RNA construction problem involves deriving the possible original RNA chains from two fragmentations of an unknown RNA chain. One chain is broken down by the G-enzyme, and the other one by the U.C-enzyme. The algorithm implemented follows these five steps:

1. **Re-fragmenting the RNA chains:** Re-fragmenting the RNA chains with the respective enzyme.
2. **Identifying fragments:** Identifying single fragments, non-single fragments, and interior bases of each re-fragmented fragment.
3. **Identifying start and end extended bases:** Identifying the start and end extended bases of the RNA chain.
4. **Creating a multidigraph:** Creating the multidigraph based on the non-single fragments.
5. **Finding Eulerian circuits:** Finding all Eulerian circuits in the multidigraph.

## Web Interface
For ease of use, a web interface has been provided. Users only need to input an RNA chain, which will first be fragmented by the G and U.C enzymes. Then, the algorithm explained above will be followed to re-fragment and subsequently reconstruct and display the possible original RNA chains.
Deployed with GitHub Pages: https://gabrie5a.github.io/GraphTheory/index.html

## Instructions
1. **Input RNA Chain:** Provide an RNA chain to the web interface.
2. **Algorithm Execution:** The provided RNA chain will be fragmented, and then the reconstruction algorithm will be executed.
3. **Output:** The web interface will display the fragmented subsequences, re-fragmented subsequences, multidigraph and all possible original RNA chains reconstructed from the provided fragments.

