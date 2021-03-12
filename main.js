(()=>{"use strict";const e=(e,t,s="",r=3)=>{const a={getTitle:()=>e,setTitle:t=>e=t,getDueDate:()=>t,setDueDate:e=>t=e,getDesc:()=>s,setDesc:e=>s=e,taskPriorities:["High","Medium","Low"],getPriority(){return this.taskPriorities[r-1]},setPriority(e){r=e},taskStates:["Done","WIP","Todo","Abandoned"],getState(){return this.taskStates[this.stateDegree-1]},setState(e){this.stateDegree=e}};return Object.assign(Object.create(a),{stateDegree:3})},t=(e=>{const t=e.querySelector("#projects-tabs"),s=e.querySelector("#tasks-list"),r=t=>{const r=t.map((t=>{const s=e.createElement("li");return s.classList.add("tasks"),s.textContent=t.getTitle(),s}));for(;s.firstChild;)s.removeChild(s.firstChild);r.map((e=>{s.appendChild(e)}))};return{appendProjectsTabs:s=>{const a=s.map((t=>{const s=e.createElement("li");return s.classList.add("tabs","project-tab"),s.textContent=t.getTitle(),s}));for(a.map(((e,t)=>e.addEventListener("click",(()=>{r(s[t].getTasks())}))));t.firstChild;)t.removeChild(t.firstChild);a.map((e=>{t.appendChild(e)}))},appendTasks:r}})(document),s=(t,s="")=>{let r=[];const a={getTitle:()=>t,setTitle:e=>t=e,getDesc:()=>s,setDesc:e=>s=e,getTasks(){return this.tasks},getTask(e){return this.tasks[e]},createTask(t,s,r,a){this.tasks.push(e(t,s,r,a))},deleteTask(e){const t=r.indexOf(e);r.splice(t,1)}};return Object.assign(Object.create(a),{tasks:r})},r=(()=>{let e=[];return{createProject:(a,c)=>{const o=s(a,c);return e.push(o),t.appendProjectsTabs(r.getProjects()),o},deleteProject:s=>(e.indexOf(s),e.splice(s,1),t.appendProjectsTabs(r.getProjects()),s),getProjects:()=>e}})();r.createProject("One Project","One Proj Desc"),r.getProjects()[0].createTask("1 One Task","DATE","desc",2),r.getProjects()[0].createTask("1 Two Task","DATE","desc",2),r.getProjects()[0].createTask("1 Three Task","DATE","desc",2),r.createProject("Two Project","Two Proj Desc"),r.getProjects()[1].createTask("2 One Task","DATE","desc",2),r.createProject("Three Project","Three Proj Desc"),r.getProjects()[2].createTask("3 One Task","DATE","desc",2),r.getProjects()[2].createTask("3 Two Task","DATE","desc",2),console.log(r.getProjects())})();