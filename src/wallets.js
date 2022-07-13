/* eslint-disable */
import algosdk from "algosdk";

const sendAlgoSignerTransaction = async(txns, algodClient) => {
    const AlgoSigner = window.AlgoSigner;

    if (typeof AlgoSigner !== "undefined") {
        // write your code here
        txns.forEach(async txn => {
            try {
                // Get the binary and base64 encode it
                let binaryTx = txn.toByte();
                let base64Tx = AlgoSigner.encoding.msgpackToBase64(binaryTx);

                let signedTxs = await AlgoSigner.signTxn([{
                    txn: base64Tx,
                }, ]);

                // Get the base64 encoded signed transaction and convert it to binary
                let binarySignedTx = AlgoSigner.encoding.base64ToMsgpack(
                    signedTxs[0].blob
                );

                const response = await algodClient
                    .sendRawTransaction(binarySignedTx)
                    .do();
                console.log(response);

                return response;
            } catch (err) {
                console.error(err.message);
            }
        });

    }



};

export default {
    sendAlgoSignerTransaction
};