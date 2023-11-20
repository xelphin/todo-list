import '../../general.scss';
import '../../layout.scss';
import './style.scss';
import Tab_DOM from './tab_dom.js';

export default class Tab {
  
    constructor(tabName, deletable, alreadyInMenu) {
        this._name = tabName;
        this._tabNode = Tab_DOM.createTab(tabName);
        this._deletable = deletable;
        this._addedToMenu = alreadyInMenu;
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

}