const UnSQL = require("unsql")
const pool = require("../services/db.service")
const table_name = process.env.DB_OTPS_TABLE

class otps extends UnSQL {
  static POOL = pool
  static TABLE_NAME = table_name
}

module.exports = otps
