USE [rehkitzrettung-db]
GO

INSERT INTO [dbo].[Protocol]
           ([ProtocolCode]
           ,[ClientFullName]
           ,[LocalName]
           ,[PilotFullName]
           ,[RegionName]
           ,[Remark]
           ,[AreaSize]
           ,[FoundFawns]
           ,[InjuredFawns]
           ,[MarkedFawns]
           ,[Date]
			,[EntryIsDeleted])
     VALUES
           ('GR-0024'
           ,'Hans Pua'
           ,'Chomps'
           ,'Johannes Erny'
           ,'Sent'
		   ,'Keine Bemerkung'
           ,'>1ha'
           ,1
           ,0
           ,0
           ,'2023-05-07 12:00:00'
			,0)
INSERT INTO [dbo].[Protocol]
           ([ProtocolCode]
           ,[ClientFullName]
           ,[LocalName]
           ,[PilotFullName]
           ,[RegionName]
           ,[Remark]
           ,[AreaSize]
           ,[FoundFawns]
           ,[InjuredFawns]
           ,[MarkedFawns]
           ,[Date]
			,[EntryIsDeleted])
	 VALUES
           ('GR-0023'
           ,'Mark Smith'
           ,'Uina'
           ,'John Kane'
           ,'Scuol'
		   ,'Keine Bemerkung'
           ,'<1ha'
           ,2
           ,1
           ,0
           ,'2023-05-07 12:00:00'
			,0)
GO