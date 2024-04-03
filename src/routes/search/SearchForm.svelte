<script lang="ts">
	import { enhance } from '$app/forms';
	import { TextInput, Textarea, Button, Loader, JsonInput } from '@svelteuidev/core';
	import SearchResults from './SearchResults.svelte';

	enum SearchState {
		Initial = 1,
		Searching,
		Searched
	}

	let searchState = SearchState.Initial;
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
	<TextInput name="indexName" placeholder="Index name" label="Index name" required />
	<Textarea name="searchBody" placeholder="Search API body" label="Query" required />
	<Button type="submit">
		Search
		{#if searchState == SearchState.Searching}
			<Loader />
		{/if}
	</Button>
</form>
