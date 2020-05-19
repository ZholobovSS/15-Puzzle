import validator from 'validator';

const checkEmail = email => {
    let returnValue = {}

    switch (validator.isEmail(email)) {
        case true:
            returnValue = {
                error: false,
                text: ''
            }
            break;
        case false: 
            returnValue = {
                error: true,
                text: 'Неверный формат E-mail'
            }
            break;
        default:
            break
    }


    return returnValue
}

const checkName = name => {
    let returnValue = {}

    switch (name.length >= 3) {
        case true:
            returnValue = {
                error: false,
                text: ''
            }
            break;
        case false: 
            returnValue = {
                error: true,
                text: 'Слишком короткое имя пользователя'
            }
            break;
        default:
            break
    }

    return returnValue
} 

const checkPassword = password => {
    let returnValue = {}

    switch (password.length >= 6 && password.length <= 20) {
        case true:
            returnValue = {
                error: false,
                text: ''
            }
            break;
        case false: 
            returnValue = {
                error: true,
                text: 'Пароль должен содержать от 6 до 12 символов'
            }
            break;
        default:
            break
    }

    return returnValue
}


const useValidation = ( email, name, password ) => {

    return {
        email: {
            ...checkEmail(email)
        },
        name: {
            ...checkName(name)
        },
        password: {
            ...checkPassword(password)
        }
    }
}

export default useValidation