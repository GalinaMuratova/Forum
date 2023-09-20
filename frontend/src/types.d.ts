export interface IUser {
    _id: string,
    username: string,
    password: string,
    token: string
}
export interface IPost {
    _id: string,
    author: {
        _id: string,
        username: string
    },
    title: string,
    description: string,
    image: string | null,
    date: Date
}
export interface PostMutation{
    title: string,
    description: string,
    image: File | null
}

// export interface PostMutation {
//     title: string,
//     description: string,
//     image: string | null
// }

export interface RegisterMutation {
    username: string,
    password: string
}

export interface RegisterResponse {
    user: User;
    message: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}
export interface LoginMutation {
    username: string;
    password: string;
}

export interface GlobalError {
    error: string;
}