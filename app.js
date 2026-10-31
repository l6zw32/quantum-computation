'use strict';

// Explicit convention: |q0 q1>, with q0 the leftmost bit.
// The three states are exact checkpoints of H(q0), CNOT(q0 -> q1).
const checkpoints = [
  {
    state: '|00⟩',
    accessibleState: 'Ket zero zero',
    probabilities: [1, 0, 0, 0],
    kind: 'Basis state',
    generators: ['+ZI', '+IZ'],
    explanation: 'Both qubits start in zero. A measurement gives 00 with certainty.'
  },
  {
    state: '<span class="fraction"><span>|00⟩ + |10⟩</span><span>√2</span></span>',
    accessibleState: 'The sum of ket zero zero and ket one zero, divided by square root of two',
    probabilities: [0.5, 0, 0.5, 0],
    kind: 'Product state',
    generators: ['+XI', '+IZ'],
    explanation: 'H puts q₀ in an equal superposition. Qubit q₁ is still zero; the two qubits are not yet entangled.'
  },
  {
    state: '<span class="fraction"><span>|00⟩ + |11⟩</span><span>√2</span></span>',
    accessibleState: 'The sum of ket zero zero and ket one one, divided by square root of two',
    probabilities: [0.5, 0, 0, 0.5],
    kind: 'Entangled',
    generators: ['+XX', '+ZZ'],
    explanation: 'CNOT correlates the two qubits. Measuring gives 00 or 11, each with probability ½.'
  }
];

const checkpointButtons = Array.from(document.querySelectorAll('[data-step]'));
const probabilityColumns = Array.from(document.querySelectorAll('.probability-column'));
const basisLabels = ['zero zero', 'zero one', 'one zero', 'one one'];

function renderCheckpoint(index) {
  const checkpoint = checkpoints[index];
  if (!checkpoint) return;
  checkpointButtons.forEach(function (button) {
    button.setAttribute('aria-pressed', String(Number(button.dataset.step) === index));
  });
  document.querySelector('[data-gate="h"]').classList.toggle('active', index >= 1);
  document.querySelector('[data-gate="cnot"]').classList.toggle('active', index >= 2);
  const stateEquation = document.getElementById('state-equation');
  stateEquation.innerHTML = checkpoint.state;
  stateEquation.setAttribute('aria-label', checkpoint.accessibleState);
  document.getElementById('state-kind').textContent = checkpoint.kind;
  probabilityColumns.forEach(function (column, i) {
    const percentage = String(checkpoint.probabilities[i] * 100) + '%';
    column.querySelector('.bar').style.height = percentage;
    column.querySelector('.bar-number').textContent = percentage;
  });
  document.querySelector('.probability-bars').setAttribute('aria-label', 'Probabilities: ' + checkpoint.probabilities.map(function (value, i) {
    return basisLabels[i] + ' ' + String(value * 100) + ' percent';
  }).join('; '));
  document.getElementById('generators').replaceChildren.apply(document.getElementById('generators'), checkpoint.generators.map(function (generator) {
    const code = document.createElement('code');
    code.textContent = generator;
    return code;
  }));
  document.getElementById('step-explanation').textContent = checkpoint.explanation;
}

checkpointButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    renderCheckpoint(Number(button.dataset.step));
  });
});

// Navigation highlighting is progressive enhancement; all anchors work without JS.
if ('IntersectionObserver' in window) {
  const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      navLinks.forEach(function (link) {
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  ['overview', 'outline', 'theorem', 'bell-preview', 'resources'].forEach(function (id) {
    observer.observe(document.getElementById(id));
  });
}
