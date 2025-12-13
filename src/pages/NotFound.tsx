import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-yellow-50 to-yellow-100">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to My Doggles home page."
      />
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-blue-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! This page ran away like a puppy!</p>
        <Button asChild size="lg" className="min-h-[44px]">
          <Link to="/">
            <Home className="w-5 h-5 mr-2" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
