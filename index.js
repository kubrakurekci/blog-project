import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/signup', (req, res) => {
  res.render('signup');
});
const userEmail = "kbr@gmail.com";
const userPassword = "1234";
app.get('/post', (req, res) => {
  res.render('post');
});
const blogs = [];
app.post("/post-it", (req, res) => {
  const blogContent = req.body.blogContent;
  if (blogContent && blogContent.trim() !== "") {
    const newPost = { 
      content: blogContent.trim(),
      id: Date.now(),
      time: new Date().toLocaleString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
   blogs.unshift(newPost);
    res.redirect("/");
  }

});
const randomBlogs = [
  "Chase after silly colored fish toys around the house hack who's the baby miaow then turn around and show you my bum. I will ruin the couch with my claws nyan fluffness ahh cucumber!. Put toy mouse in food bowl run out of litter box at full speed wake up wander around the house making large amounts of noise jump on top of your human's bed and fall asleep again ask for petting i will ruin the couch with my claws dismember a mouse and then regurgitate parts of it on the family room floor for eat from dog's food. Ptracy what a cat-ass-trophy! thinking longingly about tuna brine scratch me there, elevator butt, where is my slave? I'm getting hungry and cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip .",
  "Hide when guests come over need to check on human, have not seen in an hour might be dead oh look, human is alive, hiss at human, feed me and good now the other hand, too and throwup on your pillow dismember a mouse and then regurgitate parts of it on the family room floor so my slave human didn't give me any food so i pooped on the floor. Chase little red dot someday it will be mine!. Murr i hate humans they are so annoying adventure always stare at imaginary bug.",
  "Leave hair on owner's clothes claw your carpet in places everyone can see - why hide my amazing artistic clawing skills? yet just going to dip my paw in your coffee and do a taste test - oh never mind i forgot i don't like coffee - you can have that back now sniff other cat's butt and hang jaw half open thereafter.",
];
let randomPostIndex1 = Math.floor(Math.random() * randomBlogs.length);
const placeholderContent1 = randomBlogs[randomPostIndex1];
let randomPostIndex2 = Math.floor(Math.random() * randomBlogs.length);
const placeholderContent2 = randomBlogs[randomPostIndex2];
app.get("/", (req, res) => {
 res.render("main", {
   blogs: blogs,
   placeholder: placeholderContent1,
   placeholder2: placeholderContent2,
 });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.get("/edit/:id", (req, res) => {
    const editId = parseInt(req.params.id);
    const blogToEdit = blogs.find((newPost) => newPost.id === editId);
    if (blogToEdit) {
        res.render("edit", { newPost: blogToEdit }); 
    } else {
        res.status(404).send("Blog bulunamadı.");
    }
});
app.post("/edit/:id", (req, res) => {
  const editId = parseInt(req.params.id);
  const updatedContent = req.body.blogContent;
  const blogIndex = blogs.findIndex((newPost) => newPost.id === editId);
  if (blogIndex !== -1 && updatedContent && updatedContent.trim() !== "") {
    blogs[blogIndex].content = updatedContent.trim();
    blogs[blogIndex].time = new Date().toLocaleString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    blogs[blogIndex].isEdited = true;
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});
app.get("/delete/:id", (req, res) => {
  const deleteId = parseInt(req.params.id);
  const blogIndex = blogs.findIndex((newPost) => newPost.id === deleteId);
  if (blogIndex !== -1) {
    blogs.splice(blogIndex, 1);
  } 
  res.redirect("/");
});
const users = [
  {
    name: "Kubra",
    surName: "Kurekci",
    email: "test@example.com", 
    password: "123", 
    passwordAgain: "123",
  },
];
app.get("/sign-up", (req, res) => {
  res.render("signup");
});
app.post("/signup", (req, res) => { 
  const { name, surName, email, password,passwordAgain } = req.body;
   if (password !== passwordAgain) {
     return res.redirect("/signup?error=password_mismatch");
   } 
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.redirect("/signup");
    }
  const newUser = {
    name: name,
    surName: surName,
    email: email,
    password: password,
    passwordAgain: passwordAgain,
  };
  users.push(newUser);
  res.redirect("/login");
});
app.post("/login-success", (req, res) => {
  const { email, password } = req.body;
  let findUser = users.find(
    (users) => users.email === email && users.password === password
  );
  if (findUser) {
    res.redirect("/post");
  } else {
    res.redirect("/login");
  }
  console.log(users);
});
