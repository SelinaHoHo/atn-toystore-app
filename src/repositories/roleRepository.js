const BaseRepository = require('./baseRepository');

class RoleRepository extends BaseRepository {
    constructor(model) {
        super(model);
    }
}

module.exports = RoleRepository;