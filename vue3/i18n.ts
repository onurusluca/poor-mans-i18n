// home-made translation system(a.k.a. i18n)
import { en } from "./en";
import { tr } from "./tr";

export type TranslationKey = string;

export interface TranslationValue {
  [key: string]: string | TranslationValue;
}

export type Translations = {
  [K in string]: TranslationValue;
};

export const myLang: Translations = { en, tr };

export function t(
  lang: string,
  key: TranslationKey,
  variables: Record<string, any> = {}
): string {
  const keys = key.split(".");

  let translation: TranslationValue | string = myLang[lang];

  // Loop through the keys and return the translation
  for (const k of keys) {
    if (typeof translation === "string") {
      return ""; // Return empty string if key is not found
    }
    translation = translation[k];
  }

  if (typeof translation === "string") {
    // Replace placeholders with corresponding variables
    return translation.replace(
      /{(\w+)}/g,
      (_, variableName) => variables[variableName] || ""
    );
  }

  return "";
}

/* Usage:
 * t('en', 'searchBox.placeholder')
 */

/* With string vars:
 t(lang, 'searchResults.didYouMean', {
 spellCheckWord: store.searchResult.spellcheck.main_phrase
})
*/
