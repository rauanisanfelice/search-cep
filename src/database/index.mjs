import MongoDBService from '../config/database.mjs'

class Database {
  constructor() {
    this.init()
  }

  init = async () => {
    this.connection = await MongoDBService()
  }
}

export default new Database()
