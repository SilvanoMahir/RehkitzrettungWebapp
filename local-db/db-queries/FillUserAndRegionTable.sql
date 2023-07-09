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

INSERT INTO [rehkitzrettung-db].[dbo].[Region] 
			( [RegionName]
			, [RegionState]
			, [EntryIsDeleted]
			, [ContactPersonFirstName]
			, [ContactPersonLastName]
			, [ContactPersonMail])
VALUES
    ('Tasna', 'GR', 0, 'Hans','Schmid', 'tasna'),
    ('Valsot', 'GR', 0, 'Urs', 'Locher', 'valsot');

GO