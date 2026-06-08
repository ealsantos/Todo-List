


const sidebarList = document.getElementById('sidebar')
const mainPanelList = document.getElementById('mainPanel')

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
    }

    const addBtn = document.createElement('button')
    addBtn.textContent = " + Add a new Project"
    addBtn.classList.add('addProjBtn')
    sidebarList.appendChild(addBtn)
}

export function renderMainPanel(project){
    mainPanelList.innerHTML = ""
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
        newUL.appendChild(newTodoList)
        newTodoList.appendChild(todoName)
    }

    const addBtn = document.createElement('button')
    addBtn.textContent = " + Add a new task"
    addBtn.classList.add('addTodoBtn')
    mainPanelList.appendChild(addBtn)
}

// Listeners

export function setupEventListeners(manager){
    
    sidebarList.addEventListener("click", (event) => {
        const getElementList = event.target.closest('li')
        const getProjectID = getElementList.getAttribute("data-id")
        const getAllProjects = manager.getProjects()
        const projectToDisplay = getAllProjects.find((proj) => proj.ID === getProjectID)
        renderMainPanel(projectToDisplay)
    })
}