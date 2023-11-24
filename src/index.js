// Stylesheets

import './general.scss';
import './layout.scss';
import './title/style.scss';
import './menu/style.scss';

// JS Imports
import MainWindow from './main-window/main-window.js';
import Menu from './menu/menu.js';
import ToggleChecks from './toggle-checks/toggle-checks.js';
import GeneralRedirector from './GeneralRedirector.js';

// Main

const init = () => {
    Menu.INIT_ME();
    MainWindow.INIT_ME();
    // Demo 
    // TODO:(erase later)
    Menu.createAndAddProjectTabToMenu("Demo Project1");
    Menu.createAndAddProjectTabToMenu("Demo Project2");
    let tabNode1 = document.querySelector('[data-tab="Demo Project1"]');
    let tabNode2 = document.querySelector('[data-tab="Demo Project2"]');
    Menu.clickedTab(tabNode1);
    MainWindow.AddItem("demo item 1", "2024-11-11", true);
    Menu.clickedTab(tabNode2);
    MainWindow.AddItem("demo item 2", "2024-12-22", false);
}

init();



