USE [rehkitzrettung-db-testing]
GO

DROP TABLE [dbo].[Protocol];
DROP TABLE [dbo].[Region];
DROP TABLE [dbo].[User];
GO

CREATE TABLE Protocol (
    protocolId INT IDENTITY(1, 1) PRIMARY KEY,
    protocolCode NVARCHAR(50) NOT NULL,
    clientFullName NVARCHAR(50) NOT NULL,
    localName NVARCHAR(50) NOT NULL,
    pilotFullName NVARCHAR(50) NOT NULL,
    regionName NVARCHAR(50) NOT NULL,
    remark NVARCHAR(250) NULL,
    areaSize NVARCHAR(50) NOT NULL,
    foundFawns INT NOT NULL,
    injuredFawns INT NOT NULL,
    markedFawns INT NOT NULL,
    date DATETIME2 NOT NULL
);

CREATE TABLE Region (
    regionId INT IDENTITY(1, 1) PRIMARY KEY,
    regionName NVARCHAR(50) NOT NULL,
    regionState NVARCHAR(50) NOT NULL,
    contactPersonLastName NVARCHAR(50) NULL,
    contactPersonFirstName NVARCHAR(50) NULL,
    contactPersonMail NVARCHAR(50) NULL
);

CREATE TABLE [User] (
    userId INT IDENTITY(1, 1) PRIMARY KEY,
    userFirstName NVARCHAR(50) NOT NULL,
    userLastName NVARCHAR(50) NOT NULL,
    userRole NVARCHAR(50) NOT NULL,
    userMail NVARCHAR(50) NOT NULL
);
GO