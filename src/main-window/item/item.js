import './style.scss';
import Item_DOM from './item_dom.js'

export default class Item {
  
    constructor(uid, projectUId, title, date, checked) {
        this._uid = uid;
        this._itemNode = Item_DOM.createItemNode(uid,projectUId, title, date, checked);
    }

    getItemNode() {
        return this._itemNode;
    }

    getItemId() {
        return this._uid;
    }

    getChecked() {
        return Item_DOM.fromNodeGetIfChecked(this._itemNode);
    }

    static fromNodeGetIfChecked(someItemNode) {
        return Item_DOM.isItemNodeChecked(someItemNode);
    }
}