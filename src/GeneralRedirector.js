import MainWindow from './main-window/main-window.js';
import Menu from './menu/menu.js';

const GeneralRedirector = (function () {

    const callToCreateProjectContainerInMainWindow = (projectName) => {
        return MainWindow.createProjectContainer(projectName);
    }

    return {callToCreateProjectContainerInMainWindow}

})();

export default GeneralRedirector;