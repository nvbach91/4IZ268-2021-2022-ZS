import React, { useState } from "react";
import { useAuth } from "../hook/AuthContext";
import "./MainView.css";
import Layout from "./layout/Layout";
import EventOverview from "./events/EventOverview";
import Button from "./controls/Button";

const MainView = () => {
  const { user, signIn } = useAuth();
  const [reloadEvents, setReloadEvents] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleReloadEvents = (value) => {
    setReloadEvents(value);
  };

  const handleFilter = (value) => {
    setFilterOpen(value);
  };
  if (!user) {
    return (
      <div className="container flex flex-col justify-center items-center h-screen">
        <span>Login with Google to enter</span>
        <Button onClick={signIn} className="bg-blue-700">
          Login
        </Button>
      </div>
    );
  }

  return (
    <Layout
      reloadEvents={handleReloadEvents}
      toggleFilter={handleFilter}
      filterOpen={filterOpen}
    >
      <div className="space-y-2">
        <EventOverview
          reloadEvents={reloadEvents}
          setReloadEvents={handleReloadEvents}
          isFilterOpen={filterOpen}
        />
      </div>
    </Layout>
  );
};

export default MainView;
