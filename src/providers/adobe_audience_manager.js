// @flow
import type { Provider } from '../types.js';

const AdobeAudienceManager: Provider = {
    canonicalName: 'AdobeAudienceManager',
    displayName: 'Adobe Audience Manager',
    logo: 'adobe-audience-manager.png',
    pattern: /smetrics\.realestate\.com\.au/,
    transformer: (data) => {
        return data;
    }
};

export { AdobeAudienceManager };
