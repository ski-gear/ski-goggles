import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Snowplow } from '../snowplow';
import { path, map, prop } from 'ramda';
import { snowplowFixture } from './fixtures';

describe('Snowplow', () => {
    describe('Title', () => {
        describe('When the data contains \'ue_px\' param', () => {
            const webRequestData = {
                meta: {},
                params: [
                    { label: 'ue_px', value: snowplowFixture.ue_px, valueType: 'json' },
                    { label: 'e', value: 'ue', valueType: 'string' }
                ]
            };
            const transformed = Snowplow.transformer(webRequestData);
            it('returns the event_name as the Title', () => {
                expect(path(['meta', 'title'], transformed)).to.eql('property_details_carousel_click');
            });
        });

        describe('When the data does not contain \'ue_px\' param', () => {
            const webRequestData = {
                meta: {},
                params: [
                    { label: 'e', value: 'pv', valueType: 'string' }
                ]
            };
            const transformed = Snowplow.transformer(webRequestData);
            it('returns the event_name as the Title', () => {
                expect(path(['meta', 'title'], transformed)).to.eql('Page View');
            });
        });
    });

    describe('transformer', () => {
        describe('JSON parsing', () => {
            map((param) => {
                describe(`When the data contains ${param} param`, () => {
                    describe('with a good payload', () => {
                        const webRequestData = {
                            meta: {},
                            params: [
                                { label: param, value: prop(param, snowplowFixture), valueType: 'json' }
                            ]
                        };
                        const transformed = Snowplow.transformer(webRequestData);
                        it('Payload is decoded', () => {
                            const payload = JSON.parse(path(['params', 0, 'value'], transformed));
                            expect(payload).to.be.an('object');
                        });
                    });

                    describe('with a bad payload', () => {
                        const webRequestData = {
                            meta: {},
                            params: [
                                { label: param, value: 'not-a-good-payload', valueType: 'json' }
                            ]
                        };
                        const transformer = () => Snowplow.transformer(webRequestData);

                        it('Handles the JSON error gracefully', () => {
                            expect(transformer).to.not.throw(SyntaxError);
                        });

                        it('returns a JSON object indicating an error message', () => {
                            expect(JSON.parse(
                                path(['params', 0, 'value'], transformer())
                            )).to.eql({ bad: 'data' });
                        });
                    });
                });
            }, ['ue_px', 'cx']);
        });
    });

    describe('When a label is present that needs replacing', () => {
        const webRequestData = {
            meta: {},
            params: [
                { label: 'cx', value: 'test', valueType: 'json' },
            ]
        };
        const transformed = Snowplow.transformer(webRequestData);
        it('sets the correct label', () => {
            expect(path(['params', 0, 'label'], transformed)).to.eql('Context Payload');
        });
    });
});
