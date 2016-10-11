import {h} from 'react-markup'
import React, {PropTypes} from 'react'


//{
//    name: 'page1',
//        items: [
//    {type: 'h1', content: 'Страница 1'},
//    {type: 'h2', content: 'Заполнение этой анкеты займет около Х минут'},
//    {type: 'text', name: 'first_name', title: 'Имя', mandatory: true},
//    {type: 'text', name: 'last_name', title: 'Фамилия', mandatory: true},
//    {type: 'text', name: 'fb', title: 'Fb', mandatory: true},
//    {type: 'text', name: 'vk', title: 'Vk', mandatory: true},
//    {type: 'text', name: 'email', title: 'Почта', mandatory: true},
//    {type: 'text', name: 'birthdate', title: 'Дата рождения', mandatory: true},
//    {type: 'text', name: 'country', title: 'Cтрана', mandatory: true},
//    {type: 'text', name: 'city', title: 'Город', mandatory: true},
//],
//}

class H1 extends React.Component {

    render() {
        return h('h1', this.props.content)
    }
}

H1.propTypes = {
    content: PropTypes.string.isRequired,
}

export default H1
