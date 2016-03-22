With user_answered_id As (
    insert into users (
        login
    )
    values (
        $(user)
    )
    on conflict (login) do update set login = excluded.login
    returning id
)
insert into answers (question_id, text, user_answered, datetime_answered)
    values (
        $(questionId),
        $(text),
        (select id from user_answered_id),
        $(dateTimeAnswered)
    )
returning id