<template>
  <div
    class="relative overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100 p-4 flex flex-col gap-1"
  >
    <div class="text-xs uppercase tracking-wide text-slate-500">
      {{ label }}
    </div>
    <div class="text-3xl font-semibold text-slate-900">
      {{ value }}
    </div>
    <div class="absolute inset-y-0 right-0 w-20 bg-gradient-to-b from-blue-50 to-slate-50 pointer-events-none" />
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: [String, Number]
})
</script>
