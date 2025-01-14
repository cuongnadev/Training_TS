import search from '~/assets/icons/Search.svg';
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
        console.log(params);
        
        if (params?.search) {
            return `/api/students?q=${params.search}`;
        } else if (params?.page != null && params?.itemsPerPage != null) {
            return `/api/students?_start=${params.page}&_limit=${params.itemsPerPage}`;
        } else if (params?.search) {
            return `/api/students?search=${params.search}`;
        }
        return "/api/students";
    },
    getStudent: ({ id }) => `/api/students/${id}`,
    postStudent: () => "/api/students",
    patchStudent: ({ id }) => `/api/students/${id}`,
    deleteStudent: ({ id }) => `/api/students/${id}`,

    getTeachers: (params) => {
        console.log(params);
        
        if (params?.search) {
            return `/api/teachers?q=${params.search}`;
        } else if (params?.page != null && params?.itemsPerPage != null) {
            return `/api/teachers?_start=${params.page}&_limit=${params.itemsPerPage}`;
        } else if (params?.search) {
            return `/api/teachers?search=${params.search}`;
        }
        return "/api/teachers";
    },
    getTeacher: ({ id }) => `/api/teachers/${id}`,
    postTeacher: () => "/api/teachers",
    patchTeacher: ({ id }) => `/api/teachers/${id}`,
    deleteTeacher: ({ id }) => `/api/teachers/${id}`,
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
