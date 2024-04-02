<script lang="ts">
	import SearchForm from './SearchForm.svelte';
	import SearchResults from './SearchResults.svelte';

	export let form = null;
</script>

{#if !form}
	<SearchForm />
{:else}
	<SearchResults response={form} />
{/if}
