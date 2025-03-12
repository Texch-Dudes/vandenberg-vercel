
import { getAutomationPageContentApi } from "@/apiConfig/services";
import { Suspense } from "react";


// export async function generateMetadata({ params }, parent) {
//     try {
//         const { data } = await getAutomationPageContentApi(params.Id) || {};
//         // if (!data?.car) {
//         //     redirect(NOT_FOUND_PATH);
//         // }
//         return {
//             title: data?.car?.seo?.title,
//             description: data?.car?.seo?.metaDesc,
//             robots: data?.car?.seo ? `${data?.car?.seo?.metaRobotsNoindex}, ${data?.car?.seo?.metaRobotsNofollow}` : "",
//         }
//     } catch (error) {
//         // redirect(NOT_FOUND_PATH);
//     }
// }

const Layout = ({ children }) => {

    return (
        <>
            {children}
        </>
    );
};

export default Layout;
