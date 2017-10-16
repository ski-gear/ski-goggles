import { expect } from 'chai';
import { describe, it } from 'mocha';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppVersion } from '../versions';

describe('App Version', () => {
    describe('Chrome Manifest', () => {
        let manifestFile = join(__dirname, '..', 'chrome', 'manifest.json');
        let chromeManifest = JSON.parse(readFileSync(manifestFile, 'utf8'));

        it('has the correct version', () => {
            expect(chromeManifest['version'].toString()).to.eq(AppVersion.toFixed(1).toString());
        });
    });

    describe('Package.json', () => {
        let packageFile = join(__dirname, '..', '..', 'package.json');
        let pkg = JSON.parse(readFileSync(packageFile, 'utf8'));

        it('has the correct version', () => {
            expect(pkg['version'].toString()).to.eq(AppVersion.toFixed(1).toString());
        });
    });
});
