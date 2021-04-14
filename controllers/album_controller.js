/**
 * Album controller
 */

const { Album, Photo, User } = require('../models')

const { matchedData, validationResult } = require('express-validator')

/**
 * Show all the albums
 */
const index = async (req, res) => {
    let user = null
    try {
        user = await new User({ id: req.user.id }).fetch({ withRelated: 'albums' })
    } catch (error) {
        res.status(404)
        return
    }

    const albums = user.related('albums')

    res.send({
        status: "success",
        data: {
            albums
        },
    })
}

/**
 * Show a specific album
 */
const show = async (req, res) => {

    let user = null
    try {
        user = await new User({ id: req.user.id }).fetch({ withRelated: 'albums' })
    } catch (error) {
        res.status(404)
        return
    }

    const album = await user.related('albums').where({ id: req.params.albumId }).fetch({ withRelated: 'photos' })

    if (album.isEmpty()) {
        res.status(401).send({
            status: 'fail',
            data: 'Authorization required'
        })
    }

    res.send({
        status: "success",
        data: {
            album
        },
    })
}

/**
 * Add an album
 */

const store = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(422).send({
            status: 'fail',
            data: errors.array()
        })
        return
    }

    const validData = matchedData(req)
    validData.user_id = req.user.id


    try {
        const album = await Album.forge(validData).save()

        res.send({
            status: 'success',
            data: {
                album
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when trying to add a new album'
        })
        throw error
    }
}

/**
 * Add a photo to an album
 */
const addPhotoToAlbum = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(422).send({
            status: 'fail',
            data: errors.array()
        })
        return;
    }

    const validData = matchedData(req)

    const user = await new User({ id: req.user.id }).fetch({ withRelated: ['albums', 'photos'] })

    const album = await user.related('albums').where({ id: req.params.albumId }).fetch()

    const photo = await user.related('photos').where({ id: validData.photo_id }).fetch()


    if (album.isEmpty() || photo.isEmpty()) {
        res.status(401).send({
            status: 'fail',
            data: "Authorization required"
        })
        return
    }

    try {
        const photo = await new Photo({ id: validData.photo_id })

        const album = await new Album({ id: req.params.albumId })

        await album.photos().attach(photo)

        res.status(201).send({
            status: 'success',
            data: null
        })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Error thrown in database when trying to add photo to album'
        })
        throw error
    }

}


module.exports = {
    addPhotoToAlbum,
    index,
    show,
    store,
}