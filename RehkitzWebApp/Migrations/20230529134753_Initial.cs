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
            migrationBuilder.RenameColumn(
                name: "userRole",
                table: "User",
                newName: "userRegionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "userRegionId",
                table: "User",
                newName: "userRole");
        }
    }
}
