# Poor Man's i18n

Simple yet effective i18n (internationalization) for your Svelte project.
---
## Vue

### Import

Add the following import statement to your Vue component:

```javascript
import { t, myLang } from "@/path/to/your/i18n";
```

### Usage

To translate a text, you can use Vue's template syntax:

```html
<template>
  <p>{{ t('en', 'welcome.hi') }}</p>
</template>
```

### Changing Locale

To change the locale, you can use a select dropdown in your component like so:

```html
<template>
  <select v-model="currentLocale">
    <option v-for="lang in availableLocales" :key="lang" :value="lang">{{ lang }}</option>
  </select>
</template>

<script setup>
import { ref } from "vue";
const currentLocale = ref('en');
const availableLocales = Object.keys(myLang);
</script>
```

### Complete Example

Here's a complete example using Vue's script setup and Composition API:

```html
<template>
  <select v-model="currentLocale">
    <option v-for="lang in availableLocales" :key="lang" :value="lang">{{ lang }}</option>
  </select>

  <p>{{ t(currentLocale, 'welcome.hi') }}</p>
</template>

<script setup>
import { ref } from "vue";
import { t, myLang } from "@/path/to/your/i18n";

const currentLocale = ref('en');
const availableLocales = Object.keys(myLang);
</script>
```

---

## Svelte

### Import

Add the following import statement to your Svelte file:

```javascript
import { t, locale, locales } from '$lib/locales/i18n';
```

### Usage
To translate a text, use Svelte's reactive statements:

```javascript
<p>{$t('welcome.hi')}</p>
```

### Changing Locale
To change the locale, use a select dropdown. Bind the locale to it.

```javascript
<select bind:value={$locale}>
  {#each $locales as lang}
    <option value={lang}>{lang}</option>
  {/each}
</select>
```

### Complete Example

Here's a complete example in a single Svelte file, integrating all the steps:

```svelte
<script>
  import { t, locale, locales } from '$lib/locales/i18n';
</script>

<select bind:value={$locale}>
  {#each $locales as lang}
    <option value={lang}>{lang}</option>
  {/each}
</select>

<p>{$t('welcome.hi')}</p>
```

---
