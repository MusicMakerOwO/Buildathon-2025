/**
 * Prettifies a type by resolving its properties into a more readable format.
 * This is especially useful for complex types involving intersections or mapped types.
 *
 * @example
 * type ComplexType = { a: number } & { b: string };
 * type PrettyType = Prettify<ComplexType>;
 * // Resulting type: { a: number; b: string; }
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

/**
 * Extracts the values of an object type as a union type.
 * Best used with `as const` objects to get literal types.
 * Great replacement for enums without all the bloat and weirdness.
 *
 * @example
 * const Colors = {
 *   RED: 'red',
 *   BLUE: 'blue',
 *   GREEN: 'green'
 * } as const;
 *
 * type ColorValues = ObjectValues<typeof Colors>;
 * // Resulting type: 'red' | 'blue' | 'green'
 */
export type ObjectValues<T extends Record<PropertyKey, unknown>> = T[keyof T];

/**
 * Recursively makes all properties of a type optional.
 * Useful for scenarios where you want to allow partial updates to deeply nested objects.
 *
 * @example
 * interface User {
 *   id: number;
 *   profile: {
 *     name: string;
 *     address: {
 *       street: string;
 *       city: string;
 *     };
 *   };
 * }
 *
 * type PartialUser = DeepPartial<User>;
 * // Resulting type:
 * // {
 * //   id?: number;
 * //   profile?: {
 * //     name?: string;
 * //     address?: {
 * //       street?: string;
 * //       city?: string;
 * //     };
 * //   };
 * // }
 */
export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Functions can be synchronous or return a Promise for async operations.
 * This type represents a value that can be either directly of type T or a Promise that resolves to type T.
 * Useful for defining APIs that can handle both sync and async operations seamlessly.
 *
 * @example
 * function fetchData(): Awaitable<string> {
 *   if (useCache) {
 *     return "cached data"; // Synchronous return
 *   } else {
 *     return fetchFromServer(); // Asynchronous return (Promise<string>)
 *   }
 * }
 */
export type Awaitable<T> = T | Promise<T>;

/**
 * Represents a class constructor type for a given type T.
 * This is useful when you need to work with class types, such as in dependency injection or factory patterns.
 * @example
 * class Item {
 *   constructor(public name: string) {}
 * }
 *
 * class Key extends Item {
 *   constructor() {
 *   	super('Key');
 *   }
 * }
 *
 * // `Item` would refer to an instance of the class
 * hasItem(item: Item) { ... }
 * hasItem(new Key());
 *
 * // `Class<Item>` refers to the class constructor itself
 * hasItem(item: Class<Item>) { ... }
 * hasItem(Key);
 *
 */
export interface Class<T> {
	new (...args: any[]): T;
}

/**
 * Creates a type with all properties of K set to the value type V.
 * Useful for creating objects with a fixed set of keys and uniform value types.
 *
 * @example
 * type Statuses = 'success' | 'error' | 'loading';
 * type StatusMessages = FullRecord<Statuses, string>;
 * // Resulting type:
 * // {
 * //   success: string;
 * //   error: string;
 * //   loading: string;
 * // }
 */
export
type FullRecord<K extends keyof any, V> = {
	[P in K]: V;
}