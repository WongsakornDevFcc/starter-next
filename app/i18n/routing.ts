import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ["en", "th"], // Define in this line the possible languages for translation
    defaultLocale: "th", // Define in this line the default language to be shown
    localePrefix: "always", // You can use "always", "never" or "as-needed"
    localeDetection: false // Set to false to disable automatic locale detection (enabled by default)
});
