One qubit has amplitudes for two possible measurement outcomes. Two qubits have amplitudes for four joint outcomes. We will build a Bell state and show why its joint state cannot be described by assigning a separate pure state to each qubit.

## Combining two qubits

We label the qubits $q_0$ and $q_1$, with $q_0$ always on the left. Thus $|01\rangle$ means that the first qubit is in $|0\rangle$ and the second is in $|1\rangle$. The **computational basis** now has four vectors, in the order

\[
|00\rangle,\quad |01\rangle,\quad |10\rangle,\quad |11\rangle.
\]

These are the four standard coordinate vectors. A general pure state is

\[
\begin{split}
|\psi\rangle&=a|00\rangle+b|01\rangle\\
&\quad+c|10\rangle+d|11\rangle,
\end{split}
\]

where the complex amplitudes satisfy

\[
|a|^2+|b|^2+|c|^2+|d|^2=1.
\]

Throughout this section, **measurement means computational-basis measurement**. The Born rule works just as before:

| Joint outcome | Amplitude | Probability |
| --- | --- | --- |
| $00$ | $a$ | $|a|^2$ |
| $01$ | $b$ | $|b|^2$ |
| $10$ | $c$ | $|c|^2$ |
| $11$ | $d$ | $|d|^2$ |

Measuring both qubits leaves the basis state observed. If we measure only $q_0$, find its outcome probabilities by grouping the outcomes with the same first bit:

\[
\begin{split}
\Pr(q_0=0)&=|a|^2+|b|^2,\\
\Pr(q_0=1)&=|c|^2+|d|^2.
\end{split}
\]

We add **probabilities**, not amplitudes: $00$ and $01$ are distinct basis outcomes. If measuring $q_0$ gives 0, the state retains the $|00\rangle$ and $|01\rangle$ terms, rescaled to be normalized. In particular, measuring one qubit need not fix the other qubit's value. [1]

## Tensor products and product states

Suppose we independently prepare the first qubit in $|u\rangle=\alpha|0\rangle+\beta|1\rangle$ and the second in $|v\rangle=\gamma|0\rangle+\delta|1\rangle$. How do their two-entry vectors become one four-entry vector?

**Definition (Tensor product)**: The tensor product $\otimes$ combines the vectors by multiplying every amplitude from the first by every amplitude from the second, in basis order:

\[
\begin{pmatrix}\alpha\\\beta\end{pmatrix}\otimes
\begin{pmatrix}\gamma\\\delta\end{pmatrix}
=\begin{pmatrix}\alpha\gamma\\\alpha\delta\\\beta\gamma\\\beta\delta\end{pmatrix}.
\]

In ket notation, use $|x\rangle\otimes|y\rangle=|xy\rangle$ for bits $x,y$, and expand distributively:

\[
\begin{split}
|u\rangle\otimes|v\rangle
&=(\alpha|0\rangle+\beta|1\rangle)\otimes(\gamma|0\rangle+\delta|1\rangle)\\
&=\alpha\gamma|00\rangle+\alpha\delta|01\rangle\\
&\quad+\beta\gamma|10\rangle+\beta\delta|11\rangle.
\end{split}
\]

A state that can be written as $|u\rangle\otimes|v\rangle$ is called a **product state**. For example,

\[
|+\rangle\otimes|0\rangle
=\frac{|00\rangle+|10\rangle}{\sqrt2}.
\]

Its two nonzero amplitudes do not prevent it from being a product state. What matters is whether the whole vector factors.

Product states give independent measurement outcomes. For instance, $\Pr(11)=|\beta\delta|^2=|\beta|^2|\delta|^2$. Summing all four probabilities gives $(|\alpha|^2+|\beta|^2)(|\gamma|^2+|\delta|^2)=1$, so the joint vector is normalized when both input vectors are. [1]

## Building the Bell state

For gates, $A\otimes B$ means apply $A$ to the first qubit and $B$ to the second. On product states,

