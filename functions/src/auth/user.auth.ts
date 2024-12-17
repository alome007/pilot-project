import * as functions from 'firebase-functions';
import { createUser } from '../controllers/user.controller';

export const onUserCreated = functions.auth.user().onCreate(async (user) => {
    try {
        const { uid, email, displayName } = user;

        if (!email) {
            throw new Error('Email is required');
        }

        await createUser(
            uid,
            email,
            displayName || email.split('@')[0]
        );

        return { success: true };
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
});