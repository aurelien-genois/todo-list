
// taskPriorities out from factory function for dependency
// let taskPriorities = ['High', 'Medium', 'Low'];
let taskStates = ['Todo', 'WIP', 'Done', 'Abandoned']

// task proto for properties shared by all tasks
const taskProto = {
    taskPriorities: ['High', 'Medium', 'Low'],
    addTaskPriority(newLevel, newPriority) { // !function declaration for This 
        this.taskPriorities.splice(newLevel - 1, 0, newPriority);
    },
    taskStates: ['Done', 'WIP', 'Todo', 'Abandoned'],
    addTaskState(newDegree, newState) {
        this.taskStates.splice(newDegree - 1, 0, newState);
    }
}
// stateDegree : 1 Done, 2 WIP, 3 Todo, 4 Abandoned
// priorityLevel : 1 High, 2 Medium, 3 Low
// ! if a priority or state is added, their number association will change
// ! for keep the level/degree for task already created, need to update their degree if it change
// ! this functionnality not necessary for the todo-list app

// tasks factory function with uniques properties
const task = (title, dueDate, desc = '', priorityLevel = 3) => {
    const proto = {
        taskPriorities: taskProto.taskPriorities,
        taskStates: taskProto.taskStates
    };
    
    const unique = { //every property is unique to instances
        getTitle: () => title,
        setTitle: (newTitle) => title = newTitle,
        
        getDueDate: () => dueDate,
        setDueDate: (newDueDate) => date = newDueDate,
        
        getDesc: () => desc,
        setDesc: (newDesc) => desc = newDesc,
        
        getPriority() { console.log(this.taskPriorities);
            return this.taskPriorities[priorityLevel - 1]},
        setPriority(level) {priorityLevel = level},

        stateDegree: this,
        getState() {console.log(this.taskStates);
            return this.taskStates[this.stateDegree -1]},
        setState(degree) {this.stateDegree = degree}
        
    }
    // let _state = 'Todo';
    // setState: (state) => 

    return Object.assign(Object.create(proto), unique);
}

// const addTaskPriority = (newLevel, newPriority) => {
//     taskPriorities.splice(newLevel - 1, 0, newPriority)
// }

export {
    task,
    taskProto
}