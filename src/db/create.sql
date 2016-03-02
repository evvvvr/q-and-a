Begin;

Create Table If Not Exists Users
    (Id Integer Primary Key Autoincrement,Login Varchar(255) Not Null Collate NoCase);

Create Unique Index If Not Exists User_Login On Users (Login);

Create Table If Not Exists Questions
    (Id Integer Primary Key Autoincrement, Text Varchar(3000) Not Null,
        DateTimeAsked Varchar(500) Not Null, UserAsked Integer Not Null,
        Foreign Key (UserAsked) References Users(Id) On Delete Cascade);

Create Table If Not Exists Answers
    (Id Integer Primary Key Autoincrement, Text Varchar(3000) Not Null,
        DateTimeAnswered Varchar(500) Not Null,
        QuestionId Integer Not Null, UserAnswered Integer Not Null,
        Foreign Key (QuestionId) References Questions(Id) On Delete Cascade,
        Foreign Key (UserAnswered) References Users(Id) On Delete Cascade);

Commit;