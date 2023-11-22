import '../general.scss';
import '../layout.scss';
import './style.scss';
import './item/style.scss';
import Item from './item/item.js';
import MainWindow_DOM from './main-window_dom.js';
import GeneralRedirector from '../GeneralRedirector.js'
import uniqid from 'uniqid';

const MainWindow = (function () {

    const createProjectContainer = (title) => {
        console.log("Will create projectContainer in main window for: ", title);
        return MainWindow_DOM.createProjectContainerInDom(title);
    }

    const createUID = () => {
        // Can change this function to get uids in a different way
        return uniqid();
    }
    
    const AddItem = (title, date, checked) => {
        let currTab = GeneralRedirector.callToGetCurrTab();
        if (!currTab.isAProject()) {
            console.log("Error: Can't add item when a project is not selected.");
            return undefined;
        }
        // Create Item Object
        let uid = createUID();
        let itemObj = new Item(uid, title, date, checked);
        // Add Item To DOM
        let projectContainer = currTab.getProjectContainerInMainWindow();
        MainWindow_DOM.addItemToProject(itemObj.getItemNode(), projectContainer);
        // Give the itemObj to the Project
        GeneralRedirector.callForProjectToSaveItem(itemObj);

        return undefined;
    }

    const toggleDisplayOfProjects = (projectContainerHideNode, projectContainerShowNode) => {
        if (!projectContainerHideNode || !projectContainerShowNode) {
            console.log("Can't toggle items, you have undefined project containers");
            return;
        }
        MainWindow_DOM.hideProject(projectContainerHideNode);
        MainWindow_DOM.showProject(projectContainerShowNode);
    }

    const displayAllProjects = () => {
        MainWindow_DOM.showAllProjects();
    }

    const displayOnlyProject = (projectContainerNode) => {
        MainWindow_DOM.hideAllProjects();
        MainWindow_DOM.showProject(projectContainerNode);
    }
    
    const hideAddBtn = () => {
        MainWindow_DOM.hideAddBtn();
    }

    const showAddBtn = () => {
        MainWindow_DOM.showAddBtn();
    }

    return { createProjectContainer, AddItem, toggleDisplayOfProjects, displayAllProjects, displayOnlyProject, hideAddBtn, showAddBtn};

})();

export default MainWindow;