<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { ChevronRight, Compass, PawPrint, BookOpen, Images } from 'lucide-svelte';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();

  let showSplash = $state(false);
  let splashFading = $state(false);

  onMount(() => {
    const hasLaunched = localStorage.getItem('mydoggles_launched');
    if (!hasLaunched) {
      showSplash = true;
    }
  });

  function dismissSplash() {
    splashFading = true;
    localStorage.setItem('mydoggles_launched', 'true');
    setTimeout(() => { showSplash = false; }, 500);
  }

  // Hide bottom nav on camera (fullscreen experience)
  const hideBottomNav = $derived($page.url.pathname.startsWith('/camera'));
</script>

{#if showSplash}
  <button class="fixed inset-0 z-[100] bg-surface flex flex-col items-center justify-start pt-12 transition-opacity duration-500 border-0 cursor-default {splashFading ? 'opacity-0' : 'opacity-100'}"
    onclick={dismissSplash}>
    <img src="/splash.png" alt="My Doggles" class="max-h-[75vh] w-auto object-contain" />
    <div class="mt-8">
      <span class="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-primary-on font-label text-sm font-semibold uppercase tracking-wide px-10 py-5 cursor-pointer">
        Get Started <ChevronRight size={20} />
      </span>
    </div>
  </button>
{/if}

{@render children()}

{#if !hideBottomNav}
  <nav class="fixed bottom-0 left-0 right-0 z-40 bg-primary text-primary-on shadow-[0_-2px_20px_rgba(32,27,12,0.15)]">
    <div class="grid grid-cols-4">
      <a href="/learn" data-sveltekit-reload
        class="flex flex-col items-center gap-1.5 py-3 transition {$page.url.pathname === '/learn' ? 'bg-tertiary-container text-tertiary-on' : 'hover:bg-primary-dim'}">
        <BookOpen size={18} strokeWidth={1.75} />
        <span class="font-label text-[10px] font-bold uppercase tracking-[0.15em]">Chronicle</span>
      </a>
      <a href="/camera" data-sveltekit-reload
        class="flex flex-col items-center gap-1.5 py-3 transition hover:bg-primary-dim">
        <Compass size={18} strokeWidth={1.75} />
        <span class="font-label text-[10px] font-bold uppercase tracking-[0.15em]">Hunt</span>
      </a>
      <a href="/" data-sveltekit-reload
        class="flex flex-col items-center gap-1.5 py-3 transition {$page.url.pathname === '/' ? 'bg-tertiary-container text-tertiary-on' : 'hover:bg-primary-dim'}">
        <PawPrint size={18} strokeWidth={1.75} />
        <span class="font-label text-[10px] font-bold uppercase tracking-[0.15em]">Squad</span>
      </a>
      <a href="/gallery" data-sveltekit-reload
        class="flex flex-col items-center gap-1.5 py-3 transition {$page.url.pathname === '/gallery' ? 'bg-tertiary-container text-tertiary-on' : 'hover:bg-primary-dim'}">
        <Images size={18} strokeWidth={1.75} />
        <span class="font-label text-[10px] font-bold uppercase tracking-[0.15em]">Logs</span>
      </a>
    </div>
  </nav>
{/if}
