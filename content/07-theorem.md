We now combine the compact representation, gate updates, and measurement rules into a classical simulation algorithm. The goal is to generate the same random output as the quantum circuit, with the same probabilities.

## The theorem

<aside class="theorem-statement" markdown="1">
**Gottesman–Knill theorem, final-measurement form.** Consider an $n$-qubit circuit initialized in $|0^n\rangle$, followed by $s$ gates chosen from $H$, $S$, and CNOT, and then computational-basis measurements of all qubits. A classical randomized algorithm samples exactly the joint distribution of its $n$ output bits in time polynomial in $n+s$, using $O(n^2)$ bits to represent and update the state. [1, 2]
</aside>

Here $|0^n\rangle=|0\rangle^{\otimes n}$ means that every qubit starts in 0. **Exact sampling** means that every possible output string has exactly the same probability under the simulator as under the quantum circuit. One run returns one string; repeated runs produce independent samples when we restart and use fresh randomness.

<aside class="worked-example" markdown="1">
### Example: what a correct sample looks like

For the Bell circuit, a simulator can flip one fair coin and output $00$ on heads or $11$ on tails. This gives the required probabilities: $1/2$ for each of those strings and zero for $01$ and $10$. Producing two independent fair bits would give the wrong distribution.
</aside>

## The algorithm

The simulator receives the number of qubits and the list of gates, including which qubits they act on.

1. **Initialize:** store the $n$ generators $Z_0,\ldots,Z_{n-1}$ of $|0^n\rangle$. The compact-description theorem says these determine the starting state.
2. **Apply the gates:** for each gate $U$, replace every generator $g_i$ by $Ug_iU^\dagger$, using the [local signed update rules](./clifford-gate-updates.html).
3. **Measure:** for $j=0,\ldots,n-1$, use the [two measurement cases](./sampling-measurements.html) with $M=Z_j$. Choose its deterministic outcome or flip a fair coin, record the resulting bit, and retain the updated generators.
4. **Return:** output the recorded string $b_0\cdots b_{n-1}$.

Processing the measurements one at a time reproduces a measurement of the full register. The projectors on different qubits commute, and their product selects the same basis vector as the full measurement. Updating after each outcome supplies the correct conditional distribution for the next bit.

## Why the output distribution is correct

We prove correctness by maintaining an **invariant**: the stored generators describe the quantum state conditioned on the outcomes already sampled, and every sampled prefix has the correct probability. Here “conditioned” means the state assuming those earlier measurement results occurred.

**Initialization.** The constraints $Z_j|\psi\rangle=|\psi\rangle$ require every bit to be 0. The initial list therefore describes $|0^n\rangle$, and the empty output prefix has probability 1.

**A gate step.** If the stored generators describe $|\psi\rangle$, then

\[
(Ug_iU^\dagger)(U|\psi\rangle)=U|\psi\rangle.
\]

Thus the updated generators stabilize the new state. As shown in Section 5, conjugation preserves commutation, independence, and consistency, and our allowed gates keep every generator a signed Pauli string. The updated list uniquely determines the new state.

**A measurement step.** Section 6 supplies both the exact conditional probabilities and the generators of each resulting conditional state. The simulator chooses an outcome using those probabilities and stores the corresponding list. The probability of an extended prefix is the old prefix's probability multiplied by the correct conditional probability of its new bit. An outcome of probability zero is never selected.

Induction over the gates and measurements proves the invariant. After all $n$ measurements, each prefix is a full output string, so the entire joint distribution is correct—including correlations between bits.

## Why the algorithm is efficient

Each generator has $n$ Pauli letters, encoded by two bits each, and one sign bit. Therefore the state description uses

\[
n(2n+1)=O(n^2)
\]

bits. The algorithm updates these rows directly.

| Task | Number of tasks | Cost per task |
| --- | --- | --- |
| Initialize the generator list | $1$ | $O(n^2)$ |
| Apply a one- or two-qubit gate | $s$ | $O(n)$ |
| Sample one qubit and update the list | $n$ | At most $O(n^3)$ |

For a gate, each row needs only one or two letters and possibly its sign changed. Fixed lookup rules give constant work per row.

For a measurement, scanning the relevant column costs $O(n)$. In the random case, at most $n-1$ products of length-$n$ rows cost $O(n^2)$. In the deterministic case, binary Gaussian elimination costs $O(n^3)$, followed by at most $O(n^2)$ work to recover the sign.

Adding the costs gives

\[
O(n^2)+O(ns)+O(n^4)=O(ns+n^4).
\]

This counts elementary array operations; a Turing-machine implementation still has only polynomial overhead. The elimination workspace uses $O(n^2)$ bits as well. All arithmetic uses bits and the finite Pauli phases, and all random choices are fair coin flips. The resulting distribution is exact. Faster implementations exist, but this bound already proves the theorem.

The reason simulation succeeds is that every allowed operation preserves a compact description that can be updated efficiently. This includes entangled states such as the Bell state: entanglement alone does not guarantee a computational speedup.

## Check your understanding {#practice}

### 1. Sampling a large distribution

Does the simulator have to produce a list of all $2^n$ output probabilities?

<details markdown="1">
<summary>Show answer</summary>

No. It returns one $n$-bit string with exactly the quantum circuit's distribution. Run the algorithm again from its initial generators, with fresh randomness, to obtain another independent sample. The exponentially many possible outputs do not force one run to list them.
</details>

### 2. Checking the resource bound

If a circuit has $s=n^2$ gates, what running-time and state-storage bounds does our algorithm give?

<details markdown="1">
<summary>Show answer</summary>

Substituting $s=n^2$ gives $O(n^3+n^4)=O(n^4)$ time in the array model and $O(n^2)$ bits for the state description. In this conservative bound, measurement is the larger cost.
</details>

### 3. Understanding the theorem's scope

Does this proof show that every quantum circuit can be simulated efficiently? What must be checked if we add a different kind of gate?

<details markdown="1">
<summary>Show answer</summary>

No. We proved that H, S, and CNOT preserve signed Pauli generators under conjugation and admit efficient local updates. A new gate needs that property, or another efficiently updatable representation, before the same proof can go through. Failure of our particular representation alone would not prove that a circuit is hard to simulate.
</details>

**Carry forward:** exact classical sampling is possible when we can store the state compactly, update it efficiently, and sample the correct conditional measurements.
{: #takeaways}

## References {#references}

1. Ronald de Wolf, [Quantum Computing: Lecture Notes](https://homepages.cwi.nl/~rdewolf/qcnotes.pdf), §20.3, Theorem 6. These notes also cover a broader form with intermediate measurements.
2. Scott Aaronson and Daniel Gottesman, [Improved Simulation of Stabilizer Circuits](https://arxiv.org/pdf/quant-ph/0406196), §§II–III. Their optimized simulator improves the measurement cost; the proof here uses ordinary Gaussian elimination.
