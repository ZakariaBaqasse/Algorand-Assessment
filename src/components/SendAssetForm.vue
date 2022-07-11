<template>
    <div id="receiveasset" class="mb-5">
        <div
            v-if="this.acsTxId !== ''"
            class="alert alert-success"
            role="alert"
        >
            Txn Ref:
            <a :href="explorerURL" target="_blank">{{ this.acsTxId }}</a>
        </div>
        <div class="mt-5">
            <h3>Receive NFT</h3>
            <nft-comp
                v-for="nft in nfts" :key="nft.assetIndex"
                :nft="nft"
                @receiveNFT="handleReceiveNFT"
            />
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import asa from "../asa.js";
import axios from "axios";

// uncomment these lines once you've copied the checkpoint files over
// import fungibleConfig from "../artifacts/0-deploy-tokens.js.cp.yaml"; //fungible token
// import nftConfig from "../artifacts/2-deploy-nft.js.cp.yaml"; //nft

export default {
    props: {
        connection: String,
        network: String,
        buyer: String,
    },
    data() {
        return {
            acsTxId: "",
            amount_acs: 1,
            explorerURL: "",
            nfts: [],
            fungibleTokenId: "",
            creator: process.env.VUE_APP_CREATOR_ADDR,
        };
    },
    methods: {
        async updateTxn(value) {
            this.acsTxId = value;
            this.setExplorerURL(value);
        },
        async handleReceiveNFT(thisNFT) {
            await asa.purchaseNFT(
                this.creator, 
                this.buyer, 
                thisNFT.assetIndex, 
                fungibleTokenId
            );
        },
        setExplorerURL(txId) {
            switch (this.network) {
                case "TestNet":
                    this.explorerURL =
                        "https://testnet.algoexplorer.io/tx/" + txId;
                    break;
                default:
                    this.explorerURL =
                        "http://localhost:8980/v2/transactions/" +
                        txId +
                        "?pretty";
                    break;
            }
        },
        async setNFTData() {
            // this function should update nfts in data() so that your nfts can be displayed in your dapp.

            // write your code here
        },
    },
    async mounted() {
        // set NFT data on page load
        await this.setNFTData();
    },
};
</script>
