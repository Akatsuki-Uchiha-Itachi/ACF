import React ,{useState} from 'react';
import './utils';
import { useNavigate } from 'react-router-dom';
import { auth } from './utils';


export default function Admin() {
   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');
   const navigation = useNavigate();
   
    const handleLogin = (e) => {
        e.preventDefault();
        setEmail(document.getElementById('email').value);
        setPassword(document.getElementById('password').value);
        auth.signInWithEmailAndPassword(email,password).then(
            (userCredential) =>{
                console.log(userCredential.user);
                    navigation('/admin/dashboard'); 
            }
        ).catch((error)=>{
            console.log(error.code);
            console.log(error.message);
        });
    }

    return (
        <form className='container' onSubmit={handleLogin}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control"  onChange={(e) => setPassword(e.target.value)} id="password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}
