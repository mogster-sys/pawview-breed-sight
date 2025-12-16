<script lang="ts">
  import { onMount } from 'svelte';
  import { getGalleryPhotos, deletePhoto } from '$lib/utils/photoGallery';
  import type { SavedPhoto } from '$lib/utils/photoGallery';

  let photos: SavedPhoto[] = [];

  onMount(async () => {
    const result = await getGalleryPhotos(0, 50);
    photos = result.photos;
  });

  async function handleDelete(id: string) {
    if (confirm('Delete this photo?')) {
      await deletePhoto(id);
      const result = await getGalleryPhotos(0, 50);
      photos = result.photos;
    }
  }
</script>

<svelte:head>
  <title>Photo Gallery - My Doggles</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-50 to-yellow-100">
  <nav class="bg-white/80 backdrop-blur-sm shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="/" data-sveltekit-reload class="text-2xl font-bold text-blue-800">🐕 My Doggles</a>
      <div class="flex gap-4">
        <a href="/camera" data-sveltekit-reload class="text-blue-700">Camera</a>
        <a href="/gallery" data-sveltekit-reload class="text-blue-700">Gallery</a>
        <a href="/learn" data-sveltekit-reload class="text-blue-700">Learn</a>
      </div>
    </div>
  </nav>

  <div class="max-w-6xl mx-auto mt-10 px-4">
    <h1 class="font-bold text-3xl text-blue-800 mb-6">Photo Gallery</h1>

    {#if photos.length === 0}
      <div class="text-center py-20">
        <p class="text-gray-600 text-lg mb-4">No photos yet!</p>
        <a href="/camera" data-sveltekit-reload class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Take Your First Photo
        </a>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each photos as photo (photo.id)}
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={photo.imageUrl} alt="Dog vision" class="w-full aspect-video object-cover" />
            <div class="p-4">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <p class="font-semibold capitalize">{photo.breed}</p>
                  <p class="text-sm text-gray-600">{photo.retinalMode}</p>
                </div>
                <button
                  on:click={() => handleDelete(photo.id)}
                  class="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
              <p class="text-xs text-gray-500">{new Date(photo.timestamp).toLocaleDateString()}</p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
