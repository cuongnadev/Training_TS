export function parsePath(currentPath: string, routePath: string): Record<string, string> | null {
    const currentSegments = currentPath.split('/').filter(Boolean);
    const routeSegments = routePath.split('/').filter(Boolean);

    if(currentSegments.length !== routeSegments.length) return null;

    const params: Record<string, string> = {};

    for(let i = 0; i < routeSegments.length; i++) {
        if(routePath[i].startsWith(':')) {
            const paramName = routePath[i].slice(1);
            params[paramName] = currentSegments[i];
        } else if(routeSegments[i] !== currentSegments[i]){
            return null;
        }
    }

    return params;
}

export function parseQuery(search: string): URLSearchParams {
    return new URLSearchParams(search);
}
