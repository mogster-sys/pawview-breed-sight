import { Navbar } from "@/components/Navbar";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Dog, Camera, BookText, Folder } from "lucide-react";

const HomeAction = ({
  icon,
  label,
  desc,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
  href: string;
}) => (
  <Link
    to={href}
    className="flex flex-col justify-between items-center border rounded-xl bg-white shadow-md hover:shadow-xl transition p-8 min-w-[260px] h-64 group"
  >
    <div className="mb-4">{icon}</div>
    <div>
      <div className="font-semibold text-xl text-blue-900 group-hover:text-yellow-500">{label}</div>
      <div className="text-gray-500 mt-2">{desc}</div>
    </div>
  </Link>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-50 to-yellow-100">
      <SEO
        title="My Doggles - See Through Your Dog's Eyes"
        description="Experience the world as your dog does. Simulate dog vision with breed-specific filters, retinal configurations, and live camera effects."
        canonical="/"
      />
      <Navbar />
      <div className="max-w-5xl mx-auto py-8 px-2">
        <header className="my-10 text-center">
          <h1 className="text-5xl font-extrabold text-blue-800 mb-4 drop-shadow">
            🦴 My Doggles
          </h1>
          <h2 className="text-xl font-medium text-blue-700 mb-8">
            Your dog sees the world different to you, share their experience with My Doggles
          </h2>
          <div className="text-lg text-gray-800 max-w-2xl mx-auto mb-7">
            All dogs have a different experience of color to humans, lacking red but did you know their visual field differs across breeds according to which of two configurations of retinal cells your dog has, an Area Centralis or Visual Streak. Select your dog's breed, activate the live camera filter, and see exactly how different dogs experience vision. Educational, fun, and science-backed!
          </div>
        </header>
        
        <div className="flex flex-wrap gap-8 justify-center items-stretch mt-10 mb-24">
          <HomeAction
            icon={<Camera className="text-yellow-400" size={54} />}
            label="Live Dog Vision Camera"
            desc="See through your dog's eyes in real time—choose retinal mode (AC/VS), split view comparison. Capture and save filtered 'dog view' photos!"
            href="/camera"
          />
          <HomeAction
            icon={<Folder className="text-blue-400" size={50} />}
            label="Photo Gallery"
            desc="View and compare your saved dog vision photos side-by-side. Analyze different breeds and retinal configurations."
            href="/gallery"
          />
          <HomeAction
            icon={<BookText className="text-blue-500" size={50} />}
            label="Learn & Compare"
            desc="Dive into breed vision facts, simulator types, and interactive education."
            href="/learn"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
