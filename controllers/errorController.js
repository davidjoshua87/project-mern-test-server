//handle email or usename duplicates
const duplicateKeyError = (err, res) => {
    const field = Object.keys(err.keyValue);
    const code = 409;
    const error = `${field} already exists.`;
    return result = {
        messages: error,
        fields: field,
        code: code,
    };
}

//handle field formatting, empty fields, and mismatched passwords 
// const validationError = (err, res) => {
    // console.log(err);
    // const field = Object.keys(err.keyValue);
    // const error = `Please fill ${field} in correctly`;
    // let errors = Object.values(err.errors).map(el => el.message);
    // let fields = Object.values(err.errors).map(el => el.path);
    // const code = 422;
    // return res.status(code).send({messages: err, fields: fields});

    // if(errors.length > 1) {
    //     const formattedErrors = errors.join(' ');
    //     res.status(code).send({messages: formattedErrors, fields: fields});
    // } else {
    //     res.status(code).send({messages: errors, fields: fields})
    // }
// }

//error controller function
module.exports = {
    duplicateKeyError,
}