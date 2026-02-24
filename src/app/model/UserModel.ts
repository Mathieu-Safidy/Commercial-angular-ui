interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    idProfil: {
        _id: string;
        nom: string;
    };
}