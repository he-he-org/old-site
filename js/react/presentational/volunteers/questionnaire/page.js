import {h} from 'react-markup'
import React, {PropTypes} from 'react'
import prefixer from 'bem-prefixer'

const bem = prefixer('questionnaire-page')

const checkCondition = (inObj, what) => {
    const keysResult = Object.keys(what).map((key) => {
        if (key in inObj) {
            const whatValue = what[key]
            const inValue = inObj[key]
            if (typeof whatValue === typeof inValue) {
                if (typeof whatValue === 'object' && whatValue.constructor !== Array) {
                    return checkCondition(inValue, whatValue)
                }
                else {
                    return inValue === whatValue
                }
            }
            else if (whatValue.constructor === Array) {
                return whatValue.indexOf(inValue) !== -1
            }
        }
        return false
    })
    return keysResult.reduce((acc, x) => acc && x, true)
}

class Page extends React.Component {
    render() {
        const {state, condition} = this.props
        const show = condition === null || checkCondition(state, condition)
        return show && h(bem('div'), this.props.children)
    }
}

Page.propTypes = {
    state: PropTypes.object.isRequired,
    condition: PropTypes.object,
}

Page.defaultProps = {
    condition: null,
}

export default Page
