import { Primitive, UnionToIntersection } from "type-fest";
import { PartialMapDeep, PartialReadonlyMapDeep, PartialReadonlySetDeep, PartialSetDeep } from "type-fest/source/partial-deep";

// https://stackoverflow.com/a/53955431/12148259
export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true
export type IsUnionWithNull<T> =
	[T] extends [UnionToIntersection<T>] ?
		false :
		T extends null ?
			true :
			false;

type PartialObjectDeep<ObjectType extends object> = {
	[KeyType in keyof ObjectType]?: PartialDeepKeepUnion<ObjectType[KeyType]>
};

// this is updated type, props that have union types like (Object | null) should stop nesting further
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

export type PartialDeepKeepNullUnion<T> =
  IsUnionWithNull<T> extends false
  ? T extends Primitive
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
	: unknown
	: T;

type Test1 = {
	t1: 123,
	t2: null | {
		t21: 321,
		t22: 323,
	}
};

type test1 = PartialDeepKeepNullUnion<Test1>
type test2 = [Test1['t1']]
type test3 = IsUnionWithNull<Test1['t2']> extends false ? false : true
type test4 = IsUnionWithNull<Test1['t2']>