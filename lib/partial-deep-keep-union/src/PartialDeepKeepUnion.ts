import { Primitive, UnionToIntersection } from "type-fest";
import { PartialMapDeep, PartialReadonlyMapDeep, PartialReadonlySetDeep, PartialSetDeep } from "type-fest/source/partial-deep";

// https://stackoverflow.com/a/53955431/12148259
export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true

type PartialObjectDeep<ObjectType extends object> = {
	[KeyType in keyof ObjectType]?: PartialDeepKeepUnion<ObjectType[KeyType]>
};

// this is updated type, props that have union types like (Object | null) need to be included complitely
export type PartialDeepKeepUnion<T> =
  IsUnion<T> extends true
  ? T
  : T extends Primitive
	? Partial<T>
	: T extends Map<infer KeyType, infer ValueType>
	? PartialMapDeep<KeyType, ValueType>
	: T extends Set<infer ItemType>
	? PartialSetDeep<ItemType>
	: T extends ReadonlyMap<infer KeyType, infer ValueType>
	? PartialReadonlyMapDeep<KeyType, ValueType>
	: T extends ReadonlySet<infer ItemType>
	? PartialReadonlySetDeep<ItemType>
	: T extends ((...args: any[]) => unknown)
	? T | undefined
	: T extends object
	? T extends Array<infer ItemType> // Test for arrays/tuples, per https://github.com/microsoft/TypeScript/issues/35156
		? ItemType[] extends T // Test for arrays (non-tuples) specifically
			? Array<PartialDeepKeepUnion<ItemType | undefined>> // Recreate relevant array type to prevent eager evaluation of circular reference
			: PartialObjectDeep<T> // Tuples behave properly
		: PartialObjectDeep<T>
	: unknown;
