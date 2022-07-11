<template>
    <div class="mb-3 row">
        <div class="col-sm-3">
            <img :src="this.nft.imgUrl" class="w-100" />
        </div>
        <div class="col-sm-9">
            <dl class="row">
                <dt class="col-sm-3">Asset Name</dt>
                <dd class="col-sm-9">{{ this.nft.name }}</dd>
                <dt class="col-sm-3">Asset ID</dt>
                <dd class="col-sm-9">{{ this.nft.assetIndex }}</dd>
                <dt class="col-sm-3">Asset URL</dt>
                <dd class="col-sm-9">{{ this.nft.url }}</dd>
                <dt class="col-sm-3">JSON Metadata</dt>
                <dd class="col-sm-9">
                    <pre>{{
                        JSON.stringify(this.nft.jsonMetadata, null, 2)
                    }}</pre>
                </dd>
                <dt class="col-sm-3">Metadata Hash Valid?</dt>
                <dd class="col-sm-9">
                    {{ this.nft.validHash ? "Yes" : "No" }}
                </dd>
            </dl>
        </div>
        <div class="col">
            <button @click="handleReceiveNFT" class="btn btn-primary me-2">
                Get this NFT
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        nft: Object,
    },
    data() {
        return {};
    },
    methods: {
        async handleReceiveNFT() {
            this.$emit("receiveNFT", this.nft);
        }
    },
    async mounted() {},
};
</script>
