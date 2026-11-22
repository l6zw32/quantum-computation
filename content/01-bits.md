A quantum computation has a state, gates that change it, and measurements that produce classical answers. We begin with one qubit and introduce the mathematics as we need it.

<span id="bits"></span>

## From bits to state vectors {#states}

A classical bit has value 0 or 1.

**Definition (Qubit)**: A qubit is a quantum system with a two-dimensional complex state space. Its state determines the probabilities of obtaining 0 or 1 when measured in the computational basis. A single measurement produces one bit, not a probability.

**Definition (Ket notation)**: The notation $|\cdot\rangle$, called a ket, denotes a column vector.

**Definition (Computational basis)**: The two standard basis states of a qubit are

\[
|0\rangle=\begin{pmatrix}1\\0\end{pmatrix},\qquad
|1\rangle=\begin{pmatrix}0\\1\end{pmatrix}.
\]

**Definition (Pure state and probability amplitudes)**: A pure state of one qubit is represented by a normalized vector

\[
|\psi\rangle=\alpha|0\rangle+\beta|1\rangle
=\begin{pmatrix}\alpha\\\beta\end{pmatrix}.
\]

Here ψ (“psi”) names the state. The complex coefficients α (“alpha”) and β (“beta”) are its probability amplitudes in this basis.

**Definition (Superposition)**: A linear combination of basis states is a superposition. Vector addition and multiplication by a number act entry by entry.

**Definition (Magnitude)**: For a complex number $z=a+bi$, where $a,b$ are real and $i^2=-1$, its magnitude is $|z|=\sqrt{a^2+b^2}$. Its squared magnitude is $|z|^2=a^2+b^2$. For example, $|-1/2|^2=|i/2|^2=1/4$.

**Definition (Normalization)**: A state vector is normalized when its squared magnitudes sum to 1:

\[
|\alpha|^2+|\beta|^2=1.
\]

Thus its vector has length 1. A valid pure-state vector must be normalized.

## Measurement: amplitudes become probabilities {#measurement}

**Definition (Computational-basis measurement)**: This measurement has outcomes labeled 0 and 1, corresponding to the states $|0\rangle$ and $|1\rangle$. For $\alpha|0\rangle+\beta|1\rangle$, the Born rule assigns the probabilities

\[
\Pr(0)=|\alpha|^2,\qquad \Pr(1)=|\beta|^2.
\]

The Born rule is a rule of the quantum model, not something derived from normalization. Normalization ensures that its probabilities sum to 1. The measurement leaves the qubit in the observed basis state, so an immediate repeat gives the same result. To estimate the original probabilities, prepare the original state afresh for each trial. [1]

<aside class="worked-example" markdown="1">
### Example: probabilities

The state $\frac35|0\rangle+\frac45|1\rangle$ is normalized because $9/25+16/25=1$. Measuring it gives 0 with probability $9/25$ and 1 with probability $16/25$. The amplitudes $3/5$ and $4/5$ are **not** the probabilities.
</aside>

<aside class="worked-example" markdown="1">
### Example: which amplitudes give a 50–50 outcome?

Suppose we want a pure qubit state whose computational-basis measurement gives 0 and 1 with probability $1/2$ each. By the Born rule, we need

\[
|\alpha|^2=|\beta|^2=\frac12,
\]
\[
|\alpha|=|\beta|=\frac1{\sqrt2}.
\]

This condition comes from the requested 50–50 distribution; normalization alone only requires the two probabilities to sum to 1.

**The magnitude bars matter.** We can write $\alpha^2=\beta^2=1/2$ only if the amplitudes are real. For example,

\[
\left(\frac{i}{\sqrt2}\right)^2=-\frac12,
\qquad
\left|\frac{i}{\sqrt2}\right|^2=\frac12.
\]

The choice $\alpha=\beta=1/\sqrt2$ works, but so do $\alpha=1/\sqrt2,\ \beta=-1/\sqrt2$ and $\alpha=i/\sqrt2,\ \beta=1/\sqrt2$.

To describe every possibility, use Euler's formula for a real angle $t$:

\[
e^{it}=\cos t+i\sin t.
\]

By the definition of magnitude and the identity $\cos^2t+\sin^2t=1$,

\[
|e^{it}|^2=\cos^2t+\sin^2t=1,
\qquad |e^{it}|=1.
\]

Geometrically, $e^{it}$ runs around the unit circle in the complex plane. Every complex number of magnitude 1 has this form. Dividing by $\sqrt2$ therefore gives every complex number of magnitude $1/\sqrt2$, and

\[
\left|\frac{e^{it}}{\sqrt2}\right|^2
=\frac{|e^{it}|^2}{2}=\frac12.
\]

**Definition (Phase)**: For a nonzero complex number $z=r e^{it}$, where $r=|z|>0$, its phase is the angle $t$, considered modulo $2\pi$.

Thus **all pairs** of amplitudes giving a 50–50 outcome are

\[
\alpha=\frac{e^{i\phi}}{\sqrt2},\qquad
\beta=\frac{e^{i\theta}}{\sqrt2},
\]

where $\phi,\theta$ are real angles. Both phases can vary. We will return to this example after introducing gates and explain why only their difference is physically relevant.
</aside>

## Gates act on amplitudes {#gates}

**Definition (Unitary matrix)**: A square matrix $U$ is unitary if $U^\dagger U=I$, where $I$ is the identity matrix.

**Definition (Conjugate transpose)**: $U^\dagger$ denotes the transpose of $U$ with every entry replaced by its complex conjugate: $a+bi$ becomes $a-bi$.

**Definition (Single-qubit gate)**: A reversible single-qubit gate is represented by a unitary $2\times2$ matrix. Applying it means matrix–vector multiplication:

