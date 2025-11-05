import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'ar'],
  // Used when no locale matches
  defaultLocale: 'en',
  localeDetection: false, // Often good to disable for explicit routing
});