// Stylesheets

import './general.scss';
import './layout.scss';
import './title/style.scss';
import './menu/style.scss';

// JS Imports
import MainWindow from './main-window/main-window.js';
import Menu from './menu/menu.js';
import ToggleTheme from './toggle-theme/toggle-theme.js';
import GeneralRedirector from './GeneralRedirector.js';

// Main

const init = () => {
    Menu.INIT_ME();
    // Demo 
    // TODO:(erase later)
    Menu.createAndAddProjectTabToMenu("Demo Project1");
    Menu.createAndAddProjectTabToMenu("Demo Project2");
    let tabNode1 = document.querySelector('[data-tab="Demo Project1"]');
    let tabNode2 = document.querySelector('[data-tab="Demo Project2"]');
    Menu.clickedTab(tabNode1);
    MainWindow.AddItem("demo item 1", "11/11/2024", true);
    Menu.clickedTab(tabNode2);
    MainWindow.AddItem("demo item 2", "22/12/2024", true);
}

// TODO:
// Add through Tab/Tab_DOM an event listener (to the tab) that changes the currTab of Menu

init();



