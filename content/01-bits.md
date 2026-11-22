A quantum computation has a state, gates that change it, and measurements that produce classical answers. We begin with one qubit and introduce the mathematics as we need it.

<span id="bits"></span>

## From bits to state vectors {#states}

A classical bit has value 0 or 1. If a fair coin chooses its value, we describe the preparation by probabilities ½ and ½. A **qubit** also gives a single bit when measured in the computational basis, but its state is described by **amplitudes** instead.

A column vector is an ordered list written vertically. The two **computational basis states** are

\[
|0\rangle=\begin{pmatrix}1\\0\end{pmatrix},\qquad
|1\rangle=\begin{pmatrix}0\\1\end{pmatrix}.
\]

The notation $|\cdot\rangle$, called a **ket**, denotes a vector. A **pure state** of one qubit is represented by

\[
|\psi\rangle=\alpha|0\rangle+\beta|1\rangle
=\begin{pmatrix}\alpha\\\beta\end{pmatrix}.
\]

Here ψ (“psi”) names the state, and α (“alpha”) and β (“beta”) are its amplitudes. Vector addition and multiplication by a number act entry by entry. A linear combination of basis states is a **superposition**.

Amplitudes may be complex. For real $a,b$, the complex number $a+bi$ has $i^2=-1$ and **squared magnitude** $|a+bi|^2=a^2+b^2$. For example, $|-1/2|^2=|i/2|^2=1/4$. A valid state is **normalized**:

\[
|\alpha|^2+|\beta|^2=1.
\]

Thus its vector has length 1. We will also consider a **mixture**: a preparation that randomly chooses among pure states. It need not be described by one pure-state vector.

## Measurement: amplitudes become probabilities {#measurement}

For $\alpha|0\rangle+\beta|1\rangle$, a **computational-basis measurement** returns 0 or 1 according to the **Born rule**:

\[
\Pr(0)=|\alpha|^2,\qquad \Pr(1)=|\beta|^2.
\]

Normalization makes the probabilities sum to 1. The measurement also leaves the qubit in $|0\rangle$ or $|1\rangle$, respectively, up to an irrelevant global phase explained below. An immediate repeat gives the same result. To estimate the original probabilities, prepare the original state afresh for each trial. [1]

<aside class="worked-example" markdown="1">
### Example: probabilities

The state $\frac35|0\rangle+\frac45|1\rangle$ is normalized because $9/25+16/25=1$. Measuring it gives 0 with probability $9/25$ and 1 with probability $16/25$. The amplitudes $3/5$ and $4/5$ are **not** the probabilities.
</aside>

## Gates act on amplitudes {#gates}

A reversible single-qubit gate is a **unitary** $2\times2$ matrix. Applying it means matrix–vector multiplication:

\[
\begin{pmatrix}a&b\\c&d\end{pmatrix}
\begin{pmatrix}\alpha\\\beta\end{pmatrix}
=\begin{pmatrix}a\alpha+b\beta\\c\alpha+d\beta\end{pmatrix}.
\]

Each output entry combines one matrix row with the input column. This action is **linear**: $U(\alpha|0\rangle+\beta|1\rangle)=\alpha U|0\rangle+\beta U|1\rangle$.

Unitarity means $U^\dagger U=I$. The identity $I$ leaves vectors unchanged; the **conjugate transpose** $U^\dagger$ swaps rows and columns and replaces each $a+bi$ by $a-bi$. Unitarity preserves normalization and makes $U^\dagger$ the inverse operation. Measurement is a separate operation and is generally not reversible. [1]

For example, the **X gate** is the quantum NOT:

\[
X=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
X\begin{pmatrix}\alpha\\\beta\end{pmatrix}
=\begin{pmatrix}\beta\\\alpha\end{pmatrix}.
\]

It swaps $|0\rangle$ and $|1\rangle$, and swaps the amplitudes of any superposition.

## The Hadamard gate and interference {#hadamard}

