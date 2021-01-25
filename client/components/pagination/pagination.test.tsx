import React from "react";
import TestRenderer from "react-test-renderer";
import { Pagination } from "client/components/pagination/pagination";

describe("Component Pagination", () => {
  it("renders all elements", () => {
    const component = TestRenderer.create(
      <Pagination
        firstPage={1}
        lastPage={5}
        currentPage={2}
        canGoToNextPage={false}
        canGoToPrevPage={false}
        onPageClick={() => {}}
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("shows next/prev buttons as disabled when can't go next/prev", () => {
    const component = TestRenderer.create(
      <Pagination
        firstPage={1}
        lastPage={3}
        currentPage={1}
        canGoToNextPage={false}
        canGoToPrevPage={false}
        onPageClick={() => {}}
      />,
    );
    const listItems = component.root.findAllByType("li", { deep: true });
    const goPrevButton = listItems[0];
    const goNextButton = listItems[listItems.length - 1];
    expect(goPrevButton.props.className.toString()).toContain("disabled");
    expect(goNextButton.props.className.toString()).toContain("disabled");
  });

  it("shows next/prev buttons as enabled when can go next/prev", () => {
    const component = TestRenderer.create(
      <Pagination
        firstPage={1}
        lastPage={3}
        currentPage={1}
        canGoToNextPage
        canGoToPrevPage
        onPageClick={() => {}}
      />,
    );
    const listItems = component.root.findAllByType("li", { deep: true });
    const goPrevButton = listItems[0];
    const goNextButton = listItems[listItems.length - 1];
    expect(goPrevButton.props.className.toString()).not.toContain("disabled");
    expect(goNextButton.props.className.toString()).not.toContain("disabled");
  });

  it("marks current page as active", () => {
    const component = TestRenderer.create(
      <Pagination
        firstPage={1}
        lastPage={3}
        currentPage={1}
        canGoToNextPage
        canGoToPrevPage
        onPageClick={() => {}}
      />,
    );

    let [
      ,
      firstPage,
      secondPage,
      thirdPage,
    ] = component.root.findAllByType("li", { deep: true });
    expect(firstPage.props.className.toString()).toContain("active");
    expect(secondPage.props.className.toString()).not.toContain("active");
    expect(thirdPage.props.className.toString()).not.toContain("active");

    TestRenderer.act(() => {
      component.update(
        <Pagination
          firstPage={1}
          lastPage={3}
          currentPage={2}
          canGoToNextPage
          canGoToPrevPage
          onPageClick={() => {}}
        />,
      );
    });

    [, firstPage, secondPage, thirdPage] = component.root.findAllByType("li", {
      deep: true,
    });
    expect(firstPage.props.className.toString()).not.toContain("active");
    expect(secondPage.props.className.toString()).toContain("active");
    expect(thirdPage.props.className.toString()).not.toContain("active");
  });
});
