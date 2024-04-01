import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: "http://localhost:9200"
})

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    console.log(data)
    const indexName = data.get('indexName') as string;
    const searchBody = data.get('searchBody') as string;

    const bodyParsed = JSON.parse(searchBody);
    const clientPayload = { index: indexName, body: bodyParsed }
    console.log(`Requesting to ${indexName}\nWith:\n${JSON.stringify(clientPayload)}`)
    const esResponse = await client.search(clientPayload);
    console.log(`Response with status code ${esResponse.statusCode}!`)

    // return JSON.stringify(esResponse)
    // return { success: true };
    return esResponse.body;
  }
};
