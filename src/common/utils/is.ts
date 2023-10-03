import {PlainObject, Typeguard} from '../types';

export function isSomething<T>(
  x: T | undefined | null
): x is NonNullable<T> { // eslint-disable-line @typescript-eslint/ban-types
  return x != null; // eslint-disable-line no-eq-null, eqeqeq
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(item: unknown): item is number {
  return typeof item === 'number';
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isObject(item: unknown): item is PlainObject | readonly unknown[] {
  return item !== null && typeof item === 'object';
}

export function isNonArrayObject(item: unknown): item is NonNullable<PlainObject> {
  return isObject(item) && !Array.isArray(item);
}

export const isEnum = <T extends object>(EnumType: T) => {
  const isNumberEnumValue = (value: unknown) => isNumber(value) && value in EnumType;
  const values = Object.values(EnumType);
  const validValues = new Set(
    values.filter(values.some(isNumberEnumValue) ? isNumberEnumValue : isString)
  );
  return (item: unknown): item is T[keyof T] => validValues.has(item);
};

export function typeguard<T>(
  ...props: Array<keyof T | [keyof T, (value: unknown) => boolean, boolean?]>
): Typeguard<T> {
  return (object): object is T =>
    isNonArrayObject(object) &&
    props.every((prop) => {
      if (Array.isArray(prop)) {
        const [name, validator, optional = false] = prop;
        const value = object[name as string];
        return isSomething(value) ? validator(value) : optional;
      } else {
        return prop in object;
      }
    });
}

export function arrayTypeguard<T>(elementTypeguard: Typeguard<T>): Typeguard<ReadonlyArray<T>> {
  return (
    array: unknown
  ): array is ReadonlyArray<T> => Array.isArray(array) && array.every(elementTypeguard);
}
