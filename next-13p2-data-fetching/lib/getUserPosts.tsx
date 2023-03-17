
//this function is async because we will be fetching data in parallel
export default async function getUserPosts(userId: string) {
    
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, { next: { revalidate: 60 } })
    
    //if using error boundaries, uncomment following line.
    //if (!res.ok) { throw new Error('failed to fetch single users posts from the endpoint, see getUserPosts()') }
    
    //if using 404 pages, return undefined. since the if statement in SingleUserPage will be checking for empty 
    if (!res.ok) return undefined;

    return (
        res.json()
    )
}
