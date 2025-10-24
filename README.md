

# QuickGPT 🚀

A **Full-Stack AI Chatbot Application** built with **React.js, Node.js, Express, MongoDB**, powered by **OpenAI / Gemini API**. QuickGPT allows users to chat with AI, generate text & images, manage credits, and explore a community gallery — all in a sleek, responsive interface.  

---

## 🌟 Key Features

- **User Authentication:** Sign up & log in securely  
- **Real-time AI Chat:** Generate text responses instantly  
- **AI Image Generation:** Create images from prompts  
- **Credit System:** Manage usage via credits  
- **Community Gallery:** View and share AI-generated images  
- **Theme Toggle:** Dark/Light mode for comfort  
- **Responsive Design:** Works seamlessly on all devices  
- **Deployed on Vercel:** Live access without setup  

---

## 🎨 Preview

![App Preview](https://via.placeholder.com/800x400.png?text=QuickGPT+Preview)
*Replace this placeholder with a GIF or screenshot of your app in action.*

---

## 🛠️ Tech Stack

**Frontend:** React.js, Tailwind CSS, React Router, Moment.js  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**AI Models:** OpenAI / Google Gemini API  
**Image Management:** ImageKit  
**Payments:** Stripe  
**Deployment:** Vercel  



## 🚀 Getting Started

### Prerequisites

- Node.js installed  
- npm or yarn  
- MongoDB account (Atlas) or local setup  
- Stripe API keys  
- OpenAI API credentials  
- ImageKit account  

### Setup

1. **Clone the repository**
```bash
git clone <your_repo_url>
cd <project_directory>
````

2. **Install dependencies**

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

3. **Configure environment variables**

**Server `.env`**

```env
MONGO_URI=your_mongodb_uri
OPENAI_API_KEY=your_openai_key
STRIPE_SECRET_KEY=your_stripe_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_publicKey
IMAGEKIT_PRIVATE_KEY=your_imagekit_privateKey
IMAGEKIT_URL_ENDPOINT=your_imagekit_endpoint
```

**Client `.env`**

```env
REACT_APP_API_URL=http://localhost:5000
```

4. **Start the development servers**

```bash
# Backend
cd ../server
node index.js

# Frontend
cd ../client
npm run dev
```

5. **Access the app**
   [http://localhost:5173](http://localhost:5173)

---

## 📝 Usage

1. Sign up or log in
2. Start a new chat with AI
3. Enter prompts to generate text or images
4. Explore generated images in the community gallery
5. Purchase credits via Stripe
6. Toggle between Dark/Light themes
7. View chat history, delete or share images

---

## 🌐 Deployment

* The app is fully deployed on **Vercel**
* Push your code to **GitHub**
* Connect with Vercel for automatic deployments
* Add a **live demo link** here: [QuickGPT Live](https://your-vercel-deployment.vercel.app)

---

## 📄 License

This project is **open-source**. Fork, customize, and build your own AI chatbot!

---

## 📬 Contact

For queries or contributions, reach out via **shivanipandey0107@gmail.com**

---

**Made with ❤️ and AI magic!**

```

