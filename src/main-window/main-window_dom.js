import '../general.scss';
import '../layout.scss';
import './style.scss';
import './item/style.scss';
import Item from './item/item.js';
import Item_DOM from './item/item_dom.js';
import MainWindow from './main-window.js';
import Form from './form/form.js'

const MainWindow_DOM = (function () {


    const allItemsContainer = document.querySelector("#all-items-container");
    const addBtn = document.querySelector("#add-item-container");

    addBtn.addEventListener("click", () => MainWindow.newItemFormPopUp() );

    const hideProjectContainerNode = (projectNode) => {
        projectNode.style.display = 'none';
    }

    const showProjectContainerNode = (projectNode) => {
        projectNode.style.display = 'flex';
    }

    const hideAddBtn = () => {
        addBtn.style.display = 'none';
    }

    const showAddBtn = () => {
        addBtn.style.display = 'block';
    }

    const openForm = () => {
        Form.openForm();
    }

    const createProjectContainerInDom = (title) => {
        // Create: <div id="project1-items-container" style="display:flex" class="project-items-container"></div>
        let projectDiv = document.createElement('div');
        projectDiv.setAttribute('id', title+"-items-container");
        projectDiv.setAttribute('class', "project-items-container");
        showProjectContainerNode(projectDiv); 
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
        hideAddBtn, showAddBtn, openForm,
        createProjectContainerInDom, addItemToProject,
        hideProject, showProject,
        showAllProjects, hideAllProjects
    };

})();

export default MainWindow_DOM;