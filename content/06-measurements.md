The generator list describes the state after the circuit's gates. To produce an output, we must sample its measurements. We will measure qubits one at a time, updating the state after each outcome. These updates preserve correlations between output bits. [1, 2]

## A bit value and a sign

Let $M=Z_j$: a $Z$ on qubit $j$ and identities elsewhere. Its eigenvalue is $m=+1$ when that qubit is $0$, and $m=-1$ when it is $1$. Thus the output bit is $b=(1-m)/2$.

The projectors selecting those outcomes are

$$
Q_m=\frac{I+mM}{2}.
$$

Applied to a state vector, $Q_m$ keeps the amplitudes whose $j$th bit matches the chosen outcome and zeroes the others. The squared length $\|Q_m|\psi\rangle\|^2$ is the sum of their squared magnitudes, hence the outcome probability by the Born rule. Define $E=\langle\psi|M|\psi\rangle$, where the bra $\langle\psi|$ is the conjugate transpose of the state vector. Since $Q_m^\dagger Q_m=Q_m$,

$$
\Pr[m]=\frac{1+mE}{2}.
$$

After a possible outcome, normalize $Q_m|\psi\rangle$ to obtain the new state.

Suppose $g_1,\ldots,g_n$ are our independent commuting stabilizer generators. A generator commutes with $Z_j$ exactly when its letter at position $j$ is $I$ or $Z$; an $X$ or $Y$ there means it anticommutes. We can inspect that single column of the generator list.

## Case 1: every generator commutes with M {#deterministic}

Then $M|\psi\rangle$ satisfies all the same constraints:

$$
g_iM|\psi\rangle=Mg_i|\psi\rangle=M|\psi\rangle.
$$

The common $+1$ eigenspace is one-dimensional, so $M|\psi\rangle=\lambda|\psi\rangle$. Because $M^2=I$, we have $\lambda\in\{+1,-1\}$. The outcome is deterministic, and the state stays unchanged.

To find which sign occurs efficiently, we need a useful fact: **either $M$ or $-M$ is a product of the generators.**

Here is a proof using the projector from Section 4. Let $G$ be the set of generator products. Then

$$
\Pi=|\psi\rangle\langle\psi|
   =2^{-n}\sum_{g\in G}g,
$$

$$
\lambda=\operatorname{tr}(M\Pi)
       =2^{-n}\sum_{g\in G}\operatorname{tr}(Mg).
$$

The identity $\operatorname{tr}(M|\psi\rangle\langle\psi|)=\langle\psi|M|\psi\rangle$ follows by summing diagonal entries. A Pauli string has zero trace unless it is a scalar multiple of $I$. Thus every summand would vanish unless some $g=\pm M$, contradicting $\lambda=\pm1$. The sum proves existence; our algorithm will never enumerate $G$.

### Finding the product

Write $v(P)=(x_0,z_0,\ldots,x_{n-1},z_{n-1})$ for a Pauli string’s $2n$ binary coordinates, ignoring its overall sign. Recall $I\leftrightarrow00$, $X\leftrightarrow10$, $Z\leftrightarrow01$, and $Y\leftrightarrow11$. Products correspond to adding these vectors modulo $2$.

Solve for bits $c_1,\ldots,c_n$ in

$$
\sum_{i=1}^n c_i v(g_i)=v(M)
\quad\text{over }\mathbb F_2.
$$

Here $\mathbb F_2=\{0,1\}$ uses arithmetic modulo $2$. Write the $2n$ equations as rows, including their right-hand sides. In each variable column, choose an unused row with a 1 as a **pivot**; swap it into the next position. XOR that row into every other row with a 1 in the same column, making those entries zero. Continue with the remaining variables, then read off the solution (set any free variables to 0). These reversible operations are **Gaussian elimination over $\mathbb F_2$**. The product-existence fact guarantees a solution. There are $O(n)$ pivots, each updating $O(n)$ rows of length $O(n)$, so the cost is $O(n^3)$ bit operations.

Now multiply the selected **signed** generators using the Pauli multiplication rules. Their product is $\varepsilon M$ for $\varepsilon\in\{+1,-1\}$. The phase is real because a product of commuting Hermitian generators is Hermitian. Since that product stabilizes $|\psi\rangle$, the measured eigenvalue is $m=\varepsilon$. Binary coordinates find the factors; exact phase arithmetic recovers the answer. Ignoring the signs would lose the distinction between outputs $0$ and $1$.

## Case 2: some generator anticommutes with M {#random}

Reorder the generators so that $g_1M=-Mg_1$. Since $g_1|\psi\rangle=|\psi\rangle$ and $g_1^\dagger=g_1$,

$$
\begin{split}E&=\langle\psi|g_1Mg_1|\psi\rangle\\&=-\langle\psi|M|\psi\rangle=-E.\end{split}
$$

Therefore $E=0$: both outcomes have probability $1/2$. Sample $m$ using one fair coin. The corresponding normalized state is

$$
|\psi_m\rangle=\frac{(I+mM)|\psi\rangle}{\sqrt2}.
$$

We do not construct this vector. Instead, update its generators:

1. For each $i>1$ that anticommutes with $M$, replace $g_i$ by $g_1g_i$, retaining the exact sign. Leave the other generators unchanged.
2. Replace $g_1$ by $mM$.

Why is this correct? After step 1, call the other generators $h_2,\ldots,h_n$. Each commutes with $M$: multiplying two operators that both anticommute with $M$ cancels the two minus signs. These row operations preserve the generated group and independence, because each operation reverses itself.

Every $h_i$ stabilizes $|\psi\rangle$ and commutes with $I+mM$, so it also stabilizes $|\psi_m\rangle$. The new generator $mM$ does too. All the new generators commute.

They are independent as well. A relation using only $h_2,\ldots,h_n$ would contradict the old independence. A relation involving $mM$ would express $M$, up to sign, as a product of those $h_i$. But all such products commute with the old $g_1$, whereas $M$ anticommutes with it: impossible.

Finally, the nonzero vector $|\psi_m\rangle$ satisfies every new constraint, proving consistency. We again have $n$ independent commuting consistent generators, and hence an exact description of the conditional state.

## Worked check: the Bell pair

Start with generators $XX,ZZ$. Measuring the left qubit means $M=ZI$. It anticommutes with $XX$, so sample $m=\pm1$ fairly and update the list to

$$
mZI,\quad ZZ.
$$

For the right qubit, $M=IZ$ commutes with both generators. Their signed product is $(mZI)(ZZ)=mIZ$, so its measured eigenvalue is also $m$. The output is therefore $00$ or $11$, each with probability $1/2$.

Sampling two independent fair bits would incorrectly produce $01$ and $10$. Updating after the first measurement is what preserves the Bell pair's correlation.

## Check your understanding {#practice}

If the generators are $-ZI$ and $IZ$, what happens when the left qubit is measured?

<details markdown="1">
<summary>Show answer</summary>

The product $-ZI=-M$ gives $m=-1$, hence bit $1$, with certainty. The generator list does not change.

</details>

## References {#references}

1. Ronald de Wolf, [Quantum Computing: Lecture Notes](https://homepages.cwi.nl/~rdewolf/qcnotes.pdf), Sections 20.1–20.3, especially the two measurement cases in Section 20.3.
2. Scott Aaronson and Daniel Gottesman, [Improved Simulation of Stabilizer Circuits](https://arxiv.org/pdf/quant-ph/0406196), Section III, for generator representations, exact sign tracking, and simulation costs.
