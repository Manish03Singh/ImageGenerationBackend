import express, { Router } from "express";
import * as dotenv from 'dotenv';
import { HfInference } from "@huggingface/inference";
import fetch from "node-fetch";

dotenv.config();
const router = express.Router();

const hf = new HfInference(process.env.HUGGING_FACE_API)

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from Manish!' });
});

router.route('/').post(async(req, res) => {
    try{ 
        const {prompt} = req.body;
        // const aiResponse = await hf.textToImage({
        //     inputs: prompt,
        //     model: 'stabilityai/stable-diffusion-2',
        //     parameters: {
        //       negative_prompt: 'blurry',
        //     },
        // });
        const aiResponse = await fetch(`https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`, 
                              {
                                method: "POST",
                                headers: {
                                    "Authorization": `Bearer ${process.env.HUGGING_FACE_API}`
                                },
                                inputs : JSON.stringify(prompt)}
                            );
        console.log(aiResponse)
        const buffer = await aiResponse.arrayBuffer()
        const image = `data:image/jpeg;base64,${Buffer.from(buffer).toString('base64')}`;
        //console.log(image)
        res.status(200).json({
            photo:image
        })
    }
    catch(error){
        console.log(`Error in post HF route error => ${error}`)
        res.status(500).send({
            success:false,
            message:`Error in post HF route error => ${error}`
        })
    }
  });

export default router;