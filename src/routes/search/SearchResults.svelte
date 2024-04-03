<script lang="ts">
	import { writable } from 'svelte/store';
	import {
		createSvelteTable,
		createColumnHelper,
		getCoreRowModel,
		flexRender
	} from '@tanstack/svelte-table';
	import type { TableOptions } from '@tanstack/svelte-table';

	// Reponse from ElasticSearch
	export let response;

	const keyify = (obj: Object, prefix: string = ''): string[] =>
		Object.keys(obj).reduce((acc: string[], el: string) => {
			if (Array.isArray(obj[el])) {
				return acc;
			} else if (typeof obj[el] === 'object' && obj[el] !== null) {
				return [...acc, ...keyify(obj[el], prefix + el + '.')];
			}
			return [...acc, prefix + el];
		}, []);

	const columnHelper = createColumnHelper();

	$: data = response.hits.hits;
	$: columns = keyify(data[0]).map((key: string) => columnHelper.accessor(key, {}));
	$: options = writable<TableOptions<Any>>({
		data: data,
		columns: columns,
		getCoreRowModel: getCoreRowModel()
	});
	$: table = createSvelteTable(options);
</script>

<table>
	<thead>
		{#each $table.getHeaderGroups() as headerGroup}
			<tr>
				{#each headerGroup.headers as header}
					<th>
						{#if !header.isPlaceholder}
							<svelte:component
								this={flexRender(header.column.columnDef.header, header.getContext())}
							/>
						{/if}
					</th>
				{/each}
			</tr>
		{/each}
	</thead>
	<tbody>
		{#each $table.getRowModel().rows as row}
			<tr>
				{#each row.getVisibleCells() as cell}
					<td>
						<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
	<tfoot>
		{#each $table.getFooterGroups() as footerGroup}
			<tr>
				{#each footerGroup.headers as header}
					<th>
						{#if !header.isPlaceholder}
							<svelte:component
								this={flexRender(header.column.columnDef.footer, header.getContext())}
							/>
						{/if}
					</th>
				{/each}
			</tr>
		{/each}
	</tfoot>
</table>