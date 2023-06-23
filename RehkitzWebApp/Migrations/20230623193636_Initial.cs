using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RehkitzWebApp.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContactPersonFirstName",
                table: "Region",
                type: "nvarchar(50)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ContactPersonLastName",
                table: "Region",
                type: "nvarchar(50)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ContactPersonMail",
                table: "Region",
                type: "nvarchar(50)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContactPersonFirstName",
                table: "Region");

            migrationBuilder.DropColumn(
                name: "ContactPersonLastName",
                table: "Region");

            migrationBuilder.DropColumn(
                name: "ContactPersonMail",
                table: "Region");
        }
    }
}
