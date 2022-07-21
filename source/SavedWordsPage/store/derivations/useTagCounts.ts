import { useSavedWordsState } from "../savedWordsStore";


type TagCountMap = Record<string, number>
export const useTagCounts = (): TagCountMap => {
  const [ words ] = useSavedWordsState((state) => [state.words]);
  const tagCountMap = words.reduce<TagCountMap>(
    (tagMap, word) => {
      return word.tags.reduce<TagCountMap>(
        (tagMap_, tag) => {
          return {
            ...tagMap_,
            [tag]: (tagMap[tag] || 0) + 1,
          }
        },
        tagMap
      )
    },
    {}
  )
  return tagCountMap;
}