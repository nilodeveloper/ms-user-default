export function generateTimestampNow() {
    return Math.floor(Date.now() / 1000)
}

export function generateTimestampAt(date: Date) {
    return Math.floor(date.getTime() / 1000)
}