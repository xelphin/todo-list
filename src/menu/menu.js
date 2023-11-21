import '../general.scss';
import '../layout.scss';
import './style.scss';
import Tab from './tab/tab.js';
import Menu_DOM from './menu_dom.js';
import GeneralRedirector from '../index.js'

const Menu = (function () {

    let tabs = {
        "All": new Tab("All", false, false),
        "Today": new Tab("Today", false, false)
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

    const addTabToMenu = (tabName) => {
        if (!checkTabExists(tabName)) {
            console.log("Error: Need to first create the tab");
            return false;
        }
        let tabObj = tabs[tabName];
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

    const clickedTab = (tabNode) => {
        // From DOM Event Listener
        let tabName = tabNode.getAttribute("data-tab")
        console.log("Switching to tab: ", tabName);
        setCurrTab(tabName);
        Menu_DOM.changeTabTitle(tabName);
    }

    const INIT_ME = () => {
        for (let tabName in tabs) {
            // Adding the tabs from Main ("All", "Today", ..) into DOM
            if (!addTabToMenu(tabName)) {
                console.log("Aborting: addition of main tab into dom");
                return false;
            }
        }
    }

    return {INIT_ME, newProjectFormPopUp, setCurrTab, checkTabExists,
            createAndAddProjectTabToMenu, getCurrTabObj, clickedTab}

})();

export default Menu;