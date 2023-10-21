import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);

    const setLoading = () => {
        dispatch({
            type: "SET_LOADING",
        });
    };

    // Get Search Results
    const searchUsers = async (text) => {
        setLoading();

        const params = new URLSearchParams({
            q: text,
        });

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        });

        const { items } = await response.json();

        dispatch({
            type: "GET_USERS",
            payload: items,
        });
    };

    // Clear users
    const clearUsers = () => {
        dispatch({
            type: "CLEAR_USERS",
        });
    };

    // Get single user
    const getUser = async (login) => {
        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        });

        if (response.status === 404) {
            window.location = "/notfound";
        } else {
            const data = await response.json();
            dispatch({
                type: "GET_USER",
                payload: data,
            });
        }
    };

    // Get user repos
    const getUserRepos = async (login) => {
        setLoading();
        const params = new URLSearchParams({
            sort: "created",
            per_page: 10,
        });

        try {
            const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                },
            });

            const data = await response.json();

            dispatch({
                type: "GET_REPOS",
                payload: data,
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <GithubContext.Provider
            value={{
                ...state, // --> this has all the states i.e users, loading, user, repos.
                searchUsers,
                clearUsers,
                getUser,
                getUserRepos,
            }}>
            {children}
        </GithubContext.Provider>
    );
};

export default GithubContext;
