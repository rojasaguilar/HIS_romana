import { Link, Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <aside
        style={{
          width: "250px",
          padding: "1rem",
          borderRight: "1px solid gray",
        }}
      >
        <h2>Romana</h2>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          <Link to="/dashboard">Dashboard</Link>

          <Link to="/patients">Patients</Link>
        </nav>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "2rem",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};
