import type { Metadata } from "next";
import getUsers from "@/lib/getUsers";
import Link from "next/link";

// To staticly change metadata in NextJS first import (above)
// And then change some data inside the <head> (below)
export const metadata: Metadata = {
    title: "Users Page",
}

export default async function usersPage() { 
    const userTypePromise: Promise<User[]> = getUsers()
    const users = await userTypePromise
    //console.log(users);
    
    // Defining a variable, content. 
    // Mapping through the users and and using dynamic url routing to
    // display 1 user name to the client when clicked 
    const content = (
        <section>
            <h2>
                <Link href="/">Back to Home</Link>
            </h2>
            <br />
            {
                users.map(user => {
                    return (
                        <>
                            <p key={user.id}>
                                <Link href={`/users/${user.id}`}> {user.name} </Link>
                            </p>
                            <br />
                        </>
                    )
                })
            }
        </section>
    )

    return (content)
}