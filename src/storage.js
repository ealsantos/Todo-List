import { Project } from "./projects";
import Todo from "./todo";

export function saveToStorage(object){
    const textJSON = JSON.stringify(object)
    localStorage.setItem("ProjectManagerState", textJSON)
}

export function loadFromStorage(){
    const toParse = localStorage.getItem("ProjectManagerState")
    const parsedJSON = JSON.parse(toParse)

    const parseProjects = parsedJSON.projectList.map((projects) => {
        const newProject = new Project(projects.name)
        newProject.ID = projects.ID
        return newProject
    })
        
    const newTodos = projects.todosList.map((todo) => {
       const newTodo = new Todo(projects.todosList)
       // newTodo.ID = projects.ID
       // newTodo.isComplete = projects.isComplete
       return newTodo
    })

    newProject.todosList = newTodos
}

