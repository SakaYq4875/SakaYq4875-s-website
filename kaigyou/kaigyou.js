(function () {
  const inputEl = document.getElementById('input');
  const outputEl = document.getElementById('output');
  const convertBtn = document.getElementById('convertBtn');
  const clearBtn = document.getElementById('clearBtn');
  const copyBtn = document.getElementById('copyBtn');
  const copyStatus = document.getElementById('copyStatus');

  // Convert: replace actual newlines with literal "\n"
  function convertNewlinesToLiteral(input) {
    // Normalize Windows \r\n and Unix \n
    return input.replace(/\r?\n/g, '\\n');
  }

  function handleConvert() {
    const src = inputEl.value || '';
    const converted = convertNewlinesToLiteral(src);
    outputEl.value = converted;
    copyStatus.textContent = '';
  }

  function handleClear() {
    inputEl.value = '';
    outputEl.value = '';
    copyStatus.textContent = '';
    inputEl.focus();
  }

  async function handleCopy() {
    const text = outputEl.value || '';
    if (!text) {
      copyStatus.textContent = 'コピーするテキストがありません。';
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      copyStatus.textContent = 'コピーしました。';
    } catch (err) {
      // Fallback for older browsers: select and execCommand
      outputEl.focus();
      outputEl.select();
      const ok = document.execCommand && document.execCommand('copy');
      copyStatus.textContent = ok ? 'コピーしました。' : 'コピーに失敗しました。';
    }
  }

  // Live convert on input for convenience
  inputEl.addEventListener('input', handleConvert);
  convertBtn.addEventListener('click', handleConvert);
  clearBtn.addEventListener('click', handleClear);
  copyBtn.addEventListener('click', handleCopy);
})();
