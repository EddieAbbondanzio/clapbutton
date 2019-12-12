export class Timer {
  constructor(interval) {
    this.interval = interval;
    this.isActive = false;
  }

  start() {
    this.isActive = true;
    this._startCountDown();
  }

  stop() {
    this.isActive = false;
  }

  _startCountDown() {
    setTimeout(() => {
      if (this.isActive) {
        this.onAlarm();
        this._startCountDown();
      }
    }, this.interval);
  }
}
