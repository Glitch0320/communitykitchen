const router = require('express').Router()

const { getUserById, createUser, updateUser, authenticateLogin, lookupUserByToken } = require('../../controllers/user-controller')

router.route('/')
.post(createUser)

router.route("/auth").post(authenticateLogin)
router.route("/lookup").get(lookupUserByToken)

router.route('/:id')
.get(getUserById)
.put(updateUser)

module.exports = router