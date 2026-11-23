Instead of recording every amplitude, we can describe a state through equations it satisfies. We will build these constraints from four small matrices, then use the Bell state to see what the equations tell us.

## Four basic operators

An **operator** here is a matrix acting on state vectors. The one-qubit **Pauli matrices** are

\[
I=\begin{pmatrix}1&0\\0&1\end{pmatrix},\quad
X=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\]
\[
Y=\begin{pmatrix}0&-i\\i&0\end{pmatrix},\quad
Z=\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
\]

Their actions on basis states determine their actions on every superposition:

| Operator | Action on $\lvert0\rangle$ | Action on $\lvert1\rangle$ |
| --- | --- | --- |
| $I$ | $\lvert0\rangle$ | $\lvert1\rangle$ |
| $X$ | $\lvert1\rangle$ | $\lvert0\rangle$ |
| $Y$ | $i\lvert1\rangle$ | $-i\lvert0\rangle$ |
| $Z$ | $\lvert0\rangle$ | $-\lvert1\rangle$ |

Each matrix is unitary, **Hermitian** (meaning $P^\dagger=P$), and satisfies $P^2=I$. A nonzero vector satisfying $P|v\rangle=\lambda|v\rangle$ is an **eigenvector** with **eigenvalue** $\lambda$. Applying $P$ twice gives $|v\rangle=\lambda^2|v\rangle$, so $\lambda$ must be $+1$ or $-1$. The identity has only eigenvalue $+1$.

An $n$-qubit **Pauli string** is a tensor product of $n$ such matrices. We usually omit $\otimes$: $XZ$ means $X\otimes Z$, with the first letter acting on $q_0$. A **signed** string such as $-XZ$ has one overall minus sign. For example, $(-XZ)|01\rangle=|11\rangle$.

This differs from multiplying matrices on the same qubit: we write that product as $X\cdot Z$ when needed. Tensor strings act on several qubits; matrix products compose operations. [1]

## What does it mean to stabilize a state?

**Definition (Stabilizer)**: A signed Pauli $P$ stabilizes $|\psi\rangle$ when

\[
P|\psi\rangle=|\psi\rangle.
\]

This requires eigenvalue **exactly $+1$**. For example, $Z$ stabilizes $|0\rangle$, $-Z$ stabilizes $|1\rangle$, and $X$ stabilizes $|+\rangle$.

Why retain signs if global phase does not matter? The equation defines which eigenvalue the state has. Although $Z|1\rangle=-|1\rangle$ represents the same physical state, it fails the required vector equality. Multiplying the input by any global phase $c$ still gives

\[
Z(c|1\rangle)=-c|1\rangle.
\]

Thus its $Z$ eigenvalue stays $-1$. Changing a state vector's global phase preserves its constraints; changing an operator's sign changes the constraint. Discarding signs would confuse $|0\rangle$ with $|1\rangle$.

For the Bell state, both $XX$ and $ZZ$ are stabilizers. $XX$ interchanges its two terms; $ZZ$ multiplies $|00\rangle$ by $1$ and $|11\rangle$ by $(-1)(-1)=1$. Therefore

\[
XX|\Phi^+\rangle=|\Phi^+\rangle,
\]
\[
ZZ|\Phi^+\rangle=|\Phi^+\rangle.
\]

These equations also explain the Bell state's amplitudes. The constraint $ZZ|\psi\rangle=|\psi\rangle$ forces the $|01\rangle$ and $|10\rangle$ amplitudes to zero, since $ZZ$ negates those terms. The remaining constraint $XX|\psi\rangle=|\psi\rangle$ swaps $|00\rangle$ and $|11\rangle$, forcing their amplitudes to agree. Normalization then gives $|\Phi^+\rangle$ up to global phase.

## Multiplication, commutation, and phases

Here is the complete single-qubit multiplication table. The row operator acts **after** the column operator: the row $X$, column $Z$ entry means $X\cdot Z=-iY$.

| $\cdot$ | $I$ | $X$ | $Y$ | $Z$ |
| --- | --- | --- | --- | --- |
| $I$ | $I$ | $X$ | $Y$ | $Z$ |
| $X$ | $X$ | $I$ | $iZ$ | $-iY$ |
| $Y$ | $Y$ | $-iZ$ | $I$ | $iX$ |
| $Z$ | $Z$ | $iY$ | $-iX$ | $I$ |

Operators **commute** if $PQ=QP$: applying them in either order gives the same matrix. They **anticommute** if $PQ=-QP$. The table shows that distinct nonidentity single-qubit Paulis anticommute; for example, $X\cdot Z=-iY$ but $Z\cdot X=iY$.

