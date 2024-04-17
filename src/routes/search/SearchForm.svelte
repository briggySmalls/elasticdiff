<script lang="ts">
	import { enhance } from '$app/forms';
	import SearchResults from './SearchResults.svelte';
	import { settings } from '$lib/settings';
	import type { Settings } from '$lib/settings';

	enum SearchState {
		Initial = 1,
		Searching,
		Searched
	}

	let searchState = SearchState.Initial;
	let localSettings: Settings;

	settings.subscribe((value: Settings) => {
			localSettings = value;
	});
</script>

<form
	method="POST"
	use:enhance={({}) => {
		searchState = SearchState.Searching;
		return async ({ update }) => {
			searchState = SearchState.Searched;
			update();
		};
	}}
>
	<label class="label">
		<span>Index name</span>
		<input name="indexName" class="input" type="text" placeholder="Index name" required />
	</label>
	<label class="label">
		<span>Query</span>
		<textarea name="searchBody" class="textarea" placeholder="Search API body" required />
	</label>
	<input type="hidden" name="elasticSearchUri" bind:value={localSettings.elasticSearchUri} />
	<button class="btn variant-filled" type="submit">Search</button>
</form>
