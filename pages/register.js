import Register from "../components/auth/Register";
import Layout from "../components/layout/Layout";

import { getSession } from "next-auth/react";

export default function RegisterPage() {
  return (
    <Layout title="Register">
      <Register />
    </Layout>
  );
}
