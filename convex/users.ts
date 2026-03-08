import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
    args: {
        userName: v.string(),
        email: v.string(),
        imageUrl: v.string(),
    },
    handler: async (ctx, args) => {
        // Check if user exists
        const user = await ctx.db.query('users')
            .filter(q => q.eq(q.field('email'), args.email))
            .collect();

        // If user exists, retun text "User already exists"
        if(user.length > 0){
            return "User already exists";
        }

        await ctx.db.insert('users',{
            email: args.email,
            userName: args.userName,
            imageUrl: args.imageUrl
        });

        return "Inserted new user"
    }
})