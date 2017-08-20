// TODO: Add deep flowtypes for the following data types

const AdobeAudienceManager = {
  canonicalName: 'AdobeAudienceManager',
  logo: 'adobe-audience-manager.png',
  pattern: /smetrics\.realestate\.com\.au/,
  transformer: (data) => {
    return data;
  }
};

export { AdobeAudienceManager };
