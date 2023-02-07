const  axios = require('axios')
const firebase = require("firebase")
  const firebaseConfig ={
    apiKey: "AIzaSyC0ALYEQcMqnXHT-gZyexMdX37HCPdfuAM",
    authDomain: "fpoly-friend.firebaseapp.com",
    databaseURL: "https://fpoly-friend-default-rtdb.firebaseio.com",
    projectId: "fpoly-friend",
    storageBucket: "fpoly-friend.appspot.com",
    messagingSenderId: "475753837744",
    appId: "1:475753837744:web:5887cf11dca611f1bf7775",
    measurementId: "G-MGVJ00L9LE"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.database().ref("user_profile");
const dashboard = (req,res,next)=>{
  if (!req.session.user) {
    return res.redirect('/login');
  }
  return res.render('dashboard');
}
const customers = async(req,res,next)=>{
    
        db.get().then((snapshot) => {
          if (snapshot.exists()) {
            //  res.send(snapshot.val());
            const data = snapshot.val();
            const users = Object.values(data);
             res.render('customers',{ users})
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
}
const pieChart = async(req,res,next)=>{
    try {
        db.get().then((snapshot)=>{
            if(snapshot.exists()){
                let countMale = 0 , countFemale = 0;
                    snapshot.forEach((childSnapshoot)=>{
                        const user = childSnapshoot.val();
                        if(user.gender==="Nam"){
                            countMale++;
                        } else if(user.gender === "Nữ"){
                            countFemale++;
                        }
                    }) 
               res.status(200).json({countMale,countFemale})
                       
            }else{
                console.log("No data ")
            }
        })
    } catch (error) {
        
    }
}
const userChart = async(req,res,next)=>{
  db.once('value')
    .then(snapshot => {
      let users = [];
      snapshot.forEach(childSnapshot => {
        let user = childSnapshot.val();
        users.push(user);
      });

      let currentDate = new Date();
      let currentMonth = currentDate.getMonth();
      let currentYear = currentDate.getFullYear();
      let newUsersPerMonth = [];

      for (let i = 0; i < 3; i++) {
        let month = currentMonth - i;
        let year = currentYear;
        if (month < 0) {
          month = 12 + month;
          year -= 1;
        }
        let newUsers = users.filter(user => {
          let createdAt = new Date(user.createdAt);
          return createdAt.getMonth() === month && createdAt.getFullYear() === year;
        });
        newUsersPerMonth.push({
          month: month,
          year: year,
          count: newUsers.length
        });
      }

      res.json({
        newUsersPerMonth: newUsersPerMonth
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({ error: 'Something went wrong.' });
    });
}
const hobbiesChart = async(req,res,next)=>{
  db.on("value", function(snapshot) {
    const data = snapshot.val();
    const hobbies = {};
    for (const user in data) {
      for (const hobby of data[user].hobbies) {
        if (hobbies[hobby]) {
          hobbies[hobby]++;
        } else {
          hobbies[hobby] = 1;
        }
      }
    }
    console.log(hobbies);
  }); 
}

module.exports={
    dashboard,
    pieChart,
    customers,
    userChart,
    hobbiesChart
}