import '../general.scss';
import '../layout.scss';
import './style.scss';
import Tab from './tab/tab.js';

const Menu_DOM = (function () {

    const mainContainer = document.querySelector("#main-tab-container");
    const projectsContainer = document.querySelector("#projects-tab-container");
    
    const addTabToMain = (tabNode) => {
        mainContainer.appendChild(tabNode);
    }

    const addTabToProjects = (tabNode) => {
        projectsContainer.appendChild(tabNode);
    }

    return {addTabToMain, addTabToProjects}


})();

export default Menu_DOM;