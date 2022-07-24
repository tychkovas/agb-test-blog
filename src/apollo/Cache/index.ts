import { InMemoryCache } from "@apollo/client";

async function initCache(): Promise<InMemoryCache> {
    const cache: InMemoryCache = new InMemoryCache();

    return cache;
}
export default initCache;
