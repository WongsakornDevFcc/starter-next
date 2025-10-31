export const roleAccessMap = {
    admin: [
        "/dashboard",
        "/dashboard/[id]",
        // "/devtool",
        // "/admin",
        // "/api/users", // Example API route
    ],
    cs: [
        "/dashboard",
        "/devtool",
        // "/cs",
        // "/api/tickets",
    ],
    user: [
        "/dashboard",
        "/devtool",
    ],
    visitor: [
        "/",
        "/about",
        "/signin",
    ],
} as const;

export type AppRole = keyof typeof roleAccessMap;
export type AppResource = typeof roleAccessMap[AppRole][number];