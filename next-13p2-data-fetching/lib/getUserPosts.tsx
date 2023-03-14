
//this function is async because we will be fetching data in parallel
export default async function getUserPosts(userId: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    if (!res.ok) { throw new Error('failed to fetch single users posts from the endpoint, see getUserPosts()') }
    return (
       res.json()
    )
}
