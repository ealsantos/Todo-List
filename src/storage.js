import { Project, ProjectManager } from "./projects";
import Todo from "./todo";

export function saveToStorage(object){
    const textJSON = JSON.stringify(object)
    console.log('Saving to storage:', textJSON)
    localStorage.setItem("ProjectManagerState", textJSON)
}

export function loadFromStorage(){
    const toParse = localStorage.getItem("ProjectManagerState")
    const parsedJSON = JSON.parse(toParse)

    const parseProjects = parsedJSON.projectList.map((projects) => {
        const newProject = new Project(projects.name)
        newProject.ID = projects.ID

        const newTodos = projects.todosList.map((todo) => {
            const newTodo = new Todo(todo.title, todo.description, todo.dueDate, todo.priority, todo.notes, todo.checklist)
            newTodo.ID = todo.ID
            newTodo.isComplete = todo.isComplete
            return newTodo
        })
        newProject.todosList = newTodos
        return newProject
    })

    const restoredManager = new ProjectManager()
    restoredManager.projectList = parseProjects
    restoredManager.defaultProject = parseProjects[0]
    return restoredManager
}