const headerEmail = header.querySelector('.header__email');
const categoriesItems = document.querySelectorAll('.categories__item');
const OnHold = document.querySelector('.on-hold');
const listOfToDoOnHold = OnHold.querySelector('.todo__list');
const countOfTasks = document.querySelector('.main-up__count');
const choosedCategory = document.querySelector('.main-up__category');
const onHoldTitle = document.querySelector('.on-hold__title');
const completedTitle = document.querySelector('.completed__title');
const listOfToDoCompleted = document.querySelector('.todo__list_completed');
const addNewToDoForm = document.querySelector('.main-up__form');


//Usege of Categories
function renderCategories() {
    categoriesItems.forEach(categoriesItem => {
        user = auth.currentUser;
        db.collection("users").doc(user.uid).collection(categoriesItem.id).doc('on_hold').collection('ToDoS').onSnapshot(items => {
            if (items.size > 0) {
                categoriesItem.querySelector('.categories__count').style.display = "block"
                categoriesItem.querySelector('.categories__count').innerHTML = items.size;
            }
            else {
                categoriesItem.querySelector('.categories__count').style.display = "none";
            }
        });
        categoriesItem.addEventListener('click', () => {
            for (let i = 0; i < categoriesItems.length; i++) {
                categoriesItems[i].classList.remove('active');
            }
            completedTitle.style.display = 'none';
            onHoldTitle.style.display = 'none';
            categoriesItem.classList.toggle('active');
            const user = auth.currentUser;
            renderListOfToDos();
        })
    })
}



//Rendering of Log In
function renderUserLoggedIn(user) {
    enterScreen.style.display = "none";
    header.style.display = "block";
    main.style.display = "block";
    headerEmail.innerText = user.email;
};

//Rendering of Log Out
function renderUserLoggedOut() {
    enterScreen.style.display = "block";
    header.style.display = "none";
    main.style.display = "none";
    headerEmail.innerText = "";
};

//Rendering of ToDo Lists of On-hold and Completed
function renderListOfToDos() {
    listOfToDoOnHold.innerHTML = "";
    listOfToDoCompleted.innerHTML = "";
    category = DetectCategory();
    const user = auth.currentUser;
    ShortPath('on_hold').onSnapshot(items => {
        if (items.size > 0) {
            listOfToDoOnHold.innerHTML = "";
            countOfTasks.innerHTML = `${items.size} task`
            choosedCategory.innerHTML = `${category}`;
            onHoldTitle.style.display = 'block';
            items.forEach(item => {
                const toDoItem = document.createElement("div");
                toDoItem.classList.add('todo__item');
                toDoItem.innerHTML = `<div class="todo__title">${item.data().Title}</div>
                        <div class="todo__btns">
                            <button class="todo__donebtn" onclick="DoneToDo(this.id)" id=${item.id}>Done</button>
                            <button class="todo__delbtn" onclick="DeleteToDo(this.id)" id="${item.id}">Delete</button>
                        </div>`;
                listOfToDoOnHold.appendChild(toDoItem);
            })
        } else {
            onHoldTitle.style.display = 'none';
            listOfToDoOnHold.innerHTML = "";
            countOfTasks.innerHTML = `not any task`
            choosedCategory.innerHTML = `${category}`;
        }
    });
    ShortPath('done').onSnapshot(items => {
        if (items.size > 0) {
            listOfToDoCompleted.innerHTML = "";
            completedTitle.style.display = 'block';
            items.forEach(item => {
                const toDoItem = document.createElement("div");
                toDoItem.classList.add('todo__item');
                toDoItem.innerHTML = `<div class="todo__title">${item.data().Title}</div>
                        <div class="todo__btns">
                            <button class="todo__delbtn" onclick="DeleteCompletedToDo(this.id)"  id="${item.id}">Delete</button>
                        </div>`;
                listOfToDoCompleted.appendChild(toDoItem);
            })
        } else {
            completedTitle.style.display = 'none';
            listOfToDoCompleted.innerHTML = "";
        }
    });
}


//Creating of new ToDo
addNewToDoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const ToDoTitle = addNewToDoForm.querySelector('.main-up__input').value;
    ShortPath('on_hold').add({
        Title: ToDoTitle,
    })
    addNewToDoForm.reset();
})

//Deleting of ToDo
function DeleteToDo(id) {
    ShortPath('on_hold').doc(id).delete();
}

function DeleteCompletedToDo(id) {
    ShortPath('done').doc(id).delete();
}

//Mark ToDo as already done
function DoneToDo(id) {
    ShortPath('on_hold').doc(id).get()
        .then(snapshot => {
            ShortPath('on_hold').doc(id).delete();
            ShortPath('done').add(snapshot.data());
        })

}


//Detection of opened category
function DetectCategory() {
    for (let i = 0; i < categoriesItems.length; i++) {
        if (categoriesItems[i].classList.contains('active')) {
            return category = categoriesItems[i].id;
        }
    }
}

//creating of short path
function ShortPath(str) {
    const user = auth.currentUser;
    const category = DetectCategory();
    return db.collection("users").doc(user.uid).collection(category).doc(str).collection('ToDoS');
}

//img into background
const ibgs = document.querySelectorAll('.ibg')
ibgs.forEach(ibg => {
    const img = ibg.querySelector('img');
    ibg.style.backgroundImage = `url(${img.src})`;
})

//movment of background
let bg = document.querySelector('.mainscreen__bg');
window.addEventListener('mousemove', function (e) {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    bg.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
});