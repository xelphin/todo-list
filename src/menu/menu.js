import '../general.scss';
import '../layout.scss';
import './style.scss';
import Tab from './tab/tab.js';
import Menu_DOM from './menu_dom.js';
import GeneralRedirector from '../GeneralRedirector.js';
import uniqid from 'uniqid';
import ProjectForm from './form/project-form.js';

const Menu = (function () {

    const createUID = () => {
        // At most 10 Main tabs with this method! because the uid of the Main Tabs are currently single digits
        // and we don't want that their id's might come out again through here
        return "1"+uniqid(); // 
    }

    let tabs = { // TODO: Change this to work with IDs and not Names as keys
        "0": new Tab("0", "All", false, false),
        "1": new Tab("1", "Today", false, false)
    }
    let prevTab = tabs["0"];
    let currTab = tabs["0"];
    let currentlyEditing = undefined;

    // FORM

    const newProjectFormPopUp = () => {
        console.log("Opening form to enter new project");
        Menu_DOM.openForm();
    }

    const updateAddItemBtnDisplay = () => {
        if (currTab.isAProject()) {
            GeneralRedirector.callToShowAddBtn();
        } else {
            GeneralRedirector.callToHideAddBtn();
        }
    }

    // EDIT/DELETE PROJECT

    const clickDeleteProject = (idOfProject) => {
        console.log("CLICKED ON DELETE PROJECT. Will delete project: ", idOfProject);
        let projectTabObj = tabs[idOfProject];
        let allProjectItems = projectTabObj.getAllItems();
        // Delete all items of tab from MainWindow (dom)
        for (let itemId in allProjectItems) {
            GeneralRedirector.callToDeleteItemFromDOM(allProjectItems[itemId]);
        }
        // Delete tab from dom
        Menu_DOM.deleteTabFromMain(projectTabObj.getNode());
        // Delete tab  data from menucurrentlyEditing
        delete tabs[idOfProject];
        // Go to Tab All
        switchToTab("0");
    }

    const formSubmitEditProject = (newTitle) => {
        // Edit projectTabObj data (and dom)
        currentlyEditing.updateInfo(newTitle);
        // Edit the MainWindow title to have the new name
        Menu_DOM.changeTabTitle(newTitle);
    }

    const clickEditProject = (idOfProject) => {
        console.log("CLICKED ON EDIT PROJECT. Will edit project: ", idOfProject);
        let projectTabObj = tabs[idOfProject];
        currentlyEditing = projectTabObj;
        // Open form and get new data (if clicked on submit)
        ProjectForm.changeToEditMode();
        ProjectForm.openForm();
    }

    // CHECK TAB DATA

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

    const getCurrTabObj = () => {
        return currTab;
    }

    const setCurrTab = (tabId) => {
        if (tabs.hasOwnProperty(tabId)) {
            prevTab = currTab;
            currTab = tabs[tabId];
        }
        Menu_DOM.changeTabTitle(currTab.getName());
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

    // ITEM FUNCTIONS

    const getItemObjFromProject = (projectId, itemId) => {
        if (!checkTabExists(projectId)) {
            return undefined;
        }
        return tabs[projectId].getItemObj(itemId);
    }

    const deleteItemObjFromProject = (projectId, itemId) => {
        if (!checkTabExists(projectId)) {
            return undefined;
        }
        tabs[projectId].deleteItem(itemId);
    }

    // CREATE PROJECT

    // Create project Tab Object
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

    // Add project Tab
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

    // Create Porject (create + add to dom)
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

    // UPDATE ITEMS TO SHOW
    const updateItemsToShow = () => {
        // Updates depending on current tab
        if (currTab.isAProject()) {
            let items = currTab.getAllItems()
            if (prevTab.isAProject()) {
                let prevItems = prevTab.getAllItems();
                GeneralRedirector.callToToggleDisplayOfItems(prevItems, items);
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

    // TAB CLICKING/SWITCHING MECHANISM

    const switchToTab = (tabId) => {
        console.log("Switching to tab with id: ", tabId);
        setCurrTab(tabId);
        console.log("Now currTab: ", currTab);
        
        // Update Appearance
        updateItemsToShow();
        updateAddItemBtnDisplay();
    }

    const clickedTab = (tabNode) => {
        console.log("CLICKED ON TAB: ", tabNode);
        // From DOM Event Listener
        let tabId = tabNode.getAttribute("id");
        switchToTab(tabId);
    }


    // INIT

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
            createAndAddProjectTabToMenu, getCurrTabObj, clickedTab, projectToSaveItem,
            getItemObjFromProject, deleteItemObjFromProject,
            updateItemsToShow,
            clickDeleteProject, clickEditProject, formSubmitEditProject
        }

})();

export default Menu;