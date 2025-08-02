import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import InboxApp from "../components/InboxApp";

const InboxMessages = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState("Inbox Messages");

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeItem={activeSidebarItem}
        setActiveItem={setActiveSidebarItem}
      />
      <div className="flex-1">
        <InboxApp />
      </div>
    </div>
  );
};

export default InboxMessages;
