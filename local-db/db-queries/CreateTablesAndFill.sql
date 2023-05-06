USE master
-- Create a new table called 'Customers' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Portocols', 'U') IS NOT NULL
DROP TABLE dbo.Portocols
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Portocols
(
	CustomerId  INT NOT NULL PRIMARY KEY, -- primary key column
	client_name VARCHAR(50) NOT NULL,
	date DATE NOT NULL,
	found_fawns INT NOT NULL,
	injured_fawns INT NOT NULL,
	local_name VARCHAR(50) NOT NULL,
	marked_fawns INT NOT NULL,
	pilot_name VARCHAR(50) NOT NULL,
	region_name VARCHAR(20) NOT NULL,
	remark VARCHAR(100) NOT NULL,
	area_name VARCHAR(20) NOT NULL
);
GO

-- Insert rows into table 'Customers'
INSERT INTO dbo.Portocols
   ([CustomerId],[client_name],[date],[found_fawns],[injured_fawns],[local_name],[marked_fawns],[pilot_name],[region_name],[remark],[area_name])
VALUES
   ( 1, N'Hans Bauer',N'2022-11-09', 2, 1, N'Fürholzli', 0, N'Peter Müller','Calanda', N'Keine Bemerkung', N'<1/2ha'),
   ( 2, N'Müller Mirko',N'2022-11-12', 2, 1, N'Chomps', 0, N'Kurt Castellani','Tasna', N'Keine Bemerkung', N'<1/2ha')
GO

-- Select rows from table 'Customers'
SELECT * FROM dbo.Portocols;