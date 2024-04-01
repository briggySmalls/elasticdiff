<script lang="ts">
	import { enhance } from '$app/forms';
	import { TextInput, Textarea, Button } from '@svelteuidev/core';

	export let form = null;
	$: responsePayload = JSON.stringify(form);
</script>

<form method="POST" use:enhance>
	<TextInput name="indexName" placeholder="Index name" label="Index name" required />
	<Textarea name="searchBody" placeholder="Search API body" label="Query" required />
	<Button type="submit">Search</Button>
</form>
<Textarea disabled label="Query results" bind:value={responsePayload} />
