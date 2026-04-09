<script lang="ts">
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let mode: 'login' | 'signup' = 'login';

  async function handleSubmit() {
    console.log('Auth:', { email, password, mode });
    goto('/');
  }
</script>

<svelte:head>
  <title>Sign In - My Doggles</title>
</svelte:head>

<div class="min-h-screen bg-surface flex items-center justify-center px-4">
  <div class="bg-surface-low p-10 max-w-md w-full">
    <p class="font-label text-xs font-semibold uppercase tracking-widest text-tertiary mb-3">Account</p>
    <h1 class="font-display text-3xl font-bold text-ink mb-8">
      {mode === 'login' ? 'Sign In' : 'Sign Up'}
    </h1>

    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-5">
      <div>
        <label for="email" class="block font-label text-xs uppercase tracking-widest text-ink-muted mb-2">Email</label>
        <input type="email" id="email" bind:value={email}
          class="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-outline text-ink font-body focus:outline-none focus:border-primary"
          required />
      </div>

      <div>
        <label for="password" class="block font-label text-xs uppercase tracking-widest text-ink-muted mb-2">Password</label>
        <input type="password" id="password" bind:value={password}
          class="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-outline text-ink font-body focus:outline-none focus:border-primary"
          required />
      </div>

      <button type="submit"
        class="w-full bg-gradient-to-br from-primary to-primary-container text-primary-on font-label text-sm font-semibold uppercase tracking-wide py-4 hover:from-primary-dim transition">
        {mode === 'login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>

    <div class="mt-6 text-center">
      <button onclick={() => mode = mode === 'login' ? 'signup' : 'login'}
        class="font-label text-sm text-tertiary hover:text-primary transition">
        {mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
      </button>
    </div>
  </div>
</div>
