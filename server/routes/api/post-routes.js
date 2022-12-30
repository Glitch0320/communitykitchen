const router = require('express').Router()

const { getPostsByZip, createPost, deletePost } = require('../../controllers/post-controller')

router.post('/:userId', createPost)
router.get('/:zip', getPostsByZip)
router.delete('/:userId/:postId', deletePost)

module.exports = router