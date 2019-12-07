import { sleep } from "./sleep";

export class View {
  constructor(button) {
    this._button = button;
    this._clickId = 0;

    const HOLD_CLICK_DELAY = 250;

    let isDown = false;
    let isHold = false;
    let longTimeOutId = null;

    button.addEventListener("mouseover", () =>
      this._notifyListeners("onHover")
    );

    button.addEventListener("mouseleave", () =>
      this._notifyListeners("onLeave")
    );

    button.addEventListener("mousedown", () => {
      isDown = true;
      isHold = false;

      clearTimeout(longTimeOutId);

      longTimeOutId = setTimeout(() => {
        isHold = true;
        this._notifyListeners("onHold");
      }, HOLD_CLICK_DELAY);
    });

    window.addEventListener("mouseup", e => {
      if (isDown) {
        isDown = false;

        if (isHold) {
          e.preventDefault();

          this._notifyListeners("onRelease");
          return;
        }

        this._notifyListeners("onClick");
        clearTimeout(longTimeOutId);
      }
    });
  }

  showPulse() {
    this._triggerAnimation(this._button, "shadow-pulse");
  }

  hidePulse() {
    this._stopAnimation(this._button, "shadow-pulse");
  }

  async showClickStreakCount(model) {
    // Hide pulsing shadow, and the total click count
    this.hidePulse();
    this.hideCount();

    let streakBubble = null;

    // Get the cached bubble, or create a new one.
    if (this._streakBubble == null) {
      streakBubble = document.createElement("div");
      streakBubble.className = "streak-bubble";
      this._button.appendChild(streakBubble);

      this._streakBubble = streakBubble;
    } else {
      streakBubble = this._streakBubble;
    }

    streakBubble.innerHTML = `<span>+${model.streakCount}</span>`;
    let clickId = ++this._clickId;

    if (model.streakCount == 1) {
      this._triggerAnimation(streakBubble, "first-pop-up-and-fade");

      await sleep(1000);

      if (clickId == this._clickId) {
        this._stopAnimation(streakBubble, "first-pop-up-and-fade");
        this.showCount(model.clapCount);
      }
    } else {
      this._stopAnimation(streakBubble, "first-pop-up-and-fade");
      this._triggerAnimation(streakBubble, "pop-up-and-fade");

      await sleep(1000);

      if (clickId == this._clickId) {
        this._stopAnimation(streakBubble, "pop-up-and-fade");
        this.showCount(model.clapCount);
      }
    }

    // Only remove the bubble if this action was the last to click it.
    if (clickId == this._clickId) {
      this._button.removeChild(streakBubble);
      this._streakBubble = null;
    }
  }

  async growAndShrink() {
    await this._temporaryAnimation(this._button, "grow-and-shrink", 200);
  }

  async showCount(count) {
    this._button.setAttribute("data-clap-count", count);
  }

  async hideCount() {
    this._button.removeAttribute("data-clap-count");
  }

  _notifyListeners(eventName) {
    if (this[eventName] != null) {
      this[eventName]();
    }
  }

  markAsClicked() {
    this._button.classList.add("clap-button-clicked");
  }

  _triggerAnimation(element, className) {
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
  }

  _stopAnimation(element, className) {
    element.classList.remove(className);
  }

  async _temporaryAnimation(element, className, milliseconds) {
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);

    await sleep(milliseconds);
    element.classList.remove(className);
  }
}
