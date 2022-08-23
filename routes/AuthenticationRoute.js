const router = require("express").Router();
const CommonSignup = require("../Models/CommonSignup");
const jwt = require("jsonwebtoken");
const verifyJWT = require('../verifyRoles')
const verifyRoles = require('../verifyRoles')


//User Data

//Insert
router.post("/CommonSignup", async (req, res) => {
    try {
        console.log("signup")
        const commonSignup = new CommonSignup(req.body);
        const savedCommonSignup = await commonSignup.save();
        if (savedCommonSignup) {
            res.status(201).send({message: "success", data: savedCommonSignup});
        } else {
            res.status(400).send({message: "failed", data: savedCommonSignup});
        }
        console.log("result , ", savedCommonSignup);
    } catch (err) {
        console.log("error in CommonSignup ", err);
        res.status(500).send({message: "failed", data: err});
    }
});

router.get("/CommonSignup/:id", async (req, res) => {
    try {
        const findById = await CommonSignup.findById(req.params.id);
        res.json(findById);
    } catch (err) {
        console.log("error in get data", err);
        res.status(204).send({message: "failed", data: err});
    }
});

router.get("/CommonSignup", async (_, res) => {
    res.json(await CommonSignup.find({}));
});


//Update

router.put("/CommonSignup/update/:id", verifyJWT, verifyRoles('admin'), async (req, res) => {
    try {
        const updateCommonSignup = await CommonSignup.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updateCommonSignup);
        console.log("result,", updateCommonSignup);
    } catch (err) {
        console.log("error in getting review details", err);
        res.status(204).send({message: "failed", data: err});
    }
});

//Delete

router.delete("/CommonSignup/:id", async (req, res) => {
    try {
        const deleteCommonSignup = await CommonSignup.findByIdAndDelete(
            req.params.id
        );
        res.json(deleteCommonSignup);
        console.log("Deleted!");
    } catch (err) {
        console.log("error in get data", err);
        res.status(204).send({message: "failed", data: err});
    }
});

// login
router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        const result = await CommonSignup.findOne({
            $and: [{email}, {inputpw: password}]
        });
        if (result) {
            const token = jwt.sign(
                {
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                    data: {
                        _id: result._id,
                        email: result.email,
                        address: result.address,
                        role: result.role
                    }
                },
                "secret"
            );
            res
                .status(200)
                .send({
                    message: "success",
                    data: {
                        token,
                        _id: result._id,
                        email: result.email,
                        address: result.address,
                        role: result.role
                    }
                });
        } else {
            res.status(401).send({message: "Check email or password"});
        }
        console.log("login succes ", result);
    } catch (err) {
        console.log("login requsee eror ", err);
        res.status(500).send({message: "failed", data: err});
    }
});


// Update All Data
router.route('/AllData/update/:id').put((req, res) => {
    CommonSignup.findById(req.params.id)
        .then(alldata => {
            alldata.name = req.body.name;
            alldata.name1 = req.body.name1;
            alldata.birthday = req.body.birthday;
            alldata.gender = req.body.gender;
            alldata.address = req.body.address;
            alldata.email = req.body.email;
            alldata.number = req.body.number;
            alldata.role = req.body.role;
            alldata.inputpw = req.body.inputpw;

            alldata.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;


