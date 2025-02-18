export default function createForm(
  styles: Record<string, string>,
  question: string
): string {
  const title = `<h3 style="${styles.title}">${question}?</h3>`;

  const stars = `<div id="quick-review-stars" style="${styles.starWrapper}">
      ${[1, 2, 3, 4, 5]
        .map(num => `<span data-value="${num}" style="${styles.star}">☆</span>`)
        .join('')}
    </div>`;

  const comment = `<textarea id="quick-review-comment" placeholder="Additional feedback" rows="3" style="${styles.comment}"></textarea>`;

  const submit = `<div style="${styles.buttonWrapper}">
      <button id="quick-review-submit" style="${styles.button}">Submit</button>
      <button id="quick-review-cancel" style="${styles.cancel}">Cancel</button>
    </div>`;

  return `<div id="quick-review-form" style="${styles.form}">${title}${stars}${comment}${submit}</div>`;
}
