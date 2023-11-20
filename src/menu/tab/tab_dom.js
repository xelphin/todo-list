import '../../general.scss';
import '../../layout.scss';
import './style.scss';

const Tab_DOM = (function () {

    const sharedClass = "menu-tab";

    const createTab = (name) => {
        // <div class="menu-tab">name</div>
        let tabNode = document.createElement('div');
        tabNode.setAttribute('class', sharedClass);
        tabNode.textContent = name;
        return tabNode;
    }

    return { createTab };

})();

export default Tab_DOM;