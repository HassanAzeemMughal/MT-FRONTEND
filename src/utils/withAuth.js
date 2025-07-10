import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const withAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const router = useRouter();
    const pathname = usePathname(); // Get current path

    useEffect(() => {
      if (
        typeof window !== "undefined" &&
        !isAuthenticated &&
        pathname !== "/login"
      ) {
        router.push(`/auth/login?session=${encodeURIComponent(pathname)}`);
      }
    }, [isAuthenticated, pathname, router]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