The **Hadamard gate** adds and subtracts amplitudes:

\[
H=\frac1{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}.
\]
\[
H\begin{pmatrix}\alpha\\\beta\end{pmatrix}
=\frac1{\sqrt2}\begin{pmatrix}\alpha+\beta\\\alpha-\beta\end{pmatrix}.
\]

Its action on the basis states defines two useful names:

\[
H|0\rangle=\frac{|0\rangle+|1\rangle}{\sqrt2}=|+\rangle,
\]
\[
H|1\rangle=\frac{|0\rangle-|1\rangle}{\sqrt2}=|-\rangle.
\]

Both states give a fair bit if measured immediately. Their different signs matter when another gate is applied. [2]

<aside class="worked-example" markdown="1">
### Example: apply H twice

Start in $|0\rangle$. After one H, $\alpha=\beta=1/\sqrt2$. After a second H, the amplitudes become

\[
\frac{\alpha+\beta}{\sqrt2}=1,\qquad
\frac{\alpha-\beta}{\sqrt2}=0.
\]

Therefore $H|+\rangle=|0\rangle$: the final measurement gives 0 with certainty. **There is no measurement between the gates.**
</aside>

This is **interference**: contributions to amplitudes add or cancel before we take squared magnitudes. Squaring too early would discard the signs. Similarly, $H|-\rangle=|1\rangle$. By linearity, $H^2=I$ for every input. Since $H^\dagger=H$, this also verifies unitarity.

## Superposition, randomness, and phase {#randomness}

Compare preparing $|+\rangle$ with tossing a fair coin and preparing $|0\rangle$ or $|1\rangle$. An immediate measurement cannot distinguish their output distributions. An additional H can:

| Preparation | Measure immediately | Apply H, then measure |
| --- | --- | --- |
| Pure state $|+\rangle$ | 0 or 1, each with probability ½ | 0 with certainty |
| Fair random choice of $|0\rangle$ or $|1\rangle$ | 0 or 1, each with probability ½ | 0 or 1, each with probability ½ |

For the random preparation, H produces $|+\rangle$ or $|-\rangle$ depending on the coin. Either branch gives a fair measurement, so $\Pr(0)=\frac12\cdot\frac12+\frac12\cdot\frac12=\frac12$. **A superposition combines amplitudes; a random preparation averages the branches’ probabilities.**

The sign difference between $|+\rangle$ and $|-\rangle$ is a **relative phase**: one amplitude changes relative to the other. It affects interference. A **global phase**, by contrast, multiplies every amplitude by the same complex number $c$ with $|c|=1$. The vectors $|\psi\rangle$ and $c|\psi\rangle$ represent the same physical state: gates preserve the common factor, and squared magnitudes remove it. Thus $-|+\rangle$ represents the same state as $|+\rangle$, but $|-\rangle$ does not. [1, 2]

## Check your understanding {#practice}

Start in $|0\rangle$, apply H, measure, apply H again, then measure again. What is the final distribution? What changes if you omit the first measurement?

<details markdown="1">
<summary>Show answer</summary>

The first measurement leaves $|0\rangle$ or $|1\rangle$, each with probability ½. The next H produces $|+\rangle$ or $|-\rangle$, so the final outcome is also fair. Without the first measurement, interference gives $H^2|0\rangle=|0\rangle$, so the final outcome is always 0.
</details>

**Carry forward:** describe pure states with normalized amplitude vectors, transform them with gates, and use squared magnitudes only when computing measurement probabilities.
{: #takeaways}

## References {#references}

1. [Ronald de Wolf, Quantum Computing: Lecture Notes](https://homepages.cwi.nl/~rdewolf/qcnotes.pdf), §§1.2.1–1.2.3 and Appendix A (August 2026 edition).
2. [IBM Quantum Learning: Quantum information for single systems](https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/single-systems/quantum-information). State vectors and Hadamard examples.
