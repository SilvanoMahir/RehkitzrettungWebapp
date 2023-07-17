USE [rehkitzrettung-db]
GO

INSERT INTO [rehkitzrettung-db].[dbo].[Region] 
			( [RegionName]
			, [RegionState]
			, [EntryIsDeleted]
			, [ContactPersonFirstName]
			, [ContactPersonLastName]
			, [ContactPersonMail])
VALUES
    ('Tasna', 'GR', 0, 'Hans','Schmid', 'admin@tasna.com'),
    ('Valsot', 'GR', 0, 'Urs', 'Locher', 'admin@valsot.com');

GO