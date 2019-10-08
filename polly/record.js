import { Polly } from '@pollyjs/core';
import FetchAdapter from '@pollyjs/adapter-fetch';
import XHRAdapter from '@pollyjs/adapter-xhr';
import LocalStoragePersister from '@pollyjs/persister-local-storage';

Polly.register(FetchAdapter);
Polly.register(XHRAdapter);
Polly.register(LocalStoragePersister);

new Polly('<Recording Name>', {
  adapters: ['fetch', 'xhr'],
  persister: 'local-storage'
});
