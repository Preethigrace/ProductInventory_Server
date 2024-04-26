class Mapper {
    constructor(models) {
        this.models = models
    }

    async create(entity, data) {
        const model = this.models[entity]
        if (!model) {
            throw new Error(`Invalid entity: ${entity}`)
        }
        return model.create(data)
    }
    async InsertMany(entity, data) {
        const model = this.models[entity]
        if (!model) {
            throw new Error(`Invalid entity: ${entity}`)
        }
        return model.insertMany(data)
    }
    async aggregate(entity, pipeline) {
        const model = this.models[entity]
        if (!model) {
            throw new Error(`Invalid entity: ${entity}`)
        }
        return model.aggregate(pipeline)
    }
    async FindOne(entity, obj) {
        const model = this.models[entity]
        if (!model) {
            throw new Error(`Invalid entity: ${entity}`)
        }
        return model.findOne(obj)
    }
    async FindOneAndUpdate(entity, obj) {
        const model = this.models[entity]   
        if (!model) {
            throw new Error(`Invalid entity: ${entity}`)
        }
        return model.FindOneAndUpdate(obj)
    }
}
module.exports = Mapper
