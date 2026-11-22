The Bell state has four amplitudes, but the two equations $XX|\psi\rangle=|\psi\rangle$ and $ZZ|\psi\rangle=|\psi\rangle$ already determine it. We will prove the general principle: certain $n$-qubit states are specified by just $n$ Pauli constraints. Then we can store those constraints instead of the $2^n$ amplitudes.

## Which sets of constraints work?

Let $g_1,\ldots,g_n$ be signed Hermitian Pauli strings. Each squares to the identity. Write $I_n=I^{\otimes n}$, and let $G$ be the group of all products of these generators. We require three conditions:

- **Commuting:** $g_jg_k=g_kg_j$ for every pair. This lets us impose the constraints together.
- **Consistent:** $-I_n\notin G$. Otherwise the constraints would imply $-|\psi\rangle=|\psi\rangle$, impossible for a normalized state.
- **Independent:** no nonempty subset of the generators has product $I_n$. Equivalently, none is a product of the others, so no equation is redundant.

These definitions use the signs, not just the Pauli letters. Together, consistency and independence rule out every nonempty product equal to either $I_n$ or $-I_n$.

<aside class="theorem-statement" markdown="1">
**Compact-description theorem.** If $n$ signed Pauli generators on $n$ qubits satisfy these three conditions, their common $+1$ eigenspace has dimension one. Thus they specify a unique normalized pure state up to global phase. Such a state is a **stabilizer state**. [1]
</aside>

## Why the common eigenspace is one-dimensional

A **projector** onto a subspace keeps the component inside it and removes the perpendicular component. For each generator, define

$$
\Pi_j=\frac{I_n+g_j}{2}
$$

Because $g_j^2=I_n$, we have $\Pi_j^2=\Pi_j$. Every vector $v$ splits as $v=\Pi_jv+(I_n-\Pi_j)v$: $g_j$ fixes the first component and negates the second. For complex columns, the inner product is $u^\dagger v$; **perpendicular** means this equals zero. Here $\Pi_j^\dagger=\Pi_j$ and $\Pi_j(I_n-\Pi_j)=0$, so the two components are perpendicular. Thus $\Pi_j$ projects onto its $+1$ eigenspace.

The generators commute, so these projectors commute. Their product

$$
\Pi=\prod_{j=1}^n\frac{I_n+g_j}{2}
$$

projects onto the intersection of their ranges. To see this directly, every vector satisfying all the constraints is unchanged by $\Pi$. Conversely, $\Pi_j\Pi=\Pi$ for each $j$, so every vector produced by $\Pi$ satisfies every constraint.

The **trace** is the sum of a matrix’s diagonal entries. The identity $\operatorname{tr}(AB)=\operatorname{tr}(BA)$ follows by expanding both sums; it implies that changing basis preserves trace. Choose a basis from a projector’s range (its possible outputs) and kernel (the vectors it sends to zero). Its matrix then has a diagonal 1 for each range vector and a 0 for each kernel vector. Hence its trace equals the dimension of its range.

Expand the product:

$$
\Pi=2^{-n}\sum_{A\subseteq\{1,\ldots,n\}}\prod_{j\in A}g_j.
$$

The empty subset contributes $I_n$, whose trace is $2^n$. Every other term is a signed Pauli string different from $\pm I_n$, by independence and consistency. It consequently contains at least one $X$, $Y$, or $Z$ factor. Each of those matrices has trace zero, and
$\operatorname{tr}(A\otimes B)=\operatorname{tr}(A)\operatorname{tr}(B)$: the sum of the diagonal entries factors. Hence every nonempty-subset term has trace zero.

Thus $\operatorname{tr}(\Pi)=2^{-n}2^n=1$. The common eigenspace has dimension one, proving the theorem. Its unit vectors differ only by global phase. This argument uses a large matrix to establish correctness; our simulator never needs to construct it.

We will use two consequences later. Independence makes the $2^n$ subset products distinct, so

$$
\Pi=|\psi\rangle\langle\psi|=2^{-n}\sum_{g\in G}g.
$$

Here the **bra** $\langle\psi|$ is the conjugate transpose of $|\psi\rangle$. Their outer product is the projector onto the line spanned by $|\psi\rangle$. Also, for unsigned Pauli strings $P,Q$, the same trace calculation gives $\operatorname{tr}(PQ)=0$ when $P\ne Q$, and $2^n$ when $P=Q$.

## The actual data we store

Encode each Pauli letter using two bits $(x,z)$:

| Letter | $(x,z)$ |
|---|---|
| $I$ | $(0,0)$ |
| $X$ | $(1,0)$ |
| $Z$ | $(0,1)$ |
| $Y$ | $(1,1)$ |

Add one sign bit $r$, meaning the whole string is multiplied by $(-1)^r$. A generator occupies $2n+1$ bits; $n$ generators occupy $n(2n+1)=O(n^2)$ bits. This is an exact description of the state, without storing complex amplitudes. [2]

Multiplying the binary labels uses bitwise XOR, but **the sign is not obtained by simply XORing the sign bits**. Actual Pauli multiplication can introduce factors $\pm i$. For example,

$$
\begin{split}(XX)(ZZ)&=(X\cdot Z)\otimes(X\cdot Z)\\&=(-iY)\otimes(-iY)=-YY.\end{split}
$$

An implementation multiplies the local letters, retains their phase factors, and combines those factors with the original signs. Products of commuting Hermitian strings are Hermitian, so the final phase is $+1$ or $-1$, even when intermediate factors are imaginary.

## Check your understanding {#practice}

Can $+XX$, $+ZZ$, and $+YY$ all stabilize the same nonzero state?

<details markdown="1">
<summary>Show answer</summary>

No. Their product is $-II$, violating consistency. For the Bell state the third constraint is instead $-YY$, already implied by the first two.

</details>

## References {#references}


1. Ronald de Wolf, [*Quantum Computing: Lecture Notes*](https://homepages.cwi.nl/~rdewolf/qcnotes.pdf), August 2026 edition, §§20.1–20.2. Background on stabilizer states and Clifford conjugation. The projector-and-trace argument above supplies a complete proof of the dimension claim.
2. Scott Aaronson and Daniel Gottesman, [*Improved Simulation of Stabilizer Circuits*](https://arxiv.org/pdf/quant-ph/0406196), §§II–III. Pauli multiplication, compact binary descriptions, and exact gate-update rules. This guide uses only stabilizer generators; the paper’s additional destabilizer rows are not needed for our proof.
