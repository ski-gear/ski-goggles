export const ADD_CHROME_ID = "ADD_SNAPSHOT_ROW";

export interface MetaDataAction {
  type: string;
  chromeId: string;
}

export const AddChromeId = (chromeId: string): MetaDataAction => {
  return { type: ADD_CHROME_ID, chromeId };
};
