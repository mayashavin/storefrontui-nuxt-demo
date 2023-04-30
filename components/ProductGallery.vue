<template>
    <h1 class="my-4 text-3xl font-extrabold text-gray-900 md:text-4xl text-center dark:text-white">All products</h1>
    <ul class="mx-8 my-4 flex flex-wrap gap-3 justify-center">
        <li v-for="product in products" :key="product.sku">
            <ProductCard :item="product" />
        </li>
    </ul>
</template>
<script setup lang="ts">
import { useProducts } from '~/composables/useProducts';

const { products } = useProducts();
</script>