const express = require('express');
const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true });

const app = express();
app.use(require('method-override')('_method'));
app.use(require('body-parser').urlencoded());
app.set('view engine', 'html');
app.engine('html', nunjucks.render);


let users = [
  { id: 1, name: 'moe' },
  { id: 2, name: 'larry' }
];

app.get('/users', (req, res, next)=> {
  res.render('users', { users });
});

app.post('/users', (req, res, next)=> {
  let max = users.reduce((memo, user)=> {
    if(user.id > memo)
      memo = user.id;
    return memo;
  }, 0);
  const user = req.body;
  user.id = ++max;
  users.push(user);
  res.redirect('/users');
});


app.delete('/users/:id', (req, res, next)=> {
  users = users.filter( user => user.id !== req.params.id * 1);
  res.redirect('/users');
});


app.listen(process.env.PORT, ()=> console.log(`listening on port ${process.env.PORT}`));
