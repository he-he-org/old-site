export const error = (msg) => {
    const error = document.createElement('div')
    error.classList.add('Alert--error')

    const controls = document.createElement('div')
    controls.textContent = '\u2716'
    controls.classList.add('Alert__close')
    controls.addEventListener('click', () => {
        document.body.removeChild(error)
    })
    error.appendChild(controls)

    const body = document.createElement('div')
    body.textContent = msg
    controls.classList.add('Alert__body')
    error.appendChild(body)

    if (document.body.firstChild) {
        document.body.insertBefore(error, document.body.firstChild)
    }
    else {
        document.body.appendChild(error)
    }

    const ALERT_REMOTE_TIMEOUT = 10000
    setTimeout(() => document.body.removeChild(error), ALERT_REMOTE_TIMEOUT)
}
