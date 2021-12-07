const ToDoList = document.querySelector('.todo__list');
const ToDoAdd = document.querySelector('.todo__add');
const headerEmail = document.querySelector('.header__email')

//Отрисовка списка ToDoS
const createListOfToDoS = (items) => {
    ToDoList.innerHTML = "";
    items.forEach(item => {
        console.log(item.id)
        const ToDo = document.createElement('div');
        ToDo.classList.add('todo__punkt');
        ToDo.id = item.id;
        ToDo.innerHTML = `<div class="todo__title">${item.data().Title}</div>
        <div class="todo__text">${item.data().Text}</div>
        <button>Done</button>
        <button class="DelToDoBtn" id=${item.id}>Delete</button>`;
        ToDoList.append(ToDo);
    })
}

//Отрисовка при LogIn
const RenderLogIn = (user) => {
    LogInBtn.style.display = "none";
    AuthBtn.style.display = "none";
    LogOutBtn.style.display = "inline";
    headerEmail.innerText = `${user.email}`
    ToDoAdd.innerHTML = `<div>Enter title of ToDo</div>
    <input type="text" id="ToDoTitle">
    <div>Enter text of ToDo</div>
    <input type="text" id="ToDoText">
    <button id="CreateToDoBtn">Create ToDo</button>`;
}



//Удаление отрисовки при LogOut
const RenderLogOut = () => {
    LogInBtn.style.display = "inline";
    AuthBtn.style.display = "inline";
    LogOutBtn.style.display = "none"
    ToDoList.innerHTML = "";
    ToDoAdd.innerHTML = "";
    headerEmail.innerText = "";
}

//Добавление ToDoшки
const CreateToDo = (user) => {
    const CreateToDoBtn = ToDoAdd.querySelector('#CreateToDoBtn');
    CreateToDoBtn.addEventListener('click', () => {
        const Title = ToDoAdd.querySelector('#ToDoTitle').value;
        const Text = ToDoAdd.querySelector('#ToDoText').value;
        db.collection('users').doc(user.uid).collection('ToDoS').add({
            Title,
            Text
        })
    })
}

//Удаление ToDoшки
const deleteToDo = (user) => {
    const DelToDoBtns = document.querySelectorAll('.DelToDoBtn')
    console.log(DelToDoBtns)
    DelToDoBtns.forEach(DelToDoBtn => {
        console.log(DelToDoBtn)
        DelToDoBtn.addEventListener('click', (e) => {
            const ToDoId = e.target.id;
            db.collection("users").doc(user.uid).collection('ToDoS').doc(ToDoId).delete()
        })
    })
}

