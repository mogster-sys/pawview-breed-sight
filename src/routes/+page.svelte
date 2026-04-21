<script lang="ts">
  import { Menu, Settings, ArrowRight, Compass } from 'lucide-svelte';
  import { breedConfigurations, getBreedsByRetinalMode, breedImages } from '$lib/utils/breedConfig';

  const breedsByRetinal = getBreedsByRetinalMode();
</script>

<svelte:head>
  <title>My Doggles - The Modern Broadsheet for the Curious Canine</title>
  <meta name="description" content="The modern broadsheet for the curious canine and their technical companion. Experience canine vision, breed by breed." />
</svelte:head>

<div class="min-h-screen bg-surface pb-24">
  <!-- Top App Bar -->
  <nav class="bg-surface sticky top-0 z-30">
    <div class="px-5 py-4 flex items-center justify-between border-b-[1.5px] border-tertiary-container/40">
      <button class="p-1 -ml-1 text-ink" aria-label="Menu">
        <Menu size={22} strokeWidth={1.75} />
      </button>
      <h1 class="font-display text-base font-bold tracking-[0.05em] text-ink">MYDOGGLES</h1>
      <a href="/camera" class="p-1 -mr-1 text-ink" aria-label="Settings">
        <Settings size={20} strokeWidth={1.75} />
      </a>
    </div>
  </nav>

  <!-- Editorial Banner -->
  <div class="px-5 pt-6">
    <div class="bg-tertiary-container text-tertiary-on inline-block px-3 py-1.5 mb-6">
      <p class="font-label text-[10px] font-bold uppercase tracking-[0.2em]">Chronograph Edition &middot; Vol. I</p>
    </div>

    <h2 class="font-display text-[3.25rem] font-bold tracking-tight text-ink leading-[0.85] mb-1">
      MY<br/>DOGGLES
    </h2>

    <div class="w-12 h-0.5 bg-tertiary my-5"></div>

    <p class="font-body text-base text-ink-muted leading-relaxed italic max-w-md mb-7">
      The modern broadsheet for the curious canine and their technical companion. Vision research from the field.
    </p>

    <div class="flex flex-wrap gap-1">
      <a href="/camera" class="bg-primary text-primary-on font-label text-[11px] font-bold uppercase tracking-[0.18em] px-6 py-3.5 inline-flex items-center gap-2 hover:bg-primary-dim transition">
        Begin Hunt <ArrowRight size={14} strokeWidth={2.5} />
      </a>
      <a href="/learn" class="bg-surface-high text-ink font-label text-[11px] font-bold uppercase tracking-[0.18em] px-6 py-3.5 inline-flex items-center gap-2 hover:bg-surface-highest transition">
        View Logs
      </a>
    </div>
  </div>

  <!-- Featured Article (vintage poster style) -->
  <div class="mt-10 mx-5 bg-surface-low overflow-hidden">
    <div class="aspect-[4/3] bg-ink relative overflow-hidden">
      <img src="/splash.png" alt="Field expedition" class="w-full h-full object-cover opacity-90 mix-blend-multiply" style="filter: sepia(0.4) contrast(1.05) brightness(0.95);" />
      <div class="absolute top-3 left-3 bg-surface text-tertiary px-2 py-1 font-label text-[9px] font-bold uppercase tracking-[0.18em]">Featured</div>
    </div>
    <div class="p-5">
      <p class="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary mb-2">The Daily Chronicle</p>
      <h3 class="font-display text-xl font-bold text-ink leading-tight mb-2">
        Latest Intelligence From The Field
      </h3>
      <p class="font-body text-sm text-ink-muted italic leading-relaxed">
        Calibrate your senses. Twenty-nine breeds, two retinal configurations, one unprecedented look through your dog's eyes.
      </p>
    </div>
  </div>

  <!-- Squad Sections -->
  <div class="px-5 mt-12">
    <div class="flex items-baseline justify-between mb-1">
      <h2 class="font-display text-2xl font-bold text-ink">The Squad</h2>
      <span class="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-tertiary">{breedsByRetinal['visual-streak'].length + breedsByRetinal['area-centralis'].length} Operatives</span>
    </div>
    <p class="font-body text-sm text-ink-muted italic mb-5">Select your operative to commence vision protocol.</p>

    <!-- Visual Streak -->
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-3">
        <div class="bg-tertiary-container text-tertiary-on px-2 py-0.5 font-label text-[9px] font-bold uppercase tracking-[0.18em]">VS</div>
        <p class="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-ink-muted">Visual Streak &middot; Wide Horizon Scanning</p>
      </div>
      <div class="grid grid-cols-3 gap-1">
        {#each breedsByRetinal['visual-streak'] as breedKey}
          <a href="/camera?breed={breedKey}" class="relative group overflow-hidden aspect-square">
            <img src={breedImages[breedKey]} alt={breedConfigurations[breedKey].name}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              style="filter: sepia(0.25) contrast(1.05);" />
            <div class="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent flex flex-col justify-end p-2">
              <span class="font-label text-[10px] font-bold text-surface uppercase tracking-wide leading-tight">{breedConfigurations[breedKey].name}</span>
            </div>
          </a>
        {/each}
      </div>
    </div>

    <!-- Area Centralis -->
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-3">
        <div class="bg-secondary text-secondary-on px-2 py-0.5 font-label text-[9px] font-bold uppercase tracking-[0.18em]">AC</div>
        <p class="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-ink-muted">Area Centralis &middot; Central Focus</p>
      </div>
      <div class="grid grid-cols-3 gap-1">
        {#each breedsByRetinal['area-centralis'] as breedKey}
          <a href="/camera?breed={breedKey}" class="relative group overflow-hidden aspect-square">
            <img src={breedImages[breedKey]} alt={breedConfigurations[breedKey].name}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              style="filter: sepia(0.25) contrast(1.05);" />
            <div class="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent flex flex-col justify-end p-2">
              <span class="font-label text-[10px] font-bold text-surface uppercase tracking-wide leading-tight">{breedConfigurations[breedKey].name}</span>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </div>

  <!-- Field Logistics Card -->
  <div class="mx-5 bg-primary text-primary-on p-6">
    <div class="flex items-center gap-2 mb-4 pb-4 border-b border-primary-on/20">
      <Compass size={16} strokeWidth={1.75} />
      <p class="font-label text-[10px] font-bold uppercase tracking-[0.2em]">Field Logistics</p>
    </div>
    <div class="space-y-3">
      <div class="flex items-baseline justify-between">
        <span class="font-label text-[11px] uppercase tracking-[0.15em] opacity-80">Acuity</span>
        <span class="font-display text-sm font-bold">20/75 Calibrated</span>
      </div>
      <div class="flex items-baseline justify-between">
        <span class="font-label text-[11px] uppercase tracking-[0.15em] opacity-80">Spectrum</span>
        <span class="font-display text-sm font-bold">Dichromatic</span>
      </div>
      <div class="flex items-baseline justify-between">
        <span class="font-label text-[11px] uppercase tracking-[0.15em] opacity-80">Field Status</span>
        <span class="font-display text-sm font-bold">Ready</span>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="mt-12 px-5 py-6 text-center">
    <p class="font-label text-[10px] text-ink-faint uppercase tracking-[0.2em]">Est. 2026 &middot; Precision Canine Vision</p>
    <p class="font-label text-[9px] text-ink-faint uppercase tracking-[0.18em] mt-1 opacity-60">Available on all standard digital broadsheets</p>
  </footer>
</div>
