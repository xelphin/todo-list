import '../general.scss';
import '../layout.scss';
import './style.scss';
import Tab from './tab/tab.js';
import Menu_DOM from './menu_dom.js';

const Menu = (function () {

    let tabs = {
        "All": new Tab("All", false, true),
        "Today": new Tab("Today", false, true)
    }

    let currTab = tabs["All"];

    const newProjectFormPopUp = () => {
        // lol, is it okay if I have circular imports? Max put this function in Menu_DOM
        console.log("Opening form to enter new project");
        Menu_DOM.openForm();

    }
    
    const setCurrTab = (tabName) => {
        if (tabs.hasOwnProperty(tabName)) {
            currTab = tabs[tabName];
        }
    }

    const checkTabExists = (tabName) => {
        if (tabs.hasOwnProperty(tabName)) {
            return true;
        }
        return false;
    }

    const createProjectTab = (projectTabName) => {
        if (checkTabExists(projectTabName)) {
            console.log("Error: tab name already exists");
            return false;
        }
        if (projectTabName == "") {
            console.log("Error: name received for project is an empty string");
            return false;
        }
        tabs[projectTabName] = new Tab(projectTabName, true, false);
        return true;
    }

    const addTabToMenu = (projectTabName) => {
        if (!checkTabExists(projectTabName)) {
            console.log("Error: Need to first create the tab");
            return false;
        }
        let tabObj = tabs[projectTabName]
        if (!tabObj.setAddToMenu()) {
            console.log("Already exists in menu");
            return false;
        }
        if (tabObj.isAProject()) {
            Menu_DOM.addTabToProjects(tabObj.getNode());
        } else {
            Menu_DOM.addTabToMain(tabObj.getNode());
        }
        return true;
    }

    const createAndAddProjectTabToMenu = (projectTabName) => {
        if (!createProjectTab(projectTabName) || !addTabToMenu(projectTabName)) {
            console.log("Aborting: creation and addition of new project tab");
            return false;
        }
        setCurrTab(projectTabName);
    }

    const getCurrTabObj = () => {
        return currTab;
    }

    return {newProjectFormPopUp, setCurrTab, checkTabExists, createAndAddProjectTabToMenu, getCurrTabObj}

})();

export default Menu;