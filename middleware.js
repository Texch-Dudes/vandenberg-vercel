import { NextResponse } from 'next/server';
import { getAutomationPagaContentFetchApi } from './apiConfig/services';
import { NOT_FOUND_PATH } from './constant';
import { cookies } from 'next/headers';

export default async function middleware(request) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/admin')) {
        const adminCookie = cookies().get('admin')?.value;
        if (adminCookie) {
            if (pathname === '/admin/login') {
                return NextResponse.redirect(new URL('/admin/home', request.url));
            }
        } else {
            if (pathname !== '/admin/login') {
                return NextResponse.redirect(new URL('/admin/login', request.url));
            }
        }
    }

    // if (pathname.startsWith('/collectie')) {
    //     const slug = pathname.split('/')[2];

    //     if (slug) {
    //         try {
    //             const { data } = (await getAutomationPagaContentFetchApi(slug)) || {};

    //             if (!data?.car) {
    //                 return NextResponse.redirect(new URL(NOT_FOUND_PATH, request.url));
    //             }
    //         } catch (error) {
    //             return NextResponse.redirect(new URL(NOT_FOUND_PATH, request.url));
    //         }
    //     }
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/collectie/:path*', '/admin/:path*'],
};