Multiply strings position by position, using $(A\otimes B)(C\otimes D)=(AC)\otimes(BD)$. For example,

\[
(XX)(ZZ)=(-iY)\otimes(-iY)=-YY,
\]
\[
(ZZ)(XX)=(iY)\otimes(iY)=-YY.
\]

Thus $XX$ and $ZZ$ commute: reversing the order contributes one minus sign at each of two positions, and they cancel. In general, count the positions with distinct nonidentity letters. The strings commute if that count is even and anticommute if it is odd.

The **Pauli group** consists of all strings multiplied by $+1,-1,+i,-i$; multiplication stays within this collection. Stabilizer constraints use its Hermitian elements, with overall phases $\pm1$. Multiplying a string by $\pm i$ gives only imaginary eigenvalues, so it cannot fix a nonzero vector. [2]

## Generators collect the constraints

If $P$ and $Q$ stabilize $|\psi\rangle$, their product does too: $PQ|\psi\rangle=P|\psi\rangle=|\psi\rangle$.

**Definition (Stabilizer generators)**: A list of stabilizers $g_1,\ldots,g_r$ generates all constraints obtained by multiplying its members. The resulting group is written $\langle g_1,\ldots,g_r\rangle$ and includes the identity, obtained by taking no factors.

For commuting Hermitian generators, rearrange factors and cancel pairs using $g_j^2=I$. Each generator therefore need appear at most once. The Bell example gives

\[
\langle XX,ZZ\rangle=\{II,XX,ZZ,-YY\}.
\]

We can store the two generators instead of the four group elements. Each stored row represents an equation about the **whole state**, not the state of an individual qubit.

Two anticommuting operators cannot both stabilize a nonzero vector: their products would give $PQ|\psi\rangle=|\psi\rangle$ and $PQ|\psi\rangle=-QP|\psi\rangle=-|\psi\rangle$. Also, a consistent stabilizer group cannot contain $-I$, which would require $-|\psi\rangle=|\psi\rangle$.

For $|0\rangle^{\otimes n}$, use $Z_0,\ldots,Z_{n-1}$, where $Z_j$ applies $Z$ to $q_j$ and identities elsewhere. These constraints force every bit to 0. Next we prove when $n$ generators uniquely specify an $n$-qubit state. [3]

## Check your understanding {#practice}

### 1. Keeping the sign

Does $YY$ or $-YY$ stabilize $|\Phi^+\rangle$? Verify directly.

<details markdown="1">
<summary>Show answer</summary>

Since $Y|0\rangle=i|1\rangle$ and $Y|1\rangle=-i|0\rangle$, we get $YY|00\rangle=-|11\rangle$ and $YY|11\rangle=-|00\rangle$. Hence $YY|\Phi^+\rangle=-|\Phi^+\rangle$, so the stabilizer is $-YY$.

</details>

### 2. Counting minus signs

Do $XZ$ and $ZX$ commute? What about $XI$ and $ZI$?

<details markdown="1">
<summary>Show answer</summary>

$XZ$ and $ZX$ differ in two nonidentity positions, so two minus signs cancel: they commute. $XI$ and $ZI$ differ in only one such position, so they anticommute. The identity letters contribute no minus sign.
</details>

### 3. Reading constraints

Which signs make $ZI$ and $IZ$ stabilize $|10\rangle$?

<details markdown="1">
<summary>Show answer</summary>

Use $-ZI$ and $+IZ$. The first qubit is $|1\rangle$, so $ZI$ alone negates the vector; the extra minus sign cancels it. The second qubit is $|0\rangle$, so $IZ$ already fixes it. Their product, $-ZZ$, is another stabilizer.
</details>

## References {#references}

1. [IBM Quantum Learning: Pauli operations and observables](https://quantum.cloud.ibm.com/learning/en/courses/foundations-of-quantum-error-correction/stabilizer-formalism/pauli-operations-and-observables). Matrices, multiplication rules, and generated groups.
2. [Ronald de Wolf, Quantum Computing: Lecture Notes](https://homepages.cwi.nl/~rdewolf/qcnotes.pdf), §20.1 and Appendix A.9. Pauli phases and stabilizer states.
3. [IBM Quantum Learning: Stabilizer codes](https://quantum.cloud.ibm.com/learning/en/courses/foundations-of-quantum-error-correction/stabilizer-formalism/stabilizer-codes). Commuting generators and their common fixed space.
