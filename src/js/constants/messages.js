/**
 * Mensagens da aplicação em um único lugar para fácil manutenção
 */
export const MESSAGES = {
  validation: {
    selectFile: 'Por favor, selecione um arquivo XML válido',
    fileSize: 'O arquivo excede o tamanho máximo permitido',
    invalidFormat: 'Formato de arquivo inválido',
  },
  status: {
    processing: 'Processando conversão...',
    processingTitle: 'Processando...',
  },
  success: {
    title: '✅ Sucesso!',
    message: 'Seu arquivo foi convertido com sucesso. Clique no botão abaixo para baixar.',
  },
  error: {
    title: '❌ Erro',
    unknown: 'Erro desconhecido na conversão',
    request: 'Erro na requisição ao servidor',
    network: 'Erro de conexão com o servidor',
    timeout: 'Requisição expirou. Tente novamente',
    parse: 'Erro ao processar resposta do servidor',
  },
  toggle: {
    label: 'Permanecer campos comentados no documento',
  },
};
