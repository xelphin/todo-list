import '../../general.scss';
import '../../layout.scss';
import './style.scss';
import Menu from '../menu.js'

const Tab_DOM = (function () {

    const sharedClass = "menu-tab";

    const addEventListenerToTab = (tabNode) => {
        tabNode.addEventListener('click', (event) => Menu.clickedTab(event.target));
    }

    const createTab = (name) => {
        // <div class="menu-tab">name</div>
        console.log("Creating tab: ", name);
        let tabNode = document.createElement('div');
        tabNode.setAttribute('class', sharedClass);
        tabNode.setAttribute('data-tab', name);
        tabNode.textContent = name;
        addEventListenerToTab(tabNode);
        return tabNode;
    }

    return { createTab, addEventListenerToTab };

})();

export default Tab_DOM;