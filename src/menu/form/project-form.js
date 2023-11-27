import '../../general.scss';
import '../../layout.scss';
import './style.scss';
import ProjectForm_DOM from './project-form_dom.js';
import Menu from '../menu.js';

const ProjectForm = (function () {


    let modeCreate = true; // modeEdit -> false

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
        modeCreate = true;
    }

    const clickCancel = () => {
        // User Cancelled
        ProjectForm_DOM.cancelForm();
        modeCreate = true;
    }

    const clickClose = (event) => {
        let title = ProjectForm_DOM.getTitleValue();
        if (ProjectForm_DOM.getSubmissionStatus(event)) {
            // User Submitted
            sendData(title);
        }
        // User Cancelled
        modeCreate = true;
    }

    return {openForm, sendData, clickCancel, clickClose, changeToEditMode}

})();

export default ProjectForm;