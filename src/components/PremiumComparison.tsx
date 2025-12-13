import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Lock, Sparkles, Image, Zap } from "lucide-react";

export const PremiumComparison = () => {
  const [isPremium, setIsPremium] = useState(false);

  return (
    <Card className="overflow-hidden border-2 border-primary/20">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Sparkles className="text-primary" />
          Interactive Feature Comparison
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Slide to see the difference between Free and Premium
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Toggle Slider */}
        <div className="flex items-center justify-center gap-4 py-4">
          <span className={`text-sm font-medium transition-colors ${!isPremium ? 'text-foreground' : 'text-muted-foreground'}`}>
            Free
          </span>
          <div className="w-48">
            <Slider
              value={[isPremium ? 100 : 0]}
              onValueChange={(value) => setIsPremium(value[0] > 50)}
              max={100}
              step={1}
              className="cursor-pointer"
            />
          </div>
          <span className={`text-sm font-medium transition-colors ${isPremium ? 'text-primary' : 'text-muted-foreground'}`}>
            Premium
          </span>
        </div>

        {/* Visual Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Daily Simulations */}
          <Card className={`transition-all duration-300 ${isPremium ? 'border-primary shadow-lg scale-105' : 'opacity-60'}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className={isPremium ? 'text-primary' : 'text-muted-foreground'} size={20} />
                  <h3 className="font-semibold">Daily Simulations</h3>
                </div>
                {isPremium && <Badge variant="default">Premium</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                {isPremium ? (
                  <div className="animate-scale-in">
                    <div className="text-4xl font-black text-primary mb-2">∞</div>
                    <p className="text-sm text-muted-foreground">Unlimited simulations</p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="text-4xl font-black text-muted-foreground mb-2">10</div>
                    <p className="text-sm text-muted-foreground">per day</p>
                    <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/20" size={80} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Photo Storage */}
          <Card className={`transition-all duration-300 ${isPremium ? 'border-primary shadow-lg scale-105' : 'opacity-60'}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image className={isPremium ? 'text-primary' : 'text-muted-foreground'} size={20} />
                  <h3 className="font-semibold">Photo Gallery</h3>
                </div>
                {isPremium && <Badge variant="default">Premium</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                {isPremium ? (
                  <div className="animate-scale-in">
                    <div className="text-4xl font-black text-primary mb-2">✓</div>
                    <p className="text-sm text-muted-foreground">Unlimited storage</p>
                    <p className="text-xs text-muted-foreground mt-1">Save & organize all photos</p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="text-4xl font-black text-muted-foreground mb-2">✗</div>
                    <p className="text-sm text-muted-foreground">Not available</p>
                    <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/20" size={80} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Retinal Modes */}
          <Card className={`transition-all duration-300 ${isPremium ? 'border-primary shadow-lg scale-105' : 'opacity-60'}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className={isPremium ? 'text-primary' : 'text-muted-foreground'} size={20} />
                  <h3 className="font-semibold">Retinal Modes</h3>
                </div>
                {isPremium && <Badge variant="default">Premium</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                {isPremium ? (
                  <div className="animate-scale-in space-y-2">
                    <div className="flex flex-wrap justify-center gap-2">
                      <Badge variant="secondary" className="text-xs">Basic</Badge>
                      <Badge variant="secondary" className="text-xs">Peripheral</Badge>
                      <Badge variant="secondary" className="text-xs">Foveal</Badge>
                      <Badge variant="secondary" className="text-xs">Advanced</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">All modes unlocked</p>
                  </div>
                ) : (
                  <div className="relative">
                    <Badge variant="outline" className="text-xs mb-2">Basic only</Badge>
                    <p className="text-sm text-muted-foreground">Limited access</p>
                    <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/20" size={80} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Breed Filters */}
          <Card className={`transition-all duration-300 ${isPremium ? 'border-primary shadow-lg scale-105' : 'opacity-60'}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-xl ${isPremium ? 'text-primary' : 'text-muted-foreground'}`}>🐕</span>
                  <h3 className="font-semibold">Breed Filters</h3>
                </div>
                {isPremium && <Badge variant="default">Premium</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                {isPremium ? (
                  <div className="animate-scale-in">
                    <div className="text-4xl font-black text-primary mb-2">30+</div>
                    <p className="text-sm text-muted-foreground">All dog breeds</p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="text-4xl font-black text-muted-foreground mb-2">5</div>
                    <p className="text-sm text-muted-foreground">Basic breeds only</p>
                    <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/20" size={80} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Message */}
        <div className={`text-center py-4 px-6 rounded-lg transition-all duration-300 ${
          isPremium 
            ? 'bg-primary/10 border-2 border-primary/20' 
            : 'bg-muted/50 border-2 border-border'
        }`}>
          <p className={`font-semibold ${isPremium ? 'text-primary' : 'text-muted-foreground'}`}>
            {isPremium 
              ? 'Premium features' 
              : 'Free features'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
