
// This is a library function that fetches data from an api
// It fetches and returns the data || throws an error if something goes wrong. 
export default async function getUsers() {
    
    const response = await fetch('https://jsonplaceholder.typicode.com/users'); //https://jsonplaceholder.typicode.com/users
    //console.log(response);
    
    if (!response.ok) { throw new Error('Data was not fetched properly. See getUsers()'); }
    return (response.json());
    
}