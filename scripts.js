document.addEventListener('DOMContentLoaded', function () {
  questionId = getQuestionId();
  addQidToForm(questionId);
  fetchQuestion(questionId);
});

document.getElementById('questionForm').addEventListener('submit', function (e) {
  e.preventDefault();
  revealAnswer();

  // Retrieve the form data
  const answer = document.getElementById('largeTextArea').value;
  const qid = getQuestionId();

  if (qid && answer) {
      // Create a data object to send as JSON
      const data = {
          qid: qid,
          answer: answer
      };

      // Make a POST request to your Google Apps Script endpoint
      fetch('https://script.google.com/macros/s/AKfycbyypCSdK_tRxkjtPeoNhYonCelIOUE6o1LNUnvCjFg_Kc7389TJhuoQBkCK_698I9RMyQ/exec', {
          method: 'POST',
          headers: {
              'Content-Type': 'text/plain'
          },
          body: JSON.stringify(data)
      })
          .then(function (response) {
              console.log(response)
              return response.text();
          })
          .then(function (responseText) {
              console.log('Response:', responseText);
              // You can handle the response as needed here
          })
          .catch(function (error) {
              console.error('Error:', error);
              // Handle errors here
          });
  } else {
      console.log('qid and/or answer is missing.');
  }
});

// Functions

function getQuestionId() {
  // Extract the "questionId" parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const questionId = urlParams.get('questionId');
  return questionId;
}

function fetchQuestion(questionId) {
  const apiUrl = `https://script.google.com/macros/s/AKfycbyypCSdK_tRxkjtPeoNhYonCelIOUE6o1LNUnvCjFg_Kc7389TJhuoQBkCK_698I9RMyQ/exec?sheetName=FRQ&questionId=${questionId}`;

  fetch(apiUrl)
      .then(function (response) {
          return response.text();
      })
      .then(function(questionAndAnswer) {
          questionAndAnswerJson = JSON.parse(questionAndAnswer)
          document.getElementById('question').innerHTML = questionAndAnswerJson.question;
          document.getElementById('suggestedAnswer').innerHTML = questionAndAnswerJson.suggestedAnswer;
      })
      .catch(function (error) {
          console.error('Error:', error);
          document.getElementById('result').textContent = 'An error occurred while fetching the field name.';
      });
}

function addQidToForm(questionId) {
    document.getElementById('qid').value = questionId;
}

function revealAnswer() {
  document.getElementById('suggestedAnswerContainer').style.display = 'inline';
}
