import '../general.scss';
import '../layout.scss';
import './style.scss';
import './item/style.scss';
import Item from './item/item.js';
import MainWindow_DOM from './main-window_dom.js';

const MainWindow = (function () {

    // maybe have each set of items belong to a <div id="project1-allItemsContainer"></div> and that will be the quickest <- Seems best [1]

    const createProjectContainer = (title) => {
        // TODO: Asks MainWindow_DOM to create a container <div id="[title]-allItemsContainer"></div> in MainWindow
        console.log("Will create projectContainer in main window for: ", title);
        return MainWindow_DOM.createProjectContainerInDom(title);
    }
    
    const AddItem = (title, date, description, project, checked) => {
        // [1] -> TODO: make the createAndAddProjectTabToMenu() call createProjectContainer()
    }

    return { createProjectContainer, AddItem };

})();

export default MainWindow;