import React from 'react';

/**
 * Parses Japanese text with Furigana syntax:
 * Examples:
 * - "私[わたし]の名前は田中です。"
 * - "来週[らいしゅう]、病院[びょういん]へ行[い]きます。"
 * - Also handles raw HTML <ruby> tags if already formatted.
 */
export function renderFurigana(text: string | undefined | null): React.ReactNode {
  if (!text) return null;

  // Regex pattern for Kanji[furigana] or Word[furigana]
  // Matches: any non-bracket characters followed by [furigana]
  const pattern = /([一-龯々ヶぁ-んァ-ヶa-zA-Z0-9]+)\[([ぁ-んァ-ヶa-zA-Z0-9]+)\]/g;

  // If text doesn't contain bracket notation, check for newlines
  const lines = text.split('\n');

  return (
    <>
      {lines.map((line, lineIdx) => {
        const elements: React.ReactNode[] = [];
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        // Reset regex state for each line
        pattern.lastIndex = 0;

        while ((match = pattern.exec(line)) !== null) {
          const matchStart = match.index;
          const matchEnd = pattern.lastIndex;

          // Push preceding plain text
          if (matchStart > lastIndex) {
            elements.push(
              <span key={`txt-${lineIdx}-${lastIndex}`}>
                {line.substring(lastIndex, matchStart)}
              </span>
            );
          }

          const kanji = match[1];
          const reading = match[2];

          // Push ruby tag
          elements.push(
            <ruby key={`ruby-${lineIdx}-${matchStart}`} className="font-japanese mx-0.5">
              {kanji}
              <rt className="text-slate-500 font-normal">{reading}</rt>
            </ruby>
          );

          lastIndex = matchEnd;
        }

        // Push remaining trailing text
        if (lastIndex < line.length) {
          elements.push(
            <span key={`txt-end-${lineIdx}-${lastIndex}`}>
              {line.substring(lastIndex)}
            </span>
          );
        }

        return (
          <React.Fragment key={`line-${lineIdx}`}>
            {elements.length > 0 ? elements : <span>{line}</span>}
            {lineIdx < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </>
  );
}

/**
 * Helper to convert bracket notation to raw HTML string if needed
 */
export function convertToRubyHtml(text: string): string {
  if (!text) return '';
  return text.replace(
    /([一-龯々ヶぁ-んァ-ヶa-zA-Z0-9]+)\[([ぁ-んァ-ヶa-zA-Z0-9]+)\]/g,
    '<ruby>$1<rt>$2</rt></ruby>'
  );
}
