We can now combine the representation, gate rules, and measurement procedure into a complete classical algorithm.

## The theorem

<aside class="theorem-statement" markdown="1">
**Gottesman–Knill theorem, final-measurement form.** Consider an $n$-qubit circuit initialized in $|0^n\rangle$, followed by $s$ gates chosen from $H$, $S$, and CNOT, and then computational-basis measurements of all qubits. A classical randomized algorithm samples exactly the joint distribution of its $n$ output bits in time polynomial in $n+s$, using $O(n^2)$ bits to represent and update the state. [1, 2]
</aside>

We write $|0^n\rangle=|0\rangle^{\otimes n}$. The bounds below describe a simple algorithm. Faster implementations exist, but polynomial time is the conclusion we need.

## The algorithm

1. **Initialize:** store the $n$ generators $Z_0,\ldots,Z_{n-1}$ of $|0^n\rangle$.
2. **Apply the gates:** for each gate $U$, replace every generator $g_i$ by $Ug_iU^\dagger$, using the local signed Pauli update rules.
3. **Measure:** for $j=0,\ldots,n-1$, apply the procedure from Section 6 to $M=Z_j$. Record the output bit and retain the updated generators.
4. **Return:** output the recorded string $b_0\cdots b_{n-1}$.

Although the measurements are processed sequentially, they reproduce a computational-basis measurement of the full register. The projectors on different qubits commute; their product selects the same basis vector as the full measurement.

## Why the output distribution is correct

We maintain this invariant: **the stored generators describe the quantum state conditioned on the measurement outcomes sampled so far, and every sampled prefix has the correct probability.**

Initially, the generators describe $|0^n\rangle$, and the empty prefix has probability $1$.

For a gate, the conjugation identity

$$
(Ug_iU^\dagger)(U|\psi\rangle)=U|\psi\rangle
$$

shows that the updated generators stabilize the new state. Conjugation preserves commutation, independence, and consistency. Section 5 established that these gates preserve signed Pauli strings, so the representation remains valid.

For a measurement, Section 6 computes its exact conditional outcome probabilities and produces generators for the resulting conditional state. The classical algorithm chooses between outcomes with those same probabilities. Multiplying the probability of the previous prefix by this conditional probability gives the correct probability of the extended prefix. An impossible outcome is never selected.

Induction over the circuit gates and successive measurements proves the invariant. After the last measurement, it establishes equality of the entire output distributions, including all correlations.

## Why the algorithm is efficient

Each generator has $n$ Pauli letters and one sign. The $n$ generators therefore use $n(2n+1)=O(n^2)$ bits.

A one- or two-qubit gate changes only one or two letters and the sign in each row. Using fixed local rules costs $O(n)$ operations per gate, or $O(ns)$ altogether.

For each measurement, the commutation test scans one column. A random outcome requires at most $n-1$ products of length-$n$ strings, costing $O(n^2)$. A deterministic outcome uses binary Gaussian elimination in $O(n^3)$, followed by sign recovery in $O(n^2)$. There are $n$ measurements, so their total cost is at most $O(n^4)$. Initialization costs $O(n^2)$ and is absorbed in this bound.

Adding the costs gives $O(ns+n^4)$ elementary operations in an array-based implementation. A Turing-machine implementation has at most polynomial overhead. The elimination workspace is also $O(n^2)$ bits. All arithmetic uses bits and the finite Pauli phases; randomness consists solely of fair coin flips. No approximation of amplitudes is involved.

The theorem gives an exact classical sampler for this restricted family, even when its states are entangled. It does not require writing down the exponentially long amplitude vector. The essential fact is that every allowed operation preserves a compact description that we can update efficiently.

Entanglement alone therefore does not guarantee a computational speedup. Arbitrary quantum circuits are outside this theorem’s scope.

## Check your understanding {#practice}

Does the simulator have to produce a list of all $2^n$ output probabilities?

<details markdown="1">
<summary>Show answer</summary>

No. It returns one $n$-bit string with exactly the quantum circuit’s distribution. This is **sampling**, not listing that distribution. Run the algorithm again from its initial generators to obtain a fresh sample.
</details>

## References {#references}

1. Ronald de Wolf, [Quantum Computing: Lecture Notes](https://homepages.cwi.nl/~rdewolf/qcnotes.pdf), Section 20.3, Theorem 6.
2. Scott Aaronson and Daniel Gottesman, [Improved Simulation of Stabilizer Circuits](https://arxiv.org/pdf/quant-ph/0406196), Sections II–III. Their optimized simulator improves the measurement cost; the proof above uses ordinary Gaussian elimination.
