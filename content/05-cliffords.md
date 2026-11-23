We can describe a stabilizer state using $n$ generators. To simulate a circuit, we must update those generators when a gate changes the state. The key is to transform each constraint along with the state.

## The update rule follows from one equation

Suppose $g|\psi\rangle=|\psi\rangle$. A unitary gate $U$ changes the state to $|\psi'\rangle=U|\psi\rangle$. Which operator fixes this new state? Using $U^\dagger U=I$, we obtain

$$
\begin{split}
(UgU^\dagger)|\psi'\rangle&=UgU^\dagger U|\psi\rangle\\
&=Ug|\psi\rangle\\
&=U|\psi\rangle=|\psi'\rangle.
\end{split}
$$

Thus replace $g$ by $UgU^\dagger$. This transformation is called **conjugation**. The dagger denotes conjugate transpose; for a unitary, it is also the inverse.

Apply this rule to all $n$ generators. Conjugation preserves products because

$$
U(gh)U^\dagger=(UgU^\dagger)(UhU^\dagger).
$$

Consequently, commuting generators remain commuting. Independence and consistency also survive: any nonempty product of new generators equal to $\pm I_n$ would, after conjugating back, give the same forbidden relation among the old generators. Whenever the new operators remain signed Pauli strings, we therefore retain $n$ independent, commuting, consistent generators. The previous section's theorem says they specify exactly $|\psi'\rangle$, up to global phase.

**Definition (Clifford unitary)**: A unitary $U$ is Clifford if $UPU^\dagger$ belongs to the Pauli group for every $P$ in that group. This includes the phases $+1,-1,+i,-i$. Conjugation preserves Hermiticity, so our Hermitian generators still have overall signs $\pm1$.

We use H, CNOT, and the **phase gate**

\[
S=\begin{pmatrix}1&0\\0&i\end{pmatrix},
\]
\[
S(\alpha|0\rangle+\beta|1\rangle)=\alpha|0\rangle+i\beta|1\rangle.
\]

Since $|i|=1$, S preserves normalization; its inverse replaces $i$ by $-i$. The tables below establish the Clifford property for all three gates. Their compositions preserve it too. [1]

## One-qubit gates: four possibilities each

When H or S acts on a qubit, update that qubit's letter in every generator using this table. A minus sign multiplies the generator's overall sign.

| Old letter $P$ | $HPH^\dagger$ | $SPS^\dagger$ |
|---|---|---|
| $I$ | $I$ | $I$ |
| $X$ | $Z$ | $Y$ |
| $Y$ | $-Y$ | $-X$ |
| $Z$ | $X$ | $Z$ |

For example, the entry $HXH^\dagger=Z$ says that applying H to a state stabilized by X produces a state stabilized by Z. This agrees with $H|+\rangle=|0\rangle$.

To derive $SXS^\dagger=Y$, follow each basis vector through the three operations, starting on the right:

\[
\begin{split}
SXS^\dagger|0\rangle&=SX|0\rangle=S|1\rangle=i|1\rangle,\\
SXS^\dagger|1\rangle&=SX(-i|1\rangle)=-iS|0\rangle=-i|0\rangle.
\end{split}
\]

These are precisely Y's basis actions, so linearity gives equality on every vector. Other entries follow similarly. In particular, $Y=i(X\cdot Z)$ gives $HYH^\dagger=i(Z\cdot X)=-Y$. Keep that minus sign, and any sign already present in the generator.

## CNOT: update the control and target together

Write $C$ for CNOT with control $c$ and target $t$. Here $X_c$ means $X$ on qubit $c$ and identity elsewhere. Four rules determine the action on every Pauli string:

| Old operator | $CPC^\dagger$ |
|---|---|
| $X_c$ | $X_cX_t$ |
| $Z_c$ | $Z_c$ |
| $X_t$ | $X_t$ |
| $Z_t$ | $Z_cZ_t$ |

To derive the first rule, recall $C^\dagger=C$ because applying CNOT twice cancels it. For bits $a,b$, follow $CX_cC^\dagger$ from right to left:

\[
\begin{split}
|a,b\rangle&\xrightarrow{C}|a,a\oplus b\rangle\\
&\xrightarrow{X_c}|a\oplus1,a\oplus b\rangle\\
&\xrightarrow{C}|a\oplus1,b\oplus1\rangle.
\end{split}
\]

