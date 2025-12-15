<script lang="ts">
  import { onMount } from 'svelte';
  import { dogVisionFilter } from '$lib/utils/dogVisionFilters';
  import { savePhoto, getPhotoCount } from '$lib/utils/photoGallery';
  import type { RetinalMode } from '$lib/types';

  let videoRef: HTMLVideoElement;
  let canvasDogRef: HTMLCanvasElement;
  let canvasHumanRef: HTMLCanvasElement;
  let streaming = false;
  let breed = 'labrador';
  let retinalMode: RetinalMode = 'visual-streak';
  let filters = { dichro: true, contrast: false, brightness: false };
  let galleryCount = 0;
  let viewMode: 'split' | 'dog' | 'human' = 'split';
  let splitPosition = 50;

  const VIDEO_W = 700;
  const VIDEO_H = 440;

  onMount(async () => {
    galleryCount = await getPhotoCount();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: VIDEO_W, height: VIDEO_H }
      });
      videoRef.srcObject = stream;
      await videoRef.play();
      streaming = true;
      drawFrames();
    } catch (err) {
      console.error('Camera error:', err);
    }

    return () => {
      if (videoRef?.srcObject) {
        (videoRef.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  });

  function drawFrames() {
    if (!streaming) return;

    const ctxH = canvasHumanRef?.getContext('2d');
    const ctxD = canvasDogRef?.getContext('2d');

    if (ctxH && videoRef) {
      ctxH.drawImage(videoRef, 0, 0, VIDEO_W, VIDEO_H);
    }

    if (ctxD && videoRef) {
      ctxD.drawImage(videoRef, 0, 0, VIDEO_W, VIDEO_H);
      dogVisionFilter(ctxD, VIDEO_W, VIDEO_H, filters, retinalMode);
    }

    requestAnimationFrame(drawFrames);
  }

  async function handleSave() {
    if (!canvasDogRef) return;
    const imageData = canvasDogRef.toDataURL('image/png');
    await savePhoto({ imageData, breed, retinalMode, filters });
    galleryCount = await getPhotoCount();
  }
</script>

<svelte:head>
  <title>Dog Vision Camera Simulator</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-blue-50/70 to-yellow-50">
  <nav class="bg-white/80 backdrop-blur-sm shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="/" class="text-2xl font-bold text-blue-800">🐕 My Doggles</a>
      <div class="flex gap-4">
        <a href="/camera" class="text-blue-700">Camera</a>
        <a href="/gallery" class="text-blue-700">Gallery ({galleryCount})</a>
        <a href="/learn" class="text-blue-700">Learn</a>
      </div>
    </div>
  </nav>

  <div class="max-w-4xl mx-auto mt-10 px-4">
    <h1 class="font-bold text-3xl text-blue-800 mb-6 text-center">Dog Vision Camera</h1>

    <div class="flex flex-col md:flex-row gap-8">
      <div class="flex flex-col gap-4 flex-1">
        <div class="bg-white p-4 rounded-lg shadow">
          <label class="block text-sm font-medium mb-2">Breed</label>
          <select bind:value={breed} class="w-full p-2 border rounded">
            <option value="labrador">Labrador</option>
            <option value="greyhound">Greyhound</option>
            <option value="pug">Pug</option>
            <option value="beagle">Beagle</option>
          </select>
        </div>

        <div class="bg-white p-4 rounded-lg shadow">
          <label class="block text-sm font-medium mb-2">Retinal Mode</label>
          <select bind:value={retinalMode} class="w-full p-2 border rounded">
            <option value="visual-streak">Visual Streak (VS)</option>
            <option value="area-centralis">Area Centralis (AC)</option>
          </select>
        </div>

        <div class="bg-white p-4 rounded-lg shadow">
          <div class="space-y-2">
            <label class="flex items-center">
              <input type="checkbox" bind:checked={filters.dichro} class="mr-2" />
              Dichromatic (Color)
            </label>
            <label class="flex items-center">
              <input type="checkbox" bind:checked={filters.contrast} class="mr-2" />
              Lower Contrast
            </label>
            <label class="flex items-center">
              <input type="checkbox" bind:checked={filters.brightness} class="mr-2" />
              Higher Brightness
            </label>
          </div>
        </div>

        <button
          on:click={handleSave}
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save to Gallery
        </button>
      </div>

      <div class="flex-1">
        <div class="flex gap-2 mb-4">
          <button on:click={() => viewMode = 'split'} class:font-bold={viewMode === 'split'}>Split</button>
          <button on:click={() => viewMode = 'dog'} class:font-bold={viewMode === 'dog'}>Dog</button>
          <button on:click={() => viewMode = 'human'} class:font-bold={viewMode === 'human'}>Human</button>
        </div>

        <div style="width: {VIDEO_W}px; height: {VIDEO_H}px; position: relative;">
          {#if viewMode === 'split'}
            <div style="position: relative; overflow: hidden; width: 100%; height: 100%;">
              <canvas bind:this={canvasHumanRef} width={VIDEO_W} height={VIDEO_H}
                style="position: absolute; left: 0; top: 0; background: #222;" />
              <div style="position: absolute; left: {splitPosition}%; top: 0; width: {100 - splitPosition}%; height: 100%; overflow: hidden;">
                <canvas bind:this={canvasDogRef} width={VIDEO_W} height={VIDEO_H}
                  style="position: absolute; right: 0; top: 0; background: #222; transform: translateX({(100-splitPosition)*VIDEO_W/100}px);" />
              </div>
              <input type="range" bind:value={splitPosition} min="0" max="100"
                class="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3/4" />
            </div>
          {:else if viewMode === 'dog'}
            <canvas bind:this={canvasDogRef} width={VIDEO_W} height={VIDEO_H}
              style="width: 100%; background: #222;" />
          {:else}
            <canvas bind:this={canvasHumanRef} width={VIDEO_W} height={VIDEO_H}
              style="width: 100%; background: #222;" />
          {/if}
        </div>

        <video bind:this={videoRef} width={VIDEO_W} height={VIDEO_H}
          style="display: none;" playsinline muted />
      </div>
    </div>
  </div>
</div>
