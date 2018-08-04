export const profile = () => {
    const requestOption = {
        method: 'GET',
        headers: {'Content-Type' : 'application/json'}
    }

    return fetch('/profile', requestOption).then(handleResponse);
}
 
export const user_login = (email, password) => {

    const requestOption = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({email, password})
    }
    console.log(requestOption.body);
    return fetch('users/authentication', requestOption).then(handleResJson).then(handleResponse);
}

export const user_registration = user_information => {
    console.log(user_information);
    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( user_information )
    }
    return fetch('users/registration', requestOption).then(handleResJson).then(handleResponse)
};

const handleResJson = response => response.json();

const handleResponse = response => {
        return new Promise((resolve, reject) => {
            console.log(response);
            if (!response.ok) { 
              //console.log(response)
              reject(response);
            } 
            else resolve(response);
    })
 
}

const handleResPromise = {

}


   
