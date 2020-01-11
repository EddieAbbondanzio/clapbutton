export class Model {
  constructor(url, claps = 0) {
    this.url = url;
    this.claps = claps;
    this.pendingClaps = 0;
    this.postedClaps = 0;
    this.wasClapped = false;
  }
}
