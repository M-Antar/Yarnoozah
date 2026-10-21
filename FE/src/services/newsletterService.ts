import {api} from "./api";
/** POST /newsletter/subscribe. Body: {email}. Returns {success,message}. Join the yarnoozah mailing list. */
export const subscribeNewsletter=(email:string)=>api.post("/newsletter/subscribe",{email});
