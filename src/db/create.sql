Begin;

Create Table If Not Exists Users (
    Id Serial Primary Key,
    Login citext Check(length(Login) < 255 And length(Login) > 0) Not Null
);

Create Unique Index If Not Exists User_Unique_Login On Users (Login);

Create Table If Not Exists Questions (
    Id Serial Primary Key,
    Text Text Check(length(Text) > 0 AND length(Text) < 3000) Not Null,
    DateTimeAsked Timestamp With Time Zone Not Null,
    UserAsked Integer References Users(Id) On Delete Cascade
);

Create Table If Not Exists Answers (
        Id Serial Primary Key,
        Text Text Check(length(Text) > 0 AND length(Text) < 3000) Not Null,
        DateTimeAnswered Timestamp With Time Zone Not Null,
        QuestionId Integer References Questions(Id) On Delete Cascade,
        UserAnswered Integer References Users(Id) On Delete Cascade
);

Commit;