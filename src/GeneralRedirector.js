import MainWindow from './main-window/main-window.js';
import Menu from './menu/menu.js';

const GeneralRedirector = (function () {

    const callToGetCurrTab = () => {
        return Menu.getCurrTabObj();
    }

    const callForProjectToSaveItem = (itemObj) => {
        return Menu.projectToSaveItem(itemObj);
    }

    const callToToggleDisplayOfItems = (hideItems, showItems) => {
        MainWindow.toggleDisplayOfItems(hideItems, showItems);
    }

    const callToDisplayAllItems = () => {
        MainWindow.displayAllItems();
    }

    const callToDisplayOnlyItems = (items) => {
        MainWindow.displayOnlyItems(items);
    }

    const callToHideAddBtn = () => {
        MainWindow.hideAddBtn();
    }

    const callToShowAddBtn = () => {
        MainWindow.showAddBtn();
    }

    const callToToggleShowUnchecked = () => {
        MainWindow.toggleShowUnchecked();
    }

    const callToUpdateItemsToShow = () => {
        Menu.updateItemsToShow();
    }

    return {
        callToGetCurrTab, callForProjectToSaveItem,
        callToToggleDisplayOfItems, callToDisplayAllItems, callToDisplayOnlyItems,
        callToHideAddBtn, callToShowAddBtn,
        callToToggleShowUnchecked, callToUpdateItemsToShow
    }

})();

export default GeneralRedirector;