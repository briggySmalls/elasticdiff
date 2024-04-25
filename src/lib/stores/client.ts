import { settings } from './settings';
import { derived } from 'svelte/store';
import { ElasticClient } from '$lib/elastic-client';

export const client = derived(
  settings,
  ($settings) => new ElasticClient($settings.elasticSearchUri)
)
