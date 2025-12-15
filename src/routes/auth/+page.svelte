<script lang="ts">
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let mode: 'login' | 'signup' = 'login';

  async function handleSubmit() {
    // Placeholder for Supabase auth
    console.log('Auth:', { email, password, mode });
    goto('/');
  }
</script>

<svelte:head>
  <title>Sign In - My Doggles</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-50 to-yellow-100 flex items-center justify-center">
  <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
    <h1 class="text-3xl font-bold text-blue-800 mb-6 text-center">
      {mode === 'login' ? 'Sign In' : 'Sign Up'}
    </h1>

    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          id="password"
          bind:value={password}
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {mode === 'login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>

    <div class="mt-4 text-center">
      <button
        on:click={() => mode = mode === 'login' ? 'signup' : 'login'}
        class="text-blue-600 hover:underline text-sm"
      >
        {mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
      </button>
    </div>
  </div>
</div>
