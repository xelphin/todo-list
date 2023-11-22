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
        return Menu.projectToSaveItem(itemObj);
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