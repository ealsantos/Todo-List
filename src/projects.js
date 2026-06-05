export default class Project {

    constructor(name){
        this.name = name
        this.todosList = []
    }

    addTodoToProject(todo){
        this.todosList.push(todo);
    }

    removeTodoFromProject(todo){
        const toDoToRemove = this.todosList.findIndex((myTodos) => todo.ID === myTodos.ID )
        this.todosList.splice(toDoToRemove, 1)
    }

    getTodos(){
        return this.todosList
    }

}