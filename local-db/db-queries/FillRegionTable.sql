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
    ('Tasna', 'GR', 0, 'Hans','Schmid', 'tasna'),
    ('Valsot', 'AT', 0, 'Urs', 'Locher', 'valsot');

GO