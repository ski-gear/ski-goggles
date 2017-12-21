import { UserOptions } from "../../../types/Types";
import { ProviderCanonicalName } from "ski-providers";
import { connect, Dispatch } from "react-redux";
import ProvidersList from "../ProvidersList";
import { disableProviderAction, enableProviderAction } from "../../Actions";

const mapStateToProps = (state: UserOptions) => {
  return {
    data: state.providers,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    onDisableProvider: (provider: ProviderCanonicalName) => dispatch(disableProviderAction(provider)),
    onEnableProvider: (provider: ProviderCanonicalName) => dispatch(enableProviderAction(provider)),
  };
};

const VisibleProviders = connect(mapStateToProps, mapDispatchToProps)(ProvidersList);

export default VisibleProviders;
