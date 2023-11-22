import './style.scss';
import Item_DOM from './item_dom.js'

export default class Item {
  
    constructor(uid, title, date, checked) {
        this._uid = uid;
        this._title = title;
        this._date = date;
        this._checked = checked;
        this._itemNode = Item_DOM.createItemNode(uid, title, date, checked);
    }

    get title() {
        return this._title;
    }
    
    set setTitle(newTitle) {
        this._title = newTitle;
    }

    getItemNode() {
        return this._itemNode;
    }

    getItemId() {
        return this._uid;
    }
}