import '../general.scss';
import '../layout.scss';
import './style.scss';
import Menu from './menu.js';
import ProjectForm from './form/project-form.js';

const Menu_DOM = (function () {

    const mainContainer = document.querySelector("#main-tab-container");
    const projectsContainer = document.querySelector("#projects-tab-container");
    const addBtn = document.querySelector("#add-tab-container");
    const tabTitle = document.querySelector("#tab-title");

    addBtn.addEventListener("click", () => Menu.newProjectFormPopUp() );

    const changeTabTitle = (newTitle) => {
        console.log("New title given is: ", newTitle);
        tabTitle.textContent = newTitle;
    }

    const openForm = () => {
        ProjectForm.openForm();
    }
    
    const addTabToMain = (tabNode) => {
        mainContainer.appendChild(tabNode);
    }

    const deleteTabFromMain = (tabNode) => {
        tabNode.remove();
    }

    const addTabToProjects = (tabNode) => {
        projectsContainer.appendChild(tabNode);
    }

    return {changeTabTitle, openForm, addTabToMain, addTabToProjects, deleteTabFromMain}


})();

export default Menu_DOM;