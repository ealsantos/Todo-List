import Todo from './todo.js'
import { Project, ProjectManager } from './projects.js'
import { loadFromStorage, saveToStorage } from './storage.js'
import { renderMainPanel, renderSidebar, setupEventListeners } from './ui.js'
import './styles.css'


let manager
if(localStorage.getItem("ProjectManagerState")){
    manager = loadFromStorage();
} else {
    manager = new ProjectManager()
}

renderSidebar(manager.getProjects())
renderMainPanel(manager.defaultProject)
setupEventListeners(manager)
