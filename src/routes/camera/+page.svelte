<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { dogVisionFilter } from '$lib/utils/dogVisionFilters';
  import { savePhoto, getPhotoCount } from '$lib/utils/photoGallery';
  import type { RetinalMode, BreedType } from '$lib/types';
  import { getRetinalModeForBreed, breedConfigurations, getBreedsByRetinalMode, breedImages } from '$lib/utils/breedConfig';
  import { FlipHorizontal, Camera, Settings, X } from 'lucide-svelte';

  // Read breed from URL query param if present
  const urlBreed = $page.url.searchParams.get('breed') as BreedType | null;
  const initialBreed: BreedType = (urlBreed && urlBreed in breedConfigurations) ? urlBreed : 'labrador';

  let videoRef: HTMLVideoElement | undefined = $state();
  let canvasDogRef: HTMLCanvasElement | undefined = $state();
  let canvasHumanRef: HTMLCanvasElement | undefined = $state();
  let streaming = $state(false);
  let breed: BreedType = $state(initialBreed);
  let retinalMode: RetinalMode = $state('visual-streak');
  let filters = $state({ dichro: true, contrast: false, brightness: false, uv: true });
  let galleryCount = $state(0);
  let viewMode: 'split' | 'dog' | 'human' = $state('dog');
  let facingMode: 'user' | 'environment' = $state('environment');
  let stream: MediaStream | null = $state(null);
  let drawerOpen = $state(false);
  let isLandscape = $state(false);
  let canvasWidth = $state(0);
  let canvasHeight = $state(0);

  $effect(() => {
    if (breed !== 'custom') {
      retinalMode = getRetinalModeForBreed(breed);
    }
  });

  const breedsByRetinal = getBreedsByRetinalMode();

  function updateOrientation() {
    isLandscape = window.innerWidth > window.innerHeight;
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
  }

  onMount(async () => {
    galleryCount = await getPhotoCount();
    updateOrientation();
    window.addEventListener('resize', updateOrientation);
    await startCamera();
  });

  onDestroy(() => {
    stopCamera();
    window.removeEventListener('resize', updateOrientation);
  });

  async function startCamera() {
    try {
      stopCamera();
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1920 }, height: { ideal: 1080 } }
      });
      if (!videoRef) return;
      videoRef.srcObject = stream;
      await videoRef.play();
      streaming = true;
      drawFrames();
    } catch (err) {
      console.error('Camera error:', err);
      alert('Camera permission denied or not available');
    }
  }

  function stopCamera() {
    streaming = false;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      stream = null;
    }
  }

  async function toggleCamera() {
    facingMode = facingMode === 'user' ? 'environment' : 'user';
    await startCamera();
  }

  function drawFrames() {
    if (!streaming) return;
    const ctxH = canvasHumanRef?.getContext('2d');
    const ctxD = canvasDogRef?.getContext('2d');
    if (ctxH && videoRef) ctxH.drawImage(videoRef, 0, 0, canvasWidth, canvasHeight);
    if (ctxD && videoRef) {
      ctxD.drawImage(videoRef, 0, 0, canvasWidth, canvasHeight);
      dogVisionFilter(ctxD, canvasWidth, canvasHeight, filters, retinalMode);
    }
    requestAnimationFrame(drawFrames);
  }

  async function handleSave() {
    if (!canvasDogRef) { alert('Camera not ready yet.'); return; }
    try {
      const imageData = canvasDogRef.toDataURL('image/jpeg', 0.85);
      if (!imageData || imageData === 'data:,' || imageData.length < 100) { alert('Could not capture image.'); return; }
      await savePhoto({ imageData, breed, retinalMode, filters });
      galleryCount = await getPhotoCount();
      const flash = document.getElementById('flash');
      if (flash) { flash.style.opacity = '1'; setTimeout(() => flash.style.opacity = '0', 150); }
    } catch (err: unknown) {
      console.error('Failed to save:', err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      alert(`Failed to save: ${message}`);
    }
  }
</script>

<svelte:head>
  <title>Dog Vision Camera</title>
</svelte:head>

<div class="fixed inset-0 bg-ink overflow-hidden">
  <!-- Camera Canvases -->
  <div class="absolute inset-0">
    <div class="relative w-full h-full">
      <canvas bind:this={canvasHumanRef} width={canvasWidth} height={canvasHeight}
        class="absolute inset-0 w-full h-full object-cover {viewMode === 'dog' ? 'hidden' : ''}"></canvas>
      <canvas bind:this={canvasDogRef} width={canvasWidth} height={canvasHeight}
        class="absolute inset-0 w-full h-full object-cover {viewMode === 'human' ? 'hidden' : ''} {viewMode === 'split' ? 'w-1/2 left-1/2' : ''}"></canvas>

      {#if viewMode === 'split'}
        <div class="absolute inset-y-0 left-1/2 w-[2px] bg-surface/30 z-10"></div>
        <div class="absolute top-4 left-4 bg-ink/70 backdrop-blur-[20px] text-surface px-4 py-1.5 font-label text-xs uppercase tracking-widest z-10">Normal</div>
        <div class="absolute top-4 right-4 bg-ink/70 backdrop-blur-[20px] text-surface px-4 py-1.5 font-label text-xs uppercase tracking-widest z-10">Dog Vision</div>
      {/if}
    </div>
  </div>

  <!-- Flash -->
  <div id="flash" class="absolute inset-0 bg-surface pointer-events-none transition-opacity duration-150" style="opacity: 0;"></div>

  <!-- Top HUD -->
  <div class="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
    <a href="/" class="bg-ink/60 backdrop-blur-[20px] text-surface p-3" aria-label="Back to home">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </a>

    <!-- View Mode -->
    <div class="flex bg-ink/60 backdrop-blur-[20px]">
      <button onclick={() => viewMode = 'dog'}
        class="px-5 py-2.5 font-label text-xs uppercase tracking-widest transition {viewMode === 'dog' ? 'bg-surface text-ink' : 'text-surface/80'}">
        Dog
      </button>
      <button onclick={() => viewMode = 'split'}
        class="px-5 py-2.5 font-label text-xs uppercase tracking-widest transition {viewMode === 'split' ? 'bg-surface text-ink' : 'text-surface/80'}">
        Split
      </button>
      <button onclick={() => viewMode = 'human'}
        class="px-5 py-2.5 font-label text-xs uppercase tracking-widest transition {viewMode === 'human' ? 'bg-surface text-ink' : 'text-surface/80'}">
        Normal
      </button>
    </div>

    <button onclick={() => drawerOpen = !drawerOpen}
      class="bg-ink/60 backdrop-blur-[20px] text-surface p-3" aria-label="Toggle settings">
      {#if drawerOpen}<X size={20} />{:else}<Settings size={20} />{/if}
    </button>
  </div>

  <!-- Breed Badge (tap to open settings) -->
  <button onclick={() => drawerOpen = !drawerOpen}
    class="absolute top-20 left-4 bg-tertiary-container text-tertiary-on px-4 py-1.5 font-label text-xs uppercase tracking-widest">
    {breedConfigurations[breed].name} &mdash; {retinalMode === 'visual-streak' ? 'VS' : 'AC'}
  </button>

  <!-- Bottom Controls -->
  <div class="absolute bottom-8 left-0 right-0 flex justify-center gap-8 items-center px-4">
    <button onclick={toggleCamera}
      class="bg-surface/90 backdrop-blur-[20px] p-4 shadow-lg hover:bg-surface transition" aria-label="Flip camera">
      <FlipHorizontal size={24} class="text-ink" />
    </button>

    <button onclick={handleSave}
      class="bg-gradient-to-br from-primary to-primary-container p-6 shadow-lg hover:from-primary-dim hover:to-primary transition ring-4 ring-surface/20" aria-label="Take photo">
      <Camera size={28} class="text-primary-on" />
    </button>

    <a href="/gallery"
      class="bg-surface/90 backdrop-blur-[20px] px-5 py-4 shadow-lg hover:bg-surface transition flex items-center gap-2">
      <svg class="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span class="font-label text-sm font-semibold text-ink">{galleryCount}</span>
    </a>
  </div>

  <!-- Backdrop (must be above bottom controls but below drawer) -->
  {#if drawerOpen}
    <button class="absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity border-0 z-[5]"
      onclick={() => drawerOpen = false} aria-label="Close settings"></button>
  {/if}

  <!-- Settings Panel - Landscape -->
  {#if isLandscape}
    <div class="absolute right-0 top-0 bottom-0 w-96 bg-ink/95 backdrop-blur-[20px] p-4 overflow-y-auto transition-transform duration-300 z-10 {drawerOpen ? 'translate-x-0' : 'translate-x-full'}">
      <div class="space-y-5 pt-16 pb-24">
        <!-- Close button -->
        <button onclick={() => drawerOpen = false} class="absolute top-4 right-4 bg-surface/10 text-surface p-2 hover:bg-surface/20 transition" aria-label="Close settings">
          <X size={20} />
        </button>
        <!-- Breed Grid Picker -->
        <div>
          <span class="block font-label text-xs uppercase tracking-widest text-tertiary mb-2">Visual Streak</span>
          <div class="grid grid-cols-4 gap-1 mb-4">
            {#each breedsByRetinal['visual-streak'] as breedKey}
              <button onclick={() => breed = breedKey}
                class="relative group overflow-hidden aspect-square {breed === breedKey ? 'ring-2 ring-tertiary-container' : ''}">
                <img src={breedImages[breedKey]} alt={breedConfigurations[breedKey].name} class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-ink/50 group-hover:bg-ink/30 transition flex items-end p-1">
                  <span class="font-label text-[9px] text-surface leading-tight">{breedConfigurations[breedKey].name}</span>
                </div>
              </button>
            {/each}
          </div>
          <span class="block font-label text-xs uppercase tracking-widest text-tertiary mb-2">Area Centralis</span>
          <div class="grid grid-cols-4 gap-1">
            {#each breedsByRetinal['area-centralis'] as breedKey}
              <button onclick={() => breed = breedKey}
                class="relative group overflow-hidden aspect-square {breed === breedKey ? 'ring-2 ring-tertiary-container' : ''}">
                <img src={breedImages[breedKey]} alt={breedConfigurations[breedKey].name} class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-ink/50 group-hover:bg-ink/30 transition flex items-end p-1">
                  <span class="font-label text-[9px] text-surface leading-tight">{breedConfigurations[breedKey].name}</span>
                </div>
              </button>
            {/each}
          </div>
        </div>

        <!-- Vision Filters -->
        <div>
          <span class="block font-label text-xs uppercase tracking-widest text-tertiary mb-3">Vision Filters</span>
          <div class="space-y-2">
            <label class="flex items-center gap-3 cursor-pointer bg-surface/5 p-3 hover:bg-surface/10 transition">
              <input type="checkbox" bind:checked={filters.dichro} class="w-5 h-5 accent-primary" />
              <div>
                <div class="text-surface text-xs font-label font-medium">Dichromatic Colour</div>
                <div class="text-surface/50 text-xs font-body italic">Blue-yellow spectrum</div>
              </div>
            </label>
            <label class="flex items-center gap-3 cursor-pointer bg-surface/5 p-3 hover:bg-surface/10 transition">
              <input type="checkbox" bind:checked={filters.contrast} class="w-5 h-5 accent-primary" />
              <div>
                <div class="text-surface text-xs font-label font-medium">Enhanced Contrast</div>
                <div class="text-surface/50 text-xs font-body italic">Sharper edges</div>
              </div>
            </label>
            <label class="flex items-center gap-3 cursor-pointer bg-surface/5 p-3 hover:bg-surface/10 transition">
              <input type="checkbox" bind:checked={filters.brightness} class="w-5 h-5 accent-primary" />
              <div>
                <div class="text-surface text-xs font-label font-medium">Low-Light Boost</div>
                <div class="text-surface/50 text-xs font-body italic">Rod-cell sensitivity</div>
              </div>
            </label>
            <label class="flex items-center gap-3 cursor-pointer bg-surface/5 p-3 hover:bg-surface/10 transition">
              <input type="checkbox" bind:checked={filters.uv} class="w-5 h-5 accent-primary" />
              <div>
                <div class="text-surface text-xs font-label font-medium">UV Fluorescence</div>
                <div class="text-surface/50 text-xs font-body italic">Ultraviolet glow</div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <!-- Settings Panel - Portrait -->
    <div class="absolute bottom-0 left-0 right-0 max-h-[80vh] transition-transform duration-300 {drawerOpen ? 'translate-y-0' : 'translate-y-full'} z-10">
      <div class="bg-ink/95 backdrop-blur-[20px] p-6 pb-8 shadow-2xl border-t border-surface/10 overflow-y-auto max-h-[80vh]">
        <!-- Close bar at top -->
        <div class="flex items-center justify-between mb-4">
          <button onclick={() => drawerOpen = false} class="w-12 h-1.5 bg-surface/30 rounded-full" aria-label="Close settings"></button>
          <button onclick={() => drawerOpen = false} class="bg-surface/10 text-surface px-4 py-2 font-label text-xs uppercase tracking-widest hover:bg-surface/20 transition" aria-label="Close settings">
            Close
          </button>
        </div>
        <div class="max-w-2xl mx-auto space-y-6">
          <!-- Breed Grid Picker -->
          <div>
            <span class="block font-label text-xs uppercase tracking-widest text-tertiary mb-3">Visual Streak Breeds</span>
            <div class="grid grid-cols-5 gap-1.5 mb-5">
              {#each breedsByRetinal['visual-streak'] as breedKey}
                <button onclick={() => breed = breedKey}
                  class="relative group overflow-hidden aspect-square {breed === breedKey ? 'ring-2 ring-tertiary-container' : ''}">
                  <img src={breedImages[breedKey]} alt={breedConfigurations[breedKey].name} class="w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-ink/50 group-hover:bg-ink/20 transition flex items-end p-1">
                    <span class="font-label text-[8px] text-surface leading-tight">{breedConfigurations[breedKey].name}</span>
                  </div>
                </button>
              {/each}
            </div>
            <span class="block font-label text-xs uppercase tracking-widest text-tertiary mb-3">Area Centralis Breeds</span>
            <div class="grid grid-cols-5 gap-1.5">
              {#each breedsByRetinal['area-centralis'] as breedKey}
                <button onclick={() => breed = breedKey}
                  class="relative group overflow-hidden aspect-square {breed === breedKey ? 'ring-2 ring-tertiary-container' : ''}">
                  <img src={breedImages[breedKey]} alt={breedConfigurations[breedKey].name} class="w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-ink/50 group-hover:bg-ink/20 transition flex items-end p-1">
                    <span class="font-label text-[8px] text-surface leading-tight">{breedConfigurations[breedKey].name}</span>
                  </div>
                </button>
              {/each}
            </div>
          </div>

          <!-- Retinal Info -->
          {#if breed !== 'custom'}
            <div class="bg-surface/5 p-4">
              <p class="text-surface font-label text-sm font-medium">
                {breedConfigurations[breed].name} &mdash; {retinalMode === 'visual-streak' ? 'Visual Streak' : 'Area Centralis'}
              </p>
              <p class="text-surface/60 text-sm font-body italic mt-1">
                {breedConfigurations[breed].description}
              </p>
            </div>
          {/if}

          <!-- Vision Filters -->
          <div>
            <span class="block font-label text-xs uppercase tracking-widest text-tertiary mb-3">Vision Filters</span>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer bg-surface/5 p-4 hover:bg-surface/10 transition">
                <input type="checkbox" bind:checked={filters.dichro} class="w-6 h-6 accent-primary" />
                <div>
                  <div class="text-surface font-label font-medium">Dichromatic Colour</div>
                  <div class="text-surface/50 text-sm font-body italic">Blue-yellow spectrum (no reds)</div>
                </div>
              </label>
              <label class="flex items-center gap-3 cursor-pointer bg-surface/5 p-4 hover:bg-surface/10 transition">
                <input type="checkbox" bind:checked={filters.contrast} class="w-6 h-6 accent-primary" />
                <div>
                  <div class="text-surface font-label font-medium">Enhanced Contrast</div>
                  <div class="text-surface/50 text-sm font-body italic">Sharper edge detection</div>
                </div>
              </label>
              <label class="flex items-center gap-3 cursor-pointer bg-surface/5 p-4 hover:bg-surface/10 transition">
                <input type="checkbox" bind:checked={filters.brightness} class="w-6 h-6 accent-primary" />
                <div>
                  <div class="text-surface font-label font-medium">Low-Light Boost</div>
                  <div class="text-surface/50 text-sm font-body italic">Enhanced rod-cell sensitivity</div>
                </div>
              </label>
              <label class="flex items-center gap-3 cursor-pointer bg-surface/5 p-4 hover:bg-surface/10 transition">
                <input type="checkbox" bind:checked={filters.uv} class="w-6 h-6 accent-primary" />
                <div>
                  <div class="text-surface font-label font-medium">UV Fluorescence</div>
                  <div class="text-surface/50 text-sm font-body italic">Ultraviolet glow</div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <video bind:this={videoRef} width={canvasWidth} height={canvasHeight}
    style="display: none;" playsinline muted autoplay></video>
</div>
