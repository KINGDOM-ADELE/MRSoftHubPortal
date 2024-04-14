module.exports = (user) => {
    const excludeFields = ['__v', 'password', 'passwordResetToken', 'passwordResetTokenExp', 'emailVerificationToken', 'emailVerificationTokenExp', 'failedLogginAttempts', 'lastAttemptTime', 'loggedOutAllAt']
    excludeFields.forEach((el) => {
        if(user[el]){
            user[el] = undefined
        }
        user[el] && delete user[el]
    })

    return user
}