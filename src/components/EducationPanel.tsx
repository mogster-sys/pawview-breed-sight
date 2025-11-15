
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function EducationPanel() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 mt-12 mb-24 border">
      <h2 className="text-xl font-bold mb-4 text-blue-800">Learn about Dog Vision</h2>
      <Tabs defaultValue="retinal" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="retinal">Retinal Configurations</TabsTrigger>
          <TabsTrigger value="fields">Visual Fields by Breed</TabsTrigger>
          <TabsTrigger value="cells">Cell Distribution Types</TabsTrigger>
          <TabsTrigger value="facts">Quick Facts</TabsTrigger>
        </TabsList>
        <TabsContent value="retinal">
          <div className="space-y-4">
            <div>
              <p className="mb-3">Dogs have two primary retinal configurations that determine how they process visual information:</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="font-bold text-blue-700 mb-2">Area Centralis (AC)</div>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Found in:</span> Brachycephalic breeds (Pugs, Bulldogs, Boxers, Shih Tzus)</p>
                <p><span className="font-medium">Vision:</span> Enhanced central acuity for focused vision</p>
                <p><span className="font-medium">Best for:</span> Direct eye contact, reading facial expressions, face-to-face commands</p>
                <p><span className="font-medium">Screen viewing:</span> Better able to process localized visual information on screens</p>
                <p><span className="font-medium">TV watching:</span> Much more likely to be able to watch and engage with television content</p>
              </div>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <div className="font-bold text-yellow-700 mb-2">Visual Streak (VS)</div>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Found in:</span> Dolichocephalic breeds (Greyhounds, Collies, Wolves, Borzoi, Salukis, Afghan Hounds)</p>
                <p><span className="font-medium">Vision:</span> Optimized for scanning the horizon</p>
                <p><span className="font-medium">Best for:</span> Tracking movement across wide landscapes, detecting peripheral motion</p>
                <p><span className="font-medium">Field of view:</span> Up to 270° wide visual field</p>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded text-sm">
              <p><span className="font-medium">Mixed breeds:</span> Mesocephalic dogs (Labrador Retrievers, Beagles, Spaniels) offer a balance between focused and panoramic vision.</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="fields">
          <div className="space-y-3">
            <div className="font-semibold text-sm text-blue-700 mb-2">Dolichocephalic (Long snouts - Visual Streak)</div>
            <div className="ml-3 space-y-2">
              <div>
                <span className="font-medium text-gray-700">Greyhound, Borzoi, Saluki: </span>
                <span>Extremely wide field (~270°), exceptional peripheral awareness for tracking prey across landscapes.</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Afghan Hound, Collie: </span>
                <span>Very wide field (~260-265°), superior motion detection and landscape scanning.</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Doberman, Dachshund: </span>
                <span>Wide field (~250-260°), optimized for hunting and guarding roles.</span>
              </div>
            </div>
            
            <div className="font-semibold text-sm text-yellow-700 mb-2 mt-4">Mesocephalic (Medium snouts - Balanced)</div>
            <div className="ml-3 space-y-2">
              <div>
                <span className="font-medium text-gray-700">Labrador, Golden Retriever, German Shepherd: </span>
                <span>Balanced field (~240°), versatile vision for work and companionship.</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Siberian Husky, Australian Shepherd: </span>
                <span>Wide balanced field (~240-245°), great for herding and landscape scanning.</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Beagle, Poodle, Rottweiler: </span>
                <span>Moderate field (~235°), balanced peripheral and central vision.</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Corgi, Miniature Schnauzer, Yorkshire Terrier: </span>
                <span>Moderate field (~225-230°), alert companion vision.</span>
              </div>
            </div>
            
            <div className="font-semibold text-sm text-red-700 mb-2 mt-4">Brachycephalic (Flat faces - Area Centralis)</div>
            <div className="ml-3 space-y-2">
              <div>
                <span className="font-medium text-gray-700">Boxer: </span>
                <span>Moderate-narrow field (~210°), better central focus than peripheral.</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Bulldog, French Bulldog, Cavalier, Pug: </span>
                <span>Limited field (~190-200°), enhanced central focus for face-to-face interaction and excellent TV-watching ability.</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Shih Tzu: </span>
                <span>Reduced field (~190°), optimized for close companionship and direct eye contact.</span>
              </div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded mt-4">
              <span className="font-medium text-gray-700">Custom/Mixed Breed: </span>
              <span>Use the camera simulator to adjust settings for your dog's unique vision!</span>
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
