import { DOWNLOAD_FILE_NAME, MESSAGES } from '../config.js';

const STATE_CLASSES = ['loading', 'success', 'error'];

export function createResultPanel({ panel, title, message, downloadLink }) {
  let downloadUrl = null;

  function showLoading(text) {
    hideDownloadLink();
    const spinner = document.createElement('span');
    spinner.className = 'spinner';
    title.replaceChildren(spinner, MESSAGES.processingTitle);
    message.textContent = text;
    setState('loading');
  }

  function showSuccess(blob) {
    hideDownloadLink();
    downloadUrl = URL.createObjectURL(blob);
    downloadLink.href = downloadUrl;
    downloadLink.download = DOWNLOAD_FILE_NAME;
    downloadLink.hidden = false;
    title.textContent = MESSAGES.successTitle;
    message.textContent = MESSAGES.success;
    setState('success');
  }

  function showError(text) {
    hideDownloadLink();
    title.textContent = MESSAGES.errorTitle;
    message.textContent = text;
    setState('error');
  }

  function setState(state) {
    panel.classList.remove(...STATE_CLASSES);
    panel.classList.add(state, 'show');
  }

  function hideDownloadLink() {
    downloadLink.hidden = true;
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      downloadUrl = null;
    }
  }

  return { showLoading, showSuccess, showError };
}
