The previous section described the Bell state using two Pauli constraints. We now prove the general principle: suitable $n$-qubit states are completely specified by $n$ generators. The proof explains why storing these constraints loses no information about the state.

## Which sets of constraints work?

Let $g_1,\ldots,g_n$ be signed Hermitian Pauli strings on $n$ qubits. Write $I_n=I^{\otimes n}$ for the $2^n\times2^n$ identity matrix, and let $G$ contain all products of the generators. We require:

- **Commuting:** $g_jg_k=g_kg_j$ for every pair.
- **Consistent:** $-I_n\notin G$. Otherwise the constraints would imply $-|\psi\rangle=|\psi\rangle$, impossible for a normalized state.
- **Independent:** no nonempty subset of the generators has product $I_n$. Otherwise one generator would be a product of the others, giving a redundant constraint.

Together, consistency and independence exclude every nonempty product equal to either $I_n$ or $-I_n$. Simply counting $n$ equations is insufficient: repeated equations add no information.

<aside class="theorem-statement" markdown="1">
**Compact-description theorem.** If $n$ signed Pauli generators on $n$ qubits satisfy these conditions, their common $+1$ eigenspace has dimension one. Thus they specify a unique normalized pure state up to global phase, called a **stabilizer state**. [1]
</aside>

The common eigenspace means all vectors satisfying $g_j|v\rangle=|v\rangle$ for every $j$. We will construct a matrix that keeps exactly these vectors, then count the dimension of its output space.

## Why the common eigenspace is one-dimensional

### Step 1: keep the vectors satisfying one constraint

**Definition (Orthogonal projector)**: A projector onto a subspace keeps the component inside it and removes the perpendicular component. For complex columns, the inner product is $u^\dagger v$; two vectors are perpendicular when this is zero.

For one generator, define

$$
\Pi_j=\frac{I_n+g_j}{2}.
$$

If $g_jv=v$, then $\Pi_jv=v$; if $g_jv=-v$, then $\Pi_jv=0$. For example, $(I+Z)/2$ sends $\alpha|0\rangle+\beta|1\rangle$ to $\alpha|0\rangle$.

To check every vector, use $g_j^2=I_n$ to obtain $\Pi_j^2=\Pi_j$. Each $v$ splits as $\Pi_jv+(I_n-\Pi_j)v$: $g_j$ fixes the first component and negates the second. They are perpendicular because $\Pi_j^\dagger=\Pi_j$ and $\Pi_j(I_n-\Pi_j)=0$. Thus $\Pi_j$ is exactly the projector onto the $+1$ eigenspace.

### Step 2: impose all the constraints

The generators commute, so their projectors commute. Their product

$$
\Pi=\prod_{j=1}^n\frac{I_n+g_j}{2}
$$

is also Hermitian and satisfies $\Pi^2=\Pi$. It keeps every vector satisfying all constraints. Conversely, $\Pi_j\Pi=\Pi$ for each $j$, so every output of $\Pi$ satisfies every constraint. Therefore its range, the space of possible outputs, is precisely the common eigenspace.

### Step 3: count the surviving dimensions

The **trace**, written $\operatorname{tr}(A)$, is the sum of a matrix's diagonal entries. For a projector it equals the dimension of its range. Here is why: $v=\Pi v+(I_n-\Pi)v$ splits every vector between the range and the kernel (vectors sent to zero). Their intersection is zero. A basis chosen from these two spaces gives a diagonal 1 for every range dimension and a 0 for every kernel dimension.

This works because trace does not depend on the basis. Expanding both sums gives $\operatorname{tr}(AB)=\operatorname{tr}(BA)$. For an invertible change-of-basis matrix $S$, this gives

$$
\operatorname{tr}(S^{-1}\Pi S)
=\operatorname{tr}(\Pi SS^{-1})
=\operatorname{tr}(\Pi).
$$

Now expand $\Pi$, choosing either $I_n$ or $g_j$ from each factor:

$$
\Pi=2^{-n}\sum_{A\subseteq\{1,\ldots,n\}}\prod_{j\in A}g_j.
$$

