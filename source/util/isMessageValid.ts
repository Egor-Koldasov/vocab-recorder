import { AnyObject } from "zustand-ready"

export type NamedMessage = AnyObject & {
  name: string
}
const isObject = (a: unknown): a is AnyObject => typeof a === 'object'

export const isNamedMessage = (message: unknown): message is NamedMessage => {
  return (isObject(message) && typeof message.name === 'string')
}