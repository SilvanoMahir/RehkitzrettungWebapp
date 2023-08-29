USE [rehkitzrettung-db]
GO

INSERT INTO [rehkitzrettung-db].[dbo].[Region] 
			( [RegionName]
			, [RegionState]
			, [RegionDistrict]
			, [EntryIsDeleted]
			, [ContactPersonFirstName]
			, [ContactPersonLastName]
			, [ContactPersonEmail])
VALUES
    ('Tasna', 'GR', 'Bezirk 10', 0, 'Hans','Schmid', 'admin@tasna.ch'),
    ('Valsot', 'GR','Bezirk 10', 0, 'Urs', 'Locher', 'admin@valsot.ch');

GO