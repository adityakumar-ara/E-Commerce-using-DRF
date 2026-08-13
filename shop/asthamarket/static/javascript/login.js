document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
            const emailValue = document.getElementById('email').value;
            const passwordValue = document.getElementById('password').value;

            const userData = {
                email: emailValue,
                password: passwordValue,
            };

            try {
                const response = await fetch('/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
                    },
                    body: JSON.stringify(userData)
                });

                const result = await response.json();

                if (response.ok) {
                    alert(result.message);
                    // Small delay to ensure session is saved, then redirect
                    setTimeout(() => {
                        window.location.href = '/'; 
                    }, 500);
                } else {
                    alert(result.error);
                }
            } catch (error) {
                console.error("Error logging in:", error);
                alert("Could not connect to the server. Please try again.");
            }
        });
    }
});