import { Project } from "./projects"
import { saveToStorage } from "./storage"
import Todo from "./todo"

const sidebarList = document.getElementById('sidebar')
const mainPanelList = document.getElementById('mainPanel')
let currentProject = null

// Renderization

export function renderSidebar(myProjects){
    sidebarList.innerHTML = ""
    const newUL = document.createElement('ul')
    sidebarList.appendChild(newUL)

    for (const projects of myProjects){
        const newProject = document.createElement('li')
        const projectName = document.createElement ('p')
        newProject.setAttribute("data-id", projects.ID)
        projectName.textContent = projects.name
        newUL.appendChild(newProject)
        newProject.appendChild(projectName)
        const dltBtn = document.createElement('button')
        dltBtn.textContent = "Delete Project"
        dltBtn.classList.add('dltBtn')
        newProject.appendChild(dltBtn)
    }

    const addBtn = document.createElement('button')
    addBtn.textContent = " + Add a new Project"
    addBtn.classList.add('addProjBtn')
    sidebarList.appendChild(addBtn)
}

export function renderMainPanel(project){
    mainPanelList.innerHTML = ""
    currentProject = project
    const projectTitle = document.createElement('h1')
    projectTitle.textContent = project.name
    mainPanelList.appendChild(projectTitle)
    const newUL = document.createElement('ul')
    mainPanelList.appendChild(newUL)

    for (const todo of project.todosList){
        const newTodoItem = document.createElement('li')
        const todoName = document.createElement ('p')
        newTodoItem.setAttribute("data-id", todo.ID)
        todoName.textContent = todo.title
        newUL.appendChild(newTodoItem)
        newTodoItem.appendChild(todoName)
        const dltBtn = document.createElement('button')
        dltBtn.textContent = "Delete Todo"
        dltBtn.classList.add('dltBtn')
        newTodoItem.appendChild(dltBtn)
        const completeBtn = document.createElement('button')
        completeBtn.textContent = "Complete Todo"
        completeBtn.classList.add('completeBtn')
        newTodoItem.appendChild(completeBtn)
    }

    const addBtn = document.createElement('button')
    addBtn.textContent = " + Add a new task"
    addBtn.classList.add('addTodoBtn')
    mainPanelList.appendChild(addBtn)
}

// Listeners

export function setupEventListeners(manager){

    let title = document.querySelector('input[name="title"]')
    let description = document.querySelector('input[name="description"]')
    let dueDate = document.querySelector('input[name="dueDate"]')
    let priority = document.querySelector('input[name="priority"]')
    let notes = document.querySelector('input[name="notes"]')

    let todoToEdit
    
    sidebarList.addEventListener("click", (event) => {
        
        if(event.target.classList.contains('addProjBtn')){
            const getProjectName = prompt("What is the name of your project?", "New Project")
            console.log('project name:', getProjectName)
            console.log('type:', typeof getProjectName)
            const newProject = new Project(getProjectName)
            manager.createProject(newProject)
            saveToStorage(manager)
            renderSidebar(manager.getProjects())

        } else if (event.target.classList.contains('dltBtn')){
            const getElementList = event.target.closest('li')
            const getProjectID = getElementList.getAttribute("data-id")
            const getAllProjects = manager.getProjects()
            const projectToDelete = getAllProjects.find((proj) => proj.ID === getProjectID)
            manager.removeProject(projectToDelete)
            saveToStorage(manager)
            renderSidebar(manager.getProjects())

        } else if(event.target.closest('li')){
            const getElementList = event.target.closest('li')
            const getProjectID = getElementList.getAttribute("data-id")
            const getAllProjects = manager.getProjects()
            const projectToDisplay = getAllProjects.find((proj) => proj.ID === getProjectID)
            renderMainPanel(projectToDisplay)
        } 

    })

    let dialog = document.getElementById('editDialog')

    mainPanelList.addEventListener("click", (event) => {
        
        if(event.target.classList.contains('addTodoBtn')){
            const getTodoTitle = prompt("What is your next task?")
            const newTodo = new Todo(getTodoTitle)
            currentProject.addTodoToProject(newTodo)
            saveToStorage(manager)
            renderMainPanel(currentProject)

        } else if (event.target.classList.contains('dltBtn')){
            const getElementList = event.target.closest('li')
            const getTodoID = getElementList.getAttribute("data-id")
            const todoToDelete = currentProject.todosList.find((todo) => todo.ID === getTodoID)
            currentProject.removeTodoFromProject(todoToDelete)
            saveToStorage(manager)
            renderMainPanel(currentProject)

        } else if (event.target.classList.contains('completeBtn')) {
            const getElementList = event.target.closest('li')
            const getTodoID = getElementList.getAttribute("data-id")
            const todoToComplete = currentProject.todosList.find((todo) => todo.ID === getTodoID)
            todoToComplete.changeCompletionStatus()
            currentProject.removeTodoFromProject(todoToComplete)
            saveToStorage(manager)
            renderMainPanel(currentProject)

        } else if(event.target.closest('li')){
            const getElementList = event.target.closest('li')
            const getTodoID = getElementList.getAttribute("data-id")
            todoToEdit = currentProject.todosList.find((todo) => todo.ID === getTodoID)
            title.value = todoToEdit.title
            description.value = todoToEdit.description
            dueDate.value = todoToEdit.dueDate
            priority.value = todoToEdit.priority
            notes.value = todoToEdit.notes
            dialog.showModal()
            // renderMainPanel(projectToDisplay)
        }
    })

    dialog.addEventListener("click", (event) => {
        
        if(event.target.classList.contains('saveBtn')){
            const updatedData = {"title": title.value, "description": description.value, "dueDate": dueDate.value, "priority": priority.value, "notes": notes.value}
            todoToEdit.editTodo(updatedData)
            saveToStorage(manager)
            dialog.close()
            renderMainPanel(currentProject)

        } else if (event.target.classList.contains('closeBtn')){
            dialog.close()
        } 

    })
}