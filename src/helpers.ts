export const isNilOrEmpty = <T>(elements: T[] | undefined | null): boolean => !elements || elements.length === 0;
