document.querySelector('#login-form').addEventListener('submit' , async (e) => {
    e.preventDefault()
    const email = document.querySelector('#email').value 
    const password = document.querySelector('#password').value   
    try {
        const response = await fetch('/api/v1/users/login' , {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({email,password})
        })
        if(!response.ok) {
            console.log(`unable to send data to backend`)
            return
        }
        const data = await response.json()
        console.log(data)
        document.body.style.background = 'black'
    } catch (error) {
        console.log(`unable to login due to ${error}`)
    }
})