// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/*
** LOL42 is a NFT collection for jokes.
** Metadata contains "author" and "language" attributes.
**
** Metadata example
** {
**  "name": "lol-00",
**  "external_url": "https://ipfs.io/ipfs/QmeLngvcTzYUj65n9TC42Z6Bjy4cbpKRm52wyz9hbbzCDg",
**  "image": "ipfs://QmeLngvcTzYUj65n9TC42Z6Bjy4cbpKRm52wyz9hbbzCDg",
**  "attributes": [
**    {
**      "trait_type": "Author",
**      "value": "GIAN-MARCO"
**    },
**    {
**      "trait_type": "Language",
**      "value": "Français"
**    }
**  ]
** }
*/

contract Lol42 is ERC721URIStorage, Ownable {
    /*
    ** Increase token id every time a new token is minted. 
    ** This makes our token "unique".
    */
    uint256 public tokenId; 

    constructor() ERC721("Lol42", "LOL42") Ownable(msg.sender) {
        tokenId = 0;
    }

    function mint(string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newItemId = tokenId;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenId += 1;
        return newItemId;
    }
}
