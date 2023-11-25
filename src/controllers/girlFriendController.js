// Controllers/falajController.js
const { uploadFile } = require("../utilities/uploadFile");
//prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//get all GirlFriend
const getAllGirlFriends = async (req, res) => {
  try {
    // Query all entries from the GirlFriend table
    const girlFriends = await prisma.girlFriend.findMany();

    // Check if there are no entries, and if so, send an empty array
    if (girlFriends.length === 0) {
      return res.send([]);
    }

    // Send the retrieved entries as a response
    res.send(girlFriends);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server Error" });
  }
};

//get single GirlFriend
const getOneGirlFriend = async (req, res) => {
  try {
    const gfId = parseInt(req?.params?.id);
    const girlfriend = await prisma.girlFriend.findUnique({
      where: {
        id: gfId,
      },
    });

    if (!girlfriend) {
      res.status(404).send({ message: "Girlfriend not found" });
    } else {
      console.log(girlfriend);
      res.send(girlfriend);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server Error" });
  }
};

//get GirlFriend By type
const getGirlFriendsByType = async (req, res) => {
  try {
    const gfType = req?.params?.type;
    const girlFriends = await prisma.girlFriend.findMany({
      where: {
        type: gfType,
      },
    });

    console.log(girlFriends)
    if (girlFriends.length === 0) {
      res.status(404).send({ message: "No girlfriends found with this type" });
    } else {
      console.log(girlFriends);
      res.send(girlFriends);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server Error" });
  }
};

//add new GirlFriend
const addOneGirlFriend = async (req, res) => {
  try {
    const { file } = req;
    const data = JSON.parse(req?.body?.data);
    const { name, age, location, pro, con, type, status } = data;
    //validate inputs
    if (!name || !age || !location || !pro || !con || !type || !status) {
      return res.status(400).send({ message: "Incomplete Inputs" });
    }
    //formatdata
    let formattedData = {
      name,
      age,
      location,
      pro,
      con,
      type,
      status,
    };

    //upload file
    if (file) {
      const folderName = "GirlFriends";
      const image = await uploadFile(file, folderName);
      console.log(image);
      formattedData = { ...formattedData, image };
    }

    //store data on database
    const result = await prisma.girlFriend.create({ data: formattedData });
    if (result?.id === null) {
      return res.status(500).send({ message: "Failed to add gf" });
    }
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to add gf" });
  }
};

//update one GirlFriend
const updateGirlFriendById = async (req, res) => {
  try {
    const id = parseInt(req?.params?.id); // Assuming the ID is an integer, adjust as needed
    const { file } = req;
    const data = JSON.parse(req?.body?.data);
    let formattedData = { ...data };

    // Upload file
    if (file) {
      const folderName = "GirlFriends";
      const image = await uploadFile(file, folderName);
      console.log(image);
      formattedData = { ...formattedData, image };
    }

    if (!formattedData) {
      return res.status(400).send({ message: "Incomplete Inputs" });
    }

    // Check if the GirlFriend record with the specified ID exists
    const existingGirlFriend = await prisma.girlFriend.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingGirlFriend) {
      return res.status(404).send({ message: "GirlFriend not found" });
    }

    // Update the GirlFriend record
    const updatedGirlFriend = await prisma.girlFriend.update({
      where: {
        id: id,
      },
      data: formattedData,
    });

    res.send(updatedGirlFriend);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to update girlfriend" });
  }
};

//delete one GirlFriend
const deleteOneGirlFriendById = async (req, res) => {
  try {
    const id = parseInt(req?.params?.id); // Assuming the ID is an integer, adjust as needed

    // Check if the GirlFriend record with the specified ID exists
    const existingGirlFriend = await prisma.girlFriend.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingGirlFriend) {
      console.log("No girlfriend found with this ID:", id);
      return res
        .status(404)
        .send({ message: "No girlfriend found with this ID" });
    }

    // Delete the GirlFriend record
    const deletedGirlFriend = await prisma.girlFriend.delete({
      where: {
        id: id,
      },
    });

    console.log("Girlfriend deleted:", id);
    res.status(200).send(deletedGirlFriend);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to delete girlfriend" });
  }
};

module.exports = {
  getAllGirlFriends,
  getOneGirlFriend,
  getGirlFriendsByType,
  addOneGirlFriend,
  updateGirlFriendById,
  deleteOneGirlFriendById,
};
