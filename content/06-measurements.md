The generators now describe the state after the circuit's gates. Measurement must produce a bit **and update that description**. We measure one qubit at a time, so later probabilities can depend on earlier outcomes. This is how the simulator preserves correlations. [1, 2]

## From measurement probabilities to signs {#a-bit-value-and-a-sign}

Let $M=Z_j$: a $Z$ on qubit $j$ and identities elsewhere. Its eigenvalue $m=+1$ corresponds to bit $0$; $m=-1$ corresponds to bit $1$. Thus $b=(1-m)/2$.

The **measurement projector** for sign $m$ is

$$
Q_m=\frac{I+mM}{2}.
$$

It keeps amplitudes whose $j$th bit matches the outcome and zeroes the others. For example, $Q_{+1}$ keeps terms with bit $0$. The Born rule gives the outcome probability $p_m=\|Q_m|\psi\rangle\|^2$: the sum of those amplitudes' squared magnitudes.

The **expectation** $E$ is the average measurement sign, $p_{+1}-p_{-1}$. In vector notation,

$$
E=\langle\psi|M|\psi\rangle.
$$

The bra $\langle\psi|$ is the conjugate transpose of the column vector. Using $Q_m^\dagger Q_m=Q_m$ and normalization gives

$$
p_m=\frac{1+mE}{2}.
$$

After an outcome with positive probability, normalize $Q_m|\psi\rangle$ to obtain the conditional state. We will compute both the probability and new generators without constructing this vector.

Inspect position $j$ of each generator: $I$ or $Z$ commutes with $M$; $X$ or $Y$ anticommutes. There are two cases.

## Case 1: a deterministic outcome {#deterministic}

Suppose every generator commutes with $M$. Then

$$
g_iM|\psi\rangle=Mg_i|\psi\rangle=M|\psi\rangle.
$$

Thus $M|\psi\rangle$ satisfies all the original constraints. Section 4 proved their common $+1$ eigenspace is one-dimensional, so $M|\psi\rangle=\lambda|\psi\rangle$. Since $M^2=I$, $\lambda=\pm1$. The measured sign is certainly $\lambda$, and the state is unchanged.

How can the generator list reveal $\lambda$? **Either $M$ or $-M$ is a product of the generators.** To prove this, use Section 4's projector onto the state's line:

$$
\Pi=2^{-n}\sum_{g\in G}g.
$$

Here $G$ contains all generator products. Summing diagonal entries gives $\operatorname{tr}(M\Pi)=\lambda$, hence

$$
\lambda=2^{-n}\sum_{g\in G}\operatorname{tr}(Mg).
$$

Every term is zero unless $g=\pm M$: a Pauli string containing a nonidentity letter has zero trace. If neither sign occurred, we would have $\lambda=0$, a contradiction. This proves existence; the algorithm never enumerates $G$.

### Find the factors, then recover the sign {#finding-the-product}

Let $v(P)$ be the $2n$ binary coordinates of $P$, ignoring its sign. Recall $I\leftrightarrow00$, $X\leftrightarrow10$, $Z\leftrightarrow01$, $Y\leftrightarrow11$. Multiplication adds these coordinates modulo $2$.

Find bits $c_1,\ldots,c_n$ satisfying

$$
\sum_{i=1}^n c_i v(g_i)=v(M).
$$

Use **Gaussian elimination over $\mathbb F_2$**, the numbers $0,1$ with arithmetic modulo $2$. Write the $2n$ coordinate equations as rows, including their right-hand sides. Choose an unused row with a 1 in the next variable column as a pivot, swap it into position, and XOR it into other rows with a 1 there; skip a column without a pivot. Repeat, then read off the solution, setting any free variables to 0. These reversible operations preserve the solutions; the product-existence proof guarantees one.

There are $O(n)$ pivots, each updating $O(n)$ rows of length $O(n)$: $O(n^3)$ elementary array operations.

Now multiply the selected **signed** generators using the exact Pauli rules. Their product is $\varepsilon M$, with $\varepsilon=\pm1$: commuting Hermitian generators have a Hermitian product. It fixes the state, so the measured sign is $m=\varepsilon$. This sign recovery costs $O(n^2)$. Binary coordinates find the factors; their signs determine the bit.

## Case 2: a fair outcome {#random}