The empty subset contributes $I_n$, with trace $2^n$. Products of commuting Hermitian matrices remain Hermitian: $(PQ)^\dagger=QP=PQ$. Each other product is therefore a Pauli string with sign $\pm1$, different from $\pm I_n$ by independence and consistency. It has an $X$, $Y$, or $Z$ factor, each with trace zero. Since
$\operatorname{tr}(A\otimes B)=\operatorname{tr}(A)\operatorname{tr}(B)$ (the diagonal-entry sum factors), every such term has trace zero.

Thus $\operatorname{tr}(\Pi)=2^{-n}2^n=1$. The common eigenspace is a line, proving the theorem. Its normalized vectors differ only by global phase. These large matrices establish correctness; the simulator will never construct them.

Two consequences will justify measurement later. Distinct subsets give distinct products: equality would let us cancel their common factors, contradicting independence. Therefore

$$
\Pi=|\psi\rangle\langle\psi|=2^{-n}\sum_{g\in G}g.
$$

Here $|\psi\rangle$ is a normalized vector on that line. Its **bra**, $\langle\psi|$, is its conjugate transpose; the outer product $|\psi\rangle\langle\psi|$ sends $v$ to $|\psi\rangle(\langle\psi|v)$, exactly the projection onto the line. Also, for unsigned Pauli strings $P,Q$, $\operatorname{tr}(PQ)=0$ if $P\ne Q$ because their product has a nonidentity factor; if $P=Q$, then $PQ=I_n$ and the trace is $2^n$.

## The actual data we store

Encode each Pauli letter using two bits $(x,z)$:

| Letter | $(x,z)$ |
|---|---|
| $I$ | $(0,0)$ |
| $X$ | $(1,0)$ |
| $Z$ | $(0,1)$ |
| $Y$ | $(1,1)$ |

Add one sign bit $r$, meaning the whole string is multiplied by $(-1)^r$. A generator occupies $2n+1$ bits; $n$ generators occupy $n(2n+1)=O(n^2)$ bits. This is an exact description of the state, without storing complex amplitudes. [2]

Multiplying letters adds their two-bit labels modulo 2, or **XORs** them. For example, $10+01=11$: $X\cdot Z$ has the letter $Y$. But the table says $X\cdot Z=-iY$. **The labels omit the phase.** Consequently, simply XORing sign bits is insufficient:

$$
\begin{split}(XX)(ZZ)&=(X\cdot Z)\otimes(X\cdot Z)\\&=(-iY)\otimes(-iY)=-YY.\end{split}
$$

Multiply the local letters and combine their phase factors with the original signs. For commuting Hermitian strings, the final product is Hermitian and its phase is $\pm1$, even if intermediate factors are imaginary.

## Check your understanding {#practice}

### 1. Checking consistency

Can $+XX$, $+ZZ$, and $+YY$ all stabilize the same nonzero state?

<details markdown="1">
<summary>Show answer</summary>

No. Their product is $-II$, violating consistency. For the Bell state the third constraint is instead $-YY$, already implied by the first two.

</details>

### 2. Counting independent constraints

On two qubits, do the two generators $ZI,ZI$ specify a unique state?

<details markdown="1">
<summary>Show answer</summary>

No. They repeat one equation and are not independent: $(ZI)(ZI)=II$. Every state $|0\rangle\otimes(\alpha|0\rangle+\beta|1\rangle)$ satisfies them. Their common eigenspace has dimension two, spanned by $|00\rangle$ and $|01\rangle$.
</details>

### 3. Encoding a signed string

Encode $-XZ$ using a sign bit followed by the two pairs $(x,z)$. How many bits would a list of two generators on two qubits use?

<details markdown="1">
<summary>Show answer</summary>

The encoding is $1;\,(1,0);\,(0,1)$: one minus-sign bit and two bits per letter. This row uses five bits. Two rows use $2(2\cdot2+1)=10$ bits.
</details>

## References {#references}


1. Ronald de Wolf, [*Quantum Computing: Lecture Notes*](https://homepages.cwi.nl/~rdewolf/qcnotes.pdf), August 2026 edition, §§20.1–20.2. Background on stabilizer states and Clifford conjugation. The projector-and-trace argument above supplies a complete proof of the dimension claim.
2. Scott Aaronson and Daniel Gottesman, [*Improved Simulation of Stabilizer Circuits*](https://arxiv.org/pdf/quant-ph/0406196), §§II–III. Pauli multiplication, compact binary descriptions, and exact gate-update rules. This guide uses only stabilizer generators; the paper’s additional destabilizer rows are not needed for our proof.
