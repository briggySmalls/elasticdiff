<script lang="ts">
	import SearchForm from './SearchForm.svelte';
	import SearchResults from './SearchResults.svelte';

	export let searchResults: any | null = null;

	function handleSearchResults(r: any) {
		searchResults = r;
	}
</script>

{#if searchResults === null}
	<SearchForm {handleSearchResults} />
{:else}
	<SearchResults response={searchResults} />
{/if}
