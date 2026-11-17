# DSpace Converter UI

Interface web para converter `input-forms.xml` do DSpace 5 para o DSpace 9 com arquitetura moderna e clean code.

## 🚀 Início Rápido

### Requisitos
- Node.js 18+ (para testes)
- API de conversão em `http://localhost:3000/api/v1`

### Executar Localmente

```bash
# Instalar dependências
npm install

# Monitorar mudanças de CSS (Tailwind)
npm run watch:css

# Servir a aplicação
npx serve .
# ou
python -m http.server 8080
```

Acesse `http://localhost:8080`

## 🏗️ Arquitetura

```
src/
├── js/
│   ├── components/              # Componentes UI reutilizáveis
│   │   ├── ToggleComponent.js   # Switch on/off
│   │   ├── FileUploadComponent.js # Upload com drag & drop
│   │   ├── ResultPanelComponent.js # Exibição de resultado
│   │   └── index.js
│   ├── services/                # Lógica de negócio
│   │   └── apiService.js       # Cliente HTTP e serviços
│   ├── constants/               # Configuração centralizada
│   │   ├── appConfig.js        # URLs, timeouts, nomes
│   │   ├── messages.js         # Mensagens i18n
│   │   └── index.js
│   ├── state/                   # Gerenciamento de estado
│   │   └── stateManager.js      # StateManager (Observer Pattern)
│   ├── utils/                   # Funções auxiliares
│   │   └── format.js           # Formatadores
│   └── app.js                   # Orquestrador principal
├── styles/
│   └── main.css                # Tailwind CSS
└── tests/                       # Testes automatizados
```

## 🎯 Princípios de Design

### 1. **Separação de Responsabilidades**
- **Components**: Renderização e interação com DOM
- **Services**: Comunicação com API e lógica
- **State**: Gerenciamento de estado centralizado
- **Constants**: Todas as configurações em um lugar

### 2. **Clean Code**
```javascript
// ✅ Bom: nome descritivo, responsabilidade única
class FileUploadComponent {
  handleFileSelected() { /* ... */ }
}

// ❌ Evitar: nome genérico, múltiplas responsabilidades
function handleStuff() { /* ... */ }
```

### 3. **Padrões de Design**
- **Observer**: StateManager notifica mudanças
- **Service Layer**: Abstração da API
- **Factory/Constructor**: Componentes
- **Singleton**: ApiClient instância única

### 4. **Injeção de Dependências**
```javascript
// Componentes recebem dependências, fácil testar
const toggle = new ToggleComponent({
  container: element,
  onChange: callback
});
```

## 🔄 Fluxo de Dados

```
Usuário interage
    ↓
Componente dispara evento
    ↓
App chama Service
    ↓
Service faz requisição HTTP
    ↓
State Manager atualiza estado
    ↓
Componentes reagem e atualizam UI
```

## 📋 Componentes Principais

### FileUploadComponent
Gerencia upload e drag & drop de arquivos.

```javascript
new FileUploadComponent({
  dropZone: element,
  input: inputElement,
  nameDisplay: displayElement,
  onFileSelected: (file) => { /* ... */ }
});
```

### ToggleComponent
Switch on/off para configurações booleanas.

```javascript
const toggle = new ToggleComponent({
  container: element,
  label: 'Configuração',
  onChange: (value) => { /* true or false */ }
});

toggle.getValue();     // boolean
toggle.setValue(true);
toggle.disable();
toggle.enable();
```

### ResultPanelComponent
Exibe status de processamento, sucesso ou erro.

```javascript
resultPanel.showLoading('Aguardando...');
resultPanel.showSuccess(blob, 'Pronto!');
resultPanel.showError('Erro ao processar');
resultPanel.reset();
```

## 🔌 Serviços

### ConversionService
Converte arquivos via API.

```javascript
const service = new ConversionService(apiClient);
const blob = await service.convertFile(file, { keepCommentedFields: true });
```

## 🧪 Testes

```bash
npm test
```

Usar `node:test` nativo (sem framework externo).

## ⚙️ Configuração

Editar endpoints em `src/js/constants/appConfig.js`:

```javascript
export const APP_CONFIG = {
  api: {
    baseUrl: 'http://seu-servidor.com/api/v1',
    endpoints: {
      conversions: '/conversions',
    },
  },
};
```

## 📝 Convenções de Código

| Item | Padrão | Exemplo |
|------|--------|---------|
| Classe | PascalCase | `FileUploadComponent` |
| Função/Método | camelCase | `handleFileSelected()` |
| Constante | UPPER_SNAKE_CASE | `MAX_FILE_SIZE` |
| Privado | prefixo `_` | `_privateMethod()` |
| Booleano | prefixo `is/has` | `isLoading`, `hasError` |

## 🚀 Próximos Passos

1. Implementar estado persistente (localStorage)
2. Adicionar validação de arquivo no cliente
3. Implementar retry automático
4. Melhorar mensagens de erro (i18n)
5. Adicionar analytics

## 📚 Referências

- [Clean Code - Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [Tailwind CSS](https://tailwindcss.com)
- [MDN - Design Patterns](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

