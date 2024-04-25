<script lang="ts">
	import { enhance } from '$app/forms';
	import SearchResults from './SearchResults.svelte';
	import { client } from '$lib/stores/client';
	import { parseJson } from '$lib/helpers/json/parse';

	enum SearchState {
		Initial = 1,
		Searching,
		Searched
	}

	export let handleSearchResults: (r: any) => void;

	let searchState = SearchState.Initial;

	interface ValidationErrors {
		indexName: any | null;
		searchBody: any | null;
		requestError: any | null;
	}

	let validationErrors: ValidationErrors = {
		indexName: null,
		searchBody: null,
		requestError: null
	};

	async function handleOnSubmit(e: SubmitEvent) {
		validationErrors = {
			indexName: null,
			searchBody: null,
			requestError: null
		};
		const formData = new FormData(e.target);
		const indexName = formData.get('indexName') as string;
		const body = formData.get('searchBody') as string;
		let parsedBody;
		try {
			parsedBody = parseJson(body);
		} catch (err) {
			validationErrors = {
				...validationErrors,
				searchBody: err
			};
			return;
		}
		const response = await $client.search(indexName, parsedBody);
		const json = await response.json();
		console.log(response);
		if (!response.ok) {
			validationErrors = {
				...validationErrors,
				requestError: json.error
			};
			console.log(validationErrors);
			return;
		}
		handleSearchResults(json);
	}
</script>

<form on:submit|preventDefault={handleOnSubmit}>
	<label class="label">
		<span>Index name</span>
		<input name="indexName" class="input" type="text" placeholder="Index name" required />
	</label>
	<label class="label">
		<span>Query</span>
		<textarea name="searchBody" class="textarea" placeholder="Search API body" required />
		{#if validationErrors.searchBody}
			<p class="text-xs italic text-red-500">{validationErrors.searchBody?.message}</p>
		{/if}
	</label>
	<button class="variant-filled btn" type="submit">Search</button>
	{#if validationErrors.requestError}
		<p class="text-xs italic text-red-500">
			[{validationErrors.requestError?.type}] {validationErrors.requestError?.reason}
		</p>
	{/if}
</form>
