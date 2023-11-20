import './style.scss';

const ToggleTheme = (function () {

    let theme = "dark";

    const themeList = Object.freeze({
        "light": {id: 0, name: "light", classTheme: "light-theme"},
        "dark": {id: 1, name: "dark", classTheme: "dark-theme"}
    });

    
    const toggle = () => {
        // dom: make toggle move
        // dom: add classTheme to places needed (use mixin?)
        theme = themeList[(theme.id + 1)%2];
    }

    return { toggle };

})();

export default ToggleTheme;