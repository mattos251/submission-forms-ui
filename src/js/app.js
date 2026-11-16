import { convertInputForms } from './api/conversionClient.js';
import { MESSAGES } from './config.js';
import { createFileField } from './ui/fileField.js';
import { createResultPanel } from './ui/resultPanel.js';

const form = document.getElementById('upload-form');
const submitButton = document.getElementById('submit-button');

const fileField = createFileField({
  dropZone: document.getElementById('drop-zone'),
  input: document.getElementById('file-input'),
  nameOutput: document.getElementById('file-name'),
});

const resultPanel = createResultPanel({
  panel: document.getElementById('result'),
  title: document.getElementById('result-title'),
  message: document.getElementById('result-message'),
  downloadLink: document.getElementById('download-link'),
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const file = fileField.getSelectedFile();
  if (!file) {
    resultPanel.showError(MESSAGES.selectFile);
    return;
  }

  submitButton.disabled = true;
  resultPanel.showLoading(MESSAGES.processing);

  try {
    const blob = await convertInputForms(file);
    resultPanel.showSuccess(blob);
  } catch (error) {
    resultPanel.showError(error.message);
  } finally {
    submitButton.disabled = false;
  }
});
