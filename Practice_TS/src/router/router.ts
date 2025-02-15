import createHistory from "./history";
import { parsePath, parseQuery } from "./utils";

type RouteHandler = (params: Record<string, string>, query: URLSearchParams ) => void;

interface Route {
    path: string,
    handler: RouteHandler,
}

class Router {
    private routes: Route[] = [];
    private fallback: RouteHandler;
    private history = createHistory();

    constructor(fallback: RouteHandler) {
        this.fallback = fallback;

        // Khi lịch sử thay đổi
        this.history.listen(() => this.handleRouteChange());
    }

    addRoute(path: string, handler: RouteHandler): void {
        this.routes.push({ path, handler });
    }

    navigate(path: string): void {
        this.history.push(path);
    }

    private handleRouteChange(): void {
        const { pathname, search } = window.location;
        const query = parseQuery(search);

        for(const route of this.routes) {
            const params = parsePath(pathname, route.path);

            if(params) {
                route.handler(params, query);
                return;
            }
        }

        this.fallback({}, query);
    }
}

export default Router;