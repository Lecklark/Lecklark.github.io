const logOutBtn = document.querySelector('.header__logoutbtn');
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const enterScreen = document.querySelector('.mainscreen');
const logInBtn = document.querySelector('.mainscreen__loginbtn');
const modalLogIn = document.querySelector('#modalLogIn');
const modalAuth = document.querySelector('#modalAuth');
const modalCloses = document.querySelectorAll('.modal__close');
const authLinkBtn = modalLogIn.querySelector('.modal__authlink');
const enterAccountBtn = modalLogIn.querySelector('#enterAccountBtn');
const formLogIn = modalLogIn.querySelector('form');
const formAuth = modalAuth.querySelector('form');

//closing of modal windows and reseting inputs
modalCloses.forEach(modalClose => {
    modalClose.addEventListener('click', e => {
        e.preventDefault();
        e.target.parentNode.parentNode.style.display = "none";
        e.target.parentNode.reset();
        modalAuth.style.display = 'none';
        modalLogIn.style.display = 'none';
        formLogIn.reset();
        formAuth.reset();
    })
})

//listener on LogOutBtn
logOutBtn.addEventListener('click', () => {
    auth.signOut();
})


//listener on LogInBtn
logInBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalLogIn.style.display = "flex";
})

//listener on AuthLinkBtn
authLinkBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalAuth.style.display = "flex";
    modalLogIn.style.display = "none";
})

//LogIn in account
formLogIn.addEventListener('submit', (e) => {
    e.preventDefault();
    const userEmail = modalLogIn.querySelector('#LogInLogin').value;
    const userPass = modalLogIn.querySelector('#LogInPass').value;
    auth.signInWithEmailAndPassword(userEmail, userPass)
        .then(() => {
            modalLogIn.style.display = 'none';
            formLogIn.reset();
        })
})

//creating new user
formAuth.addEventListener('submit', e => {
    e.preventDefault();
    const newUserEmail = modalAuth.querySelector('#AuthLogin').value;
    const newUserPass = modalAuth.querySelector('#AuthPass').value;
    auth.createUserWithEmailAndPassword(newUserEmail, newUserPass)
        .then((info) => {
            let categories = [];
            categoriesItems.forEach(categoriesItem => {
                categories.push(categoriesItem.id);
            });
            categories.forEach(catItem => {
                db.collection("users").doc(info.user.uid).collection(catItem).doc('on_hold').set({});
                db.collection("users").doc(info.user.uid).collection(catItem).doc('done').set({});
            })
            modalAuth.style.display = 'none';
            formLogIn.reset();
        })
})

//listener of auth changing
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('logged in')
        renderUserLoggedIn(user);
        renderListOfToDos();
        renderCategories();
    } else {
        console.log('logged out')
        renderUserLoggedOut();
    }
})