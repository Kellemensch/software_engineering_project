import {
    createContext,
    useContext,
    useEffect,
    useState,
    type FC,
    type ReactNode,
} from "react";
import { getUserData, login, signup, type User } from "../model/user";
import { useNavigate } from "react-router";

interface Auth {
    user: User | null;

    login: (email: string, password: string) => boolean;
    register: (userInfo: {
        firstname: string;
        lastname: string;
        email: string;
        phone?: string;
        password: string;
    }) => boolean;
    logout: () => boolean;
}

const AuthContext = createContext<Auth>({
    user: null,
    login: () => false,
    register: () => false,
    logout: () => false,
});

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(getUserData(user) ?? null);
        }
    }, []);

    useEffect(() => {
        if (user) localStorage.setItem("user", user.email);
        else localStorage.removeItem("user");
    }, [user]);

    function localLogin(email: string, password: string) {
        if (login(email, password)) {
            console.log("Login successful!");
            const user = getUserData(email);
            console.log(user);
            setUser(user!);
            return true;
        } else {
            setUser(null);
            return false;
        }
    }

    function localRegister(userInfo: {
        firstname: string;
        lastname: string;
        email: string;
        phone?: string;
        password: string;
    }) {
        signup({ ...userInfo, type: "salesperson" });
        setUser(getUserData(userInfo.email)!);
        return true;
    }

    function localLogout() {
        setUser(null);
        return true;
    }

    return (
        <AuthContext
            value={{
                user,
                login: localLogin,
                register: localRegister,
                logout: localLogout,
            }}
        >
            {children}
        </AuthContext>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}

// small utiliy hook for user only page
export function useUserOnlyPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user == null) {
            console.log("User not logged in: redirecting to /login");
            navigate("/login");
        }
    }, [user]);
}
