import createMiddleware from 'next-intl/middleware';
import { routing } from './app/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { roleAccessMap } from './acl';

const initMiddleware = createMiddleware(routing);

function doesRoleHaveAccessToURL(role: string, url: string) {
    const accessibleRoutes = roleAccessMap[role as keyof typeof roleAccessMap] as readonly string[];
    return accessibleRoutes.some(route => {
        const regexPattern = route.replace(/\[.*?\]/g, "[^/]+").replace("/", "\\/");
        const regex = new RegExp(`^${regexPattern}$`);
        return regex.test(url);
    });
}

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const role = (token?.user as { role: string })?.role || 'visitor';
    const pathname = req.nextUrl.pathname;

    if (!token) return initMiddleware(req);
    
    const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';

    const hasAccess = doesRoleHaveAccessToURL(role, pathnameWithoutLocale);

    if (!hasAccess) {
        return new NextResponse('Not Found', { status: 404 });
    }

    console.log("role ", role);
    console.log("Page Access ", hasAccess);
    
    return initMiddleware(req);
}

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: [
        // Match all pathnames except for
        // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
        // - … the ones containing a dot (e.g. `favicon.ico`)
        '/((?!api|trpc|_next|_vercel|.*\\..*).*)',

        // Match all pathnames within `{/:locale}/users`
        // '/([\\w-]+)?/users/(.+)'
    ]    
};