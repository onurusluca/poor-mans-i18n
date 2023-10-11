# Poor Man's i18n

Simple yet effective i18n (internationalization) for your Svelte project.

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
