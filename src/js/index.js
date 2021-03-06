import { Model } from './model';
import { View } from './view';
import { Controller } from './controller';
import { Timer } from './timer';
import { Service } from './service';
import '../scss/styles.scss';

(function() {
  document.addEventListener('DOMContentLoaded', () => {
    var buttons = document.getElementsByClassName('clap-button');

    for (let button of buttons) {
      button.innerHTML = `<svg class="clap-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 96 96" xml:space="preserve"><path d="M81,52.4c2.1-2.7,2-6.7-0.5-9.2c-0.8-0.8-1.9-1.4-3-1.7c0.4-0.9,0.6-1.9,0.6-2.9c0-1.9-0.7-3.6-2-4.9  c-2.5-2.5-6.3-2.7-9-0.7c-0.3-0.8-0.7-1.6-1.3-2.3c-1.3-1.4-3.1-2.3-5-2.3c-1.8-0.1-3.6,0.6-4.9,1.9c-0.2-0.3-0.4-0.7-0.7-0.9  c-1.3-1.4-3.1-2.3-5-2.3c-2-0.1-3.8,0.7-5.1,2L35.1,39c-1.1-4.2-5.1-7.1-9.5-6.6c-1.2,0.1-2.3,0.7-3.1,1.5c-1.8-2-4.6-3.2-7.5-2.9  c-2.7,0.3-4.8,2.6-4.8,5.4l0.1,14.5c0,3.8-0.5,7.7-1.4,11.1l0,0.1l0,0c-2,7,0,14.5,5.1,19.6c5.3,5.3,12.4,8.2,19.8,8.2  c0.6,0,1.3,0,1.9-0.1c2.8,0.9,5.8,1.4,8.7,1.4c7.2,0,14.4-2.7,19.8-8.2l19.3-19.4c1.3-1.3,2-3.1,2-4.9c0-1.9-0.7-3.6-2-4.9  C82.8,53.2,81.9,52.7,81,52.4z M48,32c0.6-0.6,1.4-0.8,2.1-0.8c0.8,0,1.5,0.4,2,0.9c0.3,0.4,0.5,0.9,0.5,1.4L36.1,50.4l-0.5-6.1  L48,32z M16.9,78.9c-4.1-4.1-5.6-10-4.1-15.5l0,0c1.1-4,1.6-8.2,1.6-12.4l-0.1-14.5c0-0.6,0.5-1.2,1.1-1.2c2.6-0.3,4.9,1.6,5.2,4.1  l0.2,2.4l0.1,10.5c0,3.8-0.5,7.6-1.3,11c0,0.1-0.1,0.1-0.1,0.2c-2,7,0,14.5,5.1,19.6c0.5,0.5,1.1,1,1.6,1.5  C22.7,83.4,19.5,81.5,16.9,78.9z M80.6,60.8L61.3,80.2c-9.3,9.3-24.5,9.3-33.8,0c-4-4-5.6-9.9-4.1-15.4c0,0,0-0.1,0-0.1  c1.1-4.1,1.6-8.2,1.6-12.4l0,0c0,0,0,0,0,0L25,41.8l0,0l0-0.3l0-3.7c0-0.6,0.5-1.2,1.1-1.2c2.6-0.3,4.9,1.6,5.2,4.1L32,50.8  c0.2,1.5,1.2,2.8,2.6,3.3c1.5,0.5,3,0.1,4.1-0.9l19.8-19.8c0.6-0.6,1.1-0.9,2.1-0.8c0.8,0,1.5,0.4,2,0.9c0.9,1,0.8,3-0.3,4.1l0,0  c0,0,0,0,0,0L47.6,52.4c-0.8,0.8-0.8,2.1,0,2.9c0.4,0.4,0.9,0.6,1.5,0.6c0.5,0,1.1-0.2,1.5-0.6l14.8-14.8c0,0,0,0,0,0l3.9-3.9  c1.1-1.1,2.9-1.1,4,0c0.5,0.5,0.8,1.2,0.8,2c0,0.8-0.3,1.5-0.8,2L54.5,59.3c-0.8,0.8-0.8,2.1,0,2.9c0.4,0.4,0.9,0.6,1.5,0.6  s1.1-0.2,1.5-0.6l10.5-10.5l5.6-5.6c1.1-1.1,2.9-1.1,4,0c1.1,1.1,1.1,2.9,0,4l-3.8,3.8c0,0,0,0,0,0L71,56.6l-9.6,9.6  c-0.8,0.8-0.8,2.1,0,2.9c0.4,0.4,0.9,0.6,1.5,0.6s1.1-0.2,1.5-0.6l12.3-12.3c1.1-1.1,2.9-1.1,4,0c0.5,0.5,0.8,1.2,0.8,2  C81.5,59.6,81.2,60.3,80.6,60.8z M67.7,18.2l5.1-10.9c0.5-1,1.7-1.5,2.7-1c1,0.5,1.5,1.7,1,2.7L71.5,20c-0.4,0.8-1.1,1.2-1.9,1.2  c-0.3,0-0.6-0.1-0.9-0.2C67.7,20.5,67.3,19.2,67.7,18.2z M57,7.1c-0.3-1.1,0.4-2.2,1.5-2.5C59.6,4.3,60.7,4.9,61,6l3.1,11.6  c0.3,1.1-0.4,2.2-1.5,2.5c-0.2,0-0.4,0.1-0.5,0.1c-0.9,0-1.7-0.6-2-1.5L57,7.1z M86.9,21.1L76,26.2c-0.3,0.1-0.6,0.2-0.9,0.2  c-0.8,0-1.5-0.4-1.9-1.2c-0.5-1,0-2.3,1-2.7l10.9-5.1c1-0.5,2.3,0,2.7,1C88.4,19.4,87.9,20.6,86.9,21.1z"></path></svg>`;

      // Pull in attributes from button element
      let color = button.getAttribute('data-color');
      let pageUrl = button.getAttribute('data-url');
      let backendUrl = button.getAttribute('data-backend-url');
      let devMode = button.getAttribute('data-dev') != null;

      if (pageUrl == null) {
        pageUrl = window.location.href;
      }

      if (color == null) {
        color = 'green';
      }

      if (backendUrl == null) {
        backendUrl = 'https://api.clapbutton.com';
      }

      // Validate input
      if (!['red', 'green', 'blue', 'grey', 'white'].includes(color)) {
        throw new Error(`Invalid color: ${color}`);
      } else {
        button.classList.add(`clap-button-${color}`);
      }

      const model = new Model(pageUrl, 27);
      const view = new View(button);
      const service = new Service(backendUrl, devMode);
      const controller = new Controller(model, view, service);
    }
  });
})();
