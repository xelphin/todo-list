import '../../general.scss';
import '../../layout.scss';
import './style.scss';
import ProjectForm_DOM from './project-form_dom.js';
import Menu from '../menu.js';

const ProjectForm = (function () {

    const openForm = () => {
        ProjectForm_DOM.openForm();
    }

    const sendData = (title) => {
        Menu.createAndAddProjectTabToMenu(title);
    }

    const clickCancel = () => {
        // User Cancelled
        ProjectForm_DOM.cancelForm();
    }

    const clickClose = (event) => {
        let title = ProjectForm_DOM.getTitleValue();
        if (ProjectForm_DOM.getSubmissionStatus(event)) {
            // User Submitted
            sendData(title);
        }
        // User Cancelled
    }

    return {openForm, sendData, clickCancel, clickClose}

})();

export default ProjectForm;