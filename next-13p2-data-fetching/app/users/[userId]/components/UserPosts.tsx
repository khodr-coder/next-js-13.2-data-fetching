type Props = {
    promise: Promise<Post[]>
}
/**
 * 
 * This is a server component 
 * 
 * This code defines a React component called UserPosts which accepts a single prop called 
 * promise of type Props. The async keyword before the function declaration indicates that this 
 * function will return a promise. When the component is rendered, it awaits the value of 
 * the promise prop. This means that the component expects to receive a promise that resolves 
 * to an array of objects representing posts. Once the promise is resolved, the array of posts 
 * is assigned to the posts variable. The map() function is then used to iterate over each post 
 * in the posts array and generate an HTML article element for each post. The key prop is used to 
 * assign a unique identifier to each article element. The h2 element contains the post's title, 
 * and the p element contains the post's body. A br element is included at the end of each article 
 * to add some vertical space between the posts. Finally, the content variable, which now contains 
 * an array of HTML article elements, is returned from the component. This can be rendered directly 
 * within a parent component by including the UserPosts component and passing in the appropriate promise prop.
 * 
 * @param // Props, which contains a promise of an array of posts
 * @returns an array of HTML components to be rendered 
 */
export default async function UserPosts({ promise }: Props) {
    const posts = await promise;

    const content = posts.map(singlePost => {
        return (
            <article key={singlePost.id}>
                <h2>{singlePost.title}</h2>
                <p>{singlePost.body}</p>
                <br />
            </article>
        )
    })
    return content;
}