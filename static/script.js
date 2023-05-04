const form = document.getElementById("string-form");
const inputField = document.getElementById("input-field");
const refreshButton = document.getElementById('refresh-button');
const resultTextarea = document.getElementById('result');

// Add an event listener to the "Submit" button

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputValue = inputField.value;
    fetch("/submit_prompt", {
        method: "POST",
        body: JSON.stringify({input: inputValue}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
      if (response.ok) {
        // Input field value is not cleared if the request was successful
        alert('Prompt submitted.');
      } else {
        // Display an error message if the request was unsuccessful
        alert('Error submitting prompt. Please try again.');
      }
    })
    .catch(error => console.error(error));
});



// Add an event listener to the "Refresh" button
refreshButton.addEventListener('click', () => {
  // Fetch the "refresh_output" API endpoint
  console.log('pressed')
  fetch('/refresh_output')
    .then(response => response.text())
    .then(result => {
      // Populate the result in the textarea
      resultTextarea.value = result;
    })
    .catch(error => console.error(error));
});

