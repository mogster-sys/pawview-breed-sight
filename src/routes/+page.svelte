<script lang="ts">
  import { Camera, Folder, BookText } from 'lucide-svelte';
</script>

<svelte:head>
  <title>My Doggles - See Through Your Dog's Eyes</title>
  <meta name="description" content="Experience the world as your dog does. Simulate dog vision with breed-specific filters, retinal configurations, and live camera effects." />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-50 to-yellow-100">
  <nav class="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="/" class="text-2xl font-bold text-blue-800">🐕 My Doggles</a>
      <div class="flex gap-4">
        <a href="/camera" class="text-blue-700 hover:text-blue-900">Camera</a>
        <a href="/gallery" class="text-blue-700 hover:text-blue-900">Gallery</a>
        <a href="/learn" class="text-blue-700 hover:text-blue-900">Learn</a>
      </div>
    </div>
  </nav>

  <div class="max-w-5xl mx-auto py-8 px-2">
    <header class="my-10 text-center">
      <h1 class="text-5xl font-extrabold text-blue-800 mb-4 drop-shadow">
        🦴 My Doggles
      </h1>
      <h2 class="text-xl font-medium text-blue-700 mb-8">
        Your dog sees the world different to you, share their experience with My Doggles
      </h2>
      <div class="text-lg text-gray-800 max-w-2xl mx-auto mb-7">
        All dogs' experience of color is different to humans, lacking red but did you know their visual field differs across breeds according to which of two configurations of retinal cells your dog has, an Area Centralis or Visual Streak. Select your dog's breed, activate the live camera filter, and see exactly how different dogs experience vision. Educational, fun, and science-backed!
      </div>
    </header>

    <div class="flex flex-wrap gap-8 justify-center items-stretch mt-10 mb-24">
      <a href="/camera" class="flex flex-col justify-between items-center border rounded-xl bg-white shadow-md hover:shadow-xl transition p-8 min-w-[260px] h-64 group">
        <div class="mb-4"><Camera class="text-yellow-400" size={54} /></div>
        <div>
          <div class="font-semibold text-xl text-blue-900 group-hover:text-yellow-500">Live Dog Vision Camera</div>
          <div class="text-gray-500 mt-2">See through your dog's eyes in real time—choose retinal mode (AC/VS), split view comparison. Capture and save filtered 'dog view' photos!</div>
        </div>
      </a>
      <a href="/gallery" class="flex flex-col justify-between items-center border rounded-xl bg-white shadow-md hover:shadow-xl transition p-8 min-w-[260px] h-64 group">
        <div class="mb-4"><Folder class="text-blue-400" size={50} /></div>
        <div>
          <div class="font-semibold text-xl text-blue-900 group-hover:text-yellow-500">Photo Gallery</div>
          <div class="text-gray-500 mt-2">View and compare your saved dog vision photos side-by-side. Analyze different breeds and retinal configurations.</div>
        </div>
      </a>
      <a href="/learn" class="flex flex-col justify-between items-center border rounded-xl bg-white shadow-md hover:shadow-xl transition p-8 min-w-[260px] h-64 group">
        <div class="mb-4"><BookText class="text-blue-500" size={50} /></div>
        <div>
          <div class="font-semibold text-xl text-blue-900 group-hover:text-yellow-500">Learn & Compare</div>
          <div class="text-gray-500 mt-2">Dive into breed vision facts, simulator types, and interactive education.</div>
        </div>
      </a>
    </div>
  </div>
</div>
