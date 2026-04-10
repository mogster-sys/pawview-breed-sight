<script lang="ts">
  import { onMount } from 'svelte';
  import { getGalleryPhotos, deletePhoto } from '$lib/utils/photoGallery';
  import type { SavedPhoto } from '$lib/utils/photoGallery';
  import { Share } from '@capacitor/share';
  import { Filesystem, Directory } from '@capacitor/filesystem';
  import { Capacitor } from '@capacitor/core';

  let photos: SavedPhoto[] = [];

  onMount(async () => {
    photos = await getGalleryPhotos(0, 50);
  });

  async function handleDelete(id: string) {
    if (confirm('Delete this photo?')) {
      await deletePhoto(id);
      photos = await getGalleryPhotos(0, 50);
    }
  }

  async function handleShare(photo: SavedPhoto) {
    if (!photo.imageData) return;

    try {
      if (Capacitor.isNativePlatform()) {
        const ext = photo.fileName.endsWith('.jpg') ? '.jpg' : '.png';
        const tempName = `share_${Date.now()}${ext}`;
        let base64 = photo.imageData;
        const commaIdx = base64.indexOf(',');
        if (commaIdx >= 0) base64 = base64.substring(commaIdx + 1);

        const written = await Filesystem.writeFile({
          path: tempName,
          data: base64,
          directory: Directory.Cache,
        });

        try {
          await Share.share({
            title: `Dog Vision - ${photo.breed}`,
            text: `See how a ${photo.breed} sees the world! Captured with My Doggles.`,
            url: written.uri,
          });
        } catch (_) {
          // User cancelled share — that's fine
        }

        // Clean up temp file
        try {
          await Filesystem.deleteFile({ path: tempName, directory: Directory.Cache });
        } catch (_) { /* ignore cleanup errors */ }
      } else {
        // Web fallback - download
        const link = document.createElement('a');
        link.href = photo.imageData;
        link.download = `mydoggles_${photo.breed}_${photo.retinalMode}.jpg`;
        link.click();
      }
    } catch (e) {
      console.error('Share failed:', e);
    }
  }
</script>

<svelte:head>
  <title>Photo Gallery - My Doggles</title>
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
        <a href="/gallery" data-sveltekit-reload class="font-label text-sm font-medium uppercase tracking-wide text-primary">Gallery</a>
        <a href="/learn" data-sveltekit-reload class="font-label text-sm font-medium uppercase tracking-wide text-ink-muted hover:text-primary transition">Your Dog</a>
      </div>
    </div>
  </nav>

  <div class="max-w-6xl mx-auto mt-12 px-6 pb-20">
    <div class="flex items-end justify-between mb-10">
      <div>
        <p class="font-label text-xs font-semibold uppercase tracking-widest text-tertiary mb-2">Archive</p>
        <h1 class="font-display text-4xl font-bold tracking-tight text-ink">Photo Gallery</h1>
      </div>
      <a href="/camera" data-sveltekit-reload
        class="bg-gradient-to-br from-primary to-primary-container text-primary-on font-label text-xs font-semibold uppercase tracking-wide px-6 py-3 hover:from-primary-dim transition">
        Capture
      </a>
    </div>

    {#if photos.length === 0}
      <div class="text-center py-24 bg-surface-low">
        <p class="font-body text-ink-muted text-lg italic mb-6">No photographs yet.</p>
        <a href="/camera" data-sveltekit-reload
          class="inline-block bg-gradient-to-br from-primary to-primary-container text-primary-on font-label text-sm font-semibold uppercase tracking-wide px-8 py-4 hover:from-primary-dim transition">
          Take Your First Photo
        </a>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-surface-mid">
        {#each photos as photo (photo.id)}
          <div class="bg-surface flex flex-col">
            <img src={photo.imageData} alt="Dog vision capture" class="w-full aspect-video object-cover" />
            <div class="p-5">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <p class="font-display text-sm font-semibold text-ink capitalize">{photo.breed}</p>
                  <p class="font-label text-xs uppercase tracking-wide text-tertiary">{photo.retinalMode}</p>
                </div>
                <div class="flex gap-3">
                  <button onclick={() => handleShare(photo)}
                    class="font-label text-xs uppercase tracking-wide text-primary hover:underline">
                    Share
                  </button>
                  <button onclick={() => handleDelete(photo.id)}
                    class="font-label text-xs uppercase tracking-wide text-error hover:underline">
                    Delete
                  </button>
                </div>
              </div>
              <p class="text-xs text-ink-faint font-label">{new Date(photo.timestamp).toLocaleDateString()}</p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
