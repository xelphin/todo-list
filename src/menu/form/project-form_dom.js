import '../../general.scss';
import '../../layout.scss';
import './style.scss';
import ProjectForm from './project-form.js';

const ProjectForm_DOM = (function () {

    const form = document.querySelector("#project-form-dialog");
    const cancelBtn = document.querySelector("#project-form-cancel-btn");
    const submitBtn = document.querySelector("#project-form-submit-btn");
    const titleInput = document.querySelector("#project-form-title");

    const openForm = () => {
        form.showModal();
        titleInput.value = "";
        titleInput.required = true;
    }

    const cancelForm = () => {
        titleInput.required = false;
        form.close();
    }

    const getTitleValue = () => {
        return titleInput.value;
    }

    const getSubmissionStatus = (event) => {
        if (event.submitter != submitBtn) {
            console.log("cancelled");
            return false;
        } else {
            console.log("submitted");
            return true;
        }
    }

    cancelBtn.addEventListener('click', () => ProjectForm.clickCancel());
    form.addEventListener('submit', (event) => ProjectForm.clickClose(event));

    return {openForm, cancelForm, getTitleValue, getSubmissionStatus}

})();

export default ProjectForm_DOM;