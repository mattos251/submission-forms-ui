import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatKilobytes } from '../src/js/utils/format.js';

test('formatKilobytes converts bytes to kilobytes with two decimals', () => {
  assert.equal(formatKilobytes(0), '0.00 KB');
  assert.equal(formatKilobytes(1024), '1.00 KB');
  assert.equal(formatKilobytes(1536), '1.50 KB');
});
