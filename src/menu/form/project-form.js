import '../../general.scss';
import '../../layout.scss';
import './style.scss';
import ProjectForm_DOM from './project-form_dom.js';
import Menu from '../menu.js';

const ProjectForm = (function () {


    let modeCreate = true; // modeCreate = false

    const changeToEditMode = () => {
        modeCreate = false;
    }

    const openForm = () => {
        ProjectForm_DOM.openForm();
    }

    const sendData = (title) => {
        if (modeCreate) {
            // Create
            Menu.createAndAddProjectTabToMenu(title);
        } else {
            // Edit
            modeCreate = true;
            Menu.formSubmitEditProject(title);
        }
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

    return {openForm, sendData, clickCancel, clickClose, changeToEditMode}

})();

export default ProjectForm;