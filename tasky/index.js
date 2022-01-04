const saveChanges = () => {
    const taskData={
        id:`${Date.now()}`,//unique number for card id ( milli seconds)
        imageUrl:document.getElementById("imageUrl").value,
        taskTitle:document.getElementById("taskTitle").value,
        taskType:document.getElementById("taskType").value,
        taskDescription:document.getElementById("taskDescription").value,
    };
    console.log(taskData);
};
