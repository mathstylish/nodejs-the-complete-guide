import User from "../models/user.js"

const userController = {
    createUserDev: async (req, res) => {
        try {
            const { name, email } = req.body
            const user = new User({
                name,
                email,
                cart: {
                    items: [],
                    total: 0,
                },
            })
            const userSaved = await user.save()
            res.status(201).json({ generatedId: userSaved.id })
        } catch (err) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    },
}

export default userController
