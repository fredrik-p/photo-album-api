/**
 * Photo controller
 */

/**
 * Show all the photos
 */
const index = (req, res) => {
    res.send({
        status: 'success',
        data: 'This is where the photos will be'
    })
}

/**
 * Show a specifit photo
 */
const show = (req, res) => {
    res.send({
        status: 'success',
        data: 'This is where a specific photo will be shown'
    })
}

/**
 * Add a new photo
 */
const store = (req, res) => {
    res.send({
        status: 'success',
        data: 'Add a new photo'
    })
}

module.exports = {
    index,
    show,
    store,
}