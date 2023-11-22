import '../../general.scss';
import '../../layout.scss';
import './style.scss';
import MainWindow from '../main-window.js'

const Item_DOM = (function () {

    const createItemCheckBoxNode = (checked) => {
        // <input name="item-checkbox" type="checkbox" class="item-checkbox">
        let checkBoxNode = document.createElement('input');
        checkBoxNode.setAttribute('name', "item-checkbox");
        checkBoxNode.setAttribute('type', "checkbox");
        checkBoxNode.setAttribute('class', "item-checkbox");
        // TODO: Add 'checked' too (if relevant)
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
        dateTextNode.textContent = date;
        // Append and send
        dateNode.appendChild(dateTextNode);
        return dateNode;
    }

    const createItemNode = (title, date, project, checked) => {
        // <div class="item-container" data-project="demo project">
        //     <input name="item-checkbox" type="checkbox" class="item-checkbox">
        //     <h3 class="item-title">demo item title</h3>
        //     <div class="item-date-container">
        //         <h4>12/12/2024</h4>
        //     </div>
        // </div>
        console.log("Creating item: ", title);
        // Item container
        let itemNode = document.createElement('div');
        itemNode.setAttribute('class', "item-container");
        itemNode.setAttribute('data-project', project);
        // TODO: Add event listener
        // Inner elements
        let checkBoxNode = createItemCheckBoxNode(checked);
        let titleNode = createItemTitleNode(title);
        let dateNode = createItemDateNode(date);
        // Append
        itemNode.appendChild(checkBoxNode);
        itemNode.appendChild(titleNode);
        itemNode.appendChild(dateNode);
        return itemNode;
    }

    return { createItemNode };

})();

export default Item_DOM;