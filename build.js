const { execSync } = require("child_process");

try {
  console.log("Running prisma generate...");
  execSync("prisma generate", { stdio: "inherit" });
  console.log("Prisma Client generated successfully.");
  console.log("Starting the server...");
  execSync("node server.js", { stdio: "inherit" });
} catch (error) {
  console.error("Error during build process:", error);
  process.exit(1);
}
