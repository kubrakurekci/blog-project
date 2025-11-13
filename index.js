import express from 'express';
import path from 'path';



const app = express();
app.set("view engine", "ejs");
app.use(express.static('public'));
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/signup', (req, res) => {
  res.render('signup');
});
const userEmail = "kubraa.kurekci@gmail.com";
const userPassword = "kubra1234";
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
app.get("/", (req, res) => {
  res.render("main",
    { blogs: blogs }
  );
});
app.post("/login-success", (req, res) => {
  const { email, password } = req.body;

  if (email === userEmail && password === userPassword) {
    res.redirect("/post"); 
  } else {
    res.redirect("/login");
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.get("/delete", (req, res) => {
const deleteId = parseInt(req.params.id);
const index = blogs.findIndex(blog => blog.id === deleteId);
res.redirect("/");

});