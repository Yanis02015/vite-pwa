import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function EmailPasswordComponentsOverride({
  DefaultComponent,
}: {
  DefaultComponent: React.ReactNode;
}) {
  return (
    <div
      style={{
        paddingTop: 90,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "30px",
        }}
      >
        <Link
          to="/"
          aria-label="revenir en arriere"
          title="Retour vers l'acceuil"
        >
          <img src={Logo} width={200} />
        </Link>
      </div>
      {DefaultComponent}
    </div>
  );
}
