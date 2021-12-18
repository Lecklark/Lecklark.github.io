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
const modalAuthError = modalAuth.querySelector('.modal__error');
const modalLogInError = modalLogIn.querySelector('.modal__error');
console.log(modalAuthError)

//closing of modal windows and reseting inputs
modalCloses.forEach(modalClose => {
    modalClose.addEventListener('click', e => {
        e.preventDefault();
        e.target.parentNode.parentNode.style.display = "none";
        e.target.parentNode.reset();
        modalAuth.style.display = 'none';
        modalLogIn.style.display = 'none';
        modalAuthError.innerHTML = "";
        modalLogInError.innerHTML = '';
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
        .catch((err) => {
            switch (err.code) {
                case "auth/invalid-email":
                    modalLogInError.innerHTML = "Invalid email";
                    break
                case "auth/wrong-password": modalLogInError.innerHTML = "Wrong password";
                    break
                case "auth/user-not-found": modalLogInError.innerHTML = "User not found";
            }
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
            modalAuthError.innerHTML = "";
            formLogIn.reset();
        })
        .catch((err) => {
            console.log(err)
            switch (err.code) {
                case "auth/invalid-email": modalAuthError.innerHTML = "Invalid email";
                    break
                case "auth/weak-password": modalAuthError.innerHTML = "Password should be at least 6 characters";
                    break
                case "auth/email-already-in-use": modalAuthError.innerHTML = "The email address is already taken";
                    break
            }
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