/**
*   @param {String} email -> E-mail do usuário.
*   @returns {Boolean} -> Se é valido de acordo com Regex.
*/
const validaEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return email && email.trim() && emailRegex.test(email.trim());
}

/**
*   @param {String} nome -> Recebe nome do usuário.
*   @returns {Boolean} -> Se é valido de acordo com Regex.
*/
const validaNome = (nome) => {
    const nomeRegex = /^[a-zA-ZÀ-ÿ]+(([',. -][a-zA-ZÀ-ÿ ])?[a-zA-ZÀ-ÿ]*)*$/;

    return nome && nome.trim() && nomeRegex.test(nome.trim());
}

/**
*   @param {String} nome -> Recebe nome do usuário.
*   @returns {Boolean} -> Se é valido (Atualmente valida apenas se não nulo ou vazio).
*/
const validaSenha = (senha) => {

    return senha && senha.trim() != "";
}

module.exports = {
    validaEmail,
    validaSenha,
    validaNome
}