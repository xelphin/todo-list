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

    updateInfo = (newName) => {
        this._name = newName;
        Tab_DOM.updateTabName(this._tabNode , newName);
    }

    updateItemInfo = (id, newTitle, newDate, newChecked) => {
        if (!this.checkHasItem) {
            return false;
        }
        this._myItems_obj[id].updateInfo(newTitle, newDate, newChecked);
    }

    addItem = (itemObj) => {
        this._myItems_obj[itemObj.getItemId()] = itemObj;
        return true;
    }

    deleteItem = (itemId) => {
        delete this._myItems_obj[itemId];
        return true;
    }

    checkHasItem = (itemId) => {
        if (this._myItems_obj.hasOwnProperty(itemId)) {
            return true;
        }
        return false;
    }

    getItemObj = (itemId) => {
        if (!this.checkHasItem) {
            return undefined;
        }
        return this._myItems_obj[itemId];
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