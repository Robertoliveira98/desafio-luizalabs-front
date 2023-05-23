const validaEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return email && email.trim() && emailRegex.test(email.trim());
}

const validaNome = (nome) => {
    const nomeRegex = /^[a-zA-ZÀ-ÿ]+(([',. -][a-zA-ZÀ-ÿ ])?[a-zA-ZÀ-ÿ]*)*$/;

    return nome && nome.trim() && nomeRegex.test(nome.trim());
}

const validaSenha = (senha) => {

    return senha && senha.trim() != "";
}

module.exports = {
    validaEmail,
    validaSenha,
    validaNome
}