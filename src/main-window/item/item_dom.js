import '../../general.scss';
import '../../layout.scss';
import './style.scss';
import MainWindow from '../main-window';
import Item from './item.js';
import GeneralRedirector from '../../GeneralRedirector.js';

const Item_DOM = (function () {

    const isItemNodeChecked = (itemNode) => {
        const checkBox = itemNode.querySelector('.item-checkbox');
        if (checkBox == undefined || checkBox.checked == false) {
            return false;
        }
        return true;
    }

    const hideItem = (itemNode) => {
        itemNode.style.display = 'none';
    }

    const showItem = (itemNode) => {
        itemNode.style.display = 'grid';
    }

    const createItemCheckBoxNode = (checked) => {
        // <input name="item-checkbox" type="checkbox" class="item-checkbox">
        let checkBoxNode = document.createElement('input');
        checkBoxNode.setAttribute('name', "item-checkbox");
        checkBoxNode.setAttribute('type', "checkbox");
        checkBoxNode.setAttribute('class', "item-checkbox");
        checkBoxNode.checked = checked;
        checkBoxNode.addEventListener('click', () => MainWindow.updateItemsShownBecauseOfClickingChecked());
        return checkBoxNode;
    }

    const createItemTitleNode = (title) => {
        // <h3 class="item-title">demo item title</h3>
        let titleNode = document.createElement('h3');
        titleNode.setAttribute('class', "item-title");
        titleNode.textContent = title;
        return titleNode;
    }

    const createItemDateNode = (date) => {
        // <div class="item-date-container">
        //     <h4>12/12/2024</h4>
        // </div>
        // Container
        let dateNode = document.createElement('div');
        dateNode.setAttribute('class', "item-date-container");
        // Text
        let dateTextNode = document.createElement('h4');
        dateTextNode.textContent = MainWindow.convertDateFromInputToReadFormat(date);
        // Append and send
        dateNode.appendChild(dateTextNode);
        return dateNode;
    }

    const createItemEdit = (id, projectId) => {
        let itemEdit = document.createElement('img');
        itemEdit.src = "./icons/icon_edit.svg";
        itemEdit.setAttribute('id', "item-edit-"+id);
        itemEdit.setAttribute('class', "item-edit");
        itemEdit.addEventListener('click', function(event) {
            event.stopPropagation();
            MainWindow.clickEditItem(id, projectId);
        });
        return itemEdit;
    }

    const createItemBin = (id, projectId) => {
        let itemBin = document.createElement('img');
        itemBin.src = "./icons/icon_bin.svg";
        itemBin.setAttribute('id', "item-bin-"+id);
        itemBin.setAttribute('class', "item-bin");
        itemBin.addEventListener('click', function(event) {
            event.stopPropagation();
            MainWindow.clickDeleteItem(id, projectId);
        });
        return itemBin;
    }

    const createItemNode = (uid, projectUId, title, date, checked) => {
        /*
        <div id="item-<projectId>-<itemId>" class="item-container">
            <input name="item-checkbox" type="checkbox" class="item-checkbox">
            <h3 class="item-title">demo item title</h3>
            <div class="item-date-container">
                <h4>12/12/2024</h4>
            </div>
            <img id="tab-edit-<id>" src=<EditIcon> alt="edit">
            <img id="tab-bin-<id>" src=<BinIcon> alt="bin">
        </div>
        */
        console.log("Creating item: ", title);
        // Item container
        let itemNode = document.createElement('div');
        itemNode.setAttribute('id', "item-"+projectUId+"-"+uid);
        itemNode.setAttribute('class', "item-container");
        showItem(itemNode);
        // Append
        itemNode.appendChild(createItemCheckBoxNode(checked));
        itemNode.appendChild(createItemTitleNode(title));
        itemNode.appendChild(createItemDateNode(date));
        itemNode.appendChild(createItemEdit(uid, projectUId));
        itemNode.appendChild(createItemBin(uid, projectUId));
        return itemNode;
    }

    return { isItemNodeChecked, createItemNode, hideItem, showItem };

})();

export default Item_DOM;