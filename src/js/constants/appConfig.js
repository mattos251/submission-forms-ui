/**
 * Constantes de configuração da aplicação
 */
export const APP_CONFIG = {
  api: {
    baseUrl: 'http://localhost:3000/api/v1',
    endpoints: {
      conversions: '/conversions',
    },
    timeout: 30000,
  },
  files: {
    downloadFileName: 'dspace-conversion.zip',
    acceptedFormats: '.xml',
  },
};
