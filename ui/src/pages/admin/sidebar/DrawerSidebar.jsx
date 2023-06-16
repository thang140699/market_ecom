import { Drawer } from "antd";
import React from "react";

const DrawerSidebar = (props) => {
  const { onClose, open } = props;
  return (
    <div>
      {" "}
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
};

export default DrawerSidebar;
