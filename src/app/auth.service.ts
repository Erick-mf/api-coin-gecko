import { Injectable } from "@angular/core";
import {
    Auth,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "@angular/fire/auth";
import { Firestore, getFirestore, doc, setDoc } from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private firestore: Firestore;

    constructor(
        private auth: Auth,
        private router: Router,
    ) {
        this.firestore = getFirestore();
    }

    async signIn(email: string, password: string) {
        try {
            const credential = await signInWithEmailAndPassword(this.auth, email, password);
            const userDoc = doc(this.firestore, "usuarios", credential.user.uid);
            await setDoc(userDoc, {
                email: credential.user.email,
                uid: credential.user.uid,
            });
            this.router.navigate(["/portfolio"]);
        } catch (error: any) {
            console.error(error);
        }
    }

    async signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(this.auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;
            const userDoc = doc(this.firestore, "usuarios", user.uid);
            await setDoc(userDoc, {
                email: user.email,
                uid: user.uid,
            });
            this.router.navigate(["/portfolio"]);
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error(errorCode, errorMessage, email, credential);
        }
    }

    // Método para crear una cuenta
    async signUp(email: string, password: string) {
        try {
            const credential = await createUserWithEmailAndPassword(this.auth, email, password);
            const userDoc = doc(this.firestore, "usuarios", credential.user.uid);
            await setDoc(userDoc, {
                uid: credential.user.uid,
                email: credential.user.email,
            });
            this.router.navigate(["/login"]);
        } catch (error) {
            console.error(error);
        }
    }

    async signOut() {
        try {
            await signOut(this.auth);
            this.router.navigate(["/home"]);
        } catch (error) {
            console.error(error);
        }
    }

    getCurrentUserId(): string {
        const user = this.auth.currentUser;
        if (user) {
            return user.uid;
        } else {
            throw new Error("El usuario no está autenticado");
        }
    }
    isLoggedIn(): boolean {
        const user = this.auth.currentUser;
        if (user) {
            return true;
        } else {
            return false;
        }
        //return true;
    }
}
