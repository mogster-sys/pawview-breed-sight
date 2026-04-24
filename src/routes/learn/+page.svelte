<script lang="ts">
  import { Menu, Settings, Palette, Telescope, Compass, Zap, Moon, Sparkles, Eye, Magnet } from 'lucide-svelte';
</script>

<svelte:head>
  <title>The Chronicle - My Doggles</title>
</svelte:head>

<div class="min-h-screen bg-surface pb-24">
  <!-- Top App Bar -->
  <nav class="bg-surface sticky top-0 z-30">
    <div class="px-5 py-4 flex items-center justify-between border-b-[1.5px] border-tertiary-container/40">
      <a href="/" class="p-1 -ml-1 text-ink" aria-label="Menu">
        <Menu size={22} strokeWidth={1.75} />
      </a>
      <h1 class="font-display text-base font-bold tracking-[0.05em] text-ink">MYDOGGLES</h1>
      <a href="/camera" class="p-1 -mr-1 text-ink" aria-label="Settings">
        <Settings size={20} strokeWidth={1.75} />
      </a>
    </div>
  </nav>

  <!-- Header -->
  <div class="px-5 pt-6 pb-4">
    <div class="bg-tertiary-container text-tertiary-on inline-block px-3 py-1.5 mb-5">
      <p class="font-label text-[10px] font-bold uppercase tracking-[0.2em]">The Chronicle</p>
    </div>

    <h2 class="font-display text-5xl font-bold tracking-tight text-ink leading-[0.85] mb-2">
      The<br/>Science
    </h2>
    <div class="w-12 h-0.5 bg-tertiary my-4"></div>
    <p class="font-body text-base text-ink-muted leading-relaxed italic max-w-md">
      A technical dossier of the canine soul. Chronicle your adventures in the low-stakes world of canine exploration.
    </p>
  </div>

  <!-- Articles -->
  <div class="px-5 pt-4 space-y-4">

    <!-- Colour Vision -->
    <article class="bg-surface-low">
      <div class="px-5 pt-5 pb-3 border-b border-tertiary-container/40">
        <div class="flex items-center gap-2 mb-2">
          <Palette size={14} class="text-tertiary" strokeWidth={1.75} />
          <p class="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary">Dossier No. 01 &middot; Perception</p>
        </div>
        <h3 class="font-display text-2xl font-bold text-ink leading-tight">Colour Vision</h3>
      </div>
      <div class="px-5 py-5">
        <p class="font-body text-ink-muted leading-relaxed">
          Dogs are dichromats, meaning they possess two types of colour receptors compared to our three.
          They perceive the world in shades of blue and yellow. Red and green appear as
          shades of yellow and grey to them &mdash; a fundamentally different experience of colour,
          which this instrument simulates in real time.
        </p>
      </div>
    </article>

    <!-- Retinal Configurations -->
    <article class="bg-surface-low">
      <div class="px-5 pt-5 pb-3 border-b border-tertiary-container/40">
        <div class="flex items-center gap-2 mb-2">
          <Telescope size={14} class="text-tertiary" strokeWidth={1.75} />
          <p class="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary">Dossier No. 02 &middot; Anatomy</p>
        </div>
        <h3 class="font-display text-2xl font-bold text-ink leading-tight">Retinal Configurations</h3>
      </div>
      <div class="px-5 py-5 space-y-5">
        <div>
          <div class="bg-tertiary-container text-tertiary-on px-2 py-0.5 font-label text-[9px] font-bold uppercase tracking-[0.18em] inline-block mb-2">VS &middot; Visual Streak</div>
          <p class="font-body text-sm text-ink-muted leading-relaxed">
            Common in long-nosed breeds — Greyhounds, Blue Heelers, Collies. A horizontal band of
            densely packed receptor cells provides excellent peripheral vision and horizon scanning,
            perfect for tracking prey across open landscapes.
          </p>
        </div>
        <div>
          <div class="bg-secondary text-secondary-on px-2 py-0.5 font-label text-[9px] font-bold uppercase tracking-[0.18em] inline-block mb-2">AC &middot; Area Centralis</div>
          <p class="font-body text-sm text-ink-muted leading-relaxed">
            Found in flat-faced breeds — Pugs, Bulldogs. A concentrated spot of receptor cells
            provides sharper central focus and detail recognition, ideal for face-to-face interaction
            and close companionship.
          </p>
        </div>
      </div>
    </article>

    <!-- Field of View -->
    <article class="bg-surface-low">
      <div class="px-5 pt-5 pb-3 border-b border-tertiary-container/40">
        <div class="flex items-center gap-2 mb-2">
          <Compass size={14} class="text-tertiary" strokeWidth={1.75} />
          <p class="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary">Dossier No. 03 &middot; Geometry</p>
        </div>
        <h3 class="font-display text-2xl font-bold text-ink leading-tight">Field of View</h3>
      </div>
      <div class="px-5 py-5">
        <p class="font-body text-ink-muted leading-relaxed">
          Dogs have a wider field of view than humans: 240&ndash;270&deg; compared to our 180&deg;. This varies
          significantly by breed. Long-snouted breeds have the widest fields, while flat-faced breeds
          trade breadth for more forward-focused, binocular vision.
        </p>
      </div>
    </article>

    <!-- Motion Detection -->
    <article class="bg-surface-low">
      <div class="px-5 pt-5 pb-3 border-b border-tertiary-container/40">
        <div class="flex items-center gap-2 mb-2">
          <Zap size={14} class="text-tertiary" strokeWidth={1.75} />
          <p class="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary">Dossier No. 04 &middot; Motion</p>
        </div>
        <h3 class="font-display text-2xl font-bold text-ink leading-tight">Motion &amp; Flicker Fusion</h3>
      </div>
      <div class="px-5 py-5 space-y-4">
        <p class="font-body text-ink-muted leading-relaxed">
          Dogs excel at detecting movement, especially at a distance. They can spot motion up to
          900 metres away, though their ability to identify static objects at that distance is
          considerably poorer. This is why your dog may ignore a still ball but chase one that moves &mdash;
          their visual system is tuned for tracking, not recognition.
        </p>
        <p class="font-body text-ink-muted leading-relaxed">
          Dogs also perceive time differently. Their flicker fusion rate is around 80Hz compared to our 60Hz &mdash;
          meaning they literally see faster than we do. Older televisions at 60Hz looked like a strobe light
          to dogs. Modern high-refresh screens are finally catching up to canine perception.
        </p>
      </div>
    </article>

    <!-- Night Vision -->
    <article class="bg-surface-low">
      <div class="px-5 pt-5 pb-3 border-b border-tertiary-container/40">
        <div class="flex items-center gap-2 mb-2">
          <Moon size={14} class="text-tertiary" strokeWidth={1.75} />
          <p class="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary">Dossier No. 05 &middot; Low Light</p>
        </div>
        <h3 class="font-display text-2xl font-bold text-ink leading-tight">Night Vision &amp; Tapetum Lucidum</h3>
      </div>
      <div class="px-5 py-5 space-y-4">
        <p class="font-body text-ink-muted leading-relaxed">
          Dogs see dramatically better in low light than humans, thanks to three adaptations working together:
          a rod-dominated retina packed with motion-sensitive cells, larger pupils that let in more light,
          and the tapetum lucidum &mdash; a reflective layer behind the retina that bounces light back through
          the photoreceptors for a second pass. This is what makes dogs' eyes glow in photographs.
        </p>
        <p class="font-body text-ink-muted leading-relaxed">
          The tapetum reflects green-yellow light, effectively giving each photon two chances to be detected.
          Combined, these adaptations give dogs roughly five times better vision in dim conditions than humans.
        </p>
      </div>
    </article>

    <!-- UV Vision -->
    <article class="bg-surface-low">
      <div class="px-5 pt-5 pb-3 border-b border-tertiary-container/40">
        <div class="flex items-center gap-2 mb-2">
          <Sparkles size={14} class="text-tertiary" strokeWidth={1.75} />
          <p class="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary">Dossier No. 06 &middot; Hidden Spectrum</p>
        </div>
        <h3 class="font-display text-2xl font-bold text-ink leading-tight">Ultraviolet Vision</h3>
      </div>
      <div class="px-5 py-5 space-y-4">
        <p class="font-body text-ink-muted leading-relaxed">
          Unlike humans, dogs' lenses transmit ultraviolet light. While they may not possess a dedicated UV cone,
          UV wavelengths still reach their retina &mdash; meaning they perceive a dimension of light invisible to us.
          Research from the Royal Society confirms UV sensitivity is widespread among mammals.
        </p>
        <p class="font-body text-ink-muted leading-relaxed">
          The practical effect? Urine, saliva, and other biological markers fluoresce under UV light.
          Your dog isn't merely sniffing that lamp post &mdash; they can likely see scent markings glowing.
        </p>
      </div>
    </article>

    <!-- Visual Acuity -->
    <article class="bg-surface-low">
      <div class="px-5 pt-5 pb-3 border-b border-tertiary-container/40">
        <div class="flex items-center gap-2 mb-2">
          <Eye size={14} class="text-tertiary" strokeWidth={1.75} />
          <p class="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary">Dossier No. 07 &middot; Resolution</p>
        </div>
        <h3 class="font-display text-2xl font-bold text-ink leading-tight">Visual Acuity</h3>
      </div>
      <div class="px-5 py-5">
        <p class="font-body text-ink-muted leading-relaxed">
          Dogs have approximately 20/75 vision, meaning what a human sees sharply at 75 feet, a dog
          needs to be at 20 feet to see with the same clarity. Their world is inherently softer than ours.
          This is no deficiency &mdash; their visual system trades fine detail for superior motion detection,
          wider peripheral coverage, and vastly better night vision. Every adaptation is a trade-off,
          and dogs evolved to optimise for a very different set of priorities than we did.
        </p>
      </div>
    </article>

    <!-- Magnetic Sense -->
    <article class="bg-primary text-primary-on">
      <div class="px-5 pt-5 pb-3 border-b border-primary-on/20">
        <div class="flex items-center gap-2 mb-2">
          <Magnet size={14} class="text-primary-on/70" strokeWidth={1.75} />
          <p class="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-primary-on/70">Dossier No. 08 &middot; The Extraordinary</p>
        </div>
        <h3 class="font-display text-2xl font-bold leading-tight">Magnetic Field Perception</h3>
      </div>
      <div class="px-5 py-5">
        <p class="font-body leading-relaxed opacity-90">
          Perhaps the most remarkable discovery in canine vision research: dogs may be able to see Earth's
          magnetic field. Researchers at the Max Planck Institute found cryptochrome 1 &mdash; a light-sensitive
          protein involved in magnetic orientation &mdash; in dog photoreceptors. Studies show dogs preferentially
          align north-south when defecating, and lost dogs appear to perform a "compass run" along the
          north-south axis before navigating home. Your dog's eyes may contain a built-in compass.
        </p>
      </div>
    </article>

  </div>

  <!-- Footer -->
  <footer class="mt-12 px-5 py-6 text-center">
    <p class="font-label text-[10px] text-ink-faint uppercase tracking-[0.2em]">The Chronicle &middot; Vol. I &middot; End of Records</p>
  </footer>
</div>
