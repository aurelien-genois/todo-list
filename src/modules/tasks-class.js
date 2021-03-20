
// tasks factory
const task = (title, dueDate, priorityLevel, desc, projectId) => {;
    // private arrays
    // these values are fixed so an id is necessary to accessed them
    const _taskPriorities =  ['High', 'Medium', 'Low'];
    const _taskStates = ['Done', 'WIP', 'Todo', 'Abandoned'];

    let stateDegree = 2;
    const proto = {
        getTitle: () => title,
        setTitle: (newTitle) => title = newTitle,
        
        getDueDate: () => dueDate,
        setDueDate: (newDueDate) => dueDate = newDueDate,
        
        getDesc: () => desc,
        setDesc: (newDesc) => desc = newDesc,

        getProjectId: () => projectId,
        setProjectId : (newProjectId) => projectId = newProjectId, // task can change project
        
        getPriority() {return _taskPriorities[priorityLevel - 1]},
        setPriority(level) {priorityLevel = level},

        getState() {return _taskStates[this.stateDegree]},
        setState(newDegree) {this.stateDegree = newDegree}
        
    }
    return Object.assign(Object.create(proto), {stateDegree});
}
// (NTH task can have a checklist, with items)

export {
    task
}