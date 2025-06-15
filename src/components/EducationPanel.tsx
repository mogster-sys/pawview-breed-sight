
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function EducationPanel() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 mt-12 mb-24 border">
      <h2 className="text-xl font-bold mb-4 text-blue-800">Learn about Dog Vision</h2>
      <Tabs defaultValue="fields" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="fields">Visual Fields by Breed</TabsTrigger>
          <TabsTrigger value="cells">Cell Distribution Types</TabsTrigger>
          <TabsTrigger value="facts">Quick Facts</TabsTrigger>
        </TabsList>
        <TabsContent value="fields">
          <div className="space-y-2">
            <div>
              <span className="font-medium text-gray-700">Greyhound: </span>
              <span>Extremely wide field (~270°), more peripheral awareness.</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Labrador: </span>
              <span>Typical dog field (~240°), balanced central/peripheral view.</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Bulldog: </span>
              <span>Flatter face, more overlap but less side vision (~180°-200°).</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Custom/Mixed: </span>
              <span>Use the app sliders to tune to your dog's expected vision!</span>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="cells">
          <div>
            <div className="mb-2 font-semibold">Visual Cell Types:</div>
            <div className="mb-3">
              <span className="font-medium text-blue-700">1. Streak type:</span> High density of vision cells in a horizontal "streak" for scanning landscapes.<br />
              <span className="text-gray-500 text-xs">Seen in many hunting/herding breeds.</span>
            </div>
            <div>
              <span className="font-medium text-yellow-600">2. Area centralis type:</span> Most vision cells in a central, round patch—better focus but less side detail.<br />
              <span className="text-gray-500 text-xs">Common in companion/house breeds.</span>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="facts">
          <ul className="list-disc ml-6">
            <li>Dogs see shades of blue and yellow, but not red or orange ("dichromatic").</li>
            <li>Dogs' eyes detect motion and contrast better than humans, especially in low light.</li>
            <li>Visual field and acuity varies by breed; snout length and eye placement matters!</li>
            <li>Wider field of view = less overlap between eyes (less depth, more periphery).</li>
            <li>References: <a className="text-blue-600 underline" href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7026913/" target="_blank" rel="noopener">NCBI Canine Vision</a></li>
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
}
