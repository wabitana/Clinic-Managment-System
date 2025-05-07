const express = require('express');
const app = express();
const port = 3100;
const path= require('path')
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname,'../','clint')))

// Data base connaction
const dbb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login_system'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connecteed...');
});

//rejister


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../','clint','index.html'))
});


app.post('/register', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT Name FROM login WHERE Name = ?', [username], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            return res.status(400).send('User already exists!');
        } 
else{
   
bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    db.query('INSERT INTO login (Name, Password) VALUES (?, ?)', [username, hash], (err, result) => {
        if (err) throw err;
        res.send('User registered successfully!');
    });
});
   
}
    });
 
});
  
//login

app.post('/Login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM login WHERE Name = ?', [username], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, match) => {
                
                if (match) {
                    res.send('Login successful!');
                   
                } else {
                    res.status(400).send('Incorrect password!');
                }
            });
        } else {
            res.status(400).send('User not found!');
        }
    });
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Test@123", // Replace with your MySQL password
    database: "login_system",
  });
  
  db.connect((err) => {
    if (err) console.error("Database connection failed:", err);
    else console.log("Connected to MySQL");
  });
  
  // Serve Static HTML
  app.use(express.static("public"));
  
  // API Endpoint to Fetch Users
  app.get("/api/users", (req, res) => {
    db.query("SELECT * FROM login", (err, results) => {
      if (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.json(results);
      }
    });
  });
  app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname,"public",'main.html'))
  });
  
  app.put("/api/users/:ID", (req, res) => {
      const { ID } = req.params;
      console.log(req.body)
      const { Name, Email } = req.body;
      
  
      // Update query
      db.query(
          "UPDATE login SET Name = ?, Email = ? WHERE ID = ?",
          [Name, Email, ID],
          (err, result) => {
              if (err) {
                  console.error("Error updating user:", err);
                  res.status(500).json({ error: "Failed to update user" });
              } else {
                  res.json({ message: "User updated successfully" });
              }
          }
      );
  });
  
  // API to Delete User
  app.delete("/api/users/:ID", (req, res) => {
      const { ID } = req.params;
  
      // Delete query
      db.query("DELETE FROM login WHERE ID = ?", [ID], (err, result) => {
          if (err) {
              console.error("Error deleting user:", err);
              res.status(500).json({ error: "Failed to delete user" });
          } else {
              res.json({ message: "User deleted successfully" });
          }
      });
  });
  
  
  
  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  
  
  
  
  
  



app.listen(port, () => {
    console.log(`your Server is listening at http://localhost:${port}`);
});
