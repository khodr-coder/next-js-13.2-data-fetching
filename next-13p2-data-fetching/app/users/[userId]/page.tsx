import getSingleUser from "@/lib/getSingleUser"
import getUserPosts from "@/lib/getUserPosts"
import getUsers from "@/lib/getUsers";
import { Metadata } from "next";
import { Suspense } from "react";
import UserPosts from "./components/UserPosts";
import { notFound } from "next/navigation";

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

    if (!user.name) {
        return {
            title: "User Not Found"
        }
    }

    //return the new metadata object
    return {
        title: user.name,
        description: `This is the page of ${user.name}`
    }
}

// fetching both pieces of data in parallel. following two lines will not wait for 
// the other to finish, but be executed at the same time
// userData is a promise of type user, will contain the user object
// userPostsData is an array of posts created by the user 

export default async function SingleUserPage({ params: { userId } }: URLParams) {
    const userData: Promise<User> = getSingleUser(userId);
    const userPostsData: Promise<Post[]> = getUserPosts(userId);

    //const [user, usersPost] = await Promise.all([userData, userPostsData]);

    const singleUser = await userData;
    if (!singleUser.name) {
        return notFound(); // Function coming from next for their 404 error 
    }

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

// this is the function that enables SSG 
// without the following function, the users page would be SSR
export async function generateStaticParams() {
    const userTypePromise: Promise<User[]> = getUsers()
    const usersArray = await userTypePromise

    return usersArray.map(singleUser => ({
        userId: singleUser.id.toString()
    }));
}