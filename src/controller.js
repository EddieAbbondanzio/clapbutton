export class Controller {
  constructor(model, view) {
    this._model = model;
    this._view = view;

    view.onHover = () => {
      view.showPulse();
    };

    view.onLeave = () => view.hidePulse();

    view.onClick = async () => {
      view.hideCount();
      view.hidePulse();
      await view.growAndShrink();

      this._model.clapCount++;
      view.markAsClicked();
      await view.showClickStreakCount(1);
      view.showCount(this._model.clapCount);
    };

    view.onHold = () => console.log("hold");
    view.onRelease = () => console.log("release");
  }
}
