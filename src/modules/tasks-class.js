import { format} from 'date-fns'

// tasks factory
const task = (title, dueDate, priorityLevel, desc, projectId) => {;
    // //private arrays
    // these values are fixed so an id is necessary to accessed them
    const _taskPriorities =  ['High', 'Medium', 'Low'];
    const _taskStates = ['Done', 'WIP', 'Todo', 'Abandoned'];
    // public values important for localStorage
    let thisTitle = title;
    let thisDueDate = dueDate;
    let thisPriorityLevel = priorityLevel;
    let thisDesc = desc;
    let thisTaskProjectId = projectId
    let stateDegree = 2;
    const proto = {
        getTitle: () => thisTitle,
        setTitle: (newTitle) => thisTitle = newTitle,
        
        getDueDate: () => thisDueDate,
        getDueDateFormat: () =>  format(thisDueDate, 'dd/MM/yyyy'),
        setDueDate: (newDueDate) => thisDueDate = newDueDate,
        
        getDesc: () => thisDesc,
        setDesc: (newDesc) => thisDesc = newDesc,

        getProjectId: () => thisTaskProjectId,
        setProjectId : (newProjectId) => thisTaskProjectId = newProjectId, // task can change project
        
        getPriority() {return _taskPriorities[thisPriorityLevel - 1]},
        setPriority(level) {thisPriorityLevel = level},

        getState() {return _taskStates[this.stateDegree]},
        setState(newDegree) {this.stateDegree = newDegree}
        
    }
    return Object.assign(Object.create(proto), {stateDegree, thisTitle, thisDueDate, thisPriorityLevel, thisDesc, thisTaskProjectId, stateDegree});
}
// (NTH task can have a checklist, with items)

export {
    task
}