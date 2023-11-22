import '../general.scss';
import '../layout.scss';
import './style.scss';
import './item/style.scss';
import Item from './item/item.js';

const MainWindow_DOM = (function () {

    // maybe have each set of items belong to a <div id="project1-allItemsContainer"></div> and that will be the quickest <- Seems best [1]

    const allItemsContainer = document.querySelector("#all-items-container");

    const createProjectContainerInDom = (title) => {
        // Create: <div id="project1-items-container"></div>
        let projectDiv = document.createElement('div');
        projectDiv.setAttribute('id', title+"-items-container");
        allItemsContainer.appendChild(projectDiv);
        return projectDiv;
    }

    return { createProjectContainerInDom };

})();

export default MainWindow_DOM;