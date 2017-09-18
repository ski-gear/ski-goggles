import { expect } from 'chai';
import { describe, it } from 'mocha';
import { AdobeAudienceManager } from '../adobe_audience_manager';
import { path } from 'ramda';

describe('Adobe Analytics Manager', () => {
    describe('transformer', () => {
        describe('Title', () => {
            describe('When the data contains \'pe\' param', () => {
                describe('When no events are populated', () => {
                    const webRequestData = {
                        meta: {},
                        params: [
                            { label: 'pe', value: 'link_o', valueType: 'string' }
                        ]
                    };
                    const transformed = AdobeAudienceManager.transformer(webRequestData);
                    it('returns the label Unknown Event', () => {
                        expect(path(['meta', 'title'], transformed)).to.eql('Unknown Event');
                    });
                });

                describe('When an event is populated', () => {
                    const webRequestData = {
                        meta: {},
                        params: [
                            { label: 'pe', value: 'link_o', valueType: 'string' },
                            { label: 'events', value: 'event1', valueType: 'string' }
                        ]
                    };
                    const transformed = AdobeAudienceManager.transformer(webRequestData);
                    it('returns the correct event', () => {
                        expect(path(['meta', 'title'], transformed)).to.eql('event1');
                    });
                });
            });
            describe('When the data does not contain \'pe\' param', () => {
                const webRequestData = {
                    meta: {},
                    params: [
                        { label: 'pet', value: 'link_o', valueType: 'string' }
                    ]
                };
                const transformed = AdobeAudienceManager.transformer(webRequestData);
                it('returns the Page Load label', () => {
                    expect(path(['meta', 'title'], transformed)).to.eql('Page Load');
                });

                describe('and contains events data', () => {
                    const webRequestData = {
                        meta: {},
                        params: [
                            { label: 'pet', value: 'link_o', valueType: 'string' },
                            { label: 'events', value: 'event1', valueType: 'string' }
                        ]
                    };
                    const transformed = AdobeAudienceManager.transformer(webRequestData);
                    it('returns Page Load label with events', () => {
                        expect(path(['meta', 'title'], transformed)).to.eql('Page Load (event1)');
                    });
                });
            });
        });
    });
});