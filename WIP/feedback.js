// Event Listener for user Feedback
document.getElementById('feedbackForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    
    const form = event.target;
    const statusDisplay = document.getElementById('formStatus');

    const endpoint = 'https://formspree.io/f/xdkwgypz';

    statusDisplay.textContent = 'Sending feedback...';
    statusDisplay.style.color = 'black';

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            body: new FormData(form), 
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            statusDisplay.textContent = 'Danke für den feedback';
            statusDisplay.style.color = 'green';
            form.reset();
        } else {
            const data = await response.json();
            console.error('Submission failed:', data);
            
            statusDisplay.textContent = data.error || 'Ein fehler ist aufgetreten';
            statusDisplay.style.color = 'red';
        }
    } catch (error) {
        console.error('Network Error:', error);
        statusDisplay.textContent = 'Verbindung zum server hergestellt';
        statusDisplay.style.color = 'red';
    }
});
