import { formatKilobytes } from '../utils/format.js';

/**
 * Componente de Upload de Arquivo com Drag & Drop
 */
export class FileUploadComponent {
  constructor({ dropZone, input, nameDisplay, onFileSelected }) {
    this.dropZone = dropZone;
    this.input = input;
    this.nameDisplay = nameDisplay;
    this.onFileSelected = onFileSelected;
    this.draggingClasses = ['bg-blue-200', 'border-purple-600'];

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.dropZone.addEventListener('dragover', (e) => this.handleDragOver(e));
    this.dropZone.addEventListener('dragleave', () => this.handleDragLeave());
    this.dropZone.addEventListener('drop', (e) => this.handleDrop(e));
    this.input.addEventListener('change', () => this.handleFileSelected());
  }

  handleDragOver(event) {
    event.preventDefault();
    this.addDraggingStyle();
  }

  handleDragLeave() {
    this.removeDraggingStyle();
  }

  handleDrop(event) {
    event.preventDefault();
    this.removeDraggingStyle();

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.input.files = files;
      this.handleFileSelected();
    }
  }

  handleFileSelected() {
    const file = this.getSelectedFile();
    if (file) {
      this.updateDisplay(file);
      this.onFileSelected?.(file);
    }
  }

  /**
   * Obtém o arquivo selecionado
   */
  getSelectedFile() {
    return this.input.files?.[0] ?? null;
  }

  /**
   * Atualiza a exibição do arquivo selecionado
   */
  updateDisplay(file) {
    const fileInfo = `✓ ${file.name} (${formatKilobytes(file.size)})`;
    this.nameDisplay.textContent = fileInfo;
  }

  /**
   * Limpa a seleção de arquivo
   */
  clearFile() {
    this.input.value = '';
    this.nameDisplay.textContent = '';
  }

  /**
   * Adiciona estilos de arrastar
   */
  addDraggingStyle() {
    const label = this.dropZone.querySelector('.file-input-label');
    label?.classList.add(...this.draggingClasses);
  }

  /**
   * Remove estilos de arrastar
   */
  removeDraggingStyle() {
    const label = this.dropZone.querySelector('.file-input-label');
    label?.classList.remove(...this.draggingClasses);
  }
}
