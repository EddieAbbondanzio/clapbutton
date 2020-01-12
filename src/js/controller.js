import { Timer } from './timer';

/**
 * Controller to handle modifying the button model, and updating
 * the view on screen.
 */
export class Controller {
  /**
   * Create a new button controller.
   * @param {Model} model The button data.
   * @param {View} view The rendering of the button.
   * @param {Service} service The API service for claps.
   */
  constructor(model, view, service) {
    const HOLD_CHARGE_TIME = 250;
    const MAX_CLICK_LIMIT = 50;

    this._model = model;
    this._view = view;
    this._timer = new Timer(HOLD_CHARGE_TIME);
    this._service = service;

    view.onHover = () => {
      view.showPulse();
    };

    view.onLeave = () => {
      view.hidePulse();
      this._service.clap(this._model.url, this._model.pendingClaps);
      this._model.postedClaps += this._model.pendingClaps;
      this._model.pendingClaps = 0;
    };

    view.onClick = async () => {
      view.hidePulse();

      if (this._model.pendingClaps < MAX_CLICK_LIMIT) {
        await view.growAndShrink();
        this._clap();
      }
    };

    view.onHold = async () => {
      this._timer.start();
      view.grow();

      this._timer.onAlarm = async () => {
        if (this._model.pendingClaps + this._model.postedClaps < MAX_CLICK_LIMIT) {
          this._clap();
        }
      };
    };

    view.onRelease = async () => {
      this._timer.stop();
      view.shrink();
    };

    // Pull in the original count of the button.
    service
      .getClaps(model.url)
      .then(count => {
        model.claps = count;
        view.showCount(model.claps);
      })
      .catch(e => console.log(e));
  }

  /**
   * Update the clap model by 1.
   */
  async _clap() {
    this._model.claps++;
    this._model.pendingClaps++;
    this._view.markAsClapped();
    this._view.fireConfetti();
    await this._view.showClickStreakCount(this._model);

    this._model.wasClapped = true;
  }
}
