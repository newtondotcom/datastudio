import { deLocalizeUrl } from '@/paraglide/runtime';

export const reroute = (request) => deLocalizeUrl(request.url).pathname;
