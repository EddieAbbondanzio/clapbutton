/**
 * Button model.
 */
export class Model {
  /**
   * Create a new model.
   * @param {string} url The page URL.
   * @param {number} claps The clap count.
   */
  constructor(url, claps = 0) {
    this.url = url;
    this.claps = claps;
    this.pendingClaps = 0;
    this.postedClaps = 0;
    this.wasClapped = false;
  }
}
