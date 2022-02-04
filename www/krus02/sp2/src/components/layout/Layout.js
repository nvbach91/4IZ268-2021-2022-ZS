import Header from "../header/Header";

const Layout = ({ children, reloadEvents, filterOpen, toggleFilter }) => {
  return (
    <>
      <header>
        <Header
          reloadEvents={reloadEvents}
          toggleFilter={toggleFilter}
          filterOpen={filterOpen}
        />
      </header>
      <main className="container pt-10">{children}</main>
    </>
  );
};

export default Layout;
