interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    idProfil: {
        _id: string;
        nom: string;
    };
}