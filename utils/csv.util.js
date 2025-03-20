const createCsvWriter = require('csv-writer').createObjectCsvWriter;

class csvWriter {
    constructor(filePath) {
    }

    async writeChunk(objects, filePath, headersWritten = false) {
        try {
            if (!Array.isArray(objects) || objects.length === 0) {
                throw new Error("Chunk must be a non-empty array of objects");
            }
            if (headersWritten) {
                const keyObject = Object.keys(objects[0]).reduce((acc, key) => {
                    acc[key] = key;
                    return acc;
                }, {});
                objects.unshift(keyObject)
            }
            const csvWriter = createCsvWriter({
                path: filePath,
                header: Object.keys(objects[0]).map(key => ({ id: key, title: key })),
                append: true,
            });
            await csvWriter.writeRecords(objects);
            return { status : 'success' , message : 'Added Data to the CSV successfully.', file_path : filePath}
        } catch (error) {
            throw new Error(`Failed to write chunk: ${error.message}`);
        }

    }
}

module.exports = new csvWriter()