// login.js

console.log('login js loaded ')

document.addEventListener('DOMContentLoaded', () => {
    
    const loginForm = document.getElementById('login-form');
    // Get the error message box elements
    // const errorBox = document.getElementById('error-message-box');
    // const errorText = document.getElementById('error-text');

    // // Helper function to show an error message
    // function show_error(message) {
    //     errorText.textContent = message;
    //     errorBox.classList.remove('hidden');
    // }

    // // Helper function to hide the error message
    // function hide_error() {
    //     errorText.textContent = '';
    //     errorBox.classList.add('hidden');
    // }

    if (loginForm) {
        // Hide the error message when the user starts typing again
        // loginForm.addEventListener('input', hide_error);

        loginForm.addEventListener('submit', async (event) => {
            // event.preventDefault();
            // hide_error(); // Hide previous errors

            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());

            // URL for your Django login endpoint
            const url = 'http://127.0.0.1:8000/users/login';
            console.log('url', url)

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok) {
                    // Assuming the server returns access/refresh tokens
                    console.log('Login successful:', result);
                    
                    // Store tokens in localStorage for future API requests
                    localStorage.setItem('accessToken', result.access);
                    localStorage.setItem('refreshToken', result.refresh);

                    // Redirect to the dashboard
                    window.location.href = 'dashboard.html';
                } else {
                    // Handle login errors (e.g., "Invalid credentials")
                    // show_error(result.detail || 'Invalid email or password.');
                    console.log('error !!!!! ')
                }
            } catch (error) {
                // Handle network/CORS errors
                console.error('A network or CORS error occurred:', error);
                // show_error('Cannot connect to the server. Please try again later.');
            }
        });
    }
});
