
import { Navbar } from "@/components/Navbar";
import { EducationPanel } from "@/components/EducationPanel";

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-50 to-yellow-100">
      <Navbar />
      <EducationPanel />
    </div>
  );
}
