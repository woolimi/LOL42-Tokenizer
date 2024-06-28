const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
require("dotenv").config();

const JWT = process.env.PINATA_JWT;
const uploadNFTMetadata = async (data) => {
  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const createJsonFile = (filename, data) => {
  fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
    if (!err) {
      return console.log(`${filename}`);
    }
    console.error(err);
  });
};

const uploadImage = async (src) => {
  const formData = new FormData();

  const file = fs.createReadStream(src);
  formData.append("file", file);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: `Bearer ${JWT}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const run = async () => {
  // Get only .png files from folder
  try {
    const folder = "./jokes";
    const files = fs.readdirSync(folder).filter((file) => file.endsWith(".png"));
    for (const file of files) {
      const imageData = await uploadImage(`${folder}/${file}`);
      const metadataFilename = file.replace(".png", ".json");
      const metadata = {
        name: `lol-${file.replace(".png", "")}`,
        external_url: `https://ipfs.io/ipfs/${imageData.IpfsHash}`,
        image: `ipfs://${imageData.IpfsHash}`,
      };
      await uploadNFTMetadata({
        pinataContent: metadata,
        pinataMetadata: {
          name: metadataFilename,
        },
      });
      await createJsonFile(`${folder}/${metadataFilename}`, metadata);
    }
  } catch (error) {
    console.error(error);
  }
};

run();
