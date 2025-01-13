import ApiService from "./api";

export default class TeacherService {
    private apiService: ApiService;

    constructor(baseURL: string) {
        this.apiService = new ApiService(baseURL);
    }

    /**
     * Lấy danh sách giáo viên
     * @param token - Token xác thực
     */
    async getTeachers(token: string, page?: number, itemsPerPage?: number, search?: string): Promise<any> {
        const params = search
            ? { search }
            : page != null && itemsPerPage != null
              ? { page, itemsPerPage }
              : undefined;
        return await this.apiService.request("GET", "getTeachers", params, undefined, undefined, {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        });
    }

    /**
     * Lấy thông tin chi tiết của một giáo viên theo ID
     * @param id - ID của giáo viên
     * @param token - Token xác thực
     */
    async getTeacher(id: string, token: string): Promise<any> {
        return await this.apiService.request("GET", "getTeacher", { id }, undefined, undefined, {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        });
    }

    /**
     * Thêm một giáo viên mới
     * @param teacher - Thông tin giáo viên mới
     * @param token - Token xác thực
     */
    async postTeacher(teacher: object, token: string): Promise<any> {
        return await this.apiService.request("PUSH", "postTeacher", undefined, undefined, teacher, {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        });
    }

    /**
     * Cập nhật thông tin của giáo viên theo ID
     * @param id - ID của giáo viên
     * @param updatedData - Dữ liệu cập nhật
     * @param token - Token xác thực
     */
    async patchTeacher(id: string, updatedData: object, token: string): Promise<any> {
        return await this.apiService.request("PATCH", "patchTeacher", { id }, undefined, updatedData, {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        });
    }

    /**
     * Xóa một giáo viên theo ID
     * @param id - ID của giáo viên
     * @param token - Token xác thực
     */
    async deleteTeacher(id: string, token: string): Promise<any> {
        return await this.apiService.request("DELETE", "deleteTeacher", { id }, undefined, undefined, {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        });
    }
}
