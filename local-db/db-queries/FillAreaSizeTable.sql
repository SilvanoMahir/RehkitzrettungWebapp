USE [rehkitzrettung-db]
GO

INSERT INTO [rehkitzrettung-db].[dbo].[Area] 
			( [AreaSize]
			, [EntryIsDeleted])
VALUES
    ('<0.5ha', 0),
	('<1ha', 0),
    ('>1ha', 0);

GO