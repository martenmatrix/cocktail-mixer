const task = {
  task: 'Idle'
}

function setTask(newTask) {
  task.task = newTask;
}
  
function getTask() {
  return task.task;
}
  
module.exports.getTask = getTask;
module.exports.setTask = setTask;