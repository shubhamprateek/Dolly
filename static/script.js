const form = document.getElementById("string-form");
const inputField = document.getElementById("input-field");
const refreshButton = document.getElementById('refresh-button');
const updateButton = document.getElementById('update-button');
const collibraButton = document.getElementById('collibra-button');
const clearButton = document.getElementById('clear-button');
const textArea = document.getElementById('result')
const resultTextarea = document.getElementById('result');

// Add an event listener to the "Submit" button
//const submitButton = document.getElementById("submit-button");

document.addEventListener("DOMContentLoaded", function() {
    var submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', handleFormSubmission);
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

// Add an event listener to the "Update" button
updateButton.addEventListener("click", (event) => {
    event.preventDefault();
    const updatedValue = textArea.value;
    console.log(updatedValue);
    fetch("/update_answer", {
        method: "POST",
        body: JSON.stringify({input: updatedValue}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
      if (response.ok) {
        // Input field value is not cleared if the request was successful
        alert('Answer Updated.');
      } else {
        // Display an error message if the request was unsuccessful
        alert('Error submitting Answer. Please try again.');
      }
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
            //alert(JSON.stringify(data));
            // set the response as the text content of the result textarea
            //resultTextarea.textContent = JSON.stringify(data);
        })
        .catch(error => console.error(error));
});

// Function to close the popup
function closePopup() {
  var popup = document.getElementById("popup");
  popup.classList.add("hidden");
}

// Function to parse CSV data into a JS object
function parseCSV(csvData) {
  var lines = csvData.split("\n");
  var result = [];
  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentLine = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j];
    }

    result.push(obj);
  }

  return result;
}

// Function to display the first 10 rows in a popup
function showData() {
  var data = JSON.parse(localStorage.getItem('uploadedData'));
  var table = document.getElementById("data-table");

  // Clear previous data
  table.innerHTML = "";

  // Create table headers
  var thead = table.createTHead();
  var row = thead.insertRow();
  for (var header in data[0]) {
    var th = document.createElement("th");
    th.textContent = header;
    row.appendChild(th);
  }

  // Create table rows
  for (var i = 0; i < 19; i++) {
    var row = table.insertRow();
    for (var key in data[i]) {
      var cell = row.insertCell();
      cell.textContent = data[i][key];
    }
  }

  // Show the popup
  var popup = document.getElementById("popup");
  popup.classList.remove("hidden");
}

// Event listener for the upload form
document.getElementById("upload-form").addEventListener("submit", function(e) {
  e.preventDefault();

  var fileInput = document.getElementById("file-upload");
  var file = fileInput.files[0];
  var reader = new FileReader();

  reader.onload = function(e) {
    var contents = e.target.result;
    var parsedData = parseCSV(contents);

    localStorage.setItem('uploadedData', JSON.stringify(parsedData));
    alert("Data uploaded successfully!");
  };

  reader.readAsText(file);
});

// Event listener for the show button
document.getElementById("show-button").addEventListener("click", showData);

// Event listener for the close button
document.getElementById("popup").addEventListener("click", function(e) {
  if (e.target.classList.contains("close-button")) {
    closePopup();
  }
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
function handleImageClick() {
    var submitButton = document.getElementById('submit-button');
    var processingAnimation = document.getElementById('processing-animation');
    submitButton.classList.remove('hide');
    processingAnimation.classList.add('hide');
}
