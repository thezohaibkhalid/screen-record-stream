import { createAuthClient } from "better-auth/client"
import { create } from "domain"
export const authClient =  createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
    
})