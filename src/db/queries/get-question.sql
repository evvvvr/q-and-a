select q.id as question_id, q.text as question_text, user_asked.login as user_asked,
    q.datetime_asked as datetime_asked, a.id as answer_id, a.text as answer_text,
    user_answered.login as user_answered, a.datetime_answered as datetime_answered
    from questions q
        left join answers a on a.question_id = q.id
        left join users user_answered on user_answered.id = a.user_answered
        inner join users user_asked on user_asked.id = q.user_asked
    where q.id = $(questionId)
    order by datetime_answered