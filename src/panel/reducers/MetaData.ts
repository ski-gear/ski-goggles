import {
  ADD_CHROME_ID,
  AddChromeId,
  MetaDataAction,
} from "../actions/MetaData"
import { PanelMetaData } from "../../types/Types";
import { assoc } from "ramda";

const initialState: PanelMetaData = {
  chromeId: ''
}
export const metaData = (state: PanelMetaData = initialState, action: MetaDataAction): PanelMetaData => {
  switch (action.type) {
    case ADD_CHROME_ID:
      return assoc("chromeId", action.chromeId, state);
    default:
      return state;
  }
};
