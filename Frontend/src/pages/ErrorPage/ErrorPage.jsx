import "./ErrorPage.css";

export default function errorPage() {
  return (
    <div className="error-page-container">
      <div className="my-5">
        {" "}
        <div className="p-5 text-center">
          {" "}
          <div className="container py-5">
            {" "}
            <h1 className="text-body-emphasis">404</h1>{" "}
            <p className="col-lg-8 mx-auto lead">
              Oops! The page you’re looking for doesn’t exist.
            </p>{" "}
            <a href="/" class="btn btn-primary rounded-pill mt-3">
              Go Back Home
            </a>
          </div>{" "}
        </div>{" "}
      </div>
    </div>
  );
}
