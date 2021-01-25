import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import { Header } from ".";

describe("Component Header", () => {
  const leftChild = () => <div>leftChild</div>;
  const rightChild = () => <div>rightChild</div>;

  const header = TestRenderer.create(<Header className="testclass" />);

  it("correct props", () => {
    expect(header.root.props.className).toBe("testclass");
  });

  it("correct render without childs", () => {
    expect(header.toJSON()).toMatchSnapshot();
  });

  it("correct render with childs", () => {
    const headerWithChilds = TestRenderer.create(
      <Header className="testclass" left={leftChild()} right={rightChild()} />,
    );
    expect(headerWithChilds.toJSON()).toMatchSnapshot();
  });
});
