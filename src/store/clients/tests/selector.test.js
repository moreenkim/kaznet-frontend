import Immutable from "seamless-immutable";
import { Selector } from "redux-testkit";

import * as clients from "../reducer";
import * as fixtures from "./fixtures";

const emptyState = Immutable({
  clients: {
    clientsById: {},
    clientsIdArray: []
  }
});

const fullState = Immutable({
  clients: {
    clientsById: fixtures.clientsById,
    clientsIdArray: fixtures.clientsIdArray
  }
});

describe("store/clients/selectors", () => {
  it("should get default clients by id when empty", () => {
    Selector(clients.getClientsById)
      .expect(emptyState)
      .toReturn({});
  });

  it("should get default clients ids array when empty", () => {
    Selector(clients.getClientsIdArray)
      .expect(emptyState)
      .toReturn([]);
  });

  it("should get clients by id when full", () => {
    Selector(clients.getClientsById)
      .expect(fullState)
      .toReturn(fixtures.clientsById);
  });

  it("should get clients ids array when full", () => {
    Selector(clients.getClientsIdArray)
      .expect(fullState)
      .toReturn(fixtures.clientsIdArray);
  });
});