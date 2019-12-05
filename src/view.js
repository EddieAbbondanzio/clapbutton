import { sleep } from "./sleep";

export class View {
  constructor(button) {
    this._button = button;

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

  async growAndShrink() {
    await this._temporaryAnimation(this._button, "grow-and-shrink", 200);
  }

  showCount(count) {
    this._button.setAttribute("data-clap-count", count);
  }

  hideCount() {
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

  async _temporaryAnimation(element, className, milliseconds) {
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);

    await sleep(milliseconds);
    element.classList.remove(className);
  }

  _stopAnimation(element, className) {
    element.classList.remove(className);
  }
}
