import '../general.scss';
import '../layout.scss';
import './style.scss';
import ToggleChecks from './toggle-checks.js';

const ToggleChecks_DOM = (function () {

    const toggleInput = document.querySelector("#toggle-input");

    toggleInput.addEventListener("click", (event) => ToggleChecks.clickToggle(event.target.checked));

    return { }


})();

export default ToggleChecks_DOM;