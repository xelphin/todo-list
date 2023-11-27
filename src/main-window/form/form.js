import '../../general.scss';
import '../../layout.scss';
import './style.scss';
import Form_DOM from './form_dom.js';
import MainWindow from '../main-window.js';
import GeneralRedirector from '../../GeneralRedirector.js';

const Form = (function () {

    let modeCreate = true; // modeEdit -> false

    const changeToEditMode = () => {
        modeCreate = false;
    }

    const openForm = () => {
        Form_DOM.openForm();
    }

    const sendData = (title, date, checked) => {
        if (modeCreate) {
            MainWindow.AddItem(title, date, checked);
        } else {
            // Edit
            modeCreate = true;
            MainWindow.formSubmitEditItem(title, date, checked);
        }
        GeneralRedirector.callToUpdateItemsToShow();
        modeCreate = true;
    }

    const clickCancel = () => {
        // User Cancelled
        Form_DOM.cancelForm();
        modeCreate = true;
    }

    const clickClose = (event) => {
        let title = Form_DOM.getTitleValue();
        let date = Form_DOM.getDateValue();
        let checked = Form_DOM.getCheckedValue();
        if (Form_DOM.getSubmissionStatus(event)) {
            // User Submitted
            sendData(title, date, checked);
        }
        // User Cancelled
        modeCreate = true;
    }

    const setDefaultDates = () => {
        Form_DOM.changeDateValue(50, true);
        Form_DOM.changeDateValue(5, false);
        Form_DOM.setCurrDateAsDefault();
    }

    return {openForm, sendData, clickCancel, clickClose, setDefaultDates, changeToEditMode}

})();

export default Form;