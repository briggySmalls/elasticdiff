<script>
	import { TextInput, Textarea, Button } from '@svelteuidev/core';

	let index = '';
	let body = '';

	async function handleSubmit() {
		alert(`Form contents:\n${index}\n${body}`);
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<TextInput placeholder="Index name" label="Index name" required bind:value={index} />
	<Textarea placeholder="Search API body" label="Query" required bind:value={body} />
	<Button type="submit">Search</Button>
</form>
