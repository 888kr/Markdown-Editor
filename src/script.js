document.addEventListener('DOMContentLoaded', function() { 
    const markedScript = document.createElement('script');
    markedScript.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
    const pdf = document.createElement('script');
    pdf.src = "./jsPDF.js"
    document.head.appendChild(markedScript);
    const editor = document.getElementById('editor');
    const viewer = document.getElementById('viewer');
    const saveButton = document.getElementById('saveButton');














    // Add event listeners
    editor.addEventListener('input', () => {
        const markdownText = editor.value;
        const html = marked.parse(markdownText);
        viewer.innerHTML = html;
    });
    saveButton.addEventListener('click', () => {
        const viewerContent = viewer; // Assuming viewer is the HTML element to save
        // Use html2pdf library to save the content as a PDF
        html2pdf().from(viewerContent).save('preview.pdf');
      });
    markedScript.onload = function() {
        const editor = document.getElementById('editor');
        const viewer = document.getElementById('viewer');
    
        editor.addEventListener('input', () => {
        const markdownText = editor.value;
        const html = marked.parse(markdownText);
        viewer.innerHTML = html;
        });
    };
    function exportToMarkdown() {
        const markdownContent = document.getElementById('editor').value;
        const markdownText = `${markdownContent}`;
      
        const blob = new Blob([markdownText], { type: 'text/markdown;charset=utf-8' });
        const fileName = 'exported_markdown.md';
      
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
      
        // Append the link to the body and trigger the download
        document.body.appendChild(link);
        link.click();
      
        // Clean up by removing the link
        document.body.removeChild(link);
      }

      
      

      function readMarkdownFile(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
      
        reader.onload = function(event) {
          const mdContent = event.target.result;
          document.getElementById('editor').value = mdContent;
        };
      
        reader.readAsText(file);
      }
      

    document.getElementById('exportMarkdownButton').addEventListener('click', exportToMarkdown);

    document.getElementById('importMarkdownButton').addEventListener('change', readMarkdownFile);

});
