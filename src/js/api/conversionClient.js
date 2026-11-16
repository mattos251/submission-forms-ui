import { API_URL, MESSAGES } from '../config.js';

export class ConversionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConversionError';
  }
}

export async function convertInputForms(file, fetchFn = fetch) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetchFn(API_URL, { method: 'POST', body: formData });
    if (!response.ok) {
      throw new ConversionError(await readErrorMessage(response));
    }
    return await response.blob();
  } catch (error) {
    if (error instanceof ConversionError) {
      throw error;
    }
    throw new ConversionError(`${MESSAGES.requestError}: ${error.message}`);
  }
}

async function readErrorMessage(response) {
  try {
    const body = await response.json();
    return body.error?.message || MESSAGES.unknownError;
  } catch {
    return MESSAGES.unknownError;
  }
}
