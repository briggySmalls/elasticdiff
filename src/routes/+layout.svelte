<script>
	import '../app.pcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10"l>
	<svelte:fragment slot="header">
		<AppBar>
			ElasticDiff
			<svelte:fragment slot="trail">
				<a href="/search">Search</a>
				<a href="/settings">⚙️</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
