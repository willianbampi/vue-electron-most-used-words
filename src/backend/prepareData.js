module.exports = rows => {
    return new Promise((resolver, reject) => {
        try {
            const words = rows
                .filter(filterValidRow)
                .map(removePonctuation)
                .map(removeTags)
                .reduce(mergeRows)
                .split(' ')
                .map(word => word.toLowerCase())
                .map(word => word.replace('"', ''))
            resolve(words)
        } catch (error) {
            reject(error)
        }
    })
}

function filterValidRow(row) {
    const notNumber = !parseInt(row.trim())
    const notEmpty = !!row.trim()
    const notTimeInterval = !row.includes('-->')
    return notNumber && notEmpty && notTimeInterval
}

const removePonctuation = row => row.replace(/[,:?!.-]/g, '')

const removeTags = row => row.replace(/(<[^>]+)>/ig, '').trim()

const mergeRows = (fullText, row) => `${fullText} ${row}`