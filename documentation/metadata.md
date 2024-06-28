---
outline: deep
---

# Metadata

The LOL42 token metadata follows the structure below:

```json
{
  "name": "lol-00",
  "external_url": "https://ipfs.io/ipfs/QmeLngvcTzYUj65n9TC42Z6Bjy4cbpKRm52wyz9hbbzCDg",
  "image": "ipfs://QmeLngvcTzYUj65n9TC42Z6Bjy4cbpKRm52wyz9hbbzCDg",
  "attributes": [
    {
      "trait_type": "Author",
      "value": "GIAN-MARCO"
    },
    {
      "trait_type": "Language",
      "value": "Français"
    }
  ]
}
```

Explanation:

- name: The name of the NFT, in this case, "lol-00".
- external_url: A URL linking to the external resource or webpage associated with the NFT.
- image: The IPFS link to the image representing the NFT.
- attributes: An array of attributes providing additional information about the NFT. In this example, it includes:
- Author: The creator of the joke
- Language: The language of the joke

## About IPFS

`IPFS` (InterPlanetary File System) is a **decentralized storage protocol** that allows for the distribution of data across a network of nodes. It uses content-addressing to uniquely identify each file, ensuring that the data is immutable and securely stored. This protocol enhances the security and accessibility of data, making it an ideal solution for storing and retrieving NFT metadata and associated files.
