import { derived, writable } from 'svelte/store';
import enTranslations from './en.json';
import jaTranslations from './ja.json';

let initialLocale = 'en';

if (typeof window !== 'undefined') {
	let storedLocale = localStorage.getItem('userLocale');
	let browserLang = navigator.language.split('-')[0];
	initialLocale = storedLocale || browserLang;
}

export const locale = writable(initialLocale);
locale.subscribe((value) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('userLocale', value);
	}
});

/** @type {{[key: string]: any}} */
let loadedTranslations = {
	en: enTranslations,
	ja: jaTranslations
};

/**
 * @param {string} locale
 */
function loadTranslations(locale) {
	// Default to 'en' if the locale is not found
	return loadedTranslations[locale] || loadedTranslations['en'];
}

/**
 * @param {string} locale
 * @param {string} key
 * @param {{[key: string]: any}} vars
 * @returns {string}
 */
function translate(locale, key, vars = {}) {
	let keys = key.split('.');
	let translation = loadTranslations(locale);
	for (let k of keys) {
		if (translation[k]) {
			translation = translation[k];
		} else {
			console.error(`no translation found for ${locale}.${key}`);
			return key;
		}
	}

	Object.keys(vars).map((k) => {
		const regex = new RegExp(`{{${k}}}`, 'g');
		translation = translation.replace(regex, vars[k]);
	});

	return translation;
}

export const locales = Object.keys(loadedTranslations);

export const t = derived(
	locale,
	($locale) =>
		(/** @type {string} */ key, vars = {}) =>
			translate($locale, key, vars)
);
