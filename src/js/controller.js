import { Timer } from './timer';

export class Controller {
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
      this._model.pendingClaps = 0;
    };

    view.onClick = async () => {
      view.hidePulse();

      if (this._model.pendingClaps < MAX_CLICK_LIMIT) {
        await view.growAndShrink();
        this.clap();
      }
    };

    view.onHold = async () => {
      this._timer.start();
      view.grow();

      this._timer.onAlarm = async () => {
        if (this._model.pendingClaps < MAX_CLICK_LIMIT) {
          this.clap();
        }
      };
    };
    view.onRelease = async () => {
      this._timer.stop();
      view.shrink();
    };
  }

  async clap() {
    this._model.claps++;
    this._model.pendingClaps++;
    this._view.markAsClapped();
    this._view.fireConfetti();
    await this._view.showClickStreakCount(this._model);

    this._model.wasClapped = true;
  }
}
