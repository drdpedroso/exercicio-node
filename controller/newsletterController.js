const NewsletterService = require('../service/newsletterService')

const signUpForNewsletterController = async (req, res) => {
    try {
        const {email, name} = req.body
        const serviceResponse = await NewsletterService.add(email, name)
        res.send(serviceResponse)
    } catch (e) {
       res.status(500).send({message: 'Algo deu errado'})
    }
}

export {signUpForNewsletterController}