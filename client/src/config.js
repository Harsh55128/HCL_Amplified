// export const CURRENT_USER_ID =
//     "6a857a1c0924da84e28db13b";
export const getCurrentUserId = () => {
    return localStorage.getItem("currentUserId");
};