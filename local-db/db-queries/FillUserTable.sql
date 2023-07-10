USE [rehkitzrettung-db]
GO

INSERT INTO [rehkitzrettung-db].[dbo].[User] 
			( [OwnerId]
			, [UserFirstName]
			, [UserLastName]
			, [UserRegionId]
			, [EntryIsDeleted])
VALUES
    ('1', 'John', 'Doe', 1, 0),
    ('2', 'Jane', 'Smith', 2, 0);

GO