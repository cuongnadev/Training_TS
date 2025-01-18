type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";
type EndpointMethod<T = object> = (arg: T) => string;

interface ApiEndpoints {
    getStudents: EndpointMethod<{ page?: number, itemsPerPage?: number, search?: string } | undefined>;
    getStudent: EndpointMethod<{ id: string }>;
    postStudent: EndpointMethod<void>;
    patchStudent: EndpointMethod<{ id: string }>;
    deleteStudent: EndpointMethod<{ id: string }>;

    getTeachers: EndpointMethod<{ page?: number, itemsPerPage?: number, search?: string } | undefined>;
    getTeacher: EndpointMethod<{ id: string }>;
    postTeacher: EndpointMethod<void>;
    patchTeacher: EndpointMethod<{ id: string }>;
    deleteTeacher: EndpointMethod<{ id: string }>;
}

const endpoints: ApiEndpoints = {
    getStudents: (params) => {
        if (params?.search) {
            return `/students?q=${params.search}`;
        } else if (params?.page != null && params?.itemsPerPage != null) {
            return `/students?_start=${params.page}&_limit=${params.itemsPerPage}`;
        } else if (params?.search) {
            return `/students?search=${params.search}`;
        }
        return "/students";
    },
    getStudent: ({ id }) => `/students/${id}`,
    postStudent: () => "/students",
    patchStudent: ({ id }) => `/students/${id}`,
    deleteStudent: ({ id }) => `/students/${id}`,

    getTeachers: (params) => {
        if (params?.search) {
            return `/teachers?q=${params.search}`;
        } else if (params?.page != null && params?.itemsPerPage != null) {
            return `/teachers?_start=${params.page}&_limit=${params.itemsPerPage}`;
        } else if (params?.search) {
            return `/teachers?search=${params.search}`;
        }
        return "/teachers";
    },
    getTeacher: ({ id }) => `/teachers/${id}`,
    postTeacher: () => "/teachers",
    patchTeacher: ({ id }) => `/teachers/${id}`,
    deleteTeacher: ({ id }) => `/teachers/${id}`,
};

class ApiService {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    async request<T, K extends keyof ApiEndpoints>(
        method: HttpMethod,
        endpointKey: K,
        params: Parameters<ApiEndpoints[K]>[0] | undefined,
        searchParams?: [key: string, value: string][],
        body?: any,
        headers: Record<string, string> = { "Content-Type": "application/json" },
        stringify: boolean = true,
    ): Promise<T> {
        try {
            const endpointFunction = endpoints[endpointKey] as EndpointMethod<
                Parameters<ApiEndpoints[typeof endpointKey]>[0]
            >;
            let url = `${this.baseURL}${endpointFunction(params)}`;

            if (searchParams) {
                const queryString = new URLSearchParams(searchParams).toString();
                url += `?${queryString}`;
                // url += "?" + searchParams.map((search) => search.join("=")).join("&");
            }

            const response = await fetch(url, {
                method,
                headers,
                body: body ? (stringify ? JSON.stringify(body) : body) : undefined,
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`HTTP Error: ${response.status} - ${errorMessage}`);
            }

            return (await response.json()) as T;
        } catch (error) {
            console.error("API Request failed:", error);
            throw error;
        }
    }
}
export default ApiService;
