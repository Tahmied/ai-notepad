document.querySelector('.registration-form').addEventListener('submit' , async (e)=>{
    e.preventDefault()
    const userName = document.querySelector('#username').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const successMsg = document.querySelector('.success-msg')

    if ([userName, email, password].some(e => !e)) {
        prompt('all fields are required')
        return
    }

    try {
        const response =  await fetch('/api/v1/users/register' , {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify({userName,email,password})
        })
        const data = await response.json()
        if(data.statusCode !== 200) {
            console.log('unable to send request')
        }
        console.log(data);
        successMsg.style.display = 'block'
    } catch (err) {
        console.log(err)
    }
})