import { expect, test } from 'vitest';
import { dateStringToFormat } from '.';

const validDateString = '2025-01-01T00:00:00Z';
const invalidDateString = '2024-33-05T00:00:00Z';

test('dateStringToFormat should fail to parse date string', () => {
  // arrange
  // act
  // assert
  expect(() => dateStringToFormat(invalidDateString, 'yyyy-MM-dd')).toThrowError();
});

test('dateStringToFormat should format date string', () => {
  // arrange
  const expected = '2025-01-01';
  const actual = dateStringToFormat(validDateString, 'yyyy-MM-dd');
  // act
  // assert
  expect(actual).toBe(expected);
});
