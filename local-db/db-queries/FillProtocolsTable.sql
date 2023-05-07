USE [RehkitzrettungDB]
GO

INSERT INTO [dbo].[Protocols]
           ([protocolCode]
           ,[clientName]
           ,[localName]
           ,[pilotName]
           ,[regionName]
           ,[remark]
           ,[areaName]
           ,[foundFawns]
           ,[injuredFawns]
           ,[markedFawns]
           ,[date])
     VALUES
           ('GR-0024'
           ,'John Doe'
           ,'Chomps'
           ,'Jane Smith'
           ,'Sent'
           ,'<1ha'
           ,'Scuol'
           ,1
           ,0
           ,0
           ,'2023-05-07 12:00:00')
INSERT INTO [dbo].[Protocols]
           ([protocolCode]
           ,[clientName]
           ,[localName]
           ,[pilotName]
           ,[regionName]
           ,[remark]
           ,[areaName]
           ,[foundFawns]
           ,[injuredFawns]
           ,[markedFawns]
           ,[date])
	 VALUES
           ('GR-0023'
           ,'Mark Smith'
           ,'Uina'
           ,'John Kane'
           ,'Scuol'
           ,'No special remarks'
           ,'>1ha'
           ,2
           ,1
           ,0
           ,'2023-05-07 12:00:00')
GO