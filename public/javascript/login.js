//async function loginFormHandler(event) {
    loginFormHandler = async function(event){


    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        try{


            const response = await fetch('/api/user/login', {
                method: 'post',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {'Content-Type': 'application/json'}
            });
            console.log(response)
            if (response.ok) {
                console.log("LOGIN WORKED I THINK")
                document.location.replace('/');
            } else {
                let result = await response.json()
                alert(result.message)
            }
        } catch(e) {
            console.log(e)
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);