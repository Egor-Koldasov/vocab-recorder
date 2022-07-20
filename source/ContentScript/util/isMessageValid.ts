import { AnyObject } from "zustand-ready"

export type MessageToTab = {
  name: string
}
const isObject = (a: unknown): a is AnyObject => typeof a === 'object'

export const isMessageValid = (message: unknown): message is MessageToTab => {
  return (isObject(message) && typeof message.name === 'string')
}