export const roleAccessMap = {
    admin: [
        "/dashboard",
        "/dashboard/[id]",
        "/devtool",
       
    ],
    cs: [
        "/dashboard",
        "/devtool",
       
    ],
    user: [
        "/dashboard",
        "/devtool",
       
    ],
    visitor: [
        "/about",
        "/signin",
       
    ],
} as const;

export type AppRole = keyof typeof roleAccessMap;
export type AppResource = typeof roleAccessMap[AppRole][number];