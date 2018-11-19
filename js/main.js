import renderScreen from "./render-screen";
import introScreenElement from "./screen-intro";
import * as screensSwitcher from "./screens-switcher";

renderScreen(introScreenElement);
screensSwitcher.addScreenSwitchingButtons();
screensSwitcher.activateKeyboardScreenSwitching();
