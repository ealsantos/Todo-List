import Todo from './todo.js'
import { Project, ProjectManager } from './projects.js'
import { loadFromStorage, saveToStorage } from './storage.js'

let manager
if(localStorage.getItem("ProjectManagerState")){
    manager = loadFromStorage();
} else {
    manager = new ProjectManager()
}

// TESTS
console.log("TESTS BELOW:")

// create some data
const project1 = new Project('Work')
manager.createProject(project1)

// save manually
saveToStorage(manager)

// check localStorage in DevTools Application tab
console.log('Saved to localStorage:', localStorage.getItem('ProjectManagerState'))

/* // const manager = new ProjectManager()
console.log('Initial state:', manager.getProjects())

// Test adding a project
const project1 = new Project('Work')
manager.createProject(project1)
console.log('After adding Work project:', manager.getProjects())

// Test adding a todo - you write this part
const todo1 = new Todo('Test')
project1.addTodoToProject(todo1)
console.log('After adding Work project:', project1.getTodos())

const todo2 = new Todo('Test2')
project1.addTodoToProject(todo2)
console.log('After adding Teste2 project:', project1.getTodos())

// Test removing a todo - you write this part
project1.removeTodoFromProject(todo2)
console.log('After removing Teste2 project:', project1.getTodos())

// Test editing a todo - you write this part
const todo3 = {title: "Emanuel Edit"}
todo1.editTodo(todo3)
console.log('After editing Todo1:', project1.getTodos())

// Test completing a todo - you write this part
todo1.changeCompletionStatus()
console.log('After Completion Status', project1.getTodos())

// Test removing a project - you write this part
manager.removeProject(project1)
console.log('After removing project:', manager.getProjects())

// Test removing default project - you write this part
manager.removeProject(manager.defaultProject)
console.log('After removing default project:', manager.getProjects())
*/
