/**
 * Componente de Toggle/Switch
 * Padrão: Factory function que retorna uma instância do componente
 */
export class ToggleComponent {
  constructor({ container, label, onChange }) {
    this.container = container;
    this.label = label;
    this.onChange = onChange;
    this.isDisabled = false;

    this.render();
    this.attachEventListeners();
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex items-center gap-4 mb-6';

    const labelElement = document.createElement('label');
    labelElement.className = 'flex-1 font-semibold text-gray-800';
    labelElement.textContent = this.label;

    const switchElement = document.createElement('label');
    switchElement.className = 'toggle-switch';

    this.checkbox = document.createElement('input');
    this.checkbox.type = 'checkbox';
    this.checkbox.className = 'toggle-checkbox';

    const slider = document.createElement('span');
    slider.className = 'toggle-slider';

    switchElement.appendChild(this.checkbox);
    switchElement.appendChild(slider);

    wrapper.appendChild(labelElement);
    wrapper.appendChild(switchElement);
    this.container.appendChild(wrapper);
  }

  attachEventListeners() {
    this.checkbox.addEventListener('change', () => {
      if (!this.isDisabled) {
        this.onChange(this.checkbox.checked);
      }
    });
  }

  /**
   * Obtém o estado atual do toggle
   */
  getValue() {
    return this.checkbox.checked;
  }

  /**
   * Define o estado do toggle
   */
  setValue(value) {
    this.checkbox.checked = Boolean(value);
  }

  /**
   * Desabilita o toggle
   */
  disable() {
    this.checkbox.disabled = true;
    this.isDisabled = true;
  }

  /**
   * Habilita o toggle
   */
  enable() {
    this.checkbox.disabled = false;
    this.isDisabled = false;
  }
}
