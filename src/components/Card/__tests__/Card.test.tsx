// Link.react.test.js
import renderer from "react-test-renderer";
import Card from "..";
import { Tool } from "../../../types";

const MockTool: Tool = {
  id: 0,
  title: "Mock tool",
  link: "http://localhost:8000",
  description: "Lorem ipsum dolor sit amet.",
  tags: ["php"],
};

const handleDeleteTool = (id: number) => {
  //
};

test("Should render a card", () => {
  const component = renderer.create(
    <Card tool={MockTool} handleDeleteTool={handleDeleteTool} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
