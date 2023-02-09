import { writable } from "svelte/store";

export const settingData = writable();
export const adminState = writable({
  email:"",
  isAuthenticated:false
});