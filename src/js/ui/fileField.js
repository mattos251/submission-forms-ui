import { formatKilobytes } from '../utils/format.js';

const DRAGGING_CLASS = 'is-dragging';

export function createFileField({ dropZone, input, nameOutput }) {
  dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropZone.classList.add(DRAGGING_CLASS);
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove(DRAGGING_CLASS);
  });

  dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropZone.classList.remove(DRAGGING_CLASS);

    if (event.dataTransfer.files.length > 0) {
      input.files = event.dataTransfer.files;
      renderFileName();
    }
  });

  input.addEventListener('change', renderFileName);

  function getSelectedFile() {
    return input.files[0] ?? null;
  }

  function renderFileName() {
    const file = getSelectedFile();
    nameOutput.textContent = file ? `✓ ${file.name} (${formatKilobytes(file.size)})` : '';
  }

  return { getSelectedFile };
}
