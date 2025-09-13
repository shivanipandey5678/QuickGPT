import ImageKit from "imagekit";


function hi(){
    console.log(process.env.IMAGEKIT_PUBLIC_KEY,"🏡🏡❌❌❌❌❌❌ at imagekit.js")
}
hi()

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default imagekit;
