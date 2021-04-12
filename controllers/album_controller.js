/**
 * Album controller
 * /


/**
 * Show all the albums
 */
const index = (req, res) => {
    res.send({
        status: 'success',
        data: 'This is where the albums will be'
    })
}

/**
 * Show a specific album
 */
const show = (req, res) => {
    res.send({
        status: 'success',
        data: 'This is where a specific album will be'
    })
}

/**
 * Add an album
 */
const store = (req, res) => {
    res.send({
        status: 'success',
        data: 'Add an album'
    })
}

module.exports = {
    index,
    show,
    store,
}