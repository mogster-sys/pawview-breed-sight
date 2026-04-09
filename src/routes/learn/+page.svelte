<svelte:head>
  <title>Learn About Dog Vision - My Doggles</title>
</svelte:head>

<div class="min-h-screen bg-surface">
  <nav class="bg-surface/80 backdrop-blur-[20px] sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <a href="/" data-sveltekit-reload class="text-ink-muted hover:text-primary transition" aria-label="Back to home">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </a>
        <a href="/" data-sveltekit-reload class="font-display text-2xl font-bold tracking-tight text-ink">MYDOGGLES</a>
      </div>
      <div class="flex gap-6">
        <a href="/camera" data-sveltekit-reload class="font-label text-sm font-medium uppercase tracking-wide text-ink-muted hover:text-primary transition">Camera</a>
        <a href="/gallery" data-sveltekit-reload class="font-label text-sm font-medium uppercase tracking-wide text-ink-muted hover:text-primary transition">Gallery</a>
        <a href="/learn" data-sveltekit-reload class="font-label text-sm font-medium uppercase tracking-wide text-primary">Your Dog</a>
      </div>
    </div>
  </nav>

  <div class="max-w-4xl mx-auto px-6 pt-12 pb-20">
    <p class="font-label text-xs font-semibold uppercase tracking-widest text-tertiary mb-3">The Science</p>
    <h1 class="font-display text-4xl md:text-5xl font-bold tracking-tight text-ink mb-12 leading-[0.95]">How Dogs<br/>See The World</h1>

    <div class="space-y-0">
      <!-- Colour Vision -->
      <section class="bg-surface-low p-8 md:p-10">
        <p class="font-label text-xs font-semibold uppercase tracking-widest text-tertiary mb-3">Perception</p>
        <h2 class="font-display text-2xl font-semibold text-ink mb-4">Colour Vision</h2>
        <p class="font-body text-ink-muted leading-relaxed">
          Dogs are dichromats, meaning they have two types of colour receptors compared to our three.
          They perceive the world in shades of blue and yellow. Red and green appear as
          shades of yellow and grey to them &mdash; a fundamentally different experience of colour
          that My Doggles simulates in real time.
        </p>
      </section>

      <!-- Retinal Configurations -->
      <section class="bg-surface-mid p-8 md:p-10">
        <p class="font-label text-xs font-semibold uppercase tracking-widest text-tertiary mb-3">Anatomy</p>
        <h2 class="font-display text-2xl font-semibold text-ink mb-6">Retinal Configurations</h2>
        <div class="grid md:grid-cols-2 gap-0">
          <div class="bg-surface-low p-6">
            <div class="bg-tertiary-container text-tertiary-on px-3 py-1 font-label text-xs uppercase tracking-widest inline-block mb-3">VS</div>
            <h3 class="font-display text-lg font-semibold text-ink mb-2">Visual Streak</h3>
            <p class="font-body text-ink-muted text-sm leading-relaxed">
              Common in long-nosed breeds like Greyhounds, Blue Heelers, and Collies. A horizontal band of
              densely packed receptor cells provides excellent peripheral vision and horizon scanning &mdash;
              perfect for tracking prey across open landscapes.
            </p>
          </div>
          <div class="bg-surface p-6">
            <div class="bg-secondary text-secondary-on px-3 py-1 font-label text-xs uppercase tracking-widest inline-block mb-3">AC</div>
            <h3 class="font-display text-lg font-semibold text-ink mb-2">Area Centralis</h3>
            <p class="font-body text-ink-muted text-sm leading-relaxed">
              Found in flat-faced breeds like Pugs and Bulldogs. A concentrated spot of receptor cells
              provides sharper central focus and detail recognition &mdash; ideal for face-to-face interaction
              and close companionship.
            </p>
          </div>
        </div>
      </section>

      <!-- Field of View -->
      <section class="bg-surface-high p-8 md:p-10">
        <p class="font-label text-xs font-semibold uppercase tracking-widest text-tertiary mb-3">Geometry</p>
        <h2 class="font-display text-2xl font-semibold text-ink mb-4">Field of View</h2>
        <p class="font-body text-ink-muted leading-relaxed">
          Dogs have a wider field of view than humans: 240&ndash;270&deg; compared to our 180&deg;. This varies
          significantly by breed. Long-snouted breeds have the widest fields, while flat-faced breeds
          trade breadth for more forward-focused, binocular vision.
        </p>
      </section>

      <!-- Motion Detection -->
      <section class="bg-surface-low p-8 md:p-10">
        <p class="font-label text-xs font-semibold uppercase tracking-widest text-tertiary mb-3">Capability</p>
        <h2 class="font-display text-2xl font-semibold text-ink mb-4">Motion Detection &amp; Flicker Fusion</h2>
        <p class="font-body text-ink-muted leading-relaxed mb-4">
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
      </section>

      <!-- Night Vision -->
      <section class="bg-surface-mid p-8 md:p-10">
        <p class="font-label text-xs font-semibold uppercase tracking-widest text-tertiary mb-3">Low Light</p>
        <h2 class="font-display text-2xl font-semibold text-ink mb-4">Night Vision &amp; the Tapetum Lucidum</h2>
        <p class="font-body text-ink-muted leading-relaxed mb-4">
          Dogs see dramatically better in low light than humans, thanks to three adaptations working together:
          a rod-dominated retina packed with motion-sensitive cells, larger pupils that let in more light,
          and the tapetum lucidum &mdash; a reflective layer behind the retina that bounces light back through
          the photoreceptors for a second pass. This is what makes dogs' eyes glow in photographs.
        </p>
        <p class="font-body text-ink-muted leading-relaxed">
          The tapetum reflects green-yellow light, effectively giving each photon two chances to be detected.
          Combined, these adaptations give dogs roughly five times better vision in dim conditions than humans.
          My Doggles simulates this with a non-linear low-light boost that brightens dark areas more than light ones.
        </p>
      </section>

      <!-- UV Vision -->
      <section class="bg-surface-high p-8 md:p-10">
        <p class="font-label text-xs font-semibold uppercase tracking-widest text-tertiary mb-3">Hidden Spectrum</p>
        <h2 class="font-display text-2xl font-semibold text-ink mb-4">Ultraviolet Vision</h2>
        <p class="font-body text-ink-muted leading-relaxed mb-4">
          Unlike humans, dogs' lenses transmit ultraviolet light. While they may not have a dedicated UV cone,
          UV wavelengths still reach their retina &mdash; meaning they perceive a dimension of light invisible to us.
          Research from the Royal Society confirms UV sensitivity is widespread among mammals.
        </p>
        <p class="font-body text-ink-muted leading-relaxed">
          The practical effect? Urine, saliva, and other biological markers fluoresce under UV light.
          Your dog isn't just sniffing that lamp post &mdash; they can likely see scent markings glowing.
          On capable devices, My Doggles simulates this UV fluorescence as a subtle cyan glow on blue-dominant areas.
        </p>
      </section>

      <!-- Visual Acuity -->
      <section class="bg-surface-low p-8 md:p-10">
        <p class="font-label text-xs font-semibold uppercase tracking-widest text-tertiary mb-3">Resolution</p>
        <h2 class="font-display text-2xl font-semibold text-ink mb-4">Visual Acuity</h2>
        <p class="font-body text-ink-muted leading-relaxed">
          Dogs have approximately 20/75 vision, meaning what a human sees sharply at 75 feet, a dog
          needs to be at 20 feet to see with the same clarity. Their world is inherently softer than ours.
          This isn't a deficiency &mdash; their visual system trades fine detail for superior motion detection,
          wider peripheral coverage, and vastly better night vision. Every adaptation is a trade-off,
          and dogs evolved to optimise for a very different set of priorities than we did.
        </p>
      </section>

      <!-- Magnetic Sense -->
      <section class="bg-surface-mid p-8 md:p-10">
        <p class="font-label text-xs font-semibold uppercase tracking-widest text-tertiary mb-3">The Extraordinary</p>
        <h2 class="font-display text-2xl font-semibold text-ink mb-4">Magnetic Field Perception</h2>
        <p class="font-body text-ink-muted leading-relaxed">
          Perhaps the most remarkable discovery in canine vision research: dogs may be able to see Earth's
          magnetic field. Researchers at the Max Planck Institute found cryptochrome 1 &mdash; a light-sensitive
          protein involved in magnetic orientation &mdash; in dog photoreceptors. Studies show dogs preferentially
          align north-south when defecating, and lost dogs appear to perform a "compass run" along the
          north-south axis before navigating home. Your dog's eyes may contain a built-in compass.
        </p>
      </section>
    </div>
  </div>
</div>
