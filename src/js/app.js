/**
 * Aplicação Principal - DSpace Converter
 * Orquestra componentes e serviços
 */

import { ToggleComponent, FileUploadComponent, ResultPanelComponent } from './components/index.js';
import { ConversionService, apiClient } from './services/apiService.js';
import { createAppState } from './state/stateManager.js';
import { MESSAGES } from './constants/messages.js';

class DSpaceConverterApp {
  constructor() {
    this.state = createAppState();
    this.initializeServices();
    this.initializeComponents();
    this.attachEventListeners();
  }

  /**
   * Inicializa serviços
   */
  initializeServices() {
    this.conversionService = new ConversionService(apiClient);
  }

  /**
   * Inicializa componentes UI
   */
  initializeComponents() {
    this.fileUpload = new FileUploadComponent({
      dropZone: document.getElementById('drop-zone'),
      input: document.getElementById('file-input'),
      nameDisplay: document.getElementById('file-name'),
      onFileSelected: (file) => this.state.setState({ selectedFile: file }),
    });

    this.resultPanel = new ResultPanelComponent({
      panel: document.getElementById('result'),
      titleElement: document.getElementById('result-title'),
      messageElement: document.getElementById('result-message'),
      downloadLink: document.getElementById('download-link'),
    });

    this.toggle = new ToggleComponent({
      container: document.getElementById('toggle-container'),
      label: MESSAGES.toggle.label,
      onChange: (isEnabled) => {
        console.log('[toggle] clicado, keepCommentedFields =', isEnabled);
        this.state.setState({ keepCommentedFields: isEnabled });
      },
    });
    this.toggle.setValue(this.state.getState().keepCommentedFields);
  }

  /**
   * Anexa listeners de eventos
   */
  attachEventListeners() {
    const form = document.getElementById('upload-form');
    const submitButton = document.getElementById('submit-button');

    form.addEventListener('submit', (e) => this.handleSubmit(e, submitButton));
  }

  /**
   * Manipula envio do formulário
   */
  async handleSubmit(event, submitButton) {
    event.preventDefault();

    const file = this.fileUpload.getSelectedFile();
    if (!file) {
      this.resultPanel.showError(MESSAGES.validation.selectFile);
      return;
    }

    this.state.setState({ isProcessing: true });
    this.disableControls(submitButton);
    this.resultPanel.showLoading();

    try {
      const { keepCommentedFields } = this.state.getState();
      console.log('[conversao] enviando keepCommentedFields =', keepCommentedFields);
      const blob = await this.conversionService.convertFile(file, { keepCommentedFields });
      this.resultPanel.showSuccess(blob);
      this.state.setState({ success: true });
      this.fileUpload.clearFile();
    } catch (error) {
      this.resultPanel.showError(error.message);
      this.state.setState({ error: error.message });
    } finally {
      this.state.setState({ isProcessing: false });
      this.enableControls(submitButton);
    }
  }

  /**
   * Desabilita controles durante processamento
   */
  disableControls(submitButton) {
    submitButton.disabled = true;
    this.toggle.disable();
  }

  /**
   * Habilita controles após processamento
   */
  enableControls(submitButton) {
    submitButton.disabled = false;
    this.toggle.enable();
  }
}

// Inicializa a aplicação quando o DOM está pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new DSpaceConverterApp();
  });
} else {
  new DSpaceConverterApp();
}