Suppose some generator anticommutes with $M$; relabel it $g_1$. Because $g_1$ fixes the state and is Hermitian,

$$
\begin{split}
E&=\langle\psi|g_1Mg_1|\psi\rangle\\
&=-\langle\psi|M|\psi\rangle=-E.
\end{split}
$$

Therefore $E=0$, and both signs have probability $1/2$. Sample one fair sign $m$. The normalized conditional state is

$$
|\psi_m\rangle=\frac{(I+mM)|\psi\rangle}{\sqrt2}.
$$

Update the generators instead of constructing that vector:

1. For each $i>1$ that anticommutes with $M$, replace $g_i$ by $g_1g_i$, including its sign. Leave other rows unchanged. Use the **old** $g_1$ throughout.
2. Replace $g_1$ by $mM$.

Call the other resulting rows $h_2,\ldots,h_n$. Each commutes with $M$: two anticommutations cancel. Step 1 preserves the old group and independence because each row operation reverses itself.

Every $h_i$ fixes $|\psi\rangle$ and commutes with $I+mM$, so it fixes $|\psi_m\rangle$. The new row $mM$ also fixes it, because $M^2=I$. All new rows commute: the $h_i$ are products of commuting old rows and commute with $M$.

They remain **independent**. A relation using only the $h_i$ contradicts the old independence. A relation involving $mM$ would express $M$, up to sign, as a product of the $h_i$. Such a product commutes with the old $g_1$, whereas $M$ anticommutes with it: impossible.

They are **consistent** because the nonzero conditional state satisfies every new constraint. Section 4 therefore guarantees that these $n$ rows describe exactly the conditional state. At most $n-1$ length-$n$ products cost $O(n^2)$ elementary array operations.

<aside class="worked-example" markdown="1">
### Example: measure a Bell pair {#worked-check-the-bell-pair}

Start with $XX,ZZ$. Measuring the left qubit uses $M=ZI$, which anticommutes with $XX$. Sample $m$ fairly; the new rows are $mZI,ZZ$.

For the right qubit, $M=IZ$ commutes with both. Their product is $(mZI)(ZZ)=mIZ$, so its sign is also $m$.

| First bit | Conditional probability that the second bit matches |
| --- | --- |
| 0 | $\Pr(b_1=0\mid b_0=0)=1$ |
| 1 | $\Pr(b_1=1\mid b_0=1)=1$ |

Thus $00$ and $11$ each have probability $1/2$. The second measurement needs no new coin.
</aside>

## Check your understanding {#practice}

### 1. A negative generator

The generators are $-ZI$ and $IZ$. What happens when the left qubit is measured?

<details markdown="1">
<summary>Show answer</summary>

Here $M=ZI$ and $-ZI=-M$ is a generator. Its sign gives $m=-1$, hence bit $1$ with certainty. The rows stay unchanged.
</details>

### 2. Updating two anticommuting rows

For a different state, start with generators $XX,YY$. Measure the left qubit and obtain bit $0$. What are the new generators?

<details markdown="1">
<summary>Show answer</summary>

Both rows anticommute with $ZI$. Keep $XX$ as the pivot and replace $YY$ by $(XX)(YY)=-ZZ$, since $(X\cdot Y)\otimes(X\cdot Y)=(iZ)\otimes(iZ)$. Then replace the pivot by $+ZI$. The resulting rows are $ZI,-ZZ$.
</details>

### 3. Why not use independent coins?

Each Bell-pair bit is individually fair. Would two independent fair coins sample its output correctly?

<details markdown="1">
<summary>Show answer</summary>

No. Independent coins assign probability $1/4$ to each string, including the impossible $01$ and $10$. After sampling the first bit, the second must match it. Updating the generators enforces that conditional probability.
</details>

**Carry forward:** sample each measurement from the current generators, then retain the conditional state before measuring the next qubit.
{: #takeaways}

## References {#references}

1. Ronald de Wolf, [Quantum Computing: Lecture Notes](https://homepages.cwi.nl/~rdewolf/qcnotes.pdf), §§20.1–20.3, especially the two measurement cases.
2. Scott Aaronson and Daniel Gottesman, [Improved Simulation of Stabilizer Circuits](https://arxiv.org/pdf/quant-ph/0406196), §III: exact sign tracking and simulation costs.
