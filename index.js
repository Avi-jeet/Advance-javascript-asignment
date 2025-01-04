let taskCount = 0;
  let completedCount = 0;
  let pendingCount = 0;

  const totalElement = document.getElementById("total");
  const completedElement = document.getElementById("completed");
  const pendingElement = document.getElementById("pending");
  const taskInput = document.getElementById("task");
  const taskTable = document.getElementById("taskTable");
  const addTaskButton = document.getElementById("addTask");

  // Function to update the statistics
  function updateStats() {
    totalElement.textContent = taskCount;
    completedElement.textContent = completedCount;
    pendingElement.textContent = pendingCount;
  }

  // Function to add a new task
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    taskCount++;
    pendingCount++;
    updateStats();

    const date = new Date().toLocaleString();

    // Create table row for the task
    const row = document.createElement("tr");

    // Number
    const numCell = document.createElement("td");
    numCell.className = "px-4 py-2";
    numCell.textContent = taskCount;

    // Task
    const taskCell = document.createElement("td");
    taskCell.className = "px-4 py-2";
    taskCell.textContent = taskText;

    // Date
    const dateCell = document.createElement("td");
    dateCell.className = "px-4 py-2";
    dateCell.textContent = date;

    // Status
    const statusCell = document.createElement("td");
    statusCell.className = "px-4 py-2";
    const statusButton = document.createElement("button");
    statusButton.textContent = "Success";
    statusButton.className =
      "bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600";
    statusButton.addEventListener("click", () => {
      if (statusButton.textContent === "Success") {
        statusButton.textContent = "Completed";
        statusButton.className =
          "bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600";
        completedCount++;
        pendingCount--;
      } else {
        statusButton.textContent = "Pending";
        statusButton.className =
          "bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600";
        completedCount--;
        pendingCount++;
      }
      updateStats();
    });
    statusCell.appendChild(statusButton);

    // Delete
    const deleteCell = document.createElement("td");
    deleteCell.className = "px-4 py-2";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className =
      "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600";
    deleteButton.addEventListener("click", () => {
      row.remove();
      taskCount--;
      if (statusButton.textContent === "Completed") {
        completedCount--;
      } else {
        pendingCount--;
      }
      updateStats();
    });
    deleteCell.appendChild(deleteButton);

    //edit
    const editCell = document.createElement("td");
      editCell.className = "px-4 py-2";
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className =
        "bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600";
      editButton.addEventListener("click", () => {
        if (editButton.textContent === "Edit") {
          const input = document.createElement("input");
          input.type = "text";
          input.value = taskCell.textContent;
          input.className =
            "border border-gray-300 rounded-lg px-2 py-1 focus:ring focus:ring-blue-300 w-full";
          taskCell.textContent = "";
          taskCell.appendChild(input);
          editButton.textContent = "Save";
        } else {
          const input = taskCell.querySelector("input");
          if (input) {
            taskCell.textContent = input.value.trim();
            editButton.textContent = "Edit";
          }
        }
      });
      editCell.appendChild(editButton);


    // Append cells to row
    row.appendChild(numCell);
    row.appendChild(taskCell);
    row.appendChild(dateCell);
    row.appendChild(statusCell);
    row.appendChild(deleteCell);
    row.appendChild(editCell);

    // Append row to table
    taskTable.appendChild(row);

    // Clear the input field
    taskInput.value = "";
  }

  // Event listener for the add button
  addTaskButton.addEventListener("click", addTask);

  // Add task on pressing Enter key
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });

