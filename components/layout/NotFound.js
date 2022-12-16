import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="page-not-found-wrapper">
      <h1 id="title_404">404!</h1>
      <h3 id="description_404">
        Page Not Found. Go to <Link href="/">Home Page</Link>
      </h3>
    </div>
  );
};

export default NotFound;
