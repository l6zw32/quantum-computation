# Intro to quantum computation and the Gottesman-Knill theorem

A concise educational website for a CMU 15-455 complexity theory project.

**Public website:** https://l6zw32.github.io/quantum-computation/  
**Repository:** `l6zw32/quantum-computation`

The guide assumes the mathematical background of undergraduate complexity theory and introduces the quantum notation and linear algebra it uses. All eight sections are complete. The site uses a traditional reading layout, native MathML equations, worked examples, expandable practice answers, and focused interactive examples for Bell-state preparation, interference, stabilizer constraints, and error correction.

## Reading order

1. [From classical bits to qubits](https://l6zw32.github.io/quantum-computation/from-bits-to-qubits.html)
2. [Two qubits and the Bell-state example](https://l6zw32.github.io/quantum-computation/two-qubits-and-bell-state.html)
3. [Pauli operators and stabilizer constraints](https://l6zw32.github.io/quantum-computation/pauli-operators-and-stabilizers.html)
4. [Why the state has a compact description](https://l6zw32.github.io/quantum-computation/compact-stabilizer-description.html)
5. [Updating generators under Clifford gates](https://l6zw32.github.io/quantum-computation/clifford-gate-updates.html)
6. [Sampling the final measurements](https://l6zw32.github.io/quantum-computation/sampling-measurements.html)
7. [The Gottesman–Knill theorem and its proof](https://l6zw32.github.io/quantum-computation/gottesman-knill-theorem.html)
8. [Applications and significance](https://l6zw32.github.io/quantum-computation/applications-and-significance.html)

The proof covers circuits initialized in zero, followed by H, S, and CNOT gates, then final computational-basis measurements. It gives exact classical sampling of the joint output distribution, with a compact representation and a conservative polynomial runtime bound. Broader versions and optimized algorithms are left to the references.

## Files and editing

- `index.html`: guide overview, linked reading outline, theorem statement, and references.
- The eight reading-page HTML files: generated, committed pages served directly by GitHub Pages.
- `content/*.md`: the editable section text, with LaTeX math.
- `content/guide.json`: section titles, filenames, and metadata.
- `content/interactives/*.html`: the small demo panels included through `<!-- interactive:name -->` markers in sections 1, 2, 4, and 8.
- `scripts/build.py`: converts the section text into complete HTML pages and MathML.
- `requirements-build.txt`: pinned Python dependencies for rebuilding the reading pages.
- `styles.css`: shared typography and responsive homepage layout.
- `lesson.css`: reading-page styles.
- `app.js`: Bell-state controls in Section 2 and homepage navigation highlighting.
- `interactives.js` and `interactives.css`: the phase, constraint, and syndrome demos. These assets load only on the three pages that use them; the examples retain readable initial states without JavaScript and respect reduced-motion preferences.
- `favicon.svg`, `.nojekyll`, and `LICENSE`: site assets and repository metadata.

To edit a reading section, change its Markdown file and rebuild:

```sh
python -m pip install -r requirements-build.txt
python scripts/build.py
```

Commit both the edited sources and the generated HTML. Use plain text in Markdown headings; equations belong in the section body. Display math may use `\\[ ... \\]` or `$$ ... $$`; inline math uses dollar signs. For aligned multiline equations, use the supported `split` environment.

No Python, framework, external math-rendering script, API key, or backend is needed to visit the website. The build converts equations ahead of time. References are ordinary links; the learning material does not depend on loading those external sites.

## Publication

GitHub Pages publishes the repository’s `main` branch from the root directory. Keep `index.html` and `.nojekyll` at the root. All local asset and page links are relative, so they work under `/quantum-computation/`.

Publishing uses the committed HTML, so no custom build workflow is required. After a change, check the Pages deployment result and the live reading pages.

## Mathematical conventions

- Introduce new terminology where readers first need it. Use a bold “Definition (Term)” label when it makes a central concept easier to find; otherwise define the term naturally in context. Distinguish definitions from rules and properties, and explain newly used notation at its first use.
- The basis order is `|q0 q1 ...>`, with qubit 0 leftmost.
- Tensor-string notation `XZ` means X on the first qubit and Z on the second. Single-qubit matrix multiplication is distinguished explicitly when needed.
- Pauli letters use binary coordinates I = 00, X = 10, Z = 01, Y = 11, with a separate sign bit.
- Multiplying binary labels uses XOR; recovering the actual sign also requires exact Pauli phase multiplication.
- Measurements are sampled sequentially and the generators are updated after each outcome, preserving the joint distribution.
- The stated O(ns + n^4) cost counts elementary array operations for the simple sampler. Its implementation on a Turing machine still has polynomial overhead.

The Bell demo shows these exact checkpoints:

| Checkpoint | State | Probabilities for 00, 01, 10, 11 | Generators |
| --- | --- | --- | --- |
| Initialize | `\|00>` | 1, 0, 0, 0 | +ZI, +IZ |
| H on q0 | `(\|00> + \|10>)/sqrt(2)` | 1/2, 0, 1/2, 0 | +XI, +IZ |
| CNOT from q0 to q1 | `(\|00> + \|11>)/sqrt(2)` | 1/2, 0, 0, 1/2 | +XX, +ZZ |

## Main references

- Ronald de Wolf, [Quantum Computing: Lecture Notes](https://homepages.cwi.nl/~rdewolf/qcnotes.pdf), especially Chapter 1 and Sections 20.1–20.3.
- IBM Quantum Learning, [Basics of quantum information](https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/single-systems/quantum-information).
- Scott Aaronson and Daniel Gottesman, [Improved Simulation of Stabilizer Circuits](https://arxiv.org/pdf/quant-ph/0406196).

