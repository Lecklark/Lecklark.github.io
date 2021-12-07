
const LogInBtn = document.querySelector('.LogInBtn');
const AuthBtn = document.querySelector('.AuthBtn');
const modalLogIn = document.getElementById('modalLogIn');
const modalAuth = document.getElementById('modalAuth');
const modalCloses = document.querySelectorAll('.modalClose');
const main = document.querySelector('main');

//Открытие и закрытие модальных окон
LogInBtn.addEventListener('click', () => {
    modalLogIn.style.display = "flex";
    modalAuth.style.display = "none";
}
);

AuthBtn.addEventListener('click', () => {
    modalAuth.style.display = "flex";
    modalLogIn.style.display = "none";
}
);

modalCloses.forEach(el => {
    el.addEventListener('click', () => {
        el.parentNode.parentNode.style.display = "none";
    });
});




//Создание нового user'а
const AuthPostBtn = modalAuth.querySelector('#AuthPost');
AuthPostBtn.addEventListener('click', () => {
    const AuthLogin = modalAuth.querySelector('#AuthLogin');
    const AuthPass = modalAuth.querySelector('#AuthPass');
    const email = AuthLogin.value;
    const pass = AuthPass.value;
    auth.createUserWithEmailAndPassword(email, pass)
        .then(cred => {
            modalAuth.style.display = "none";
            db.collection('users').doc(cred.user.uid).set({});
        })
}
)


//Выход из профиля
const LogOutBtn = document.querySelector(".LogOutBtn");
LogOutBtn.addEventListener('click', () => {
    auth.signOut();
})

//Вход в профиль
const LogIn = modalLogIn.querySelector('#LogInPost');
LogIn.addEventListener('click', () => {
    const LogInLogin = modalLogIn.querySelector('#LogInLogin');
    const LogInPass = modalLogIn.querySelector('#LogInPass');
    let email = LogInLogin.value;
    let pass = LogInPass.value;
    auth.signInWithEmailAndPassword(email, pass)
        .then(cred => {
            modalLogIn.style.display = "none";
        })
        .catch(() => {
            console.log('Ошибка')
        })
}
)

//Слушатель изменения аутентификации
auth.onAuthStateChanged(user => {
    if (user) {
        //Доступ к базе данных
        db.collection("users").doc(user.uid).collection('ToDoS').onSnapshot(info => {
            createListOfToDoS(info.docs);
            deleteToDo(user);
        });
        RenderLogIn(user);
        CreateToDo(user);
    } else {
        console.log('user not logged')
        RenderLogOut();
    }
})

//Преобразование img в background
const ibgs = document.querySelectorAll('.ibg')
ibgs.forEach(ibg => {
    const img = ibg.querySelector('img');
    ibg.style.backgroundImage = `url(${img.src})`;
})

