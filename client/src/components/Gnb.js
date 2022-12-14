import { Menu } from "semantic-ui-react";

export default function Gnb() {
  const activeItem = "home";

  return (
    <Menu inverted style={{ marginTop: 0 }}>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        //   onClick={this.handleItemClick}
      />
      <Menu.Item
        name="about"
        active={activeItem === "about"}
        //   onClick={this.handleItemClick}
      />
      <Menu.Item
        name="category"
        active={activeItem === "category"}
        //   onClick={this.handleItemClick}
      />
    </Menu>
  );
}
