import { Timer } from "./timer";

export class Controller {
  constructor(model, view) {
    this._model = model;
    this._view = view;
    this._timer = new Timer(250);

    view.onHover = () => {
      view.showPulse();
    };

    view.onLeave = () => {
      view.hidePulse();
      this._model.streakCount = 0;
    };

    view.onClick = async () => {
      await view.growAndShrink();

      this._model.clapCount++;
      this._model.streakCount++;
      await view.showClickStreakCount(this._model);
    };

    view.onHold = async () => {
      this._timer.start();
      this._timer.onAlarm = async () => {
        this._model.clapCount++;
        this._model.streakCount++;
        await view.showClickStreakCount(this._model);
      };
    };
    view.onRelease = async () => {
      this._timer.stop();
    };
  }
}
