<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import 'ag-grid-community/styles/ag-grid.css';
	import 'ag-grid-community/styles/ag-theme-quartz.css';

	import { createGrid, GridApi } from 'ag-grid-community';

	// Reponse from ElasticSearch
	export let response;

	// Variables to be allocated
	let domNode: HTMLDivElement;
	let gridApi: GridApi;

	const keyify = (obj: Object, prefix: string = ''): string[] =>
		Object.keys(obj).reduce((acc: string[], el: string) => {
			if (Array.isArray(obj[el])) {
				return acc;
			} else if (typeof obj[el] === 'object' && obj[el] !== null) {
				return [...acc, ...keyify(obj[el], prefix + el + '.')];
			}
			return [...acc, prefix + el];
		}, []);

	const toggleColumnVisibilityHandler = () => {
		gridApi.columns;
	};

	// Grid definition
	const data = response.hits.hits;
	const columns = keyify(data[0]).map((key: string) => ({
		field: key
	}));
	const gridOptions = {
		defaultColDef: {
			flex: 1,
			minWidth: 150,
			filter: true,
			resizable: true,
			sortable: true
		},
		columnDefs: columns,
		rowData: data
	};
	onMount(() => {
		gridApi = createGrid(domNode, gridOptions);
	});

	onDestroy(() => {
		if (gridApi) {
			gridApi.destroy();
		}
	});
</script>

<Accordion>
	<AccordionItem>
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<svelte:fragment slot="summary">Column visibility</svelte:fragment>
		<svelte:fragment slot="content">
			<div>
				{#each gridApi.getAllGridColumns() as column}
					<label class="label flex items-center space-x-2">
						<input
							class="checkbox"
							type="checkbox"
							checked={column.isVisible()}
							on:change={(e) => {
								gridApi.setColumnsVisible([column], !column.isVisible())
							}}
						/>
						<p>{column.getColId()}</p>
					</label>
				{/each}
			</div>
		</svelte:fragment>
	</AccordionItem>
</Accordion>
<div
	id="datagrid"
	class="table-container ag-theme-quartz-dark"
	style="height: 500px"
	bind:this={domNode}
/>
