import { User } from '../../../generated/prisma';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
    user?: User ; // 실제 서비스에서는 Prisma의 User 타입을 넣는 것이 좋습니다.
}
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
}

declare global {
    namespace PandaMarket {
        interface User {
            id: number;
        }
    }
}

namespace Express {
    interface Request {
        user?: PandaMarket.User;
    }
}


