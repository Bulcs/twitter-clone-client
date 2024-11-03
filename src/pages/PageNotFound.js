import React from "react";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="not-found-container">
      <WarningAmberRoundedIcon className="error-icon" color="white" />
      <h1 className="h1-style-not-found">Page Not Found</h1>
      <Link className="redirect-to-home" to={"/"}>
        <p className="redirect-font">Redirect myself</p>
      </Link>
    </div>
  );
}

export default PageNotFound;
