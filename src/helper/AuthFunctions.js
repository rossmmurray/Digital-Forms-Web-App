export const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("jwToken"); 
    return token 
};

export const getUserFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user;
}