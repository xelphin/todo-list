import '../general.scss';
import '../layout.scss';
import './style.scss';
import Tab from './tab/tab.js';
import Menu_DOM from './menu_dom.js';
import GeneralRedirector from '../GeneralRedirector.js';
import uniqid from 'uniqid';

const Menu = (function () {

    const createUID = () => {
        // At most 10 Main tabs with this method! becayse the uid of the Main Tabs are currently single digits
        // and we don't want that there id's might come out again through here
        return "1"+uniqid(); // 
    }

    let tabs = { // TODO: Change this to work with IDs and not Names as keys
        "0": new Tab("0", "All", false, false),
        "1": new Tab("1", "Today", false, false)
    }
    let prevTab = tabs["0"];
    let currTab = tabs["0"];

    const newProjectFormPopUp = () => {
        console.log("Opening form to enter new project");
        Menu_DOM.openForm();
    }
    
    const setCurrTab = (tabId) => {
        if (tabs.hasOwnProperty(tabId)) {
            prevTab = currTab;
            currTab = tabs[tabId];
        }
    }

    const checkTabExists = (tabId) => {
        if (tabs.hasOwnProperty(tabId)) {
            return true;
        }
        return false;
    }

    const checkTabNameIsFree = (tabName) => {
        for (let id in tabs) {
            if (tabs[id].getName() == tabName) {
                return false;
            }
        }
        return true;
    }

    const createProjectTab = (projectTabName) => {
        if (!checkTabNameIsFree(projectTabName)) {
            console.log("Error: tab name already exists");
            return undefined;
        }
        if (projectTabName == "") {
            console.log("Error: name received for project is an empty string");
            return undefined;
        }
        let uid = createUID();
        tabs[uid] = new Tab(uid, projectTabName, true, false);
        return tabs[uid];
    }

    const addTabToMenu = (tabId) => {
        if (!checkTabExists(tabId)) {
            console.log("Error: Need to first create the tab");
            return false;
        }
        let tabObj = tabs[tabId];
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
        let newProjectTab = createProjectTab(projectTabName);
        if (newProjectTab == undefined) {
            console.log("Aborting: creation of new project tab");
            return false;
        }
        if (!addTabToMenu(newProjectTab.getId())) {
            console.log("Aborting: addition of new project tab");
            return false;
        }
        switchToTab(newProjectTab.getId());
        return true;
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

    const switchToTab = (tabId) => {
        console.log("Switching to tab with id: ", tabId);
        setCurrTab(tabId);
        console.log("Now currTab: ", currTab);
        Menu_DOM.changeTabTitle(currTab.getName());
        // Update Appearance
        updateItemsToShow();
        updateAddItemBtnDisplay();
    }

    const clickedTab = (tabNode) => {
        // From DOM Event Listener
        let tabId = tabNode.getAttribute("id");
        switchToTab(tabId);
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
        for (let tabId in tabs) {
            // Adding the tabs from Main ("All", "Today", ..) into DOM
            if (!addTabToMenu(tabId)) {
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