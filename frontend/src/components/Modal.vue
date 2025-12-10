
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-lg p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-base font-semibold">
          <slot name="title">Título</slot>
        </h3>
        <button class="text-slate-400 hover:text-slate-600" @click="$emit('close')">✕</button>
      </div>
      <div class="mb-4">
        <slot name="content"></slot>
      </div>
      <div class="flex justify-end gap-2">
        <button class="px-3 py-1 rounded bg-slate-200" @click="$emit('close')">Cancelar</button>
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
// Modal simples reutilizável
</script>
