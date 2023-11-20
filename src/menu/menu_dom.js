import '../general.scss';
import '../layout.scss';
import './style.scss';
import Menu from './menu.js';
import ProjectForm from './form/project-form.js';

const Menu_DOM = (function () {

    const mainContainer = document.querySelector("#main-tab-container");
    const projectsContainer = document.querySelector("#projects-tab-container");
    const addBtn = document.querySelector("#add-tab-container");

    addBtn.addEventListener("click", () => Menu.newProjectFormPopUp() );

    const openForm = () => {
        ProjectForm.openForm();
    }
    
    const addTabToMain = (tabNode) => {
        mainContainer.appendChild(tabNode);
    }

    const addTabToProjects = (tabNode) => {
        projectsContainer.appendChild(tabNode);
    }

    return {openForm, addTabToMain, addTabToProjects}


})();

export default Menu_DOM;