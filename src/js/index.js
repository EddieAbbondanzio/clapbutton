import { Model } from "./model";
import { View } from "./view";
import { Controller } from "./controller";
import { Timer } from "./timer";
import { Service } from "./service";
import '../scss/styles.scss';

(function() {
  document.addEventListener("DOMContentLoaded", () => {
    var buttons = document.getElementsByClassName("clap-button");

    for (let button of buttons) {
      const color = button.getAttribute("data-color") || "gray";

      if (!["red", "green", "blue", "gray"].includes(color)) {
        throw new Error(`Invalid color: ${color}`);
      } else {
        button.classList.add(`clap-button-${color}`);
      }

      button.innerHTML = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
        width="256.000000pt" height="255.000000pt" viewBox="0 0 256.000000 255.000000"
        preserveAspectRatio="xMidYMid meet">
       <g transform="translate(0.000000,255.000000) scale(0.100000,-0.100000)"
       >
       <path style="fill: var(--clap-color)" d="M1812 2353 c-6 -10 -13 -75 -17 -143 -6 -108 -5 -127 8 -139 21 -17
       56 -5 62 22 3 12 6 78 8 147 l2 125 -27 3 c-18 2 -30 -3 -36 -15z"/>
       <path style="fill: var(--clap-color)" d="M2053 2178 c-57 -57 -106 -113 -109 -125 -7 -26 11 -53 34 -53 18 0
       229 206 238 232 7 24 -12 48 -39 48 -12 0 -61 -41 -124 -102z"/>
       <path style="fill: var(--clap-color);" d="M1335 2039 c-19 -5 -92 -71 -199 -178 l-170 -170 -17 29 c-40 64
       -112 85 -182 51 -53 -26 -336 -309 -391 -392 -49 -74 -85 -179 -92 -272 -9
       -97 15 -205 67 -305 25 -48 39 -89 39 -112 0 -57 36 -185 72 -253 67 -128 219
       -243 367 -277 144 -33 315 0 441 85 38 26 195 175 383 362 l317 319 0 47 c0
       58 -19 97 -62 131 l-33 25 56 58 c67 68 79 90 79 138 0 60 -22 98 -74 125 -40
       22 -46 29 -46 57 0 18 -5 43 -11 56 -9 19 -7 31 5 55 37 72 12 155 -58 192
       -40 22 -46 29 -46 58 0 62 -38 111 -102 132 -44 13 -89 3 -133 -32 -14 -11
       -27 -19 -29 -17 -1 2 -10 17 -20 32 -17 28 -86 67 -116 66 -8 0 -28 -5 -45
       -10z m92 -91 c13 -12 23 -31 23 -42 0 -14 -65 -86 -191 -211 -222 -222 -234
       -236 -219 -265 24 -45 48 -27 315 240 282 282 291 288 334 234 12 -15 21 -33
       21 -42 0 -8 -37 -52 -82 -99 -75 -76 -86 -84 -112 -79 -65 13 -93 -6 -270
       -183 l-170 -170 -17 29 c-23 37 -57 59 -102 67 -63 10 -111 -24 -279 -195
       -164 -167 -207 -222 -240 -305 -12 -28 -24 -56 -28 -60 -16 -18 -43 81 -48
       174 -4 80 -1 109 16 165 32 104 69 153 251 337 139 140 171 167 195 167 39 0
       66 -26 66 -64 0 -26 -17 -48 -105 -136 -85 -85 -105 -110 -103 -130 2 -18 10
       -26 28 -28 21 -2 76 48 335 308 330 330 334 333 382 288z m383 -223 c20 -21
       22 -30 14 -53 -9 -24 -14 -27 -59 -27 -47 -1 -106 -23 -120 -45 -9 -15 -22
       -12 -29 7 -5 12 11 35 56 80 71 71 99 79 138 38z m-273 -137 c13 -12 23 -31
       23 -42 0 -14 -65 -86 -191 -211 -222 -222 -234 -236 -219 -265 24 -45 48 -27
       315 240 282 282 291 288 334 234 12 -15 21 -34 21 -42 0 -9 -110 -127 -245
       -262 -168 -169 -245 -253 -245 -268 0 -26 28 -42 55 -32 11 5 119 108 240 229
       167 168 226 221 244 221 31 0 71 -37 71 -64 0 -13 -88 -108 -250 -271 -137
       -138 -250 -257 -250 -266 0 -21 20 -39 44 -39 12 0 80 60 177 156 129 129 160
       155 178 149 25 -8 61 -52 61 -74 0 -27 -656 -672 -716 -704 -102 -54 -227 -69
       -342 -42 -143 34 -264 133 -329 270 -32 68 -37 88 -41 175 -4 80 -1 110 16
       166 32 104 69 153 251 337 139 140 171 167 195 167 39 0 66 -26 66 -64 0 -26
       -17 -48 -105 -136 -85 -85 -105 -110 -103 -130 2 -18 10 -26 28 -28 21 -2 76
       48 335 308 330 330 334 333 382 288z"/>
       <path style="fill: var(--clap-color);" d="M2152 1945 c-68 -7 -128 -17 -134 -23 -5 -5 -8 -20 -6 -33 l3 -24
       135 3 c138 3 180 14 180 47 0 13 -38 47 -50 44 -3 -1 -61 -7 -128 -14z"/>
       </g>
       </svg>`;

      const model = new Model('',1337);
      const view = new View(button);
      const service = new Service('clapbutton.com/api');
      const controller = new Controller(model, view, service);
      view.showCount(model.claps);
    }
  });
})();