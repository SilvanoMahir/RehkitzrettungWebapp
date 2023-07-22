USE [rehkitzrettung-db]
GO

INSERT INTO [rehkitzrettung-db].[dbo].[User] 
			( [OwnerId]
			, [UserFirstName]
			, [UserLastName]
			, [UserRegionId]
			, [EntryIsDeleted])
VALUES
    ('<0.5ha', 0),
	('<1ha', 0),
    ('>1ha', 0);

GO