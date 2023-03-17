
//this function is async because we will be fetching data in parallel
export default async function getSingleUser(userId: string) {
    
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    
    //if using error boundaries, uncomment following line.
    //if (!res.ok) { throw new Error('failed to fetch a single user from the endpoint, see getSingleUser()') }
    
    //if using 404 pages, return undefined. since the if statement in SingleUserPage will be checking for empty 
    if (!res.ok) return undefined;

    return (
        res.json()
    )
}
