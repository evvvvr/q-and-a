begin;

create table if not exists users (
    id serial primary key,
    login citext check(length(login) < 255 and length(login) > 0) not null
);

create unique index if not exists user_unique_login on users (login);

create table if not exists questions (
    id serial primary key,
    text text check(length(text) > 0 and length(text) < 3000) not null,
    datetime_asked timestamp with time zone not null,
    user_asked integer references users(id) on delete cascade
);

create table if not exists answers (
        id serial primary key,
        text text check(length(text) > 0 and length(text) < 3000) not null,
        datetime_answered timestamp with time zone not null,
        question_id integer references questions(id) on delete cascade,
        user_answered integer references users(id) on delete cascade
);

commit;