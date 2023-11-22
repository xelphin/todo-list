import MainWindow from './main-window/main-window.js';
import Menu from './menu/menu.js';

const GeneralRedirector = (function () {

    const callToCreateProjectContainerInMainWindow = (projectName) => {
        return MainWindow.createProjectContainer(projectName);
    }

    const callToGetCurrTab = () => {
        return Menu.getCurrTabObj();
    }

    const callForProjectToSaveItem = (itemObj) => {
        let currTab = Menu.getCurrTabObj();
        if (!currTab.isAProject()) {
            return false;
        }
        // Current tab should save item
        return Menu.getCurrTabObj().addItem(itemObj);
        // TODO: maybe the logic should be in main-window and not here (selecting the currTab and such)
    }

    const callToToggleDisplayOfProjects = (projectHideNode, projectShowNode) => {
        MainWindow.toggleDisplayOfProjects(projectHideNode, projectShowNode);
    }

    const callToDisplayAllProjects = () => {
        MainWindow.displayAllProjects();
    }

    const callToDisplayOnlyProject = (projectNode) => {
        MainWindow.displayOnlyProject(projectNode);
    }

    const callToHideAddBtn = () => {
        MainWindow.hideAddBtn();
    }

    const callToShowAddBtn = () => {
        MainWindow.showAddBtn();
    }

    return {
        callToCreateProjectContainerInMainWindow, callToGetCurrTab, callForProjectToSaveItem,
        callToToggleDisplayOfProjects, callToDisplayAllProjects, callToDisplayOnlyProject,
        callToHideAddBtn, callToShowAddBtn
    }

})();

export default GeneralRedirector;