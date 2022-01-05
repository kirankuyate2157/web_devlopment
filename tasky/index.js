const taskContainer = document.querySelector(".task_Container");
// console.log(taskContainer);
const newCard = ({
  id,
  imageUrl,
  taskTitle,
  taskType,
  taskDescription,
}) => `<div class="col-md-6 col-lg-4 id=${id}">
<div class="card m-lg-1">
    <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success"><i
                class="fas fa-pencil-alt"></i></button>
        <button type="button" class="btn btn-outline-danger"><i
                class="fas fa-trash-alt"></i></button>

    </div>
    <img src=${imageUrl}
        class="card-img-top p-2" alt="card img">
    <div class="card-body">
        <h5 class="card-title">${taskTitle}</h5>
        <p class="card-text">${taskDescription}
        </p>
        <span class="badge bg-primary mb-2">${taskType}</span></h </div>
        <div class="card-footer text-muted ">
            <button type="button" class="btn btn-outline-primary float-end rounded-pill">Open
                Task</button>
        </div>

    </div>
</div>`;
const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`, //unique number for card id ( millisecond seconds)
    imageUrl: document.getElementById("imageUrl").value,
    taskTitle: document.getElementById("taskTitle").value,
    taskType: document.getElementById("taskType").value,
    taskDescription: document.getElementById("taskDescription").value,
  };
  console.log("image link  ")
  console.log(taskData.imageUrl);
  const createNewCard = newCard(taskData);
  taskContainer.insertAdjacentHTML("beforeend", createNewCard);
};
