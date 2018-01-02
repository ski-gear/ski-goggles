import {WebRequestPayload} from '../../../types/Types';
import * as React from "react";
import * as Enzyme from "enzyme";
import { expect } from "chai";
import WebRequests from "../WebRequests";
import "mocha";
import { Image, Label } from "semantic-ui-react";
import * as Sinon from "sinon";
import { wrps, wrp } from './Fixtures';
import Title from '../Title';
import { Detail } from '../detail/Detail';

describe.only("WebRequests", () => {
  const addSpy = Sinon.spy();
  const removeSpy = Sinon.spy();
  const addSnapshot = () => { return "Added!" }
  const removeSnapshot = () => { return "Removed!" }

  const props = {
    snapshots: [ wrps ],
    data: [ wrp ],
    chromeId: "awesome-chromeid",
    addSnapshot,
    removeSnapshot,
  };

  const wrComponent = Enzyme.mount(<WebRequests snapshots={props.snapshots} data={props.data} chromeId={props.chromeId} addSnapshot={props.addSnapshot} removeSnapshot={props.removeSnapshot}/>);

  it("Passes the correct props to Title", () => {
    const title = wrComponent.find(Title);
    expect(title.props()['title']).to.eq(wrp.provider.displayName)
    expect(title.props()['logo']).to.eq(wrp.provider.logo)
    expect(title.props()['timeStamp']).to.eq(wrp.timeStamp)
  });

  it("Passes the correct props to Detail", () => {
    const detail = wrComponent.find(Detail);
    expect(detail.props()['payload']).to.eq(wrp)
    expect(detail.props()['addSnapshot'](wrps)).to.eq('Added!')
    expect(detail.props()['removeSnapshot'](wrps)).to.eq('Removed!')
    expect(detail.props()['snapshots']).to.eq(props.snapshots)
  });

});
