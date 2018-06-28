// Test NestedElement Map
import React from "react";
import { shallow, mount } from "enzyme";
import NestedElementMap from "../NestedElementMap";
import toJson from "enzyme-to-json";

describe("containers/NestedElementMap", () => {
  it("renders without crashing", () => {
    const detailItems = {
      Task: "Test",
      Amount: "4000 KES"
    };

    shallow(<NestedElementMap detailitems={detailItems} HTMLTag="td" />);
  });

  it("renders elements correctly", () => {
    const detailItems = {
      Task: "Test",
      Amount: "300034"
    };

    const wrapper = mount(
      <NestedElementMap detailitems={detailItems} HTMLTag="td" />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
