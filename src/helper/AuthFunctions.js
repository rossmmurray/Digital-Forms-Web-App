export const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("jwToken"); 
    console.log(token);
    return token 
};

export const getUserFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user;
}