The last step uses $(a\oplus1)\oplus(a\oplus b)=b\oplus1$. Both bits flip, exactly as under $X_cX_t$. Equality on a basis proves equality on every state.

Because $Y=i(X\cdot Z)$ and conjugation preserves products, these four rules also handle $Y$ letters and two nonidentity letters. Keep the order and phase factors when multiplying. For a sign-sensitive example,

$$
\begin{split}
C(X_cZ_t)C^\dagger&=(X_cX_t)(Z_cZ_t)\\
&=(X_c\cdot Z_c)(X_t\cdot Z_t)\\
&=(-iY_c)(-iY_t)=-Y_cY_t.
\end{split}
$$

Operators on different qubits commute, which justifies regrouping. The two factors of $-i$ produce the minus sign; dropping phases would give the wrong constraint.

## Follow the Bell-state circuit using generators

Start with $|00\rangle$, whose generators are $ZI$ and $IZ$. Applying $H$ to the first qubit changes the first generator to $XI$ and leaves the second unchanged. CNOT then gives

| Operation | Generators after the operation |
| --- | --- |
| Initialize $|00\rangle$ | $ZI,IZ$ |
| H on $q_0$ | $XI,IZ$ |
| CNOT from $q_0$ to $q_1$ | $XX,ZZ$ |

The CNOT rules send $XI$ to $XX$ and $IZ$ to $ZZ$, giving the Bell-state generators without recomputing amplitudes.

For $n$ qubits, store the $n$ generators in an array, using $2n+1$ bits per row. H or S changes one letter and possibly the sign in each row; CNOT changes two letters and possibly the sign. A fixed local lookup table takes constant work per row. Thus one gate costs $O(n)$ elementary array operations, and storage remains $O(n^2)$. Untouched entries stay in place, without copying whole rows. [2]

## Check your understanding {#practice}

### 1. Two phase gates

Start with the generator $+X$ for $|+\rangle$ and apply S twice. What generator follows each gate, and what is the final state?

<details markdown="1">
<summary>Show answer</summary>

The table gives $+X\mapsto+Y\mapsto-X$. The final generator $-X$ stabilizes $|-\rangle$, since $X|-\rangle=-|-\rangle$. Losing the second update's minus sign would incorrectly return $|+\rangle$.

</details>

### 2. Applying CNOT again

Apply the same CNOT again to the Bell-state generators. Which state results?

<details markdown="1">
<summary>Show answer</summary>

Conjugation preserves products, so $XX$ maps to $(X_cX_t)X_t=X_c$, or $XI$. Likewise, $ZZ$ maps to $Z_c(Z_cZ_t)=Z_t$, or $IZ$. These generators specify $|+\rangle\otimes|0\rangle$, as expected because applying CNOT twice cancels it.

</details>

### 3. A Y on the control

Use the four CNOT rules to compute $CY_cC^\dagger$, including its sign.

<details markdown="1">
<summary>Show answer</summary>

Since $Y_c=i(X_c\cdot Z_c)$,

\[
\begin{split}
CY_cC^\dagger&=i(X_cX_t)Z_c\\
&=i(X_c\cdot Z_c)X_t\\
&=i(-iY_c)X_t=Y_cX_t.
\end{split}
\]

Thus $YI$ maps to $YX$ with a positive sign. Keeping both phase factors gives $i(-i)=1$.

</details>

**Carry forward:** conjugate every generator, keeping its sign. The resulting rows describe the new state exactly. Next we will handle measurement and its random outcomes.
{: #takeaways}

## References {#references}


1. Ronald de Wolf, [*Quantum Computing: Lecture Notes*](https://homepages.cwi.nl/~rdewolf/qcnotes.pdf), August 2026 edition, §§20.1–20.2. Background on stabilizer states and Clifford conjugation. Section 4 supplies the projector-and-trace proof of the dimension claim.
2. Scott Aaronson and Daniel Gottesman, [*Improved Simulation of Stabilizer Circuits*](https://arxiv.org/pdf/quant-ph/0406196), §§II–III. Pauli multiplication, compact binary descriptions, and exact gate-update rules. This guide uses only stabilizer generators; the paper’s additional destabilizer rows are not needed for our proof.
