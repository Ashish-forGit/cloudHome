const {fileFolderModel} = require("../model/fileSchema");

const createFolder = async (req, res) => {
    try {
        const { name, parentId } = req.body;
        const { userId} = req.user;

        const isFileNameExists = await fileFolderModel.findOne({
            name,
            userId,
            parentId
        });

        if (isFileNameExists) {
            res.status(400);
            res.json({ status: "fail", message: "Folder name already exists" });
            return;
        }

        const newFolder = await fileFolderModel.create({
            name,
            userId,
            type: "folder",
            parentId,
        });

        res.status(201);
        res.json({ status: "success", message: "Folder created" });
    } catch (err) {
        console.error("--------------------");
        console.log(err);
        console.error("--------------------");
        res.status(500).json({ status: "fail", message: "Internal Server Error" });
    }
};

module.exports = {
    createFolder,
};