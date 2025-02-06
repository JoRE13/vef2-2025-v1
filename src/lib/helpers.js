/**
 * Changes characters s.t. text is not interpreted as HTML
 * @param {string} text the text we want to change
 * @returns the changed text
 */
export function escapeHTML(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  /**
   * Shuffles all values in an array except the first
   * @param {*} arr an array of values to be shuffled. 
   * @returns 
   */
  export function shuffleExceptFirst(arr) {
    if (arr.length <= 1) return arr;
  
    const first = arr[0];
    const rest = arr.slice(1);
  
    for (let i = rest.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rest[i], rest[j]] = [rest[j], rest[i]];
    }
  
    return [first, ...rest];
  }