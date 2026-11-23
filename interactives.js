(function () {
  'use strict';

  // Pure calculations shared by the displayed examples and mathematical checks.
  function phaseProbabilities(degrees) {
    const angle = Number(degrees) * Math.PI / 180;
    const zero = Math.min(1, Math.max(0, (1 + Math.cos(angle)) / 2));
    return [zero, 1 - zero];
  }

  const bellBasis = [
    { id: 'phi-plus', zz: 1, xx: 1 },
    { id: 'phi-minus', zz: 1, xx: -1 },
    { id: 'psi-plus', zz: -1, xx: 1 },
    { id: 'psi-minus', zz: -1, xx: -1 }
  ];

  function allowedBasis(zz, xx) {
    return bellBasis.filter(function (vector) {
      return (zz === 'off' || vector.zz === Number(zz)) &&
             (xx === 'off' || vector.xx === Number(xx));
    });
  }

  function syndromeForError(error) {
    const flips = {
      none: [0, 0, 0],
      left: [1, 0, 0],
      middle: [0, 1, 0],
      right: [0, 0, 1]
    }[error];
    if (!flips) throw new Error('Choose no error or one bit flip.');
    return [1 - 2 * (flips[0] ^ flips[1]), 1 - 2 * (flips[1] ^ flips[2])];
  }

  function correctionForSyndrome(signs) {
    if (signs[0] === 1 && signs[1] === 1) return 'none';
    if (signs[0] === -1 && signs[1] === 1) return 'left';
    if (signs[0] === -1 && signs[1] === -1) return 'middle';
    if (signs[0] === 1 && signs[1] === -1) return 'right';
    throw new Error('A syndrome must contain two signs.');
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { phaseProbabilities, allowedBasis, syndromeForError, correctionForSyndrome };
  }
  if (typeof document === 'undefined') return;

  function revealControls(root) {
    root.querySelectorAll('.demo-controls').forEach(function (controls) {
      controls.hidden = false;
    });
  }

  function piLabel(degrees) {
    if (degrees === 0) return '0';
    let a = degrees;
    let b = 180;
    while (b) { const remainder = a % b; a = b; b = remainder; }
    const numerator = degrees / a;
    const denominator = 180 / a;
    return (numerator === 1 ? '' : String(numerator)) + 'π' +
           (denominator === 1 ? '' : '/' + denominator);
  }

  function percentage(probability) {
    // Preserve exact landmark values; mark rounded intermediate values explicitly.
    if (Math.abs(probability) < 1e-12) return '0%';
    if (Math.abs(probability - 0.5) < 1e-12) return '50%';
    if (Math.abs(probability - 1) < 1e-12) return '100%';
    return '≈' + (probability * 100).toFixed(2).replace(/\.?0+$/, '') + '%';
  }

  function initializePhase(root) {
    const slider = root.querySelector('#relative-phase');
    const status = root.querySelector('[data-phase-status]');
    function render(announce) {
      const degrees = Number(slider.value);
      const label = piLabel(degrees);
      const probabilities = phaseProbabilities(degrees);
      root.querySelector('#phase-angle').textContent = degrees + '° (' + label + ' radians)';
      slider.setAttribute('aria-valuetext', degrees + ' degrees, ' + label + ' radians');
      root.querySelector('[data-phase-arrow]').setAttribute('transform', 'rotate(' + (-degrees) + ' 110 95)');
      root.querySelector('#phase-circle-title').textContent =
        'The phase factor is at angle ' + degrees + ' degrees on the unit circle.';
      probabilities.forEach(function (probability, i) {
        root.querySelector('[data-phase-probability="' + i + '"]').textContent = percentage(probability);
        root.querySelector('[data-phase-bar="' + i + '"]').style.width = (100 * probability) + '%';
      });
      root.querySelectorAll('[data-phase]').forEach(function (button) {
        button.setAttribute('aria-pressed', String(Number(button.dataset.phase) === degrees));
      });
      // Visual feedback follows dragging; spoken explanations update on release.
      if (!announce) return;
      if (degrees === 0 || degrees === 360) {
        status.textContent = 'At δ = ' + label + ', the contributions to outcome 1 cancel. Applying H gives outcome 0 with certainty.';
      } else if (degrees === 180) {
        status.textContent = 'At δ = π, the contributions to outcome 0 cancel. Applying H gives outcome 1 with certainty.';
      } else if (degrees === 90 || degrees === 270) {
        status.textContent = 'At δ = ' + label + ', both outcomes remain equally likely after H. The phases π/2 and 3π/2 give the same probabilities in this experiment.';
      } else {
        status.textContent = 'Direct measurement stays 50–50. After H, outcome 0 has probability ' +
          percentage(probabilities[0]) + ' and outcome 1 has probability ' +
          percentage(probabilities[1]) + ', because the contributions to their amplitudes combine differently.';
      }
    }
    slider.addEventListener('input', function () { render(false); });
    slider.addEventListener('change', function () { render(true); });
    root.querySelectorAll('[data-phase]').forEach(function (button) {
      button.addEventListener('click', function () {
        slider.value = button.dataset.phase;
        render(true);
      });
    });
    render(true);
    revealControls(root);
  }

  function initializeConstraints(root) {
    const zz = root.querySelector('#zz-constraint');
    const xx = root.querySelector('#xx-constraint');
    function render() {
      const allowed = allowedBasis(zz.value, xx.value);
      const ids = allowed.map(function (vector) { return vector.id; });
      root.querySelector('[data-constraint-dimension]').textContent = String(allowed.length);
      root.querySelectorAll('[data-basis]').forEach(function (card) {
        const fits = ids.includes(card.dataset.basis);
        card.dataset.allowed = String(fits);
        card.querySelector('.demo-vector-status').textContent = fits ? 'Allowed' : 'Excluded';
      });
      const descriptions = {
        4: 'No equations are selected, so all two-qubit states are allowed. Add a ZZ constraint, then an XX constraint, and watch the dimension change from 4 to 2 to 1.',
        2: 'One equation leaves a two-dimensional subspace. Any normalized linear combination of the two allowed basis vectors satisfies the constraint.',
        1: 'Two independent equations leave a one-dimensional subspace. The single allowed vector specifies the normalized state up to global phase.'
      };
      root.querySelector('[data-constraint-status]').textContent = descriptions[allowed.length];
    }
    zz.addEventListener('change', render);
    xx.addEventListener('change', render);
    root.querySelector('[data-clear-constraints]').addEventListener('click', function () {
      zz.value = 'off';
      xx.value = 'off';
      render();
    });
    render();
    revealControls(root);
  }

  function initializeSyndrome(root) {
    let initialError = 'none';
    let currentError = 'none';
    let recordedSigns = null;
    let stage = 'prepared';
    const read = root.querySelector('[data-read-syndrome]');
    const correct = root.querySelector('[data-correct-error]');
    const status = root.querySelector('[data-syndrome-status]');
    function render() {
      root.querySelectorAll('[data-error]').forEach(function (button) {
        button.setAttribute('aria-pressed', String(button.dataset.error === initialError));
      });
      root.querySelectorAll('[data-error-state]').forEach(function (state) {
        state.hidden = state.dataset.errorState !== currentError;
      });
      root.querySelectorAll('[data-syndrome-sign]').forEach(function (output) {
        const sign = recordedSigns && recordedSigns[Number(output.dataset.syndromeSign)];
        output.textContent = sign ? (sign === 1 ? '+1' : '−1') : 'Not read';
        output.parentElement.dataset.sign = sign ? String(sign) : 'unread';
      });
      read.disabled = stage !== 'prepared';
      correct.disabled = stage !== 'measured' || correctionForSyndrome(recordedSigns) === 'none';
      if (stage === 'prepared') {
        status.textContent = initialError === 'none'
          ? 'The state is prepared with no error. Choose a bit flip, then read the checks to identify it.'
          : 'An X error has flipped the ' + initialError + ' qubit. Read the checks to see which pairwise agreements changed.';
      } else if (stage === 'measured') {
        const correction = correctionForSyndrome(recordedSigns);
        status.textContent = correction === 'none'
          ? 'Both checks give +1. In this single-flip model, no error occurred and no correction is needed.'
          : 'The recorded syndrome identifies the ' + correction + ' qubit. Apply X to that qubit again to undo the flip.';
      } else {
        status.textContent = 'Corrected: applying X again restores the original GHZ state. The recorded syndrome above is from before correction; repeating the checks now would give (+1, +1).';
      }
    }
    function prepare(error) {
      initialError = error;
      currentError = error;
      recordedSigns = null;
      stage = 'prepared';
      render();
    }
    root.querySelectorAll('[data-error]').forEach(function (button) {
      button.addEventListener('click', function () { prepare(button.dataset.error); });
    });
    read.addEventListener('click', function () {
      if (stage !== 'prepared') return;
      recordedSigns = syndromeForError(currentError);
      stage = 'measured';
      render();
    });
    correct.addEventListener('click', function () {
      if (stage !== 'measured' || correctionForSyndrome(recordedSigns) === 'none') return;
      currentError = 'none';
      stage = 'corrected';
      render();
    });
    root.querySelector('[data-reset-syndrome]').addEventListener('click', function () { prepare('none'); });
    render();
    revealControls(root);
  }

  document.querySelectorAll('[data-demo="phase"]').forEach(initializePhase);
  document.querySelectorAll('[data-demo="constraints"]').forEach(initializeConstraints);
  document.querySelectorAll('[data-demo="syndrome"]').forEach(initializeSyndrome);
}());
