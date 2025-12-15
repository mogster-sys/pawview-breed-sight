import { Navbar } from "@/components/Navbar";
import { SEO } from "@/components/SEO";
import { EducationPanel } from "@/components/EducationPanel";

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-50 to-yellow-100">
      <SEO
        title="Learn About Dog Vision"
        description="Discover how dogs see the world. Learn about canine color perception, retinal configurations, and breed-specific vision differences."
        canonical="/learn"
      />
      <Navbar />
      <EducationPanel />
    </div>
  );
}
