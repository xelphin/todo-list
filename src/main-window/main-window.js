import '../general.scss';
import '../layout.scss';
import './style.scss';
import './item/style.scss';
import Item from './item/item.js';
import MainWindow_DOM from './main-window_dom.js';
import GeneralRedirector from '../GeneralRedirector.js'
import Form from './form/form.js'
import uniqid from 'uniqid';

const MainWindow = (function () {

    let allItems_obj = {}; // For lookups/direct access
    let allItems_arr = []; // For sorting/filtering/...

    const saveItemObj = (itemObj) => {
        allItems_obj[itemObj.getItemId] = itemObj;
        allItems_arr.push(itemObj);
    }

    const createUID = () => {
        // Can change this function to get uids in a different way
        return uniqid();
    }
    
    const AddItem = (title, date, checked) => {
        let currTab = GeneralRedirector.callToGetCurrTab();
        if (!currTab.isAProject()) {
            console.log("Error: Can't add item when a project is not selected.");
            return undefined;
        }
        // Create Item Object
        let uid = createUID();
        let itemObj = new Item(uid, title, date, checked);
        // Add Item To DOM
        MainWindow_DOM.addItemToDom(itemObj.getItemNode());
        // Give the itemObj to the Project
        GeneralRedirector.callForProjectToSaveItem(itemObj);
        // Save it in MainWindow too
        saveItemObj(itemObj);

        return undefined;
    }

    const toggleDisplayOfItems = (itemsHide, itemsShow) => {
        MainWindow_DOM.hideItems(itemsHide);
        MainWindow_DOM.showItems(itemsShow);
    }

    const displayAllItems = () => {
        MainWindow_DOM.showAllItems();
    }

    const displayOnlyItems = (items) => {
        MainWindow_DOM.hideAllItems();
        MainWindow_DOM.showItems(items);
    }
    
    const hideAddBtn = () => {
        MainWindow_DOM.hideAddBtn();
    }

    const showAddBtn = () => {
        MainWindow_DOM.showAddBtn();
    }

    const newItemFormPopUp = () => {
        console.log("Opening form to enter new item");
        MainWindow_DOM.openForm();
    }

    const makeDateStringInputFormat = (day, month, year) => {
        return `${year}-${month}-${day}`;
    }

    const makeDateStringReadFormat = (day, month, year) => {
        return `${day}/${month}/${year}`;
    }

    const convertDateFromReadToInputFormat = (readFormatStr) => {
        let values = readFormatStr.split("/");
        return makeDateStringInputFormat(values[0], values[1], values[2]);
    }

    const convertDateFromInputToReadFormat = (readFormatStr) => {
        let values = readFormatStr.split("-");
        return makeDateStringReadFormat(values[2], values[1], values[0]);
    }

    const INIT_ME = () => {
        Form.setDefaultDates();
    }

    return { 
        AddItem, toggleDisplayOfItems,displayAllItems, displayOnlyItems,
        hideAddBtn, showAddBtn, newItemFormPopUp,
        makeDateStringInputFormat, makeDateStringReadFormat, convertDateFromReadToInputFormat, convertDateFromInputToReadFormat,
        INIT_ME
    };

})();

export default MainWindow;