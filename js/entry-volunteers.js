require('is-nan').shim()

import Questionnaire from '~/react/container/volunteers/questionnaire'

const data = {
    version: '1',
    pages: [
        {
            name: 'page1',
            items: [
                {type: 'h1', content: 'Заполнение этой анкеты займет около Х минут!'},
                {type: 'row', content: [
                    {type: 'text', name: 'first_name', title: 'Имя:', mandatory: true},
                    {type: 'text', name: 'last_name', title: 'Фамилия:', mandatory: true},
                ]},
                {type: 'row', content: [
                    {type: 'text', name: 'fb', title: 'Facebook:', mandatory: true},
                    {type: 'text', name: 'vk', title: 'ВКонтакте:', mandatory: true},
                    {type: 'text', name: 'email', title: 'E-mail:', mandatory: true},
                ]},
                {type: 'text', name: 'birthdate', title: 'Дата рождения:', mandatory: true},
                {type: 'text', name: 'country', title: 'Cтрана:', mandatory: true},
                {type: 'text', name: 'city', title: 'Город:', mandatory: true},
                {type: 'checkbox', name: 'online', title: 'Я хочу быть онлайн-волонтером', mandatory: true},
                {type: 'checkbox', name: 'offline', title: 'Я хочу быть оффлайн-волонтером', mandatory: true},
                {type: 'radio', name: 'participation_type', title: 'Какой вид волонтерства вас интересует?', mandatory: true, options: [
                    {value: 'online', title: 'Удаленный'},
                    {value: 'offline', title: 'Волонтер в Гватемале'},
                    {value: 'both', title: 'Оба'},
                ]},
            ],
        },
        {
            name: 'page2',
            condition: {
                page1: {
                    online: true,
                },
            },
            items: [
                {type: 'h1', content: 'Для удаленных волонтеров'},
                {type: 'h2', content: 'Пропустите только в том случае, если точно не собирайтесь помогать онлайн'},
                {
                    type: 'group', name: 'motivation', subtype: 'scale', from: 1, to: 10, title: 'Мотивация', items: [
                        {title: 'Научиться', name: 'learn'},
                        {title: 'Получить опыт', name: 'get_expirience'},
                        {title: 'Помогать людям', name: 'help_people'},
                        {title: 'Заниматься чем-то', name: 'do_something'},
                        {title: 'Ради общения', name: 'communication'},
                        {title: 'Выучить язык', name: 'learn_language'},
                        {title: 'Решать интересные задачи', name: 'problem_solving'},
                    ],
                },
                {
                    type: 'group', name: 'skills', subtype: 'checkbox', title: 'Умения', options: [
                        {title: 'Хочу', name: 'want_to'},
                        {title: 'Есть опыт', name: 'got_experience'},
                        {title: 'Хорошо умею', name: 'can_do'},
                    ], items: [
                        {title: 'Писать тексты', name: 'write_texts'},
                        {title: 'Переводить', name: 'translate'},
                        {title: 'Искать информацию', name: 'research'},
                        {title: 'Делать презентации', name: 'presentations'},
                        {title: 'Разрабатывать сайты', name: 'web_developing'},
                        {title: 'Продавать', name: 'selling'},
                        {title: 'Руководить', name: 'manage'},
                        {title: 'SMM', name: 'smm'},
                        {title: 'PR', name: 'pr'},
                        {title: 'Графический дизайн', name: 'graph_design'},
                    ],
                },
                {type: 'tags', title: 'Опишите любые ваши навыки тегами', name: 'skills_tags'},
            ],
        },
        {
            name: 'page3',
            condition: {
                page1: {
                    offline: true,
                },
            },
            items: [
                {type: 'h1', content: 'Для волонтеров, которые мечтают поехать в Гватемалу'},
                {type: 'h2', content: 'Если вы хотите помогать только удаленно, пропустите эту страницу'},
                {type: 'textarea', name: 'stay_period', title: 'На какой период хотите приехать?'},
                {type: 'textarea', name: 'countries', title: 'В каких странах были?'},
                {type: 'textarea', name: 'ready_for_donate', title: 'Готовы ли вы внести организационный взнос?'},
                {type: 'textarea', name: 'about_health', title: 'Что-то важное о вашем здоровье'},
                {type: 'textarea', name: 'reasons', title: 'Расскажите о том, почему хотите приехать, '
                                                + 'что хотите делать в проекте и какие у вас цели'},
            ],
        },
        {
            name: 'page4',
            items: [
                {type: 'textarea', name: 'languages', title: 'Какие языки вы знаете?'},
                {
                    type: 'group',
                    name: 'qualities',
                    subtype: 'scale',
                    from: 1,
                    to: 10,
                    title: 'Оцените свои качества и возможности',
                    items: [
                        {title: 'ответственны', name: 'responsible'},
                        {title: 'профессиональны', name: 'professional'},
                        {title: 'любите людей', name: 'people_oriented'},
                        {title: 'стрессоустойчивы', name: 'stress_resistant'},
                        {title: 'активны', name: 'active'},
                        {title: 'быстро учитесь', name: 'fast_learner'},
                        {title: 'способны учиться самостоятельно', name: 'independent_learner'},
                        {title: 'быстро принимаете решения', name: 'fast_decisions'},
                        {title: 'можете делать простые и короткие задачи', name: 'simple_tasks'},
                        {title: 'умеете работать над длительными и сложными задачами', name: 'complicated_tasks'},
                        {title: 'имеет много свободного времени', name: 'free_time'},
                    ],
                },
                {type: 'textarea', name: 'family', title: 'Семейное положение, дети'},
                {type: 'textarea', name: 'interests', title: 'Интересы'},
                {type: 'textarea', name: 'source', title: 'Источник, из которого узнали о проекте', mandatory: true},
                {type: 'checkbox', name: 'friends_in_project', title: 'Кто-то из знакомых помогал проекту?', mandatory: true}, // если да, то поле для имени или ссылки на человека/
                {type: 'checkbox', name: 'experience', title: 'Опыт участия в социальных проектах', mandatory: true}, // если да, то поле для описания/
                {type: 'textarea', name: 'other', title: 'Напишите все, что считаете важным', mandatory: true},
            ],
        },
    ],
}

Questionnaire(data)
