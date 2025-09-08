(function() {
  const $ = (id) => document.getElementById(id);
  const left = $('left');
  const right = $('right');
  const run = $('run');
  const swap = $('swap');
  const ignoreSpace = $('ignoreSpace');
  const wordMode = $('wordMode');
  const copyBtn = $('copyDiff');
  const result = $('result');

  function compute() {
    result.setAttribute('aria-busy', 'true');
    result.innerHTML = '';
    const a = left.value || '';
    const b = right.value || '';
    const options = {};
    if (ignoreSpace.checked) options.ignoreWhitespace = true;

    let parts;
    if (wordMode.checked) {
      parts = Diff.diffWords(a, b, options);
    } else {
      parts = Diff.diffLines(a, b, options);
    }

    // Render chunks
    let bufferText = '';
    parts.forEach(p => {
      const span = document.createElement('div');
      span.className = 'chunk ' + (p.added ? 'added' : p.removed ? 'removed' : 'same');
      span.textContent = p.value;
      result.appendChild(span);
      bufferText += (p.added ? '[+]' : p.removed ? '[-]' : '[=]') + p.value;
    });
    result.setAttribute('aria-busy', 'false');

    // Save last diff for copy
    result.dataset.plainText = bufferText;
  }

  run.addEventListener('click', compute);
  swap.addEventListener('click', () => {
    const tmp = left.value;
    left.value = right.value;
    right.value = tmp;
  });
  [ignoreSpace, wordMode].forEach(el => el.addEventListener('change', compute));
  copyBtn.addEventListener('click', async () => {
    const txt = result.dataset.plainText || '';
    try {
      await navigator.clipboard.writeText(txt);
      copyBtn.textContent = '복사됨';
      setTimeout(() => copyBtn.textContent = '결과 복사', 1200);
    } catch (e) {
      alert('클립보드 복사 실패: ' + e.message);
    }
  });

  // keyboard: Ctrl/Cmd+Enter to run
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      compute();
    }
  });
})();