<template>
    <article>
        <!--render the UI-->
        <ProductCard :item="item" />
    </article>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { Product } from '~/types/Product.type';

const props = defineProps({
    item: {
        type: Object as PropType<Product>,
        required: true
    }
})
</script>