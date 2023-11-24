import '../general.scss';
import '../layout.scss';
import './style.scss';
import './item/style.scss';
import Item from './item/item.js';
import Item_DOM from './item/item_dom.js';
import MainWindow from './main-window.js';
import Form from './form/form.js'

const MainWindow_DOM = (function () {


    const allItemsContainer = document.querySelector("#all-items-container");
    const addBtn = document.querySelector("#add-item-container");

    addBtn.addEventListener("click", () => MainWindow.newItemFormPopUp() );

    const hideAddBtn = () => {
        addBtn.style.display = 'none';
    }

    const showAddBtn = () => {
        addBtn.style.display = 'block';
    }

    const openForm = () => {
        Form.openForm();
    }

    const addItemToDom = (itemNode) => {
        allItemsContainer.appendChild(itemNode);
    }

    // SHOW/HIDE PROJECT

    const applyToItems = (items, show, showUnchecked = true) => {
        for (const key in items) {
            let itemNode = items[key].getItemNode();
            if ((show && showUnchecked) || (show && Item.fromNodeGetIfChecked(itemNode))) {
                Item_DOM.showItem(itemNode);
            } else {
                Item_DOM.hideItem(itemNode);
            }
        }
        return true;
    }

    const hideItems = (items) => { 
        return applyToItems(items, false);
    }

    const showItems = (items, showUnchecked = true) => {
        return applyToItems(items, true, showUnchecked);
    }

    // SHOW/HIDE ALL

    const showAllItems = (showUnchecked = true) => { 
        for (const itemNode of allItemsContainer.children) {
            if (showUnchecked || Item.fromNodeGetIfChecked(itemNode)) {
                Item_DOM.showItem(itemNode);
            } else {
                Item_DOM.hideItem(itemNode);
            }
        }
        console.log("Now showing all items");
    }

    const hideAllItems = () => { 
        for (const itemNode of allItemsContainer.children) {
            Item_DOM.hideItem(itemNode);
        }
        console.log("Now hiding all items");
    }


    return {
        hideAddBtn, showAddBtn, openForm, addItemToDom,
        hideItems, showItems,
        showAllItems, hideAllItems
    };

})();

export default MainWindow_DOM;