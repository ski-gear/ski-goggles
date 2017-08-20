// TODO: Add deep flowtypes for the following data types

const Snowplow = {
  canonicalName: 'Snowplow',
  logo: 'snowplow.png',
  pattern: /sp\.eventus\-test\.net/,
  transformer: (data) => {
    return data;
  }
};

export { Snowplow };
