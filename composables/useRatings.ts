import { computed } from 'vue';

export const useRatings = (ratings: number[]) => {
    return computed(() => {
        const rating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
        return +(rating.toFixed(1));
    });
}