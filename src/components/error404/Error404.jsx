import { Link } from "react-router-dom";
import "./error404.css";

function Error404() {
  return (
    <>
      <section className="errorPage">
        <div className="container">
          <div className="textContainer">
            <h1>Ooops!</h1>
            <p className="message">
              We can't seem to find the page you're looking for.
            </p>
            <span className="bold mr">Error 404.</span>
            <span>Not found</span>

            <Link className="link bold" to={"/dashboard"}>
              <p className="link-text">Go back to homepage</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Error404;
