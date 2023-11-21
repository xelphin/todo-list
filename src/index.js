// Stylesheets

import './general.scss';
import './layout.scss';
import './title/style.scss';
import './menu/style.scss';

// JS Imports
import MainWindow from './main-window/main-window.js';
import Menu from './menu/menu.js';
import ToggleTheme from './toggle-theme/toggle-theme.js';

// Main

const init = () => {
    Menu.INIT_ME();
    Menu.createAndAddProjectTabToMenu("Demo Project");
}

// TODO:
// Add through Tab/Tab_DOM an event listener (to the tab) that changes the currTab of Menu

init();


// GENERAL REDIRECTOR

const GeneralRedirector = (function () {

    return {}

})();


