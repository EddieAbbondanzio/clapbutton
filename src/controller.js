export class Controller {
  constructor(model, view) {
    this._model = model;
    this._view = view;

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

    view.onHold = () => console.log("hold");
    view.onRelease = () => console.log("release");
  }
}
