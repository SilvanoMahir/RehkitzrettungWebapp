USE [rehkitzrettung-db]
GO

INSERT INTO [rehkitzrettung-db].[dbo].[User] 
			( [OwnerId]
			, [UserFirstName]
			, [UserLastName]
			, [UserRegionId]
			, [EntryIsDeleted]
			, [UserDefinition])
VALUES
    ('1', 'John', 'Doe', 1, 0, 'Admin 1'),
    ('2', 'Jane', 'Smith', 2, 0, 'Pilot 1');
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
    ('Tasna', 'GR','Bezirk 10', 0, 'Hans','Schmid', 'tasna'),
    ('Valsot', 'GR','Bezirk 10', 0, 'Urs', 'Locher', 'valsot');
GO