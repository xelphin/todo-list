import '../../general.scss';
import '../../layout.scss';
import './style.scss';
import Tab_DOM from './tab_dom.js';
import Item from '../../main-window/item/item.js';


export default class Tab {
  
    constructor(tabName, deletable, alreadyInMenu) {
        this._name = tabName;
        this._tabNode = Tab_DOM.createTab(tabName);
        this._deletable = deletable;
        this._addedToMenu = alreadyInMenu;
        this._projectContainerNodeInMainWindow = undefined;
        // Items
        this._myItems_obj = {}; // For lookups/direct access
        this._myItems_arr = []; // For sorting/filtering/...
    } 

    getName = () => {
        return this._name;
    }

    getNode = () => {
        return this._tabNode;
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

    setProjectContainerInMainWindow = (projectContainerNode) => {
        this._projectContainerNodeInMainWindow = projectContainerNode;
    }

    getProjectContainerInMainWindow = () => {
        return this._projectContainerNodeInMainWindow;
    }

    addItem = (itemObj) => {
        // TODO: instead of itemObj.getItemId(), use GeneralRedirector and then don't import item.js directly
        this._myItems_obj[itemObj.getItemId()] = itemObj;
        this._myItems_arr.push(itemObj);
        return true;
    }

    itemExistsInTab = (itemId) => {
        return (itemId in this._myItems_obj);
    }

}