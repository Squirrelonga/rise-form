document.addEventListener('DOMContentLoaded', function () {
  questionId = getQuestionId();
  fetchQuestion(questionId);
});

document.getElementById('questionForm').addEventListener('submit', function (e) {
  e.preventDefault();
  revealAnswer();
});

// Functions

function getQuestionId() {
  // Extract the "questionId" parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const questionId = urlParams.get('questionId');
  return questionId;
}

function fetchQuestion(questionId) {
  const apiUrl = `https://script.google.com/macros/s/AKfycbzvrIKJoEB-dKEoyP3EDuuZdsmcznwKTjpcWiNKgpjRL-L4fG45wY_0S1TioXpSPbi53Q/exec?sheetName=FRQ&questionId=${questionId}`;

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

function revealAnswer() {
  document.getElementById('suggestedAnswerContainer').style.display = 'inline';
}