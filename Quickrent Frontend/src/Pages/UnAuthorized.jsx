import { Link, useNavigate } from "react-router-dom";

function UnAuthorized() {
    return (
      <>
        {/* <MainNavbar/> */}
        <h3>You are not authorized to visit this page</h3>
        <br/>
        <Link to="/">Go to Home</Link>
      </>
    );
}

export default UnAuthorized;
  