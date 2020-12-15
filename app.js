// Getting all required elements
const input_box = document.querySelector(".input_Field input");
const add_btn = document.querySelector(".input_Field button");
const todo_list = document.querySelector(".todo_list");
const delete_all_btn = document.querySelector(".footer button")

input_box.onkeyup = () => {
  let userData = input_box.value; // Getting user enterd value
  if (userData.trim() != 0) {
    // if user values arent only spaces
    add_btn.classList.add("active"); // active the add button
  } else {
    add_btn.classList.remove("active"); // unactive the add button
  }
};

show_tasks(); // calling showtasks()

// If user click on the add button
add_btn.onclick = () => {
  let user_data = input_box.value;
  let get_local_storage = localStorage.getItem("new todo"); // getting local_storage
  if (get_local_storage == null) {
    list_Arr = []; // Creating blank array
  } else {
    list_Arr = JSON.parse(get_local_storage); // transforming json into JS object
  }
  list_Arr.push(user_data); // pushing or adding user data
  localStorage.setItem("new todo", JSON.stringify(list_Arr)); // transforming js object into json stringify
  show_tasks(); // calling showtasks()
};

// function to add task list inside ul
function show_tasks() {
  let get_local_storage = localStorage.getItem("new todo"); // getting local_storage
  if (get_local_storage == null) {
    list_Arr = []; // Creating blank array
  } else {
    list_Arr = JSON.parse(get_local_storage); // transforming json into JS object
  }
  const pending_number = document.querySelector('.pending_number')
  if(list_Arr.length > 0){
    delete_all_btn.classList.add("active")
  }else {
    delete_all_btn.classList.remove("active")
  }
  pending_number.textContent = list_Arr.length;
  let new_list_tag = "";
  list_Arr.forEach((element, index) => {
    new_list_tag += `<li>${element} <span onclick="delete_task('${index}')"><i class="fas fa-trash"></i></span></li>`;
  });
  todo_list.innerHTML = new_list_tag; // adding new li tag
  input_box.value = "";
}

// delete task function
function delete_task(index) {
    let get_local_storage = localStorage.getItem("new todo");
    list_Arr = JSON.parse(get_local_storage);
    list_Arr.splice(index, 1) // delete or remove the task

    // After removing
    localStorage.setItem("new todo", JSON.stringify(list_Arr));
    show_tasks();
}

// delete whole tasks
delete_all_btn.onclick = () => {
    list_Arr = []; //empty an array
    // After removing all things
    localStorage.setItem("new todo", JSON.stringify(list_Arr));
    show_tasks();
}