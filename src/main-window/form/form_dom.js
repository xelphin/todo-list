import '../../general.scss';
import '../../layout.scss';
import './style.scss';
import Form from './form.js';
import MainWindow from '../main-window.js';

const Form_DOM = (function () {

    const form = document.querySelector("#item-form-dialog");
    const cancelBtn = document.querySelector("#item-form-cancel-btn");
    const submitBtn = document.querySelector("#item-form-submit-btn");
    const titleInput = document.querySelector("#item-form-title");
    const dateInput = document.querySelector("#item-form-date");
    const checkedInput = document.querySelector("#item-form-did");

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

    const getDateValue = () => {
        return dateInput.value;
    }

    const getCheckedValue = () => {
        return checkedInput.checked;
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

    const getTodaysValues = () => {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        return {
            day: day,
            month: month,
            year: year
        }
    }

    const getYearStartValues = () => {
        const date = new Date();
        let year = date.getFullYear();
        return {
            day: 1,
            month: 1,
            year: year
        }
    }

    const changeDateValue = (yearsDelta, changeMaxValue) => {
        let newDay = getYearStartValues();
        changeMaxValue == true ? newDay.year = newDay.year + yearsDelta : newDay.year = newDay.year - yearsDelta;
        let newDayValue =  MainWindow.makeDateStringInputFormat(newDay.day, newDay.month, newDay.year);
        changeMaxValue == true ? dateInput.max = newDayValue : dateInput.min = newDayValue ;
    }

    const setCurrDateAsDefault = () => {
        let today = getTodaysValues();
        dateInput.value = MainWindow.makeDateStringInputFormat(today.day, today.month, today.year);
    }


    cancelBtn.addEventListener('click', () => Form.clickCancel());
    form.addEventListener('submit', (event) => Form.clickClose(event));

    return {
        openForm, cancelForm, getSubmissionStatus,
        getTitleValue, getDateValue, getCheckedValue,
        changeDateValue, setCurrDateAsDefault
    }

})();

export default Form_DOM;