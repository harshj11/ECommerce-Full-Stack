exports.getAllProducts = (req, res) => {
    console.log(req.body);
    res.status(200).json({message: "Get all products working fine."})
}