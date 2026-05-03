import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-center">
        <h2 className="text-8xl font-bold mb-5">
          404
        </h2>

        <p className="text-2xl mb-5">
          Page Not Found
        </p>

        <Link to="/" className="btn btn-primary">
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;