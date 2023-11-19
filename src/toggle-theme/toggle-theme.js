import './style.scss';

export default class ToggleTheme {

    static themeList = Object.freeze({
        "light": {id: 0, name: "light", classTheme: "light-theme"},
        "dark": {id: 1, name: "dark", classTheme: "dark-theme"}
    });
  
    constructor() {
        this.theme = ToggleTheme.themeList["light"];
    }
  
    toggleTheme = () => {
        // dom: make toggle move
        // dom: add classTheme to places needed (use mixin?)
        this.theme = ToggleTheme.themeList[(this.theme.id + 1)%2];
    }

}