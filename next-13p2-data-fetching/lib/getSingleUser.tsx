
//this function is async because we will be fetching data in parallel
export default async function getSingleUser(userId: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    if (!res.ok) { throw new Error('failed to fetch a single user from the endpoint, see getSingleUser()') }
    return (
        res.json()
    )
}
