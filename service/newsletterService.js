const NewsLetter = require('../model/newsletterModel')

const EmailService = {
    sendWelcomeEmail: () => {}
}

const add = async (email, name) => {
    try {
        const model = new NewsLetter()
        model.init(email, name)
        await model.add()
        EmailService.sendWelcomeEmail(email)
        return {email, name}
    } catch (e) {
        throw new Error('Algo deu errado')
    }
}

export {add}