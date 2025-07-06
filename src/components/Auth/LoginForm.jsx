import { useState } from "react";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful! Redirecting..");
            navigate("/", { replace: true });
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4 w-full max-w-md  mx-auto p-6">
            <h2 className="text-2xl font-semibold">Log In</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                className="border p-2 w-full"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                className="border p-2 w-full"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                Log In
            </button>
        </form>
    );
}
