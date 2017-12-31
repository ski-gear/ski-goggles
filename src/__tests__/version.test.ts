import { expect } from 'chai';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppVersion } from '../Versions';

describe('App Version', () => {
    describe('Chrome Manifest', () => {
        let chromeManifest = require('../chrome/manifest.json');

        it('has the correct version', () => {
            expect(chromeManifest['version']).to.eq(AppVersion);
        });
    });

    describe('Package.json', () => {
        let pkg = require('./package.json');

        it('has the correct version', () => {
            expect(pkg['version']).to.eq(AppVersion);
        });
    });
});
