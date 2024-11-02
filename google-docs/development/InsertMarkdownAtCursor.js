function insertMarkdownAtCursor(content) {
  const cursor = DocumentApp.getActiveDocument().getCursor();

  if (cursor) {
    const body = DocumentApp.getActiveDocument().getBody();
    let currentElement = cursor.insertText('');
    content.split('\n').forEach(line => {
      if (line.trim() === '') return;
      let paragraph;
      if (line.startsWith('#### ')) {
        paragraph = body.appendParagraph(line.replace(/^#### /, ''))
          .setHeading(DocumentApp.ParagraphHeading.HEADING4);
      } else if (line.startsWith('### ')) {
        paragraph = body.appendParagraph(line.replace(/^### /, ''))
          .setHeading(DocumentApp.ParagraphHeading.HEADING3);
      } else if (line.startsWith('## ')) {
        paragraph = body.appendParagraph(line.replace(/^## /, ''))
          .setHeading(DocumentApp.ParagraphHeading.HEADING2);
      } else if (line.startsWith('# ')) {
        paragraph = body.appendParagraph(line.replace(/^# /, ''))
          .setHeading(DocumentApp.ParagraphHeading.HEADING1);
      } else if (line.includes('**') || line.includes('*')) {
        paragraph = body.appendParagraph('');

        const segments = line.split(/(\*\*|\*)/);
        let isBold = false;
        let isItalic = false;
        segments.forEach((segment, index) => {
          if (segment === '**') {
            isBold = !isBold;
          } else if (segment === '*') {
            isItalic = !isItalic;
          } else if (segment.trim() !== '') {
            let text = paragraph.appendText(segment);
            if (isBold) text.setBold(true);
            if (isItalic) text.setItalic(true);
          }
        });

      } else if (line === '---') {
        body.appendHorizontalRule();
      } else if (/\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/.test(line)) {
        paragraph = body.appendParagraph('');
        const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g;
        let lastIndex = 0;
        let match;
        while ((match = linkRegex.exec(line)) !== null) {
          if (match.index > lastIndex) {
            paragraph.appendText(line.substring(lastIndex, match.index));
          }
          paragraph.appendText(match[1]).setLinkUrl(match[2]);
          lastIndex = linkRegex.lastIndex;
        }
        if (lastIndex < line.length) {
          paragraph.appendText(line.substring(lastIndex));
        }
      } else {
        paragraph = body.appendParagraph(line);
      }
      currentElement = paragraph;
    });
  } else {
    DocumentApp.getUi().alert("Failed to find a proper place for text insertion.");
  }
}