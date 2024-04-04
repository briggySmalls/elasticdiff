<script lang="ts">
	import { enhance } from '$app/forms';
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
	<label class="label">
		<span>Index name</span>
		<input name="indexName" class="input" type="text" placeholder="Index name" required />
	</label>
	<label class="label">
		<span>Query</span>
		<textarea name="searchBody" class="textarea" placeholder="Search API body" required />
	</label>
	<button class="btn variant-filled" type="submit">Search</button>
</form>
