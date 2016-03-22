with user_asked_id as (
    insert into users (
        login
    )
    values (
        $(user)
    )
    on conflict (login) do update set login = excluded.login
    returning id
)
insert into questions (text, user_asked, datetime_asked)
    values (
        $(text),
        (select id from user_asked_id),
        $(dateTimeAsked)
    )
returning id