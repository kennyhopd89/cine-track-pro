// Định nghĩa Role
export type Role = 'admin' | 'user' | 'viewer';

export interface User {
    id: string;
    username: string;
    name: string;
    role: Role;
    avatar_initials: string;
}

// DANH SÁCH TÀI KHOẢN CỐ ĐỊNH (MOCK DB)
export const MOCK_ACCOUNTS = [
    {
        username: 'phu.ho',
        password: '123', // Trong thực tế sẽ hash, nhưng ở đây để plain text demo
        user: { id: 'u1', username: 'phu.ho', name: 'Phú Hồ (Admin)', role: 'admin', avatar_initials: 'PH' }
    },
    {
        username: 'culi',
        password: '123',
        user: { id: 'u2', username: 'culi', name: 'Editor Culi', role: 'user', avatar_initials: 'CL' }
    },
    {
        username: 'khach',
        password: '123',
        user: { id: 'u3', username: 'khach', name: 'Khách Hàng', role: 'viewer', avatar_initials: 'KH' }
    }
] as const;
