export default class Todo {

    constructor(title, description, dueDate, priority, notes, checklist){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.isComplete = false;
        this.ID = crypto.randomUUID()
    }

    changeCompletionStatus(){
        this.isComplete = !this.isComplete
    }

    editTodo(newDataObj){
        return Object.assign(this, newDataObj)
    }
}