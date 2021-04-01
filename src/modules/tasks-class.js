import { format } from "date-fns";

// tasks factory
const task = (title, dueDate, priorityLevel, desc, projectId) => {
  // private arrays
  // these values are fixed so an id is necessary to accessed them
  const _taskPriorities = ["High", "Medium", "Low"];
  const _taskStates = ["Done", "WIP", "Todo", "Abandoned"];
  // public values important for localStorage
  let thisTitle = title;
  let thisDueDate = dueDate;
  let thisPriorityLevel = priorityLevel;
  let thisDesc = desc;
  let thisTaskProjectId = projectId;
  let stateDegree = 2;
  const proto = {
    // use this in regular function, not arrow functions in which this is lexically bound
    getTitle() {
      return this.thisTitle;
    },
    setTitle(newTitle) {
      this.thisTitle = newTitle;
    },

    getDueDate() {
      return this.thisDueDate;
    },
    getDueDateFormat() {
      return format(thisDueDate, "dd/MM/yyyy");
    },
    setDueDate(newDueDate) {
      this.thisDueDate = newDueDate;
    },

    getDesc() {
      return this.thisDesc;
    },
    setDesc(newDesc) {
      this.thisDesc = newDesc;
    },

    getProjectId() {
      return this.thisTaskProjectId;
    },
    setProjectId(newProjectId) {
      this.thisTaskProjectId = newProjectId;
    }, // task can change project

    getPriority() {
      return _taskPriorities[this.thisPriorityLevel - 1];
    },
    setPriority(level) {
      this.thisPriorityLevel = level;
    },

    getState() {
      return _taskStates[this.stateDegree];
    },
    setState(newDegree) {
      this.stateDegree = newDegree;
    },
  };
  return Object.assign(Object.create(proto), {
    thisTitle,
    thisDueDate,
    thisPriorityLevel,
    thisDesc,
    thisTaskProjectId,
    stateDegree,
  });
};
// (NTH task can have a checklist, with items)

export { task };
