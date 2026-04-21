<script lang="ts">
  import { onMount } from 'svelte';
  import { getGalleryPhotos, deletePhoto } from '$lib/utils/photoGallery';
  import type { SavedPhoto } from '$lib/utils/photoGallery';
  import { Share } from '@capacitor/share';
  import { Filesystem, Directory } from '@capacitor/filesystem';
  import { Capacitor } from '@capacitor/core';
  import { Menu, Settings, Share2, Trash2, Camera } from 'lucide-svelte';

  let photos: SavedPhoto[] = [];

  onMount(async () => {
    photos = await getGalleryPhotos(0, 50);
  });

  async function handleDelete(id: string) {
    if (confirm('Delete this entry from the logs?')) {
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
        } catch (_) { /* user cancelled */ }

        try {
          await Filesystem.deleteFile({ path: tempName, directory: Directory.Cache });
        } catch (_) { /* ignore */ }
      } else {
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
  <title>Field Logs - My Doggles</title>
</svelte:head>

<div class="min-h-screen bg-surface pb-24">
  <!-- Top App Bar -->
  <nav class="bg-surface sticky top-0 z-30">
    <div class="px-5 py-4 flex items-center justify-between border-b-[1.5px] border-tertiary-container/40">
      <a href="/" data-sveltekit-reload class="p-1 -ml-1 text-ink" aria-label="Menu">
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
      <p class="font-label text-[10px] font-bold uppercase tracking-[0.2em]">The Archives</p>
    </div>

    <h2 class="font-display text-5xl font-bold tracking-tight text-ink leading-[0.85] mb-2">
      Field<br/>Logs
    </h2>
    <div class="w-12 h-0.5 bg-tertiary my-4"></div>
    <p class="font-body text-base text-ink-muted leading-relaxed italic max-w-md mb-6">
      {photos.length === 0 ? 'No entries recorded. Embark upon the hunt to begin documentation.' : `${photos.length} ${photos.length === 1 ? 'entry' : 'entries'} documented from the field.`}
    </p>

    <a href="/camera" class="bg-primary text-primary-on font-label text-[11px] font-bold uppercase tracking-[0.18em] px-6 py-3.5 inline-flex items-center gap-2 hover:bg-primary-dim transition">
      <Camera size={14} strokeWidth={2} />
      Begin Hunt
    </a>
  </div>

  <!-- Log Entries -->
  <div class="px-5 pt-4">
    {#if photos.length === 0}
      <div class="bg-surface-low text-center py-16 px-6">
        <Camera size={32} class="mx-auto mb-4 text-tertiary opacity-50" strokeWidth={1.5} />
        <p class="font-body text-ink-muted italic">Awaiting first expedition.</p>
      </div>
    {:else}
      <div class="space-y-6">
        {#each photos as photo, idx (photo.id)}
          <article class="bg-surface-low">
            <div class="relative aspect-[4/3] overflow-hidden">
              <img src={photo.imageData} alt="Dog vision capture" class="w-full h-full object-cover" />
              <div class="absolute top-3 left-3 bg-surface text-tertiary px-2 py-1 font-label text-[9px] font-bold uppercase tracking-[0.18em]">
                Entry No. {String(photos.length - idx).padStart(4, '0')}
              </div>
              <div class="absolute bottom-3 right-3 bg-ink/80 text-surface px-2 py-1 font-label text-[9px] font-bold uppercase tracking-[0.18em]">
                {photo.retinalMode === 'visual-streak' ? 'VS' : 'AC'}
              </div>
            </div>
            <div class="p-5">
              <div class="flex items-baseline justify-between mb-3">
                <div>
                  <p class="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-tertiary mb-1">Subject</p>
                  <p class="font-display text-lg font-bold text-ink capitalize">{photo.breed.replace(/-/g, ' ')}</p>
                </div>
                <p class="font-label text-[10px] uppercase tracking-[0.15em] text-ink-faint">{new Date(photo.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}</p>
              </div>
              <div class="flex gap-1 pt-3 border-t border-tertiary-container/40">
                <button onclick={() => handleShare(photo)}
                  class="flex-1 bg-surface text-ink font-label text-[11px] font-bold uppercase tracking-[0.18em] py-3 inline-flex items-center justify-center gap-2 hover:bg-surface-mid transition">
                  <Share2 size={13} strokeWidth={2} />
                  Share
                </button>
                <button onclick={() => handleDelete(photo.id)}
                  class="flex-1 bg-surface text-error font-label text-[11px] font-bold uppercase tracking-[0.18em] py-3 inline-flex items-center justify-center gap-2 hover:bg-surface-mid transition">
                  <Trash2 size={13} strokeWidth={2} />
                  Discard
                </button>
              </div>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </div>
</div>
