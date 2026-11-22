One qubit has two amplitudes. Two qubits have four, and those four numbers can describe states that cannot be assembled from separate one-qubit states. The Bell state will be our running example of this phenomenon.

## Combining two qubits

We write the two qubits in the order $|q_0q_1\rangle$: $q_0$ is always the leftmost bit. The computational basis is $|00\rangle,|01\rangle,|10\rangle,|11\rangle$, represented by the four coordinate vectors $(1,0,0,0)^T$, $(0,1,0,0)^T$, $(0,0,1,0)^T$, and $(0,0,0,1)^T$. Here the superscript $T$ turns a row into a column. A general pure state is

\[
\begin{split}|\psi\rangle&=a|00\rangle+b|01\rangle\\&\quad+c|10\rangle+d|11\rangle,\end{split}
\]
\[
|a|^2+|b|^2+|c|^2+|d|^2=1.
\]

Measuring both qubits gives $00,01,10,11$ with probabilities $|a|^2,|b|^2,|c|^2,|d|^2$, respectively. The resulting state is the basis state observed.

If the qubits are prepared separately in $\alpha|0\rangle+\beta|1\rangle$ and $\gamma|0\rangle+\delta|1\rangle$, their joint state is the **tensor product**, denoted by $\otimes$. For two columns, its rule is

\[
\begin{pmatrix}\alpha\\\beta\end{pmatrix}\otimes
\begin{pmatrix}\gamma\\\delta\end{pmatrix}
=\begin{pmatrix}\alpha\gamma\\\alpha\delta\\\beta\gamma\\\beta\delta\end{pmatrix}.
\]

Equivalently, expand the tensor product distributively, using $|a\rangle\otimes|b\rangle=|ab\rangle$. A state expressible this way is a **product state**. For example, $|+\rangle\otimes|0\rangle=(|00\rangle+|10\rangle)/\sqrt2$, where $|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$. Tensor products describe joint systems, not ordinary multiplication of two column vectors. [1]

In a product state, measurement probabilities factor as expected: the probability of $11$ is $|\beta\delta|^2=|\beta|^2|\delta|^2$. If both input vectors are normalized, their tensor product is normalized too, because the sum of its four squared magnitudes is $(|\alpha|^2+|\beta|^2)(|\gamma|^2+|\delta|^2)=1$.

## Building the Bell state

For gates, $A\otimes B$ applies $A$ to the first qubit and $B$ to the second. On a product state it acts as $(A\otimes B)(|u\rangle\otimes|v\rangle)=A|u\rangle\otimes B|v\rangle$, and we extend this rule linearly to every state.

Start in $|00\rangle$. Applying $H$ to $q_0$ gives

\[
(H\otimes I)|00\rangle=\frac{|00\rangle+|10\rangle}{\sqrt2}.
\]

The **controlled-NOT gate**, or CNOT, uses $q_0$ as its control and $q_1$ as its target. Its rule is $|ab\rangle\mapsto|a,b\oplus a\rangle$, where $\oplus$ is addition modulo $2$. Thus it fixes $00$ and $01$, and swaps $10$ with $11$. It permutes the basis vectors, so it is unitary. By linearity,

\[
\operatorname{CNOT}\frac{|00\rangle+|10\rangle}{\sqrt2}
=\frac{|00\rangle+|11\rangle}{\sqrt2}
=|\Phi^+\rangle.
\]

This is a **Bell state**. Measuring both qubits returns $00$ or $11$, each with probability $1/2$. Measuring only $q_0$ likewise gives a fair bit; conditioned on its value, the joint state becomes $|00\rangle$ or $|11\rangle$.

Use the [interactive Bell-state example](./index.html#bell-preview) to follow the same two gates. Its state and probability displays describe the joint system at each step; we will explain the stabilizer rows next.

## Why the Bell state is entangled

A pure state of two qubits is **entangled** if it is not a product state. Suppose $|\Phi^+\rangle$ were the product above. Comparing coefficients would require

\[
\alpha\gamma=\beta\delta=1/\sqrt2,
\qquad \alpha\delta=\beta\gamma=0.
\]

The first two equalities make all four factors nonzero, contradicting the other equalities. Therefore this state is entangled. Correlated outcomes alone would not prove this: choosing $00$ or $11$ using a classical coin gives the same computational-basis probabilities. The coefficient argument concerns the quantum state itself.

For $n$ qubits, the same rules give $|\psi\rangle=\sum_{x\in\{0,1\}^n}\alpha_x|x\rangle$, with $\sum_x|\alpha_x|^2=1$. Listing every amplitude now uses $2^n$ entries. We will look for a shorter description of a useful family of these states.

## Check your understanding {#practice}

Apply $H$ to $q_1$, rather than $q_0$, in $|00\rangle$, then apply CNOT with control $q_0$. Is the result entangled?

<details markdown="1">
<summary>Show answer</summary>

The first gate produces $(|00\rangle+|01\rangle)/\sqrt2$. CNOT fixes both terms because the control is $0$. The result is $|0\rangle\otimes|+\rangle$, a product state.

</details>

## References {#references}

1. [IBM Quantum Learning: Quantum information for multiple systems](https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/multiple-systems/quantum-information). See tensor products and entangled states.
2. [Ronald de Wolf, Quantum Computing: Lecture Notes](https://homepages.cwi.nl/~rdewolf/qcnotes.pdf), Chapter 1. Joint states and elementary gates.
