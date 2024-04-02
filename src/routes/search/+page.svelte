<script lang="ts">
	import { enhance } from '$app/forms';
	import { writable } from 'svelte/store';
	import { TextInput, Textarea, Button, Loader, JsonInput } from '@svelteuidev/core';
	import {
		createSvelteTable,
		createColumnHelper,
		getCoreRowModel,
		flexRender
	} from '@tanstack/svelte-table';
	import type { TableOptions } from '@tanstack/svelte-table';

	enum SearchState {
		Initial = 1,
		Searching,
		Searched
	}

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

	export let form = null;
	$: data = form?.hits.hits;
	$: columns =
		data !== undefined
			? keyify(data[0]).map((key: string) => columnHelper.accessor(key, {}))
			: undefined;
	$: options = writable<TableOptions<Any>>({
		data: data,
		columns: columns,
		getCoreRowModel: getCoreRowModel()
	});
	$: table = columns !== undefined && data !== undefined ? createSvelteTable(options) : undefined;

	let searchState = SearchState.Initial;
</script>

<form
	method="POST"
	use:enhance={({}) => {
		searchState = SearchState.Searching;
		return async ({ update }) => {
			searchState = SearchState.Searched;
			update();
		};
	}}
>
	<TextInput name="indexName" placeholder="Index name" label="Index name" required />
	<Textarea name="searchBody" placeholder="Search API body" label="Query" required />
	<Button type="submit">Search</Button>
</form>
{#if table}
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
{/if}
