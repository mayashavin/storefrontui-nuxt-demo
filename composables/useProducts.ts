import data from '~/listing.json'
import { Product } from '~/types/Product.type';

export const useProducts = ():{ products: Ref<Product[]> } => {
    const products = ref(data as any as Product[]);

    return {
        products
    }
}