module.exports = async function (context, req) {
    context.res.json({
        text: process.env.message
    });
};
