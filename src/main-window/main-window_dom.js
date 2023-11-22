import '../general.scss';
import '../layout.scss';
import './style.scss';
import './item/style.scss';
import Item from './item/item.js';
import Item_DOM from './item/item_dom.js';

const MainWindow_DOM = (function () {


    const allItemsContainer = document.querySelector("#all-items-container");

    const hideProjectContainerNode = (projectNode) => {
        projectNode.style.display = 'none';
    }

    const showProjectContainerNode = (projectNode) => {
        projectNode.style.display = 'flex';
    }

    const createProjectContainerInDom = (title) => {
        // Create: <div id="project1-items-container"></div>
        let projectDiv = document.createElement('div');
        projectDiv.setAttribute('id', title+"-items-container");
        showProjectContainerNode(projectDiv); ////////////////////////
        allItemsContainer.appendChild(projectDiv);
        return projectDiv;
    }

    const addItemToProject = (itemNode, containerNode) => {
        containerNode.appendChild(itemNode);
    }

    // SHOW/HIDE PROJECT

    const applyToProjectContainer = (projectContainerNode, show) => {
        if (!projectContainerNode) {
            console.log("Error: The project you're selecting doesn't exist");
            return false;
        }
        show ? showProjectContainerNode(projectContainerNode) : hideProjectContainerNode(projectContainerNode);
        for (const itemNode of projectContainerNode.children) {
            show ? Item_DOM.showItem(itemNode) : Item_DOM.hideItem(itemNode);
        }
        return true;
    }

    const hideProject = (projectContainerNode) => {
        return applyToProjectContainer(projectContainerNode, false);
    }

    const showProject = (projectContainerNode) => {
        return applyToProjectContainer(projectContainerNode, true);
    }

    // SHOW/HIDE ALL

    const showAllProjects = () => {
        for (const projectContainerNode of allItemsContainer.children) {
            showProject(projectContainerNode);
        }
        console.log("Now showing all items");
    }

    const hideAllProjects = () => {
        for (const projectContainerNode of allItemsContainer.children) {
            hideProject(projectContainerNode);
        }
        console.log("Now hiding all items");
    }


    return { 
        createProjectContainerInDom, addItemToProject,
        hideProject, showProject,
        showAllProjects, hideAllProjects
    };

})();

export default MainWindow_DOM;