<template>
    <Breadcrumbs class="mt-4 ml-4" :breadcrumbs="breadcrumbs"/>
    <div class="h-px m-4 bg-neutral-200"></div>
    <slot />
</template>
<script setup>
import { useBreadcrumbs } from '../composables/useBreadcrumbs';

const { breadcrumbs } = useBreadcrumbs();
</script>