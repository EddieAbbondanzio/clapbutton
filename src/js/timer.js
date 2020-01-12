/**
 * Async timer that goes off at fixed intervals. Listen for
 * alarm via onAlarm callback.
 */
export class Timer {
  /**
   * Create a new timer that can be started, and stopped.
   * @param {number} interval How many milliseconds between alarms.
   */
  constructor(interval) {
    this.interval = interval;
    this.isActive = false;
  }

  /**
   * Start up the timer.
   */
  start() {
    this.isActive = true;
    this._startCountDown();
  }

  /**
   * Stop the timer.
   */
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
