const {fileFolderModel} = require("../model/fileSchema");

const getFileFolders = async (req, res) => {
    try {
        const { userId } = req.user;

        const fileFolders = await fileFolderModel.find({ userId });

        res.status(200).json({
            status: "success",
            data: {
                fileFolders,
            },
        });
    } catch (err) {
        console.log("----------------");
        console.log(err);
        console.log("----------------");
        res.status(500).json({ status: "fail", message: "Internal Server Error" });
    }
};

module.exports = { getFileFolders };