<template>
  <nav v-if="user"
    class="fixed inset-x-0 bottom-0 pb-1 pt-1 bg-neutral-950 shadow-md border-t border-solid border-neutral-800 rounded-t-3xl">
    <ul class="flex justify-between">
      <li v-for="item in navItems" :key="item.text" class="flex-1">
        <NuxtLink :to="item.href"
          :class="{ 'text-lime-400 font-bold': isActive(item.href), 'text-gray-100': !isActive(item.href) }"
          class="block text-center text-xs py-2">
          <div class="flex flex-col items-center justify-center">
            <!-- Simple Human Outline SVG -->
            <svg class="mb-2" :class="{ 'fill-lime-400': isActive(item.href), 'fill-gray-100': !isActive(item.href) }" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                :d="item.icon">
              </path>
            </svg>
            <!-- Text -->
            <span>{{ item.text }}</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const user = useSupabaseUser();

const navItems = [
  { href: '/', text: 'Workouts', icon: 'M6 5v14h3v-6h6v6h3V5h-3v6H9V5zM3 15a1 1 0 0 0 1 1h1V8H4a1 1 0 0 0-1 1v2H2v2h1v2zm18-6a1 1 0 0 0-1-1h-1v8h1a1 1 0 0 0 1-1v-2h1v-2h-1V9z' },
  { href: '/recovery', text: 'Recovery', icon: 'M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z' },
  { href: '/diet', text: 'Diet', icon: 'M21 10H3a1 1 0 0 0-1 1 10 10 0 0 0 5 8.66V21a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1.34A10 10 0 0 0 22 11a1 1 0 0 0-1-1zm-5.45 8.16a1 1 0 0 0-.55.9V20H9v-.94a1 1 0 0 0-.55-.9A8 8 0 0 1 4.06 12h15.88a8 8 0 0 1-4.39 6.16zM9 9V7.93a4.53 4.53 0 0 0-1.28-3.15A2.49 2.49 0 0 1 7 3V2H5v1a4.53 4.53 0 0 0 1.28 3.17A2.49 2.49 0 0 1 7 7.93V9zm4 0V7.93a4.53 4.53 0 0 0-1.28-3.15A2.49 2.49 0 0 1 11 3V2H9v1a4.53 4.53 0 0 0 1.28 3.15A2.49 2.49 0 0 1 11 7.93V9zm4 0V7.93a4.53 4.53 0 0 0-1.28-3.15A2.49 2.49 0 0 1 15 3V2h-2v1a4.53 4.53 0 0 0 1.28 3.15A2.49 2.49 0 0 1 15 7.93V9z' },
  { href: '/supplements', text: 'Supplements', icon: 'M12 22c5.131 0 9-1.935 9-4.5V7h-.053c.033-.164.053-.33.053-.5C21 3.935 17.131 2 12 2 7.209 2 3.52 3.688 3.053 6H3v11.5c0 2.565 3.869 4.5 9 4.5zm0-2c-4.273 0-7-1.48-7-2.5V9.394C6.623 10.387 9.111 11 12 11s5.377-.613 7-1.606V17.5c0 1.02-2.727 2.5-7 2.5zm0-16c4.273 0 7 1.48 7 2.5S16.273 9 12 9 5 7.52 5 6.5 7.727 4 12 4z' },
  { href: '/profile', text: 'Profile', icon: 'M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z' }
];
const route = useRoute();

const isActive = (href: string) => {
  return href === route.path;
};
</script>

<style>
.human-icon path,
.human-icon circle,
.human-icon line {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: draw 5s linear forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

/* Add your existing styles here */
/* Example active state style */
.text-blue-500 {
  color: #4299e1;
  /* Tailwind blue-500 color, adjust as needed */
}
</style>
