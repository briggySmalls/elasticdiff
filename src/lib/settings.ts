import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store'

export interface Settings {
    elasticSearchUri: string;
}

export const settings: Writable<Settings> = writable({
    // default settings
    elasticSearchUri: 'http://localhost:9200',
});
