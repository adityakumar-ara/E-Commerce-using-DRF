const userform = document.querySelector('#signupForm')

userform.addEventListener('submit', async (e) => {
   e.preventDefault();
   const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
   const nameValue = document.getElementById('name').value;
   const emailValue = document.getElementById('email').value;
   const passwordValue = document.getElementById('password').value;

//    Data ko ek JavaScript Object mein pack karna

   const userData = {
    name : nameValue,
    email : emailValue,
    password : passwordValue,
   }

   try{
    const response = await fetch('/signup/', {
    method: 'POST',
    headers : {
        'Content-Type':'application/json',
        'X-CSRFToken': csrfToken
    },
    body: JSON.stringify(userData) // JS Object ko pure JSON text mein convert kiya
   });
   
        const result = await response.json()
        console.log(response);
        if(response.ok){
            alert(result.message);
            userform.reset();
            // window.location.href = '/login.html'; // Chaho toh login page par bhej do
         }
        else {
            alert(result.error); 
         }


    }catch (error) {
        console.error("Error signing up:", error);
        alert("Server se connect nahi ho paya. Please try again.");
    }
});