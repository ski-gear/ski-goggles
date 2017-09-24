import { expect } from 'chai';
import { describe, it } from 'mocha';
import { map, propOr } from 'ramda';

import { getProvider } from '../matcher';
import { matchedUrls } from './fixtures';

describe('Matcher', () => {
    describe('getProvider', () => {
        map(
            (item) => {
                describe(`with a url of provider: ${item.provider}`, () => {
                    it('matches the right provider', () => {
                        const provider = propOr(null, 'displayName', getProvider(item.url));
                        expect(provider).to.eql(item.provider);
                    });
                });
            },
            matchedUrls
        );
    });
});
