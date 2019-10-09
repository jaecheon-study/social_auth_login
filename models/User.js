const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// Create user Schema
const userSchema = new Schema({
    // 소셜도 로그인 할 수 있게 db 변경
    method: {
        type: String,
        // local 또는 google, facebook 중 무엇으로 가입 했는지
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
        email: {
            type: String,
            lowercase: true
        },
        password:{
            type: String
        },
        avatar: {
            type: String
        },
        username: {
            type: String
        }
    },
    google: {
        id: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true
        },
        avatar: {
            type: String
        },
        userName: {
            type: String
        }
    },
    facebook: {
        id: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true
        },
        avatar: {
            type: String
        },
        userName: {
            type: String
        }
    }
});

// 저장 하기 이전 ( 즉 디비에 저장하기 전에 암호화)
userSchema.pre('save', async function(next){
    try{
        console.log("aa");
        // 로그인 방식이 local이 아닐 때
        if (this.method !== 'local') {
            next();
        }

        // generate a salt
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        this.local.password = passwordHash;
        next();

    } catch(error) {
        next(error);
    }
});

// 패스워드 검증
userSchema.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.local.password);
    } catch(error) {
        throw new Error(error);
    }
};


// create user model
module.exports = mongoose.model('users', userSchema);

