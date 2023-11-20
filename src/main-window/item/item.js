import './style.scss';

export default class Item {
  
    constructor(title, date, description, project, checked) {
        this._title = title;
        this._date = date;
        this._description = description;
        this._project = project;
        this._checked = checked;
    }

    get getTitle() {
        return this._title;
    }
    
    set setTitle(newTitle) {
        this._title = newTitle;
    }

    // ...
  
    createDomItem = () => {
        // dom: makes dom item
    }

    // ...

}