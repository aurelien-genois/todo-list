import { project } from "./projects-class";

// tasks factory
const task = (title, dueDate, priorityLevel, desc, projectId) => {;
    let stateDegree = 3;
    const proto = {
        getTitle: () => title,
        setTitle: (newTitle) => title = newTitle,
        
        getDueDate: () => dueDate,
        setDueDate: (newDueDate) => dueDate = newDueDate,
        
        getDesc: () => desc,
        setDesc: (newDesc) => desc = newDesc,

        getProjectId: () => projectId,
        setProjectId : (newProjectId) => projectId = newProjectId, // task can change project
        
        taskPriorities: ['High', 'Medium', 'Low'],
        getPriority() {return this.taskPriorities[priorityLevel - 1]},
        setPriority(level) {priorityLevel = level},

        taskStates: ['Done', 'WIP', 'Todo', 'Abandoned'],
        getState() {return this.taskStates[this.stateDegree -1]},
        setState(newDegree) {this.stateDegree = newDegree}
        
    }
    return Object.assign(Object.create(proto), {stateDegree});
}
// (NTH task can have a checklist, with items)

export {
    task
}