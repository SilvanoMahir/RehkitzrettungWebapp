using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RehkitzWebApp.Migrations
{
    /// <inheritdoc />
    public partial class rehkitzrettungdbtestingsetup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Protocol",
                columns: table => new
                {
                    protocolId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    protocolCode = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    clientFullName = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    localName = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    pilotFullName = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    regionName = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    remark = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    areaSize = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    foundFawns = table.Column<int>(type: "int", nullable: false),
                    injuredFawns = table.Column<int>(type: "int", nullable: false),
                    markedFawns = table.Column<int>(type: "int", nullable: false),
                    date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Protocol", x => x.protocolId);
                });

            migrationBuilder.CreateTable(
                name: "Region",
                columns: table => new
                {
                    regionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    regionName = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    regionState = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    contactPersonLastName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    contactPersonFirstName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    contactPersonMail = table.Column<string>(type: "nvarchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Region", x => x.regionId);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    userId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userFirstName = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    userLastName = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    userRole = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    userMail = table.Column<string>(type: "nvarchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.userId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Protocol");

            migrationBuilder.DropTable(
                name: "Region");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
