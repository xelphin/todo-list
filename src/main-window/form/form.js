import '../../general.scss';
import '../../layout.scss';
import './style.scss';
import Form_DOM from './form_dom.js';
import MainWindow from '../main-window.js';

const Form = (function () {

    const openForm = () => {
        Form_DOM.openForm();
    }

    const sendData = (title, date, checked) => {
        MainWindow.AddItem(title, date, checked);
    }

    const clickCancel = () => {
        // User Cancelled
        Form_DOM.cancelForm();
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
    }

    const setDefaultDates = () => {
        Form_DOM.changeDateValue(50, true);
        Form_DOM.changeDateValue(5, false);
        Form_DOM.setCurrDateAsDefault();
    }

    return {openForm, sendData, clickCancel, clickClose, setDefaultDates}

})();

export default Form;