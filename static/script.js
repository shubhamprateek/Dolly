const form = document.getElementById("string-form");
const inputField = document.getElementById("input-field");
const refreshButton = document.getElementById('refresh-button');
const collibraButton = document.getElementById('collibra-button');
const clearButton = document.getElementById('clear-button');

const resultTextarea = document.getElementById('result');

// Add an event listener to the "Submit" button
//const submitButton = document.getElementById("submit-button");

document.addEventListener("DOMContentLoaded", function() {
    var submitButton = document.getElementById('submit-button');
    var updateButton = document.getElementById('update-button');
    submitButton.addEventListener('click', handleFormSubmission);
    updateButton.addEventListener('click', handleFormSubmission);
});



function handleFormSubmission(event) {
    event.preventDefault(); // Prevent form submission

    var submitButton = document.getElementById('submit-button');
    var processingAnimation = document.getElementById('processing-animation');

    submitButton.classList.add('hide');
    processingAnimation.classList.remove('hide');
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
            //alert('Prompt submitted.');
        } else {
        // Display an error message if the request was unsuccessful
            alert('Error submitting prompt. Please try again.');
        }
    })
    .catch(error => console.error(error));
    // Simulating a delay for the processing animation (replace with actual processing logic)
    setTimeout(function() {
        hideLoader();
        showSubmitButton();
        setTimeout(function() {
            refreshButton.click(); // Trigger click event for refresh button
        }, 0);
    }, 2000);
}

function hideLoader() {
    var processingAnimation = document.getElementById('processing-animation');
    processingAnimation.classList.add('hide');
}

function showSubmitButton() {
    var submitButton = document.getElementById('submit-button');
    submitButton.classList.remove('hide');
}


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

// Add an event listener to the "Collibra" button


collibraButton.addEventListener('click', () => {
    fetch('/collibra_insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // add any data you want to send with the request here
        })
    })
        .then(response => response.json())
        .then(data => {
            // display the response as an alert
            alert(JSON.stringify(data));
            // set the response as the text content of the result textarea
            resultTextarea.textContent = JSON.stringify(data);
        })
        .catch(error => console.error(error));
});

//clearButton.addEventListener('click', () => {
//    fetch('/delete_output', {
//        method: 'GET',
//        headers: {
//            'Content-Type': 'application/json'
//        },
//        body: JSON.stringify({
//            // add any data you want to send with the request here
//        })
//    })
//        .then(response => response.json())
//        .then(data => {
//            // display the response as an alert
//            alert(JSON.stringify(data));
//            // set the response as the text content of the result textarea
//            resultTextarea.textContent = "";
//            inputField.value = "";
//        })
//        .catch(error => console.error(error));
//});
//
