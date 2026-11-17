/**
 * Gerenciador de Estado centralizado
 * Padrão Observer para notificar mudanças de estado
 */
export class StateManager {
  constructor(initialState = {}) {
    this.state = initialState;
    this.listeners = new Set();
  }

  /**
   * Obtém o estado atual
   */
  getState() {
    return { ...this.state };
  }

  /**
   * Atualiza o estado e notifica os listeners
   */
  setState(updates) {
    const previousState = { ...this.state };
    this.state = { ...this.state, ...updates };

    if (this.hasChanged(previousState)) {
      this.notifyListeners();
    }
  }

  /**
   * Verifica se houve mudança no estado
   */
  hasChanged(previousState) {
    return JSON.stringify(previousState) !== JSON.stringify(this.state);
  }

  /**
   * Se inscreve em mudanças de estado
   */
  subscribe(listener) {
    this.listeners.add(listener);

    // Retorna função para desinscrever
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notifica todos os listeners
   */
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  /**
   * Reseta o estado
   */
  reset(initialState) {
    this.state = { ...initialState };
    this.notifyListeners();
  }
}

/**
 * Estado da aplicação com valores iniciais
 */
export const createAppState = () => new StateManager({
  isProcessing: false,
  selectedFile: null,
  keepCommentedFields: true,
  error: null,
  success: null,
});
