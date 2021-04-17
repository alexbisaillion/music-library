import { isNilOrEmpty } from '../genericHelpers';

describe('isNilOrEmpty', () => {
  it('returns true when there are no elements', () => {
    expect(isNilOrEmpty([])).toBeTruthy();
  });

  it('returns false when there are elements', () => {
    expect(isNilOrEmpty(['hello', 'there'])).toBeFalsy();
  });

  it('returns true when given a null argument', () => {
    expect(isNilOrEmpty(undefined)).toBeTruthy();
    expect(isNilOrEmpty(null)).toBeTruthy();
  });
});
