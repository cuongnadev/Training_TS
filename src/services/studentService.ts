import ApiService from "./api";

export default class StudentService {
    private apiService: ApiService;

    constructor(baseURL: string) {
        this.apiService = new ApiService(baseURL);
    }

    /**
     * Lấy danh sách sinh viên
     */
    async getStudents(token: string): Promise<any> {
        return await this.apiService.request("GET", "getStudents", undefined, undefined, undefined, {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        });
    }

    /**
     * Lấy thông tin chi tiết của một sinh viên theo ID
     * @param id - ID của sinh viên
     */
    async getStudent(token: string, id: string): Promise<any> {
        return await this.apiService.request("GET", "getStudent", { id }, undefined, undefined, {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        });
    }

    /**
     * Thêm một sinh viên mới
     * @param student - Thông tin sinh viên mới
     */
    async postStudent(token: string, student: object): Promise<any> {
        return await this.apiService.request("PUSH", "postStudent", undefined, undefined, student, {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        });
    }

    /**
     * Cập nhật thông tin của sinh viên theo ID
     * @param id - ID của sinh viên
     * @param updatedData - Dữ liệu cập nhật
     */
    async patchStudent(token: string, id: string, updatedData: object): Promise<any> {
        return await this.apiService.request("PATCH", "patchStudent", { id }, undefined, updatedData, {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        });
    }

    /**
     * Xóa một sinh viên theo ID
     * @param id - ID của sinh viên
     */
    async deleteStudent(token: string, id: string): Promise<any> {
        return await this.apiService.request("DELETE", "deleteStudent", { id }, undefined, undefined, {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        });
    }
}
