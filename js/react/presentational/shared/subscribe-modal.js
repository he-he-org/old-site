import {Component} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'

const bem = prefixer('subscribe-popup')

import Modal from './modal'

export default class SubscribeModal extends Component {
    render() {
        const {modal} = this.props
        const {form} = this.props
        const {
            setModalDisplayed,
            } = this.props

        const {u, id} = form

        return h(Modal, {
            ...modal,
            onClose: () => setModalDisplayed(false),
        },
            h(bem('form'), {action: `//he-he.us14.list-manage.com/subscribe/post?u=${u}&id=${id}`, method: 'post'},
                h(bem('div#title'), 'Подписка на новостную рассылку'),
                h(bem('div#info'), 'Раз в месяц мы рассылаем письмо о ходе наших проектов'),
                h(bem('label#field'),
                    h(bem('div#label'), 'E-mail:'),
                    h(bem('input#input'), {name: 'EMAIL'})
                ),
                h(bem('label#field'),
                    h(bem('div#label'), 'Имя:'),
                    h(bem('input#input'), {name: 'FNAME', placeholder: 'необязательно'})
                ),
                h(bem('label#field'),
                    h(bem('div#label'), 'Фамилия:'),
                    h(bem('input#input'), {name: 'LNAME', placeholder: 'необязательно'})
                ),
                /* real people should not fill this in and expect good things - do not remove this or risk form bot signups */
                h('div', {style: {position: 'absolute', left: '-5000px', ariaHidden: true}},
                    h('input', {type: 'text', name: `b_${u}_${id}`, tabIndex: '-1', value: ''})
                ),
                h(bem('button#subscribe'), 'Подписаться')
            )
        )
    }
}
