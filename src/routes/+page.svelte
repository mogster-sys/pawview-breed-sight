<script lang="ts">
  import { Folder, BookText } from 'lucide-svelte';
  import { breedConfigurations, getBreedsByRetinalMode, breedImages } from '$lib/utils/breedConfig';

  const breedsByRetinal = getBreedsByRetinalMode();
</script>

<svelte:head>
  <title>My Doggles - See Through Your Dog's Eyes</title>
  <meta name="description" content="Experience the world as your dog does. Simulate dog vision with breed-specific filters, retinal configurations, and live camera effects." />
</svelte:head>

<div class="min-h-screen bg-surface">
  <!-- Nav -->
  <nav class="bg-surface/80 backdrop-blur-[20px] sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <a href="/" data-sveltekit-reload class="font-display text-2xl font-bold tracking-tight text-ink">MYDOGGLES</a>
      <div class="flex gap-6">
        <a href="/camera" data-sveltekit-reload class="font-label text-sm font-medium uppercase tracking-wide text-ink-muted hover:text-primary transition">Camera</a>
        <a href="/gallery" data-sveltekit-reload class="font-label text-sm font-medium uppercase tracking-wide text-ink-muted hover:text-primary transition">Gallery</a>
        <a href="/learn" data-sveltekit-reload class="font-label text-sm font-medium uppercase tracking-wide text-ink-muted hover:text-primary transition">Your Dog</a>
      </div>
    </div>
  </nav>

  <!-- Hero -->
  <div class="max-w-6xl mx-auto px-6 pt-12 pb-8">
    <p class="font-label text-xs font-semibold uppercase tracking-widest text-tertiary mb-4">Precision Canine Vision</p>
    <h1 class="font-display text-4xl md:text-6xl font-bold tracking-tight text-ink leading-[0.95] mb-6">
      Select your breed
    </h1>
    <p class="font-body text-lg text-ink-muted leading-relaxed max-w-2xl italic">
      Tap your dog's breed to open the camera and see the world through their eyes. Each breed has a unique retinal configuration that shapes how they perceive their surroundings.
    </p>
  </div>

  <!-- Breed Picker -->
  <div class="max-w-6xl mx-auto px-6 pb-8">
    <p class="font-label text-xs font-semibold uppercase tracking-widest text-tertiary mb-4">Visual Streak &mdash; Wide Horizon Scanning</p>
    <div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-1.5 mb-8">
      {#each breedsByRetinal['visual-streak'] as breedKey}
        <a href="/camera?breed={breedKey}" data-sveltekit-reload
          class="relative group overflow-hidden aspect-square">
          <img src={breedImages[breedKey]} alt={breedConfigurations[breedKey].name} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div class="absolute inset-0 bg-ink/40 group-hover:bg-ink/20 transition flex flex-col items-start justify-end p-2">
            <span class="font-label text-[10px] md:text-xs text-surface font-medium leading-tight">{breedConfigurations[breedKey].name}</span>
            <span class="font-label text-[8px] text-surface/60 uppercase tracking-wide">VS</span>
          </div>
        </a>
      {/each}
    </div>

    <p class="font-label text-xs font-semibold uppercase tracking-widest text-tertiary mb-4">Area Centralis &mdash; Central Focus</p>
    <div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-1.5 mb-8">
      {#each breedsByRetinal['area-centralis'] as breedKey}
        <a href="/camera?breed={breedKey}" data-sveltekit-reload
          class="relative group overflow-hidden aspect-square">
          <img src={breedImages[breedKey]} alt={breedConfigurations[breedKey].name} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div class="absolute inset-0 bg-ink/40 group-hover:bg-ink/20 transition flex flex-col items-start justify-end p-2">
            <span class="font-label text-[10px] md:text-xs text-surface font-medium leading-tight">{breedConfigurations[breedKey].name}</span>
            <span class="font-label text-[8px] text-surface/60 uppercase tracking-wide">AC</span>
          </div>
        </a>
      {/each}
    </div>
  </div>

  <!-- Secondary Nav -->
  <div class="max-w-6xl mx-auto px-6 pb-16">
    <div class="grid md:grid-cols-2 gap-0">
      <a href="/gallery" data-sveltekit-reload class="group bg-surface-low hover:bg-surface-mid transition-colors p-8 flex flex-col gap-3">
        <div class="w-10 h-10 bg-secondary flex items-center justify-center">
          <Folder size={18} class="text-secondary-on" />
        </div>
        <h3 class="font-display text-lg font-semibold text-ink group-hover:text-primary transition">Photo Gallery</h3>
        <p class="font-body text-ink-muted text-sm">Browse your saved dog vision captures.</p>
        <span class="font-label text-xs uppercase tracking-widest text-tertiary mt-auto">View &rarr;</span>
      </a>
      <a href="/learn" data-sveltekit-reload class="group bg-surface-mid hover:bg-surface-high transition-colors p-8 flex flex-col gap-3">
        <div class="w-10 h-10 bg-primary flex items-center justify-center">
          <BookText size={18} class="text-primary-on" />
        </div>
        <h3 class="font-display text-lg font-semibold text-ink group-hover:text-primary transition">Your Dog</h3>
        <p class="font-body text-ink-muted text-sm">The science of canine vision.</p>
        <span class="font-label text-xs uppercase tracking-widest text-tertiary mt-auto">Read &rarr;</span>
      </a>
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-surface-low px-6 py-8">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="font-label text-xs text-ink-faint uppercase tracking-widest">My Doggles &mdash; Educational Canine Vision</p>
      <p class="font-label text-xs text-ink-faint">Science-backed &bull; 29 Breeds &bull; Two Retinal Modes</p>
    </div>
  </footer>
</div>
