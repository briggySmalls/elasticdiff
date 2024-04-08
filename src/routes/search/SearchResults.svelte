<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import 'ag-grid-community/styles/ag-grid.css';
	import 'ag-grid-community/styles/ag-theme-quartz.css';

	import { createGrid, GridApi } from 'ag-grid-community';
	import type { ColumnVisibleEvent } from 'ag-grid-community';

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

	// Grid definition
	const data = response.hits.hits;
	const columnNames = keyify(data[0]);
	const columns = columnNames.map((key: string) => ({
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
		rowData: data,
		onColumnVisible: columnVisibleHandler
	};
	let columnVisibilities = columnNames.reduce(
		(acc, columnName) => ({ ...acc, [columnName]: true }),
		{}
	);

	onMount(() => {
		gridApi = createGrid(domNode, gridOptions);
	});

	onDestroy(() => {
		if (gridApi) {
			gridApi.destroy();
		}
	});

	const setAllGridColumnsVisibility = (visibility: boolean) => {
		const allColumns = gridApi.getAllGridColumns();
		gridApi.setColumnsVisible(allColumns, visibility);
	};

	function columnVisibleHandler(e: ColumnVisibleEvent) {
		if (e.visible !== undefined) {
			// Get the columns that were updated
			const cols = [...(e.columns ? e.columns : []), ...(e.column ? [e.column] : [])];
			// Update the svelte state
			const columnNames = cols.map((c) => c.getColId());
			columnVisibilities = columnNames.reduce(
				(acc, columnName) => ({ ...acc, [columnName]: e.visible }),
				columnVisibilities
			);
			console.log(`Visibilities updated\n${JSON.stringify(columnVisibilities)}`);
		}
	}
</script>

<Accordion>
	<AccordionItem>
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<svelte:fragment slot="summary">Column visibility</svelte:fragment>
		<svelte:fragment slot="content">
			<div>
				<div>
					<button class="btn variant-filled" on:click={(e) => setAllGridColumnsVisibility(true)}
						>Select all</button
					>
					<button class="btn variant-filled" on:click={(e) => setAllGridColumnsVisibility(false)}
						>Deselect all</button
					>
				</div>
				{#each gridApi.getAllGridColumns() as column}
					<label class="label flex items-center space-x-2">
						<input
							class="checkbox"
							type="checkbox"
							bind:checked={columnVisibilities[column.getColId()]}
							on:change={(e) => {
								gridApi.setColumnsVisible([column], e?.target?.checked);
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
