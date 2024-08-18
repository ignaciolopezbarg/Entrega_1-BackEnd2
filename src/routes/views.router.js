import {Router} from 'express';

const router = Router();

router.get('/login', (req,res)=>{
    res.render('login')
})

router.get('/register', (req,res) =>{
    res.render('register')
})

router.get('/profile', (req,res) => {
res.render('profile')
})
 
export default router;