import '../../general.scss';
import '../../layout.scss';
import './style.scss';
import Menu from '../menu.js';

const Tab_DOM = (function () {

    const sharedClass = "menu-tab";

    const addEventListenerToTab = (tabNode) => {
        tabNode.addEventListener('click', (event) => Menu.clickedTab(event.currentTarget));
    }

    const createTabName = (id, tabNameStr) => {
        let tabName = document.createElement('h4');
        tabName.textContent = tabNameStr;
        tabName.setAttribute('id', "tab-name-"+id);
        tabName.setAttribute('class', "menu-tab-name");
        return tabName;
    }

    const createTabEdit = (id) => {
        let tabEdit = document.createElement('img');
        tabEdit.src = "./icons/icon_edit.svg";
        tabEdit.setAttribute('id', "tab-edit-"+id);
        tabEdit.setAttribute('class', "menu-tab-edit");
        tabEdit.addEventListener('click', function(event) {
            event.stopPropagation();
            Menu.clickEditProject(id);
        });
        return tabEdit;
    }

    const createTabBin = (id) => {
        let tabBin = document.createElement('img');
        tabBin.src = "./icons/icon_bin.svg";
        tabBin.setAttribute('id', "tab-bin-"+id);
        tabBin.setAttribute('class', "menu-tab-bin");
        tabBin.addEventListener('click', function(event) {
            event.stopPropagation();
            Menu.clickDeleteProject(id);
        });
        return tabBin;
    }

    const createTab = (id, name, deletable) => {
        /*
        <div class="menu-tab" data-tab="<id>" id="<id>">
            <h4 id="tab-name-<id>"> name <h4>
            <img id="tab-edit-<id>" src=<EditIcon> alt="edit">
            <img id="tab-bin-<id>" src=<BinIcon> alt="bin">
        </div>
        */
        console.log("Creating tab: ", name);
        let tabNode = document.createElement('div');
        tabNode.setAttribute('class', sharedClass);
        tabNode.setAttribute('data-tab', name);
        tabNode.setAttribute('id', id);
        tabNode.appendChild(createTabName(id, name));
        if (deletable) {
            tabNode.appendChild(createTabEdit(id));
            tabNode.appendChild(createTabBin(id));
        }
        addEventListenerToTab(tabNode);
        return tabNode;
    }

    return { createTab, addEventListenerToTab };

})();

export default Tab_DOM;