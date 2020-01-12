import { sleep } from './sleep';

/**
 * On screen view of the button. This is represented in the HTML DOM.
 */
export class View {
  /**
   * Create a new view.
   * @param {HTMLElement} button The HTML button.
   */
  constructor(button) {
    this._button = button;
    this._icon = button.children[0];
    this._clickId = 0;
    this._confettiId = 0;

    const HOLD_CLICK_DELAY = 250;

    let isDown = false;
    let isHold = false;
    let longTimeOutId = null;

    button.addEventListener('mouseover', () => this._notifyListeners('onHover'));

    button.addEventListener('mouseleave', () => this._notifyListeners('onLeave'));

    button.addEventListener('mousedown', e => {
      // Don't accept a click if it's not the BUTTON
      if (e.target != this._button) {
        if (e.target.parentNode != this._button || e.target == this._streakBubble) {
          return;
        }
      }

      isDown = true;
      isHold = false;

      clearTimeout(longTimeOutId);

      longTimeOutId = setTimeout(() => {
        isHold = true;
        this._notifyListeners('onHold');
      }, HOLD_CLICK_DELAY);
    });

    window.addEventListener('mouseup', e => {
      if (isDown) {
        isDown = false;

        if (isHold) {
          e.preventDefault();

          this._notifyListeners('onRelease');
          return;
        }

        this._notifyListeners('onClick');
        clearTimeout(longTimeOutId);
      }
    });
  }

  /**
   * Show the shadow pulse.
   */
  showPulse() {
    this._triggerAnimation(this._icon, 'shadow-pulse');
  }

  /**
   * Hide the shadow pulse.
   */
  hidePulse() {
    this._stopAnimation(this._icon, 'shadow-pulse');
  }

  /**
   * Show the number of times the button has been pressed
   * as a colored bubble above the actual button.
   * @param {Model} model
   */
  async showClickStreakCount(model) {
    // Hide pulsing shadow, and the total click count
    this.hidePulse();
    this.hideCount();

    let streakBubble = null;

    // Get the cached bubble, or create a new one.
    if (this._streakBubble == null) {
      streakBubble = document.createElement('div');
      streakBubble.className = 'streak-bubble';
      this._button.appendChild(streakBubble);

      this._streakBubble = streakBubble;
    } else {
      streakBubble = this._streakBubble;
    }

    streakBubble.innerHTML = `<span>+${model.pendingClaps + model.postedClaps}</span>`;
    let clickId = ++this._clickId;

    if (model.pendingClaps == 1) {
      this._triggerAnimation(streakBubble, 'first-pop-up-and-fade');

      await sleep(1000);

      if (clickId == this._clickId) {
        this._stopAnimation(streakBubble, 'first-pop-up-and-fade');
        this.showCount(model.claps);
      }
    } else {
      this._stopAnimation(streakBubble, 'first-pop-up-and-fade');
      this._triggerAnimation(streakBubble, 'pop-up-and-fade');

      await sleep(1000);

      if (clickId == this._clickId) {
        this._stopAnimation(streakBubble, 'pop-up-and-fade');
        this.showCount(model.claps);
      }
    }

    // Only remove the bubble if this action was the last to click it.
    if (clickId == this._clickId) {
      this._button.removeChild(streakBubble);
      this._streakBubble = null;
    }
  }

  /**
   * Enlarge the button to indicate it's being held down.
   */
  async grow() {
    this._triggerAnimation(this._icon, 'grow');
  }

  /**
   * Shrink the button back to normal size as if the button was released
   * from being held.
   */
  async shrink() {
    this._stopAnimation(this._icon, 'grow');
  }

  /**
   * Rapidly grow and shrink the button as if it was briefly pressed.
   */
  async growAndShrink() {
    await this._temporaryAnimation(this._icon, 'grow-and-shrink', 200);
  }

  /**
   * Show the current clap count.
   * @param {number} count The number of claps.
   */
  async showCount(count) {
    let formattedCount =
      Math.abs(count) > 999
        ? Math.sign(count) * (Math.abs(count) / 1000).toFixed(1) + 'k'
        : Math.sign(count) * Math.abs(count);

    this._button.setAttribute('data-clap-count', formattedCount);
    this._button.title = `${count.toLocaleString()} claps`;
  }

  /**
   * Hide the clap count.
   */
  async hideCount() {
    this._button.removeAttribute('data-clap-count');
  }

  /**
   * Highlight the button to show that it's been clicked at least once.
   */
  markAsClapped() {
    this._button.classList.add('clap-button-clicked');
  }

  /**
   * Fire off the spiral of confetti to celebrate
   * the button being pressed.
   */
  async fireConfetti() {
    const id = ++this._confettiId;

    const confetti = document.createElement('div');
    confetti.className = `confetti`;
    confetti.setAttribute('data-confetti-id', id);
    confetti.innerHTML = '&nbsp;';

    this._button.appendChild(confetti);

    await sleep(1000);

    var confettiChilds = Array.from(this._button.children);
    confettiChilds.forEach(c => {
      if (c.classList.contains('confetti') && c.getAttribute('data-confetti-id') == id.toString()) {
        c.remove();
      }
    });
  }

  /**
   * Alert any subscribers that an event has occured.
   * @param {string} eventName The name of the publishable event.
   */
  _notifyListeners(eventName) {
    if (this[eventName] != null) {
      this[eventName]();
    }
  }

  /**
   * Start a CSS animation on an element.
   * @param {HTMLElement} element The HTMLElement to start animating.
   * @param {string} className The name of the animation.
   */
  _triggerAnimation(element, className) {
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
  }

  /**
   * Stop a CSS animation.
   * @param {HTMLElement} element The element to stop animating.
   * @param {string} className The name of the animation.
   */
  _stopAnimation(element, className) {
    element.classList.remove(className);
  }

  /**
   * Apply a CSS animation to a HTMLElement temporarily.
   * @param {HTMLElement} element The HTML element to add the animation to.
   * @param {*} className The name of the animation.
   * @param {*} milliseconds How many milliseconds to animate for.
   */
  async _temporaryAnimation(element, className, milliseconds) {
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);

    await sleep(milliseconds);
    element.classList.remove(className);
  }
}
