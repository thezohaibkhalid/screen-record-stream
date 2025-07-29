import {getEnv} from "@/lib/utils"
import arcjet, {
    detectBot,
    fixedWindow,
    shield,
    request,
    validateEmail,
    slidingWindow,
    ArcjetDecision,
    createMiddleware,
} from "@arcjet/next";
// Re-export the rules to simplify imports inside handlers
export {
    detectBot,
    fixedWindow,
    shield,
    request,
    slidingWindow,
    validateEmail,
    createMiddleware,
    ArcjetDecision,
};



const aj = arcjet({
    key:getEnv('ARCJET_API_KEY'),
    rules:[],
})

export default aj;