\[
(A\otimes B)(|u\rangle\otimes|v\rangle)
=A|u\rangle\otimes B|v\rangle.
\]

Apply this rule to each term of a superposition using linearity. In particular, $H\otimes I$ applies H only to $q_0$; the identity gate $I$ leaves $q_1$ unchanged.

The **controlled-NOT gate (CNOT)** has a control qubit and a target qubit. Here $q_0$ is the control and $q_1$ the target: it leaves the control unchanged and flips the target exactly when the control bit is 1.

| Input basis state | Output basis state |
| --- | --- |
| $|00\rangle$ | $|00\rangle$ |
| $|01\rangle$ | $|01\rangle$ |
| $|10\rangle$ | $|11\rangle$ |
| $|11\rangle$ | $|10\rangle$ |

Equivalently, $|xy\rangle\mapsto|x,y\oplus x\rangle$, where $\oplus$ is addition modulo 2. This permutation of basis vectors is unitary. On a superposition, CNOT acts linearly on every term; **it does not measure the control**. [2]

<aside class="worked-example" markdown="1">
### Example: prepare the Bell state

Start in $|00\rangle$ and apply these two gates, with no measurement between them.

**Step 1: apply H to the first qubit.** Since $H|0\rangle=(|0\rangle+|1\rangle)/\sqrt2$,

\[
\begin{split}
(H\otimes I)|00\rangle
&=(H|0\rangle)\otimes|0\rangle\\
&=\frac{|00\rangle+|10\rangle}{\sqrt2}.
\end{split}
\]

**Step 2: apply CNOT.** The $|00\rangle$ term stays fixed, while $|10\rangle$ becomes $|11\rangle$:

\[
\begin{split}
&\operatorname{CNOT}\frac{|00\rangle+|10\rangle}{\sqrt2}\\
&\quad=\frac{\operatorname{CNOT}|00\rangle+\operatorname{CNOT}|10\rangle}{\sqrt2}\\
&\quad=\frac{|00\rangle+|11\rangle}{\sqrt2}.
\end{split}
\]

The final state is the **Bell state** we will use throughout the guide, denoted

\[
|\Phi^+\rangle=\frac{|00\rangle+|11\rangle}{\sqrt2}.
\]

Measuring both qubits gives $00$ or $11$, each with probability $1/2$. If we measure only $q_0$, we get 0 or 1 equally often. Conditioned on that outcome, the joint state becomes $|00\rangle$ or $|11\rangle$, respectively, so a subsequent measurement of $q_1$ agrees with $q_0$.
</aside>

