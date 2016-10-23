require('is-nan').shim()

import I18N from './i18n'
import Questionnaire from '~/react/container/volunteers/questionnaire'

const data = {
    version: '1',
    pages: [
        {
            name: 'basic',
            items: [
                {type: 'h1', content: 'Анкета волонтёра'},
                {type: 'p', content: `Будем вам благодарны, если вы максимально подробно ответите на все вопросы.
                    Вводимые на этой странице данные будут доступны только администрации сайта.`},
                {type: 'row', content: [
                    {type: 'text', name: 'full_name', title: 'Имя и фамилия', mandatory: true},
                    {type: 'text', name: 'city_and_country', title: 'Город, страна:', mandatory: true},
                ]},
                {type: 'text', name: 'birthday', title: 'Дата рождения', mandatory: true},
            ],
        },
        {
            name: 'motivation',
            items: [
                {type: 'radio', name: 'participation_type', title: 'Какой вид волонтерства вас интересует?', mandatory: true, options: [
                    {value: 'online', title: 'Удаленный'},
                    {value: 'offline', title: 'Волонтер в Гватемале'},
                    {value: 'both', title: 'Оба'},
                ]},
                {type: 'textarea', name: 'motivation', title: 'Напишите вкратце о том, что вас мотивирует стать волонтёром', mandatory: true},
                {type: 'h2', content: 'Чем вы можете быть полезны проекту?'},
                {type: 'row', mandatory: true, content: [
                    {type: 'text', name: 'profession', title: 'Ваша профессия', mandatory: true},
                    {type: 'text', name: 'experience', title: 'Опыт', mandatory: true},
                ]},
                {
                    type: 'group', name: 'skills', subtype: 'checkbox', title: 'Выберите навыки, которыми обладаете', options: [
                        {title: 'Есть опыт', name: 'got_experience'},
                        {title: 'Учусь', name: 'learning'},
                    ], items: [
                        {title: 'Управление персоналом', name: 'manage'},
                        {title: 'Перевод текстов (английский, испанский)', name: 'translate'},
                        {title: 'Поиск информации', name: 'research'},
                    ],
                },
                {type: 'text', name: 'more_skills', title: 'Добавьте навыки, если считаете, что они могут пригодиться'},
            ],
        },
        {
            name: 'offline',
            condition: {
                motivation: {
                    'participation_type': ['offline', 'both'],
                },
            },
            items: [
                {type: 'h2', content: 'Волонтёр в Гватемалу'},
                {type: 'text', name: 'reasons', title: 'Как хотите помочь?', mandatory: true},
                {type: 'text', name: 'stay_period', title: 'На какой период готовы приехать?', mandatory: true},
                {type: 'text', name: 'countries', title: 'В каких странах были?', mandatory: true},
                {type: 'text', name: 'languages', title: 'Какие языки знаете?', mandatory: true},
                {type: 'text', name: 'family', title: 'Семейное положение, дети', mandatory: true},
                {type: 'checkbox', name: 'ready_for_donate', title: 'Могу внести организационный взнос в размере 600$'},
            ],
        },
        {
            name: 'about_yourself',
            items: [
                {type: 'h2', content: 'И ещё немного о себе'},
                {type: 'text', name: 'interests', title: 'Интересы'},
                {type: 'text', name: 'source', title: 'Источник, из которого узнали о проекте'},
                {type: 'text', name: 'early_experience', title: 'Есть ли опыт участия в социальных проектах? В каких?'},
                {type: 'textarea', name: 'other', title: 'Напишите все, что считаете важным. Любые вопросы и комментарии'},
            ],
        },
        {
            name: 'contacts',
            items: [
                {type: 'h2', content: 'Контакты для связи'},
                {type: 'text', name: 'email', title: 'E-mail:', mandatory: true},
                {type: 'row', content: [
                    {type: 'text', name: 'vk', title: 'ВКонтакте:', mandatory: true},
                    {type: 'text', name: 'fb', title: 'Facebook:', mandatory: true},
                ]},
            ],
        },
    ],
}

Questionnaire(data)
