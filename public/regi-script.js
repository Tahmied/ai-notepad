document.querySelector('#signup-form').addEventListener('submit' , async (e) => {
    e.preventDefault()
    const userName = document.querySelector('#username').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    if([userName,email,password].some((e)=>!e)){
        console.log('all fields are required');
        return
    }

    try {
        const response = await fetch(`/api/v1/users/register` , {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({userName,email,password})
        })
        if(response.status !== 200) {
            console.log(`unable to recieve the response from server`)
            return
        }
        const data = await response.json()
        console.log(data)
        setTimeout(()=>{
            document.querySelector('.success-msg').style.display = 'block'
        },1000)
        setTimeout(()=>{
            window.location.href = './login.html'
        },3000)
    } catch (err) {
        console.log(`unable to sign up due to ${err}`);
        document.querySelector('.fail-msg').style.display = 'block'
    }
})