<script lang="ts">
	import { enhance } from '$app/forms';
	import { TextInput, Textarea, Button, Loader } from '@svelteuidev/core';

	enum SearchState {
		Initial = 1,
		Searching,
		Searched
	}

	export let form = null;
	$: responsePayload = JSON.stringify(form);

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
	<Button type="submit">Search</Button>
</form>
<Textarea disabled label="Query results" bind:value={responsePayload}>
	<svelte:fragment slot="rightSection">
		{#if searchState == SearchState.Searching}
			<Loader color="blue" size="xs" />
		{/if}
	</svelte:fragment>
</Textarea>
