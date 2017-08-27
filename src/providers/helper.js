import { propOr } from 'ramda';

const labelReplacerFromDictionary = (label: string, dictionary: {[string]: string}): string => {
    return propOr(label, label, dictionary);
};

export { labelReplacerFromDictionary };