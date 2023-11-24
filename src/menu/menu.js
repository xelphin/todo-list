import '../general.scss';
import '../layout.scss';
import './style.scss';
import Tab from './tab/tab.js';
import Menu_DOM from './menu_dom.js';
import GeneralRedirector from '../GeneralRedirector.js';
import uniqid from 'uniqid';

const Menu = (function () {

    const createUID = () => {
        // Can change this function to get uids in a different way
        return uniqid();
    }

    let tabs = { // TODO: Change this to work with IDs and not Names as keys
        "All": new Tab(createUID(), "All", false, false),
        "Today": new Tab(createUID(), "Today", false, false)
    }
    let prevTab = tabs["All"];
    let currTab = tabs["All"];

    const newProjectFormPopUp = () => {
        console.log("Opening form to enter new project");
        Menu_DOM.openForm();
    }
    
    const setCurrTab = (tabName) => {
        if (tabs.hasOwnProperty(tabName)) {
            prevTab = currTab;
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
        let uid = createUID();
        tabs[projectTabName] = new Tab(uid, projectTabName, true, false);
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
            console.log("Adding the following tab to Main: ", tabName);
            Menu_DOM.addTabToMain(tabObj.getNode());
        }
        return true;
    }

    const createAndAddProjectTabToMenu = (projectTabName) => {
        if (!createProjectTab(projectTabName) || !addTabToMenu(projectTabName)) {
            console.log("Aborting: creation and addition of new project tab");
            return false;
        }
        switchToTab(projectTabName);
    }

    const getCurrTabObj = () => {
        return currTab;
    }

    const updateItemsToShow = () => {
        // Updates depending on current tab
        if (currTab.isAProject()) {
            let items = currTab.getAllItems()
            if (prevTab.isAProject()) {
                let prevItems = prevTab.getAllItems();
                GeneralRedirector.callToToggleDisplayOfItems(prevItems, items );
            } else {
                GeneralRedirector.callToDisplayOnlyItems(items);
            }
        } else {
            // TODO: Also do for case 'Today'
            switch (currTab.getName()) {
                case 'All':
                    GeneralRedirector.callToDisplayAllItems();
                    break;
                default:
                    GeneralRedirector.callToDisplayAllItems();
            }
        }
    }

    const updateAddItemBtnDisplay = () => {
        if (currTab.isAProject()) {
            GeneralRedirector.callToShowAddBtn();
        } else {
            GeneralRedirector.callToHideAddBtn();
        }
    }

    const switchToTab = (tabName) => {
        console.log("Switching to tab: ", tabName);
        setCurrTab(tabName);
        Menu_DOM.changeTabTitle(tabName);
        // Update Appearance
        updateItemsToShow();
        updateAddItemBtnDisplay();
    }

    const clickedTab = (tabNode) => {
        // From DOM Event Listener
        let tabName = tabNode.getAttribute("data-tab")
        switchToTab(tabName);
    }

    const projectToSaveItem = (itemObj) => {
        if (!currTab.isAProject()) {
            console.log("Error: Can't add item when a project is not selected.");
            return undefined;
        }
        if (currTab.itemExistsInTab(itemObj.getItemId())) {
            console.log("Error: Item has already been added.");
            return undefined;
        }
        currTab.addItem(itemObj);
        return itemObj;
    }

    const INIT_ME = () => {
        for (let tabName in tabs) {
            // Adding the tabs from Main ("All", "Today", ..) into DOM
            if (!addTabToMenu(tabName)) {
                console.log("Aborting: addition of main tab into dom");
                return false;
            }
        }
        setCurrTab('All');
    }

    return {INIT_ME, newProjectFormPopUp, setCurrTab, checkTabExists,
            createAndAddProjectTabToMenu, getCurrTabObj, clickedTab, projectToSaveItem}

})();

export default Menu;