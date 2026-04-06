<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { dogVisionFilter } from '$lib/utils/dogVisionFilters';
  import { savePhoto, getPhotoCount } from '$lib/utils/photoGallery';
  import type { RetinalMode, BreedType } from '$lib/types';
  import { getRetinalModeForBreed, breedConfigurations, getBreedsByRetinalMode } from '$lib/utils/breedConfig';
  import { FlipHorizontal, Camera, Settings, X } from 'lucide-svelte';

  // Svelte 5 state runes
  let videoRef: HTMLVideoElement | undefined = $state();
  let canvasDogRef: HTMLCanvasElement | undefined = $state();
  let canvasHumanRef: HTMLCanvasElement | undefined = $state();
  let streaming = $state(false);
  let breed: BreedType = $state('labrador');
  let retinalMode: RetinalMode = $state('visual-streak');
  let filters = $state({ dichro: true, contrast: false, brightness: false });
  let galleryCount = $state(0);
  let viewMode: 'split' | 'dog' | 'human' = $state('dog');
  let facingMode: 'user' | 'environment' = $state('environment');
  let stream: MediaStream | null = $state(null);
  let drawerOpen = $state(false);
  let isLandscape = $state(false);
  let canvasWidth = $state(0);
  let canvasHeight = $state(0);

  // Automatically update retinal mode when breed changes (core feature!)
  $effect(() => {
    if (breed !== 'custom') {
      retinalMode = getRetinalModeForBreed(breed);
    }
  });

  // Get breeds organized by retinal configuration
  const breedsByRetinal = getBreedsByRetinalMode();

  function updateOrientation() {
    isLandscape = window.innerWidth > window.innerHeight;
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
  }

  onMount(async () => {
    galleryCount = await getPhotoCount();

    // Set canvas to full screen size
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
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });

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

    if (ctxH && videoRef) {
      ctxH.drawImage(videoRef, 0, 0, canvasWidth, canvasHeight);
    }

    if (ctxD && videoRef) {
      ctxD.drawImage(videoRef, 0, 0, canvasWidth, canvasHeight);
      dogVisionFilter(ctxD, canvasWidth, canvasHeight, filters, retinalMode);
    }

    requestAnimationFrame(drawFrames);
  }

  async function handleSave() {
    if (!canvasDogRef) {
      alert('Camera not ready yet. Please wait.');
      return;
    }

    try {
      const imageData = canvasDogRef.toDataURL('image/png');

      if (!imageData || imageData === 'data:,') {
        alert('Could not capture image from camera.');
        return;
      }

      await savePhoto({ imageData, breed, retinalMode, filters });
      galleryCount = await getPhotoCount();

      // Flash effect
      const flash = document.getElementById('flash');
      if (flash) {
        flash.style.opacity = '1';
        setTimeout(() => flash.style.opacity = '0', 150);
      }
    } catch (err: unknown) {
      console.error('Failed to save photo:', err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      alert(`Failed to save: ${message}`);
    }
  }
</script>

<svelte:head>
  <title>Dog Vision Camera</title>
</svelte:head>

<div class="fixed inset-0 bg-black overflow-hidden">
  <!-- Fullscreen Camera Canvas -->
  <div class="absolute inset-0">
    <!-- Always render both canvases, show/hide with CSS -->
    <div class="relative w-full h-full">
      <!-- Human vision canvas -->
      <canvas bind:this={canvasHumanRef} width={canvasWidth} height={canvasHeight}
        class="absolute inset-0 w-full h-full object-cover {viewMode === 'dog' ? 'hidden' : ''}"></canvas>

      <!-- Dog vision canvas -->
      <canvas bind:this={canvasDogRef} width={canvasWidth} height={canvasHeight}
        class="absolute inset-0 w-full h-full object-cover {viewMode === 'human' ? 'hidden' : ''} {viewMode === 'split' ? 'w-1/2 left-1/2' : ''}"></canvas>

      {#if viewMode === 'split'}
        <!-- Split line indicator -->
        <div class="absolute inset-y-0 left-1/2 w-0.5 bg-white/50 z-10"></div>
        <!-- Labels -->
        <div class="absolute top-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur z-10">
          Normal
        </div>
        <div class="absolute top-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur z-10">
          Dog Vision
        </div>
      {/if}
    </div>
  </div>

  <!-- Flash effect -->
  <div id="flash" class="absolute inset-0 bg-white pointer-events-none transition-opacity duration-150" style="opacity: 0;"></div>

  <!-- HUD Overlay - Top -->
  <div class="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
    <!-- Home button -->
    <a href="/" data-sveltekit-reload class="bg-black/70 backdrop-blur text-white p-3 rounded-full" aria-label="Back to home">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </a>

    <!-- View Mode Toggle -->
    <div class="flex gap-2 bg-black/70 backdrop-blur rounded-full p-1">
      <button
        onclick={() => viewMode = 'dog'}
        class="px-4 py-2 rounded-full font-semibold text-sm transition {viewMode === 'dog' ? 'bg-white text-black' : 'text-white'}"
      >
        Dog
      </button>
      <button
        onclick={() => viewMode = 'split'}
        class="px-4 py-2 rounded-full font-semibold text-sm transition {viewMode === 'split' ? 'bg-white text-black' : 'text-white'}"
      >
        Split
      </button>
      <button
        onclick={() => viewMode = 'human'}
        class="px-4 py-2 rounded-full font-semibold text-sm transition {viewMode === 'human' ? 'bg-white text-black' : 'text-white'}"
      >
        Normal
      </button>
    </div>

    <!-- Settings toggle (works in both portrait and landscape) -->
    <button
      onclick={() => drawerOpen = !drawerOpen}
      class="bg-black/70 backdrop-blur text-white p-3 rounded-full"
      aria-label="Toggle settings"
    >
      {#if drawerOpen}
        <X size={24} />
      {:else}
        <Settings size={24} />
      {/if}
    </button>
  </div>

  <!-- HUD Overlay - Bottom Controls -->
  <div class="absolute bottom-8 left-0 right-0 flex justify-center gap-6 items-end px-4">
    <!-- Flip camera -->
    <button
      onclick={toggleCamera}
      class="bg-white/90 backdrop-blur p-4 rounded-full shadow-2xl hover:bg-white transition"
      aria-label="Flip camera"
    >
      <FlipHorizontal size={28} class="text-gray-800" />
    </button>

    <!-- Capture button -->
    <button
      onclick={handleSave}
      class="bg-red-600 p-6 rounded-full shadow-2xl hover:bg-red-700 transition ring-4 ring-white/30"
      aria-label="Take photo"
    >
      <Camera size={32} class="text-white" />
    </button>

    <!-- Gallery counter -->
    <a
      href="/gallery"
      data-sveltekit-reload
      class="bg-white/90 backdrop-blur px-5 py-4 rounded-full shadow-2xl hover:bg-white transition flex items-center gap-2"
    >
      <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span class="text-gray-800 font-semibold">{galleryCount}</span>
    </a>
  </div>

  <!-- Backdrop for portrait drawer -->
  {#if !isLandscape && drawerOpen}
    <button
      class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity border-0"
      onclick={() => drawerOpen = false}
      aria-label="Close settings"
    ></button>
  {/if}

  <!-- Settings Panel - Portrait: Sliding drawer, Landscape: Right sidebar -->
  {#if isLandscape}
    <!-- Landscape: Retractable right sidebar -->
    <div class="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-black via-black/95 to-transparent backdrop-blur-xl p-4 overflow-y-auto border-l border-white/10 transition-transform duration-300 {drawerOpen ? 'translate-x-0' : 'translate-x-full'}">
      <div class="space-y-4 pt-20 pb-24">
        <!-- Breed Selection -->
        <div>
          <label for="breed-landscape" class="block text-white font-semibold mb-2 text-sm">Dog Breed</label>
          <select id="breed-landscape" bind:value={breed} class="w-full p-3 bg-white/10 text-white text-sm border-2 border-white/20 rounded-xl focus:border-white/40 focus:outline-none backdrop-blur">
            <optgroup label="Visual Streak (Wide Scanning)">
              {#each breedsByRetinal['visual-streak'] as breedKey}
                <option value={breedKey}>{breedConfigurations[breedKey].name}</option>
              {/each}
            </optgroup>
            <optgroup label="Area Centralis (Central Focus)">
              {#each breedsByRetinal['area-centralis'] as breedKey}
                <option value={breedKey}>{breedConfigurations[breedKey].name}</option>
              {/each}
            </optgroup>
            <option value="custom">Custom Configuration</option>
          </select>
          {#if breed !== 'custom'}
            <p class="text-white/60 text-xs mt-2">{breedConfigurations[breed].description}</p>
          {/if}
        </div>

        <!-- Retinal Mode (only for custom) -->
        {#if breed === 'custom'}
          <div>
            <label for="retinal-landscape" class="block text-white font-semibold mb-2 text-sm">Retinal Configuration</label>
            <select id="retinal-landscape" bind:value={retinalMode} class="w-full p-3 bg-white/10 text-white text-sm border-2 border-white/20 rounded-xl focus:border-white/40 focus:outline-none backdrop-blur">
              <option value="visual-streak">Visual Streak (Wide Peripheral)</option>
              <option value="area-centralis">Area Centralis (Central Focus)</option>
            </select>
          </div>
        {:else}
          <div class="bg-white/5 p-3 rounded-xl">
            <p class="text-white/80 text-xs">
              <strong>Active Mode:</strong> {retinalMode === 'visual-streak' ? 'Visual Streak' : 'Area Centralis'}
            </p>
            <p class="text-white/60 text-xs mt-1">
              {retinalMode === 'visual-streak' ? 'Wide horizon scanning, enhanced motion detection' : 'Central focus, detailed close-up vision'}
            </p>
          </div>
        {/if}

        <!-- Vision Filters -->
        <div>
          <span class="block text-white font-semibold mb-2 text-sm">Vision Filters</span>
          <div class="space-y-2">
            <label class="flex items-center gap-2 cursor-pointer bg-white/5 p-3 rounded-xl hover:bg-white/10 transition">
              <input type="checkbox" bind:checked={filters.dichro} class="w-5 h-5 rounded border-white/20" />
              <div>
                <div class="text-white text-xs font-medium">Dichromatic Color</div>
                <div class="text-white/60 text-xs">Blue-Yellow spectrum</div>
              </div>
            </label>
            <label class="flex items-center gap-2 cursor-pointer bg-white/5 p-3 rounded-xl hover:bg-white/10 transition">
              <input type="checkbox" bind:checked={filters.contrast} class="w-5 h-5 rounded border-white/20" />
              <div>
                <div class="text-white text-xs font-medium">Enhanced Contrast</div>
                <div class="text-white/60 text-xs">Sharper edges</div>
              </div>
            </label>
            <label class="flex items-center gap-2 cursor-pointer bg-white/5 p-3 rounded-xl hover:bg-white/10 transition">
              <input type="checkbox" bind:checked={filters.brightness} class="w-5 h-5 rounded border-white/20" />
              <div>
                <div class="text-white text-xs font-medium">Low-Light Boost</div>
                <div class="text-white/60 text-xs">Rod-cell sensitivity</div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <!-- Portrait: Sliding drawer from bottom -->
    <div class="absolute bottom-0 left-0 right-0 transition-transform duration-300 {drawerOpen ? 'translate-y-0' : 'translate-y-full'} z-10">
      <div class="bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-xl p-6 pb-32 rounded-t-3xl shadow-2xl border-t border-white/10">
        <div class="max-w-2xl mx-auto space-y-6">
          <!-- Breed Selection -->
          <div>
            <label for="breed-portrait" class="block text-white font-semibold mb-3 text-lg">Dog Breed</label>
            <select id="breed-portrait" bind:value={breed} class="w-full p-4 bg-white/10 text-white border-2 border-white/20 rounded-xl focus:border-white/40 focus:outline-none backdrop-blur">
              <optgroup label="Visual Streak (Wide Horizon Scanning)">
                {#each breedsByRetinal['visual-streak'] as breedKey}
                  <option value={breedKey}>{breedConfigurations[breedKey].name}</option>
                {/each}
              </optgroup>
              <optgroup label="Area Centralis (Central Focus)">
                {#each breedsByRetinal['area-centralis'] as breedKey}
                  <option value={breedKey}>{breedConfigurations[breedKey].name}</option>
                {/each}
              </optgroup>
              <option value="custom">Custom Configuration</option>
            </select>
            {#if breed !== 'custom'}
              <p class="text-white/70 text-sm mt-2">{breedConfigurations[breed].description}</p>
            {/if}
          </div>

          <!-- Retinal Mode (only for custom) -->
          {#if breed === 'custom'}
            <div>
              <label for="retinal-portrait" class="block text-white font-semibold mb-3 text-lg">Retinal Configuration</label>
              <select id="retinal-portrait" bind:value={retinalMode} class="w-full p-4 bg-white/10 text-white border-2 border-white/20 rounded-xl focus:border-white/40 focus:outline-none backdrop-blur">
                <option value="visual-streak">Visual Streak (Wide Peripheral)</option>
                <option value="area-centralis">Area Centralis (Central Focus)</option>
              </select>
            </div>
          {:else}
            <div class="bg-white/5 p-4 rounded-xl">
              <p class="text-white font-medium">
                Active: {retinalMode === 'visual-streak' ? 'Visual Streak' : 'Area Centralis'}
              </p>
              <p class="text-white/70 text-sm mt-1">
                {retinalMode === 'visual-streak' ? 'Wide horizon scanning with enhanced motion detection at periphery' : 'Central focus with sharp detail, blurred periphery'}
              </p>
            </div>
          {/if}

          <!-- Vision Filters -->
          <div>
            <span class="block text-white font-semibold mb-3 text-lg">Vision Filters</span>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer bg-white/5 p-4 rounded-xl hover:bg-white/10 transition">
                <input type="checkbox" bind:checked={filters.dichro} class="w-6 h-6 rounded border-white/20" />
                <div>
                  <div class="text-white font-medium">Dichromatic Color</div>
                  <div class="text-white/60 text-sm">Blue-Yellow spectrum (no reds)</div>
                </div>
              </label>
              <label class="flex items-center gap-3 cursor-pointer bg-white/5 p-4 rounded-xl hover:bg-white/10 transition">
                <input type="checkbox" bind:checked={filters.contrast} class="w-6 h-6 rounded border-white/20" />
                <div>
                  <div class="text-white font-medium">Enhanced Contrast</div>
                  <div class="text-white/60 text-sm">Sharper edge detection</div>
                </div>
              </label>
              <label class="flex items-center gap-3 cursor-pointer bg-white/5 p-4 rounded-xl hover:bg-white/10 transition">
                <input type="checkbox" bind:checked={filters.brightness} class="w-6 h-6 rounded border-white/20" />
                <div>
                  <div class="text-white font-medium">Low-Light Boost</div>
                  <div class="text-white/60 text-sm">Enhanced rod-cell sensitivity</div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Hidden video element -->
  <video bind:this={videoRef} width={canvasWidth} height={canvasHeight}
    style="display: none;" playsinline muted autoplay></video>
</div>
