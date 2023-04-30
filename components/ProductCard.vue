<template>
    <article class="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px] h-full flex flex-col">
      <div class="relative">
        <SfLink :href="`/products/${item.sku}`" :tag="NuxtLink">
          <img
            :src="item.images[0]"
            :alt="item.title"
            class="block object-cover h-auto rounded-md aspect-square"
            :height="300"
          />
        </SfLink>
        <SfButton
          type="button"
          variant="tertiary"
          size="sm"
          square
          class="absolute bottom-0 right-0 mr-2 mb-2 bg-white border border-neutral-200 !rounded-full"
          aria-label="Add to wishlist"
        >
          <SfIconFavorite size="sm" />
        </SfButton>
      </div>
      <div class="p-4 border-t border-neutral-200 flex-1">
        <SfLink href="#" variant="secondary" class="no-underline"> {{ item.title }} </SfLink>
        <div class="flex items-center pt-1">
          <SfRating size="xs" :value="totalRatings" :max="5" />
  
          <SfLink href="#" variant="secondary" class="pl-1 no-underline">
            <SfCounter size="xs">{{ item.ratings.length }}</SfCounter>
          </SfLink>
        </div>
        <span class="block pb-2 font-bold typography-text-lg">{{ item.currency_code }}{{ item.price }}</span>
      </div>
      <SfButton type="button" size="sm" class="m-4 w-fit self-end">
          <template #prefix>
            <SfIconShoppingCart size="sm" />
          </template>
          Add to cart
        </SfButton>
    </article>
</template>

<script lang="ts" setup>
import { SfRating, SfCounter, SfLink, SfButton, SfIconShoppingCart, SfIconFavorite } from '@storefront-ui/vue';
import type { Product } from '~/types/Product.type';
import { useRatings } from '~/composables/useRatings';
import { resolveComponent } from 'vue';

const NuxtLink = resolveComponent('NuxtLink');

const props = defineProps({
    item: {
        type: Object as PropType<Product>,
        required: true
    }
})

const totalRatings = useRatings(props.item.ratings);
</script>
