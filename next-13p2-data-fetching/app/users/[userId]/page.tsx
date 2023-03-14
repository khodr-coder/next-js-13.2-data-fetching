import getSingleUser from "@/lib/getSingleUser"
import getUserPosts from "@/lib/getUserPosts"
import { Metadata } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Suspense } from "react";
import UserPosts from "./components/UserPosts";

//creating a type for the parameters that will be coming in to SingleUserPage
//This will contain the parameters that come inside from the URL
type URLParams = {
    params: {
        userId: string,
    }
}
    //takes in parameter of type URLParams, destructure to get userId. Returns promise of Metadata 
export async function generateMetadata({ params: { userId } }: URLParams): Promise<Metadata> {
    const userData: Promise<User> = getSingleUser(userId) // grab the user data 
    const user: User = await userData // await the user

    //return the new metadata object
    return {
        title: user.name,
        description: `This is the page of ${user.name}` 
    }
}

// fetching both pieces of data in parallel. following two lines will not wait for the other to finish, but be executed at the same time
// userData is a promise of type user, will contain the user object
// userPostsData is an array of posts created by the user 

export default async function SingleUserPage({ params: { userId } }: URLParams) {
    const userData: Promise<User> = getSingleUser(userId);
    const userPostsData: Promise<Post[]> = getUserPosts(userId);

    //const [user, usersPost] = await Promise.all([userData, userPostsData]);

    const singleUser = await userData;

    return (
        <>
            <h2>{singleUser.name}</h2>
            <br />
            <Suspense fallback={<h2>Loading...</h2>}>
                {/** @ts-expect-error Server Component */}
                <UserPosts promise={userPostsData}></UserPosts>
            </Suspense>
        </>
    )
}
