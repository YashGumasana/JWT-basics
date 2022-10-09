console.log('browser-app.js');
let userName = document.getElementById('username');
let passWord = document.getElementById('password');
const resultDOM = document.querySelector('.result')
const alertBox = document.querySelector('.form-alert');
let subBtn = document.getElementById('subBtn');
let getData = document.querySelector('#data');
let tokenVisibility = document.querySelector('.token');
localStorage.removeItem('token');

subBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const username = userName.value;
    const password = passWord.value;


    try {
        if (username && password) {

            const { data } = await axios.post("/app/v1/login", { username, password });

            localStorage.setItem('token', data.token);

            userName.value = "";
            passWord.value = "";
            alertBox.style.display = 'block';
            alertBox.textContent = `User added`;
            alertBox.classList.add('text-success');
            tokenVisibility.textContent = 'Token available'
            tokenVisibility.classList.add('text-success');

        }
        else {
            localStorage.removeItem('token');

            alertBox.style.display = 'block';
            alertBox.textContent = `Enter valid username or password`;
            tokenVisibility.textContent = 'no token present'
            tokenVisibility.classList.remove('text-success');
        }
    }
    catch (error) {
        console.log(error);
    }
    setTimeout(() => {
        alertBox.style.display = 'none';
        alertBox.classList.remove('text-success');
    }, 1000);
    resultDOM.innerHTML = '';

});


getData.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('kalik');
    let token = localStorage.getItem('token')


    try {
        if (token) {
            const yourData = await axios.get('/app/v1/dashboard', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            resultDOM.innerHTML = `<h5>${yourData.data.msg}</h5><p>${yourData.data.secret}</p>`;
        }
        else {
            resultDOM.innerHTML = `<h5>you have no access</h5>`;
        }

    } catch (error) {
        console.log(error);
    }

});