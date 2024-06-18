import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (storedUser) {
            setLoggedInUser(storedUser);
        }
    }, []);

    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
