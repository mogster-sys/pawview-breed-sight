<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { dogVisionFilter } from '$lib/utils/dogVisionFilters';
  import { savePhoto, getPhotoCount } from '$lib/utils/photoGallery';
  import type { RetinalMode, BreedType } from '$lib/types';
  import { getRetinalModeForBreed, breedConfigurations, getBreedsByRetinalMode } from '$lib/utils/breedConfig';
  import { FlipHorizontal, Save, Settings, X } from 'lucide-svelte';

  let videoRef: HTMLVideoElement;
  let canvasDogRef: HTMLCanvasElement;
  let canvasHumanRef: HTMLCanvasElement;
  let streaming = false;
  let breed: BreedType = 'labrador';
  let retinalMode: RetinalMode = 'visual-streak';
  let filters = { dichro: true, contrast: false, brightness: false };
  let galleryCount = 0;
  let viewMode: 'split' | 'dog' | 'human' = 'dog';
  let facingMode: 'user' | 'environment' = 'environment';
  let stream: MediaStream | null = null;
  let drawerOpen = false;
  let isLandscape = false;

  let canvasWidth = 0;
  let canvasHeight = 0;

  // Automatically update retinal mode when breed changes (core feature!)
  $: if (breed !== 'custom') {
    retinalMode = getRetinalModeForBreed(breed);
  }

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
    if (!canvasDogRef) return;
    const imageData = canvasDogRef.toDataURL('image/png');
    await savePhoto({ imageData, breed, retinalMode, filters });
    galleryCount = await getPhotoCount();

    // Flash effect
    const flash = document.getElementById('flash');
    if (flash) {
      flash.style.opacity = '1';
      setTimeout(() => flash.style.opacity = '0', 150);
    }
  }
</script>

<svelte:head>
  <title>Dog Vision Camera</title>
</svelte:head>

<div class="fixed inset-0 bg-black overflow-hidden">
  <!-- Fullscreen Camera Canvas -->
  <div class="absolute inset-0">
    {#if viewMode === 'split'}
      <div class="relative w-full h-full">
        <canvas bind:this={canvasHumanRef} width={canvasWidth} height={canvasHeight}
          class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute top-0 right-0 w-1/2 h-full overflow-hidden">
          <canvas bind:this={canvasDogRef} width={canvasWidth} height={canvasHeight}
            class="absolute right-0 w-full h-full object-cover" style="transform: translateX(-50%);" />
        </div>
        <!-- Split line indicator -->
        <div class="absolute inset-y-0 left-1/2 w-0.5 bg-white/50"></div>
        <!-- Labels -->
        <div class="absolute top-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur">
          Normal
        </div>
        <div class="absolute top-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur">
          Dog Vision
        </div>
      </div>
    {:else if viewMode === 'dog'}
      <canvas bind:this={canvasDogRef} width={canvasWidth} height={canvasHeight}
        class="w-full h-full object-cover" />
    {:else}
      <canvas bind:this={canvasHumanRef} width={canvasWidth} height={canvasHeight}
        class="w-full h-full object-cover" />
    {/if}
  </div>

  <!-- Flash effect -->
  <div id="flash" class="absolute inset-0 bg-white pointer-events-none transition-opacity duration-150" style="opacity: 0;"></div>

  <!-- HUD Overlay - Top -->
  <div class="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
    <!-- Home button -->
    <a href="/" data-sveltekit-reload class="bg-black/70 backdrop-blur text-white p-3 rounded-full">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </a>

    <!-- View Mode Toggle -->
    <div class="flex gap-2 bg-black/70 backdrop-blur rounded-full p-1">
      <button
        on:click={() => viewMode = 'dog'}
        class="px-4 py-2 rounded-full font-semibold text-sm transition {viewMode === 'dog' ? 'bg-white text-black' : 'text-white'}"
      >
        Dog
      </button>
      <button
        on:click={() => viewMode = 'split'}
        class="px-4 py-2 rounded-full font-semibold text-sm transition {viewMode === 'split' ? 'bg-white text-black' : 'text-white'}"
      >
        Split
      </button>
      <button
        on:click={() => viewMode = 'human'}
        class="px-4 py-2 rounded-full font-semibold text-sm transition {viewMode === 'human' ? 'bg-white text-black' : 'text-white'}"
      >
        Normal
      </button>
    </div>

    <!-- Settings toggle (only in portrait) -->
    {#if !isLandscape}
      <button
        on:click={() => drawerOpen = !drawerOpen}
        class="bg-black/70 backdrop-blur text-white p-3 rounded-full"
      >
        {#if drawerOpen}
          <X size={24} />
        {:else}
          <Settings size={24} />
        {/if}
      </button>
    {:else}
      <!-- Empty spacer in landscape to keep layout balanced -->
      <div class="w-12"></div>
    {/if}
  </div>

  <!-- HUD Overlay - Bottom Controls -->
  <div class="absolute bottom-8 left-0 right-0 flex justify-center gap-6 items-end px-4">
    <!-- Flip camera -->
    <button
      on:click={toggleCamera}
      class="bg-white/90 backdrop-blur p-4 rounded-full shadow-2xl hover:bg-white transition"
    >
      <FlipHorizontal size={28} class="text-gray-800" />
    </button>

    <!-- Capture button -->
    <button
      on:click={handleSave}
      class="bg-blue-600 p-6 rounded-full shadow-2xl hover:bg-blue-700 transition ring-4 ring-white/30"
    >
      <Save size={32} class="text-white" />
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

  <!-- Settings Panel - Portrait: Sliding drawer, Landscape: Right sidebar -->
  {#if isLandscape}
    <!-- Landscape: Fixed right sidebar -->
    <div class="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-black via-black/95 to-transparent backdrop-blur-xl p-4 overflow-y-auto border-l border-white/10">
      <div class="space-y-4 pt-20 pb-24">
        <!-- Breed Selection -->
        <div>
          <label class="block text-white font-semibold mb-2 text-sm">Dog Breed</label>
          <select bind:value={breed} class="w-full p-3 bg-white/10 text-white text-sm border-2 border-white/20 rounded-xl focus:border-white/40 focus:outline-none backdrop-blur">
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
            <label class="block text-white font-semibold mb-2 text-sm">Retinal Configuration</label>
            <select bind:value={retinalMode} class="w-full p-3 bg-white/10 text-white text-sm border-2 border-white/20 rounded-xl focus:border-white/40 focus:outline-none backdrop-blur">
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
          <label class="block text-white font-semibold mb-2 text-sm">Vision Filters</label>
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
    <div class="absolute bottom-0 left-0 right-0 transition-transform duration-300 {drawerOpen ? 'translate-y-0' : 'translate-y-full'}">
      <div class="bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-xl p-6 pb-32 rounded-t-3xl shadow-2xl border-t border-white/10">
        <div class="max-w-2xl mx-auto space-y-6">
          <!-- Breed Selection -->
          <div>
            <label class="block text-white font-semibold mb-3 text-lg">Dog Breed</label>
            <select bind:value={breed} class="w-full p-4 bg-white/10 text-white border-2 border-white/20 rounded-xl focus:border-white/40 focus:outline-none backdrop-blur">
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
              <label class="block text-white font-semibold mb-3 text-lg">Retinal Configuration</label>
              <select bind:value={retinalMode} class="w-full p-4 bg-white/10 text-white border-2 border-white/20 rounded-xl focus:border-white/40 focus:outline-none backdrop-blur">
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
            <label class="block text-white font-semibold mb-3 text-lg">Vision Filters</label>
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
