import { useState } from "react";
import { auth } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignupForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Signup successful!");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <form onSubmit={handleSignup} className="space-y-4 w-full max-w-md  mx-auto p-6">
            <h2 className="text-2xl font-semibold">Sign Up</h2>
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
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Create Account
            </button>
        </form>
    );
}
