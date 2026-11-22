We now have a compact description of a stabilizer state. To simulate a circuit, we must update that description when a gate changes the state. The key is to transform each constraint along with the state.

## The update rule follows from one equation

Suppose $g|\psi\rangle=|\psi\rangle$ and a unitary gate $U$ produces $|\psi'\rangle=U|\psi\rangle$. Then

$$
\begin{split}(UgU^\dagger)|\psi'\rangle&=UgU^\dagger U|\psi\rangle\\&=Ug|\psi\rangle=|\psi'\rangle.\end{split}
$$

So the new stabilizer is $UgU^\dagger$. This transformation is called **conjugation**. The dagger denotes conjugate transpose; for a unitary, $U^\dagger=U^{-1}$.

Apply this rule to all $n$ generators. Conjugation preserves products because

$$
U(gh)U^\dagger=(UgU^\dagger)(UhU^\dagger).
$$

It therefore preserves commutation. It also preserves independence and consistency: any new product equal to $\pm I_n$ would, after conjugating back, give the same relation among the old generators. Whenever the new operators remain signed Pauli strings, the theorem from the previous section guarantees that they still specify exactly the new state.

A **Clifford unitary** maps Pauli operators to Pauli operators under conjugation. We use H, CNOT, and the **phase gate**

\[
S=\begin{pmatrix}1&0\\0&i\end{pmatrix},
\]
\[
S(\alpha|0\rangle+\beta|1\rangle)=\alpha|0\rangle+i\beta|1\rangle.
\]

Since $|i|=1$, S preserves normalization; its inverse replaces $i$ by $-i$. The tables below establish the Clifford property for all three gates. Their compositions preserve it too. [1]

## One-qubit gates: four possibilities each

For $H$ or $S$ acting on a qubit, only that qubit's letter in each generator changes. The exact rules are:

| Old letter $P$ | $HPH^\dagger$ | $SPS^\dagger$ |
|---|---|---|
| $I$ | $I$ | $I$ |
| $X$ | $Z$ | $Y$ |
| $Y$ | $-Y$ | $-X$ |
| $Z$ | $X$ | $Z$ |

These follow by multiplying the two-by-two matrices. The negative signs matter. For instance, $Y=i(X\cdot Z)$, so the Hadamard rules for $X$ and $Z$ give
$HYH^\dagger=i(Z\cdot X)=-Y$. An existing generator sign must also be retained: conjugating $-Y$ by $S$ gives $+X$.

The table describes operators, not basis-state amplitudes. For example, $HXH^\dagger=Z$ says that a state stabilized by $X$ becomes one stabilized by $Z$ after applying $H$. Indeed, $H|+\rangle=|0\rangle$.

## CNOT: update the control and target together

Write $C$ for CNOT with control $c$ and target $t$. Here $X_c$ means $X$ on qubit $c$ and identity elsewhere. Four rules determine the action on every Pauli string:

| Old operator | $CPC^\dagger$ |
|---|---|
| $X_c$ | $X_cX_t$ |
| $Z_c$ | $Z_c$ |
| $X_t$ | $X_t$ |
| $Z_t$ | $Z_cZ_t$ |

For example, use $C^\dagger=C$ and $C|a,b\rangle=|a,a\oplus b\rangle$. Applying $C$, then $X_c$, then $C$ sends $|a,b\rangle$ to $|a\oplus1,b\oplus1\rangle$. That is precisely $X_cX_t$, proving the first rule on a basis and therefore on every state.

Because $Y=i(X\cdot Z)$ and conjugation preserves products, these four rules also handle $Y$ letters and two nonidentity letters. Keep the order and phase factors when multiplying. For a sign-sensitive example,

$$
\begin{split}C(X_cZ_t)C^\dagger&=(X_cX_t)(Z_cZ_t)\\&=(X_c\cdot Z_c)(X_t\cdot Z_t)\\&=-Y_cY_t.\end{split}
$$

Operators on different qubits commute, which justifies regrouping the middle expression. This calculation explains why dropping phases from a CNOT lookup table would give incorrect state descriptions.

## Follow the Bell-state circuit using generators

Start with $|00\rangle$, whose generators are $ZI$ and $IZ$. Applying $H$ to the first qubit changes the first generator to $XI$ and leaves the second unchanged. CNOT then gives

| Operation | Generators after the operation |
| --- | --- |
| Initialize $|00\rangle$ | $ZI,IZ$ |
| H on $q_0$ | $XI,IZ$ |
| CNOT from $q_0$ to $q_1$ | $XX,ZZ$ |

These are the Bell-state generators. We have followed an entangling circuit using only two short rows, without recomputing its amplitudes.

For $n$ qubits, store the $n$ generators as rows. An $H$ or $S$ gate changes one letter and possibly the sign in each row. CNOT changes two letters and possibly the sign. Each row update takes constant work using the tables, so one gate takes $O(n)$ updates while storage remains $O(n^2)$. Only binary data and exact signs are involved. [2]

All untouched letters stay in place; there is no need to copy an entire row.

## Check your understanding {#practice}

Apply the same CNOT again to the Bell-state generators. Which state results?

<details markdown="1">
<summary>Show answer</summary>

$XX$ maps to $XI$, and $ZZ$ maps to $IZ$. These generators specify $|+\rangle\otimes|0\rangle$, as expected because applying CNOT twice cancels it. Gates are now accounted for; next we must handle measurement and its random outcomes.

</details>

## References {#references}


1. Ronald de Wolf, [*Quantum Computing: Lecture Notes*](https://homepages.cwi.nl/~rdewolf/qcnotes.pdf), August 2026 edition, §§20.1–20.2. Background on stabilizer states and Clifford conjugation. Section 4 supplies the projector-and-trace proof of the dimension claim.
2. Scott Aaronson and Daniel Gottesman, [*Improved Simulation of Stabilizer Circuits*](https://arxiv.org/pdf/quant-ph/0406196), §§II–III. Pauli multiplication, compact binary descriptions, and exact gate-update rules. This guide uses only stabilizer generators; the paper’s additional destabilizer rows are not needed for our proof.
