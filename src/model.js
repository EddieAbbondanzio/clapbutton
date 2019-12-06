export class Model {
  constructor(clapCount = 0) {
    this.clapCount = clapCount;
    this.wasClicked = false;
    this.streakCount = 0;
  }
}
