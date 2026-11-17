import { APP_CONFIG, MESSAGES } from '../constants/index.js';

/**
 * Estados possíveis do painel de resultado
 */
const ResultState = {
  HIDDEN: 'hidden',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const StateClasses = {
  [ResultState.LOADING]: ['bg-blue-100', 'border', 'border-blue-300', 'text-blue-900'],
  [ResultState.SUCCESS]: ['bg-green-100', 'border', 'border-green-300', 'text-green-800'],
  [ResultState.ERROR]: ['bg-red-100', 'border', 'border-red-300', 'text-red-800'],
};

/**
 * Componente de Painel de Resultado
 * Exibe status de processamento, sucesso ou erro
 */
export class ResultPanelComponent {
  constructor({ panel, titleElement, messageElement, downloadLink }) {
    this.panel = panel;
    this.titleElement = titleElement;
    this.messageElement = messageElement;
    this.downloadLink = downloadLink;
    this.downloadUrl = null;
    this.currentState = ResultState.HIDDEN;
  }

  /**
   * Exibe estado de carregamento
   */
  showLoading(customMessage = null) {
    this.clearDownloadLink();
    const spinner = this.createSpinner();
    this.titleElement.replaceChildren(
      spinner,
      MESSAGES.status.processingTitle
    );
    this.messageElement.textContent = customMessage || MESSAGES.status.processing;
    this.setState(ResultState.LOADING);
  }

  /**
   * Exibe estado de sucesso com blob para download
   */
  showSuccess(blob, customMessage = null) {
    this.clearDownloadLink();
    this.downloadUrl = URL.createObjectURL(blob);

    this.downloadLink.href = this.downloadUrl;
    this.downloadLink.download = APP_CONFIG.files.downloadFileName;
    this.downloadLink.hidden = false;

    this.titleElement.textContent = MESSAGES.success.title;
    this.messageElement.textContent = customMessage || MESSAGES.success.message;
    this.setState(ResultState.SUCCESS);
  }

  /**
   * Exibe estado de erro
   */
  showError(errorMessage) {
    this.clearDownloadLink();
    this.titleElement.textContent = MESSAGES.error.title;
    this.messageElement.textContent = errorMessage;
    this.setState(ResultState.ERROR);
  }

  /**
   * Define o estado do painel
   */
  setState(state) {
    this.currentState = state;

    // Remove todas as classes de estado
    Object.values(StateClasses).flat().forEach(cls => {
      this.panel.classList.remove(cls);
    });

    if (state === ResultState.HIDDEN) {
      this.panel.classList.add('hidden');
    } else {
      this.panel.classList.remove('hidden');
      this.panel.classList.add(
        ...StateClasses[state],
        'block',
        'mt-6',
        'p-5',
        'rounded-lg'
      );
    }
  }

  /**
   * Cria elemento spinner de carregamento
   */
  createSpinner() {
    const spinner = document.createElement('span');
    spinner.className = 'spinner';
    return spinner;
  }

  /**
   * Limpa o link de download e libera memória
   */
  clearDownloadLink() {
    this.downloadLink.hidden = true;
    if (this.downloadUrl) {
      URL.revokeObjectURL(this.downloadUrl);
      this.downloadUrl = null;
    }
  }

  /**
   * Reseta o painel
   */
  reset() {
    this.clearDownloadLink();
    this.setState(ResultState.HIDDEN);
    this.titleElement.textContent = '';
    this.messageElement.textContent = '';
  }
}
