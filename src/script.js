document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor');
  const viewer = document.getElementById('viewer');
  const saveButton = document.getElementById('saveButton');

  const updatePreview = () => {
    const markdownText = editor.value;
    const html = marked.parse(markdownText);
    viewer.innerHTML = DOMPurify.sanitize(html);
    if (window.MathJax && window.MathJax.typesetPromise) {
      MathJax.typesetPromise([viewer]);
    }
  };

  editor.addEventListener('input', updatePreview);
  updatePreview();

  saveButton.addEventListener('click', () => {
    html2pdf().from(viewer).save('preview.pdf');
  });

  function exportToMarkdown() {
    const markdownContent = editor.value;
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'exported_markdown.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function readMarkdownFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      editor.value = e.target.result;
      updatePreview();
    };
    reader.readAsText(file);
  }

  document.getElementById('exportMarkdownButton').addEventListener('click', exportToMarkdown);
  document.getElementById('importMarkdownButton').addEventListener('change', readMarkdownFile);
});
