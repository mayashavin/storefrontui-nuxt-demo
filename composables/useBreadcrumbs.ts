
export const useBreadcrumbs = () => {
    const router = useRouter();
    const routes = router.getRoutes();

    const HOMEPAGE = { name: 'Home', path: '/' };
    const DYNAMIC_ROUTE_PATTERN = {
    path: '/:',
    regex: /\/:\w+\W+/,
    }
    const breadcrumbs:Ref<Array<{ name: string; path: string; }>> = ref([ HOMEPAGE ])
    onBeforeRouteUpdate((to, from, next) => {
    console.log('beforeRouteUpdate')
    })

    onBeforeRouteLeave((to, from, next) => {
    console.log('beforeRouteLeave')
    })
    watch(() => ({
    path: router.currentRoute.value.path,
    name: router.currentRoute.value.name,
    meta: router.currentRoute.value.meta,
    }), (route) => {
    if (route.path === '/') return;

    // 1. Split the path into an array of sub paths
    const paths = route.path.split('/');

    // 2. Recontruct the sub paths into an array of urls
    const urls = paths.reduce((acc: string[], path: string, index: number) => {
        const url = index === 0 ? `/${path}` : `${acc[index - 1] !== '/' ? acc[index - 1] : ''}/${path}`
        acc.push(url)
        return acc
    }, []);

    console.log({ route, urls })

    // 3. Update the breadcrumbs
    breadcrumbs.value = urls.reduce((acc: Array<{ path: string, name: string }>, url: string) => {
        const found = routes.find(r => {
        if (r.path === url) return true;

        // 3.1 If the route has a param, check if the url matches the route path pattern
        if (r.path.includes(DYNAMIC_ROUTE_PATTERN.path) && url.startsWith(r.path.replace(DYNAMIC_ROUTE_PATTERN.regex, ''))) {
            const [path, param] = r.path.split(DYNAMIC_ROUTE_PATTERN.path)
            console.log({ param, url, r })

            //3.2 Build the regex to math dynamic URL
            const regex = `/${path.substring(1)}\/([^\/]+)`

            // 3.3 Check if the url matches the regex and if it doesn't contain any other sub paths
            return !param.includes('/') && url.match(regex)
        }
        })

        const toAdd = found ? {
        name: (found.meta?.breadcrumb || found.name || url) as string,
        path: url,
        } : {
        name: url,
        path: url,
        }


        return [...acc, toAdd]
    }, [ ]);
    }, {
        immediate: true,
    })

    return {
        breadcrumbs
    }
}