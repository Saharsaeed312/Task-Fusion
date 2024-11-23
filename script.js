const tasks = [];
function manageTask() {
    const taskInput = document.getElementById("task");
    const taskValue = taskInput.value.trim();
    if (taskValue) {
        const taskList = document.getElementById("taskList");
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.style.marginRight = "10px";
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                listItem.classList.add("completed");
            } else {
                listItem.classList.remove("completed");
            }
        });
        const taskText = document.createElement("span");
        taskText.textContent = taskValue;
        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        taskList.appendChild(listItem);
        tasks.push({ task: taskValue, time: null, completed: !1 });
        taskInput.value = "";
    } else {
        alert("Please enter a task!");
    }
}
function setTime() {
    const taskTime = document.getElementById("taskTime").value;
    if (!taskTime) {
        alert("Please select a time!");
        return;
    }
    const lastTaskIndex = tasks.length - 1;
    if (lastTaskIndex < 0) {
        alert("No task available to assign time!");
        return;
    }
    tasks[lastTaskIndex].time = taskTime;
    const timeList = document.getElementById("timeList");
    const listItem = document.createElement("li");
    listItem.textContent = `Task: ${tasks[lastTaskIndex].task} - Time: ${taskTime}`;
    timeList.appendChild(listItem);
    const [hours, minutes] = taskTime.split(":");
    const now = new Date();
    const taskDateTime = new Date();
    taskDateTime.setHours(hours, minutes, 0);
    const timeDifference = taskDateTime - now;
    if (timeDifference > 0) {
        setTimeout(() => {
            alert(`Time's up for the task: ${tasks[lastTaskIndex].task}`);
        }, timeDifference);
    } else {
        alert("The selected time is in the past. Please set a future time.");
    }
    document.getElementById("taskTime").value = "";
}
function showConclusion() {
    const summaryDiv = document.getElementById("summary");
    summaryDiv.style.display = "block";
    summaryDiv.innerHTML = "";
    if (tasks.length === 0) {
        summaryDiv.textContent = "No tasks completed today.";
        return;
    }
    const summaryList = document.createElement("ul");
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        const status = task.completed ? "Completed" : "Pending";
        const timeInfo = task.time ? ` at ${task.time}` : " (No time set)";
        listItem.textContent = `${index + 1}. Task: ${task.task} - Status: ${status}${timeInfo}`;
        summaryList.appendChild(listItem);
    });
    summaryDiv.appendChild(summaryList);
}
document.addEventListener("change", (event) => {
    if (event.target.type === "checkbox") {
        const taskIndex = Array.from(document.getElementById("taskList").children).indexOf(event.target.parentElement);
        if (taskIndex > -1) {
            tasks[taskIndex].completed = event.target.checked;
        }
    }
});