\[
\begin{pmatrix}a&b\\c&d\end{pmatrix}
\begin{pmatrix}\alpha\\\beta\end{pmatrix}
=\begin{pmatrix}a\alpha+b\beta\\c\alpha+d\beta\end{pmatrix}.
\]

Each output entry combines one matrix row with the input column.

**Definition (Linearity)**: An operation is linear if it preserves linear combinations. In particular, $U(\alpha|0\rangle+\beta|1\rangle)=\alpha U|0\rangle+\beta U|1\rangle$. Matrix multiplication has this property.

Unitarity preserves normalization and makes $U^\dagger$ the inverse operation. Measurement is a separate operation and is generally not reversible. [1]

**Definition (X gate)**: The X gate is the quantum NOT, defined by

\[
X=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
X\begin{pmatrix}\alpha\\\beta\end{pmatrix}
=\begin{pmatrix}\beta\\\alpha\end{pmatrix}.
\]

It swaps $|0\rangle$ and $|1\rangle$, and swaps the amplitudes of any superposition.

## The Hadamard gate and interference {#hadamard}

**Definition (Hadamard gate)**: The Hadamard gate is the matrix

\[
H=\frac1{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}.
\]

It adds and subtracts amplitudes:

\[
H\begin{pmatrix}\alpha\\\beta\end{pmatrix}
=\frac1{\sqrt2}\begin{pmatrix}\alpha+\beta\\\alpha-\beta\end{pmatrix}.
\]

**Definition (Plus and minus states)**: We use the names $|+\rangle$ and $|-\rangle$ for

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

**Definition (Interference)**: Interference is the addition or cancellation of contributions to an amplitude before we take its squared magnitude. Squaring too early would discard the signs. Similarly, $H|-\rangle=|1\rangle$. By linearity, $H^2=I$ for every input. Since $H^\dagger=H$, this also verifies unitarity.

## Superposition, randomness, and phase {#randomness}

**Definition (Mixture)**: A mixture is a state obtained by randomly choosing among pure-state preparations. In general, one pure-state vector cannot describe the resulting state.

Compare preparing $|+\rangle$ with tossing a fair coin and preparing $|0\rangle$ or $|1\rangle$. An immediate measurement cannot distinguish their output distributions. An additional H can:

| Preparation | Measure immediately | Apply H, then measure |
| --- | --- | --- |
| Pure state $|+\rangle$ | 0 or 1, each with probability ½ | 0 with certainty |
| Fair random choice of $|0\rangle$ or $|1\rangle$ | 0 or 1, each with probability ½ | 0 or 1, each with probability ½ |

For the random preparation, H produces $|+\rangle$ or $|-\rangle$ depending on the coin. Either branch gives a fair measurement, so $\Pr(0)=\frac12\cdot\frac12+\frac12\cdot\frac12=\frac12$. **A superposition combines amplitudes; a random preparation averages the branches’ probabilities.**

### Global and relative phase

**Definition (Global phase)**: A global phase is a common factor $c=e^{i\gamma}$ multiplying the entire state vector, where $\gamma$ is real and $|c|=1$.

**Global-phase property:** $|\psi\rangle$ and $c|\psi\rangle$ represent the same physical state. To see why, any sequence of gates preserves the common factor by linearity:

\[
U(c|\psi\rangle)=c\,U|\psi\rangle.
\]

For each resulting amplitude $a$, the measurement probability is unchanged because $|ca|^2=|c|^2|a|^2=|a|^2$. Thus a common phase cannot be detected by applying gates and then measuring. [1]

**Definition (Relative phase)**: When both amplitudes are nonzero, write $\alpha=|\alpha|e^{i\phi}$ and $\beta=|\beta|e^{i\theta}$. Their relative phase is $\delta=\theta-\phi$ modulo $2\pi$.

A global phase adds the same angle to both phases, leaving their difference unchanged. A relative-phase change can affect interference: $|+\rangle$ has relative phase 0 and $|-\rangle$ has relative phase $\pi$, and H turns them into $|0\rangle$ and $|1\rangle$, respectively. [2]

<aside class="worked-example" markdown="1">
### Return to the example: why one angle is enough

Our general 50–50 pure-state vector was

\[
|\psi\rangle=\frac{e^{i\phi}}{\sqrt2}|0\rangle
+\frac{e^{i\theta}}{\sqrt2}|1\rangle.
\]

Factor out $e^{i\phi}$, using $e^{i\theta}=e^{i\phi}e^{i(\theta-\phi)}$:

\[
|\psi\rangle=e^{i\phi}
\frac{|0\rangle+e^{i(\theta-\phi)}|1\rangle}{\sqrt2}.
\]

The factor multiplies the **whole vector**, so it is a global phase. Multiplying by $e^{-i\phi}$ gives a representative of the same physical state:

\[
|\widetilde\psi\rangle=e^{-i\phi}|\psi\rangle
=\frac{|0\rangle+e^{i\delta}|1\rangle}{\sqrt2},
\]

where $\delta=\theta-\phi$ modulo $2\pi$, chosen in $[0,2\pi)$. This is the general form of a pure qubit state with 50–50 computational-basis probabilities, **up to global phase**.

The original $\alpha$ does not have to be $1/\sqrt2$. We have chosen an equivalent representative with that first amplitude. For example, $(i|0\rangle+|1\rangle)/\sqrt2$ becomes $(|0\rangle-i|1\rangle)/\sqrt2$ after multiplying the whole vector by $-i$. Both describe the same physical state, with relative phase $-\pi/2$ (equivalently, $3\pi/2$).
</aside>

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
