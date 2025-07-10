import React, { Suspense } from "react";
import LoginInner from "../login/LoginInner";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginInner />
    </Suspense>
  );
};

export default LoginPage;
