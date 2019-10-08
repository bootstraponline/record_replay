import 'regenerator-runtime/runtime';
import { Polly } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
import NodeHTTPAdapter from '@pollyjs/adapter-node-http';
import { expect } from 'Chai';
import { fetch } from 'cross-fetch';

/*
https://netflix.github.io/pollyjs/#/quick-start

1) First run generates Recorded ... message
2) HAR file is saved and replayed.
*/

/*
  Register the adapters and persisters we want to use. This way all future
  polly instances can access them by name.
*/
Polly.register(FSPersister);
Polly.register(NodeHTTPAdapter);

describe('Simple Example', function() {
  it('fetches a post', async function() {
    /*
      Create a new polly instance.

      Connect Polly to fetch. By default, it will record any requests that it
      hasn't yet seen while replaying ones it has already recorded.
    */
    const polly = new Polly('Simple Example', {
      adapters: ['node-http'],
      persister: FSPersister,
      persisterOptions: {
        fs: { recordingsDir: 'recordings' }
      },
      logging: true
    });

    polly.connectTo('node-http');

    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    const post = await response.json();

    expect(response.status).to.equal(200);
    expect(post.id).to.equal(1);

    /*
      Calling `stop` will persist requests as well as disconnect from any
      connected adapters.
    */
    await polly.stop();
  });
});
