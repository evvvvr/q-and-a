select q.id as question_id, text as question_text, u.login as user_asked,
    q.datetime_asked as datetime_asked
    from questions q
        inner join users u on u.id = q.user_asked
    where not exists (select id from answers a where a.question_id = q.id)
    order by q.datetime_asked