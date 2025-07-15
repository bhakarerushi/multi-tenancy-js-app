// script.js

// --- DEBUG CHECKPOINT 1 ---
// This message should appear in your browser's console as soon as the page loads.
// If it doesn't, your script file is not being loaded correctly by the HTML.
console.log("script.js loaded successfully.");

document.addEventListener('DOMContentLoaded', () => {
    
    // --- DEBUG CHECKPOINT 2 ---
    // This message should appear when the HTML document is ready.
    console.log("DOM fully loaded. Looking for the form.");

    const registerForm = document.getElementById('register-form');

    // Check if the form was found
    if (registerForm) {
        // --- DEBUG CHECKPOINT 3 ---
        // This message confirms that the script found your form using its ID.
        // If you don't see this, make sure your <form> tag has exactly id="register-form".
        console.log("Form with id='register-form' found. Attaching event listener.");

        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // --- DEBUG CHECKPOINT 4 ---
            // This message should appear the moment you click the "Sign Up" button.
            // If you see this, the event listener is working correctly.
            console.log("Form submitted. Preventing default page reload.");

            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData.entries());

            console.log("Form data collected:", data);

            if (data.password !== data['confirm-password']) {
                alert("Passwords do not match!");
                return;
            }

            const url = 'http://127.0.0.1:8000/users/register';

            // --- DEBUG CHECKPOINT 5 ---
            // This is the final checkpoint before the network request is sent.
            // If you see this message, the very next thing should be the request in the Network tab.
            console.log("Attempting to send fetch request to:", url);

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                console.log('Response received from server:', response);

                if (response.ok) {
                    const result = await response.json();
                    console.log('Success:', result);
                    alert('Registration successful!');
                    window.location.href = 'index.html';
                } else {
                    const errorData = await response.json();
                    console.error('Error from server:', errorData);
                    let errorMessage = 'Registration failed. Please check the following:\n';
                    for (const field in errorData) {
                        errorMessage += `${field}: ${errorData[field].join(', ')}\n`;
                    }
                    alert(errorMessage);
                }
            } catch (error) {
                // This will catch network errors, like if the server is down or if there's a CORS issue.
                console.error('A network or CORS error occurred:', error);
                alert('A network error occurred. Check the console for details (e.g., CORS policy).');
            }
        });
    } else {
        // --- ERROR MESSAGE ---
        // If the script can't find the form, this error will appear in the console.
        console.error("Error: Could not find the form with id='register-form'. Please check your HTML file.");
    }
});
