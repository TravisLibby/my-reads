/**
 * Formats the author name(s) for the view.
 * @param  {Array} authors The author(s) of the book.
 * @return {string}        The author's name separated by commas.
 */
export const formatAuthors = (authors) => {
  if (authors) {
    return authors.length === 1 ? authors[0] : authors.join(', ');
  } else {
    return '';
  }
};