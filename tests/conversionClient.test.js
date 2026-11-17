import { test } from 'node:test';
import assert from 'node:assert/strict';
import { convertInputForms } from '../src/js/api/conversionClient.js';
import { API_URL, MESSAGES } from '../src/js/config.js';

const xmlFile = new File(['<xml/>'], 'input-forms.xml', { type: 'text/xml' });

function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

test('sends the file as form data and returns the converted blob', async () => {
  let request;
  const fetchFn = async (url, options) => {
    request = { url, options };
    return new Response('zip-content', { status: 200 });
  };

  const blob = await convertInputForms(xmlFile, fetchFn);

  assert.equal(request.url, `${API_URL}?keepCommentedFields=true`);
  assert.equal(request.options.method, 'POST');
  assert.equal(request.options.body.get('file').name, 'input-forms.xml');
  assert.equal(await blob.text(), 'zip-content');
});

test('sends keepCommentedFields as a query parameter', async () => {
  let requestedUrl;
  const fetchFn = async (url) => {
    requestedUrl = url;
    return new Response('zip-content', { status: 200 });
  };

  await convertInputForms(xmlFile, fetchFn, { keepCommentedFields: false });

  assert.equal(requestedUrl, `${API_URL}?keepCommentedFields=false`);
});

test('uses the API error message when the server responds with an error', async () => {
  const fetchFn = async () => jsonResponse({ error: { message: 'XML inválido' } }, 422);

  await assert.rejects(convertInputForms(xmlFile, fetchFn), {
    name: 'ConversionError',
    message: 'XML inválido',
  });
});

test('uses the default message when the error body has no message', async () => {
  const fetchFn = async () => jsonResponse({}, 500);

  await assert.rejects(convertInputForms(xmlFile, fetchFn), {
    message: MESSAGES.unknownError,
  });
});

test('uses the default message when the error body is not JSON', async () => {
  const fetchFn = async () => new Response('<html>Bad Gateway</html>', { status: 502 });

  await assert.rejects(convertInputForms(xmlFile, fetchFn), {
    message: MESSAGES.unknownError,
  });
});

test('reports network failures as request errors', async () => {
  const fetchFn = async () => {
    throw new TypeError('fetch failed');
  };

  await assert.rejects(convertInputForms(xmlFile, fetchFn), {
    name: 'ConversionError',
    message: `${MESSAGES.requestError}: fetch failed`,
  });
});
