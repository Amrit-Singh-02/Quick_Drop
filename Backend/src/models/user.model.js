import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:["user","admin","delivery"],
        default:"user"
    },
    isVerified:{
        type:Boolean,
        default:false
    },

    // ! for email verification
    emailVerificationToken:{
        type:String
    },
    emailVerificationTokenExpire:{
        type:Date
    },

    // ! for reset password
    passwordVerificationToken:{
        type:String
    },
    passwordVerificationTokenExpire:{
        type:Date
    }
    
},
{
    timestamps:true,

    toJSON:{
        transform(doc,ret){
            delete ret.password,
            delete ret.__v;
            ret.id=ret._id;
            delete ret._id;

        }
    },
    toObject:{
        transform(doc,ret){
            delete ret.password;
            delete ret.__v;
            ret.id=ret._id;
            delete ret._id
            
        }
    }
}
)

const userModel=new mongoose.model("User",userSchema);

export default userModel;