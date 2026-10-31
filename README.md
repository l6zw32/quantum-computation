# Intro to quantum computation and the Gottesman-Knill theorem

A traditional educational website for a CMU 15-455 complexity theory project.

**GitHub owner:** `l6zw32`  
**Repository:** `quantum-computation`  
**Intended public URL:** https://l6zw32.github.io/quantum-computation/

## Current material

The page contains a proposed eight-section outline spanning two lecture units, prerequisites, the Gottesman-Knill theorem statement, an interactive Bell-state example, and three annotated learning resources. The full lessons and theorem proof are clearly identified as planned material.

## Publish with GitHub Pages

1. Sign in to GitHub as `l6zw32` and create a repository named `quantum-computation`. Use a public repository for GitHub Pages on GitHub Free. If the repository already exists, inspect it before adding these files so unrelated work is preserved.
2. Upload or commit the **contents of this folder** to the repository's `main` branch. Put `index.html` at the repository root; do not upload the ZIP itself or put these files inside an additional `quantum-computation` or `dist` folder.
3. Include the empty `.nojekyll` file. If your file picker hides it, use GitHub's **Add file → Create new file** to create a file named `.nojekyll`; it may contain only a blank line.
4. Open **Settings → Pages** in the repository.
5. Under **Build and deployment**, choose **Deploy from a branch**, then branch **main** and folder **/(root)**. Click **Save**.
6. Leave **Custom domain** blank. The requested `github.io` address requires no custom domain or DNS changes.
7. Wait for deployment, then use the **Visit site** link in Pages settings. Confirm the title, styles, and all three Bell-state buttons. The outline is reached by appending `#outline` to the published URL.

GitHub says publication may take up to ten minutes. Preparing or uploading these files alone does not verify that the public site is live.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page content, metadata, references, and the initial Bell-state display. |
| `styles.css` | Traditional responsive layout, keyboard-focus styling, and print formatting. |
| `app.js` | Bell-state controls and section navigation highlighting. |
| `favicon.svg` | Site icon. |
| `.nojekyll` | Publishes these static files without Jekyll processing. |
| `README.md` | Project information and publication instructions. |

All asset paths are relative so they work under `/quantum-computation/`. The canonical and Open Graph URLs already use the intended GitHub Pages address. No framework, package installation, build command, external JavaScript dependency, backend, account database, or API key is needed.

## Updating the site

Edit the HTML, CSS, or JavaScript files and commit the changes to `main`. Once branch publishing is enabled, GitHub Pages republishes changes from that branch. Keep the intended URL in `index.html` up to date if the repository or username changes.

## Mathematics of the example

The example uses the convention `|q0 q1>` with q0 the leftmost qubit. The exact circuit checkpoints are:

| Checkpoint | State | Measurement probabilities (00, 01, 10, 11) | Stabilizer generators |
| --- | --- | --- | --- |
| Initialize | `\|00>` | 1, 0, 0, 0 | `+ZI`, `+IZ` |
| Apply H to q0 | `(\|00> + \|10>)/sqrt(2)` | 1/2, 0, 1/2, 0 | `+XI`, `+IZ` |
| Apply CNOT from q0 to q1 | `(\|00> + \|11>)/sqrt(2)` | 1/2, 0, 0, 1/2 | `+XX`, `+ZZ` |

Probability bars show squared magnitudes of amplitudes. This is a three-step educational example rather than a general-purpose quantum simulator.

## Learning resources

1. Ronald de Wolf, *Quantum Computing: Lecture Notes*: https://homepages.cwi.nl/~rdewolf/qcnotes.pdf
2. *Quantum Computation and Information at CMU*, lecture playlist: https://www.youtube.com/playlist?list=PLm3J0oaFux3YL5qLskC6xQ24JpMwOAeJz
3. Scott Aaronson and Daniel Gottesman, *Improved Simulation of Stabilizer Circuits*: https://arxiv.org/pdf/quant-ph/0406196

## GitHub documentation

- What is GitHub Pages? https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- Configuring a publishing source: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Creating a GitHub Pages site: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
