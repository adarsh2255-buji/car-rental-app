import braintree from 'braintree';
import dotenv from 'dotenv';
dotenv.config();

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});
//generate a client token
export const generateClientToken = async(req, res) =>{
    try {
        const response = await gateway.clientToken.generate({});
        res.status(200).json({message : 'client token generated',clientToken: response.clientToken});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
}

//process the payment
export const paymentProcess = async(req, res) =>{
    const nonceFromTheClient = req.body.paymentMethodNonce;
    const amount = req.body.amount;

    if (!nonceFromTheClient || !amount) {
        return res.status(400).json({ message: "Payment method nonce and amount are required" });
    }

    try {
        const result = await gateway.transaction.sale({
            amount : amount,
            paymentMethodNonce: nonceFromTheClient,
            options:{
                submitForSettlement: true
            }
        });

        if(result.success){
            res.status(200).json({message:"transaction successfull", success: true, transaction: result.transaction})
        } else {
            res.status(500).json({message:"transaction failed", success: false, message: result.message})

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
}


// merchantId : 'gyfp3py5yqx8fhhb',
//     privateKey : '459bf44471d6b9cfe699fcecdad14abd',
//     publicKey : 'vzw65qfzw8bf77cb'