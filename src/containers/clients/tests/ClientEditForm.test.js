// Test ClientEditForm
import React from "react";
import { shallow } from "enzyme";

import { ClientEditForm } from "../ClientEditForm";
import * as fixtures from "../../../store/clients/tests/fixtures";
import FormView from "../../../components/FormView";
import ClientForm from "../ClientForm";

describe("containers/client/ClientEditForm", () => {
  it("renders without crashing", () => {
    shallow(
      <ClientEditForm
        match={{
          params: {
            id: "1"
          }
        }}
        noTitle={function() {}}
        fetchClient={function() {}}
      />
    );
  });

  it("renders both Form View and ClientForm with correct Data", () => {
    const wrapper = shallow(
      <ClientEditForm
        match={{
          params: {
            id: "1"
          }
        }}
        noTitle={function() {}}
        fetchClient={function() {}}
        clientById={fixtures.clientById}
      />
    ).dive();
  });
});
