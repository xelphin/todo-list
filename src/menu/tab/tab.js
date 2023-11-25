import '../../general.scss';
import '../../layout.scss';
import './style.scss';
import Tab_DOM from './tab_dom.js';


export default class Tab {
  
    constructor(uid, tabName, deletable, alreadyInMenu) {
        this._id = uid;
        this._name = tabName;
        this._tabNode = Tab_DOM.createTab(uid, tabName, deletable);
        this._deletable = deletable;
        this._addedToMenu = alreadyInMenu;
        this._projectContainerNodeInMainWindow = undefined;
        // Items
        this._myItems_obj = {}; // For lookups/direct access
        this._myItems_arr = []; // For sorting/filtering/... // TODO: Probs no need now
    } 

    getName = () => {
        return this._name;
    }

    getNode = () => {
        return this._tabNode;
    }

    getId = () => {
        return this._id;
    }
    
    isDeletable = () => {
        return this._deletable;
    }

    isAProject = () => {
        return this._deletable;
    }

    setAddToMenu = () => {
        if (this._addedToMenu) return false;
        this._addedToMenu = true;
        return true;
    }

    addItem = (itemObj) => {
        this._myItems_obj[itemObj.getItemId()] = itemObj;
        this._myItems_arr.push(itemObj);
        return true;
    }

    itemExistsInTab = (itemId) => {
        return (itemId in this._myItems_obj);
    }

    getAllItems = () => {
        if (this._id == "0") { 
            // All
            // return all items in MainWindow
        } else if (this._id == "1") { 
            // Today
            // return all items in MainWindow whose due date is Today
        }
        // else
        return this._myItems_obj;
    }

}