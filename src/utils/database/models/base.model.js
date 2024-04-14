class BaseModel {
    constructor(entity) {
        this.entity = entity;
    }

    async findAll(conditions = {}, pagination = {}) {
        return await this.entity.findMany({
            where: conditions,
            ...pagination,
        });
    }

    async findOne(conditions = {}) {
        return await this.entity.findUnique({
            where: conditions,
        });
    }

    async create(data) {
        return await this.entity.create({
            data,
        });
    }

    async update(id, data) {
        return await this.entity.update({
            where: {
                id,
            },
            data,
        });
    }

    async exists(conditions) {
        const count = await this.entity.count({
            where: conditions,
        });
        return count > 0;
    }
}

export default BaseModel;
