const IS_WAITING = 0
const IS_READY = 1
const IS_FAILED = 2

const constructor = (type, value) => {
    return {
        type,
        value,
    }
}

export const wait = () => {
    return constructor(IS_WAITING)
}

export const ready = (value) => {
    return constructor(IS_READY, value)
}

export const failed = (details) => {
    return constructor(IS_FAILED, details)
}

export const map = (a, ifWait, ifReady, ifFail) => {
    if (a.type === IS_WAITING) {
        return ifWait(a.value)
    }
    else if (a.type === IS_READY) {
        return ifReady(a.value)
    }
    else if (a.type === IS_FAILED) {
        return ifFail(a.value)
    }
    else {
        throw new Error("Wrong state", a)
    }
}


export const ifReady = (a, f, def) => {
    return map(a, f, () => def)
}
