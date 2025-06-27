<template>
  <div>
    <header class="bg-gray-800 text-white p-4">
      <nav class="container mx-auto flex justify-between">
        <NuxtLink to="/" class="font-bold">Aotter-Wow</NuxtLink>
        <div>
          <NuxtLink to="/" class="px-4">Home</NuxtLink>
          <NuxtLink to="/login" class="px-4">Login</NuxtLink>
          <NuxtLink to="/register" class="px-4">Register</NuxtLink>
        </div>
      </nav>
    </header>
    <main class="container mx-auto p-4">
      <slot />
    </main>
  </div>
</template>
