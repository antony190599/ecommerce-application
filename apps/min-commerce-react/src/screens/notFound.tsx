import { Link } from "react-router";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px 20px" }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" style={{ textDecoration: "underline", color: "blue" }}>
        Go back to home
      </Link>
    </div>
  );
};

export default NotFound;
