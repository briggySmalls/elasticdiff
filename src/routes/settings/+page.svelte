<script lang="ts">
	import { settings } from '$lib/settings';

	// Subscribe to the store to get the initial value.
	let elasticSearchUri = $settings.elasticSearchUri;

	// To update settings:
	function updateSetting() {
		$settings = { ...$settings, elasticSearchUri: elasticSearchUri };
	}
</script>

<label class="label">
	<span>ElasticSearch URI</span>
	<input
		name="indexName"
		class="input"
		type="url"
		placeholder="http://localhost:9200"
		required
		bind:value={elasticSearchUri}
	/>
</label>
<button on:click={updateSetting}>Save</button>
