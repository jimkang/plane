var saveMessageBox = document.getElementById('save-message');
var saveDetailsBox = document.getElementById('save-technical-details');

function renderSaveResult(error, saveResult) {
  saveMessageBox.classList.remove('hidden');

  if (error) {
    saveMessageBox.textContent = "Saving didn't work! Try again, maybe?";
    saveDetailsBox.classList.remove('hidden');
    saveDetailsBox.textContent = `Error message: ${error.message}\n${
      error.stack
    }`;
  } else {
    saveMessageBox.textContent = 'Saved!';
    console.log('Successful save result:', saveResult);
  }

  setTimeout(hideBoxes, 10000);
}

function hideBoxes() {
  saveMessageBox.classList.add('hidden');
  saveDetailsBox.classList.add('hidden');
}

module.exports = renderSaveResult;
