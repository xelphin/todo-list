import '../general.scss';
import '../layout.scss';
import './style.scss';
import ToggleChecks_DOM from './toggle-checks_dom.js';
import GeneralRedirector from '../GeneralRedirector.js'

const ToggleChecks = (function () {

    const clickToggle = (checked) => {
        console.log("checked value of toggle: ", checked);
        GeneralRedirector.callToToggleShowUnchecked();
        GeneralRedirector.callToUpdateItemsToShow();        
    }

    return { clickToggle };

})();

export default ToggleChecks;