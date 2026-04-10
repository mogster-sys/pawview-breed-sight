<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { ChevronRight } from 'lucide-svelte';
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
