# elasticdiff

GUI for debugging and developing ElasticSearch queries.

## Developing

The appliction can be distributed in two ways:

1. A Sveltekit web application
2. A tauri desktop application

### Web application

1. Ensure nodejs is installed (I use [asdf](https://asdf-vm.com/))
1. Install dependencies with `npm install`
1. Run the application with

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Desktop application

1. Ensure Rust is installed (I use [asdf](https://asdf-vm.com/))
1. Run the development application with
```
cargo tauri dev
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Acknowledgements

### ElasticVue

The application architecture has taken lots of inspiration from the fantastic
[ElasticVue](https://elasticvue.com/), particularly the use of tauri for the desktop app.

### TMDB Test data

This project uses test data obtained from the Relevant Search book repository (https://github.com/o19s/relevant-search-book). This was in turn sourced from TMDB.

The data has been coerced into a format suitable for bulk import using the following command:

```
cat tmdb.json | jq 'to_entries[] | { "_id": .key, "_source": .value }' > ./localenv/dump-data/tmdb-dump.json
```
