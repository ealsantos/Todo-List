export class Project {

    constructor(name){
        this.name = name
        this.todosList = []
        this.ID = crypto.randomUUID()
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

export class ProjectManager {
    constructor(){
        this.projectList = []
        this.defaultProject = new Project('Default')
        this.projectList.push(this.defaultProject)
    }

    createProject(project){
        this.projectList.push(project)
    }

    removeProject(project){
        if (project.ID === this.defaultProject.ID){
            console.log ("You need at least one project")
        } else {
            const projectToRemove = this.projectList.findIndex((myProjects) => project.ID === myProjects.ID )
            this.projectList.splice(projectToRemove, 1)
        }
    }

    getProjects(){
        return this.projectList
    }
}