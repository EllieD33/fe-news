import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            setLoggedInUser(storedUser);
        }
    }, []);

    const setLoggedInUserWithStorage = (user) => {
        if (user) {
            localStorage.setItem("loggedInUser", user);
        } else {
            localStorage.removeItem("loggedInUser");
        }
        setLoggedInUser(user);
    };

    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser: setLoggedInUserWithStorage  }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