Try the [interactive Bell-state example](./index.html#bell-preview) to follow these two steps. Its state and probability displays track the joint system; the next section explains its stabilizer rows.

## Why the Bell state is entangled

**Definition (Entanglement of a pure state)**: A pure state of two qubits is entangled if it cannot be written as a product of two one-qubit state vectors.

Suppose $|\Phi^+\rangle$ were $(\alpha|0\rangle+\beta|1\rangle)\otimes(\gamma|0\rangle+\delta|1\rangle)$. The tensor-product expansion would require

\[
\begin{split}
\alpha\gamma&=1/\sqrt2,\qquad \alpha\delta=0,\\
\beta\gamma&=0,\qquad\quad \beta\delta=1/\sqrt2.
\end{split}
\]

Since $\alpha\gamma\ne0$, both $\alpha$ and $\gamma$ are nonzero. Likewise, $\beta\delta\ne0$ makes both $\beta$ and $\delta$ nonzero. But then $\alpha\delta$ cannot be 0: a contradiction. **The Bell state is therefore entangled.** Allowing a global phase does not change this conclusion, since that phase could be absorbed into one tensor factor.

### Entanglement versus classical correlation

A fair coin could tell us to prepare $|00\rangle$ or $|11\rangle$. That mixture has the same measurement probabilities as $|\Phi^+\rangle$, but the preparations differ. To see this, apply H to both qubits before measuring:

\[
\begin{split}
(H\otimes H)|\Phi^+\rangle
&=\frac{|+\rangle\otimes|+\rangle+|-\rangle\otimes|-\rangle}{\sqrt2}\\
&=|\Phi^+\rangle.
\end{split}
\]

In the last equality, expanding the two products cancels the $|01\rangle$ and $|10\rangle$ terms. The Bell state still gives only $00$ and $11$.

The coin-selected preparation instead becomes a random choice between $|+\rangle\otimes|+\rangle$ and $|-\rangle\otimes|-\rangle$. Each product gives every two-bit outcome with probability $1/4$, so their mixture does too. Here we **average probabilities** across the coin's choices; we do not add amplitudes from separate preparations. This is why matching probabilities in one measurement basis does not establish that two states are the same.

### From two qubits to many

For $n$ qubits, the same pattern gives

\[
|\psi\rangle=\sum_{x\in\{0,1\}^n}\alpha_x|x\rangle,
\qquad \sum_x|\alpha_x|^2=1.
\]

There are $2^n$ basis strings, so explicitly listing all amplitudes uses $2^n$ entries. The next sections develop a much shorter description for a useful family of states, including this entangled Bell state.

## Check your understanding {#practice}

### 1. Expanding a product state

Expand $|+\rangle\otimes|-\rangle$ in the computational basis. What are the four measurement probabilities? Is it entangled?

<details markdown="1">
<summary>Show answer</summary>

Distribute the two factors:

\[
|+\rangle\otimes|-\rangle
=\frac{|00\rangle-|01\rangle+|10\rangle-|11\rangle}{2}.
\]

Every amplitude has magnitude $1/2$, so every outcome has probability $1/4$. The state is a product state by construction, even though all four amplitudes are nonzero. It is not entangled.
</details>

### 2. Applying H to the other qubit

Start in $|00\rangle$, apply H to $q_1$ rather than $q_0$, then apply CNOT with control $q_0$. Is the result entangled?

<details markdown="1">
<summary>Show answer</summary>

The first gate produces $(|00\rangle+|01\rangle)/\sqrt2$. CNOT fixes both terms because their control bit is 0. The result is $|0\rangle\otimes|+\rangle$, a product state. CNOT can create entanglement, but does not do so for every input.
</details>

### 3. A different starting state

Start in $|10\rangle$, apply H to $q_0$, then apply CNOT with control $q_0$. Find the final state and its measurement probabilities. Is it the same physical state as $|\Phi^+\rangle$?

<details markdown="1">
<summary>Show answer</summary>

Since $H|1\rangle=(|0\rangle-|1\rangle)/\sqrt2$, the two steps give

\[
\begin{split}
|10\rangle&\longmapsto\frac{|00\rangle-|10\rangle}{\sqrt2}\\
&\longmapsto\frac{|00\rangle-|11\rangle}{\sqrt2}.
\end{split}
\]

The outcomes are still $00$ and $11$, each with probability $1/2$. But the minus sign changes the relative phase between the two nonzero amplitudes. A global factor preserving the $|00\rangle$ amplitude must be 1, so it cannot change the sign of the $|11\rangle$ amplitude. This is a different physical state from $|\Phi^+\rangle$.
</details>

**Carry forward:** tensor products combine independent pure-state preparations; entangled states require a joint description. Gates act on amplitudes, and measurement probabilities alone can hide the relative phases that matter later.
{: #takeaways}

## References {#references}

1. [IBM Quantum Learning: Quantum information for multiple systems](https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/multiple-systems/quantum-information). Tensor products, entangled pure states, and partial measurements.
2. [Ronald de Wolf, Quantum Computing: Lecture Notes](https://homepages.cwi.nl/~rdewolf/qcnotes.pdf), §§1.3–1.4. Multi-qubit states and elementary gates.
