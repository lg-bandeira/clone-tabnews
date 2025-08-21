const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (!stdout.includes("accepting connections")) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    console.log("\n\n✅ Postgres is ready!\n");
  }
}

process.stdout.write("⛔ Waiting for Postgres to be ready");
checkPostgres();
