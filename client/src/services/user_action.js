

export const user_login = (email, password) => {

    const requestOption = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({email, password})
    }
    console.log(requestOption.body);
    return fetch('users/authentication', requestOption).then(handleResponse);
}

export const user_registration = user_information => {
    console.log(user_information);
    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( user_information )
    }
    return fetch('users/registration', requestOption)
                .then(handleResponse);
               

};
const handleResponse = (response) => {
    return new Promise((resolve, reject) => {
        console.log(response);
        if (!response.ok) { 
           reject(response.statusText);
        }
        
        else resolve(response);
    })
  
}